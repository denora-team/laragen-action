import * as core from '@actions/core';
import * as github from '@actions/github';
import { generateDocs } from './services/docGenerator';
import { uploadDocs } from './services/uploader';
import { logInfo, logError } from './utils/logger';
import { Inputs } from './types';

export async function main(): Promise<void> {
    try {
        // Read inputs
        const apiKey = core.getInput('api_key', { required: true });
        let branch = core.getInput('branch');

        // Fallback: if no branch input, detect from context
        if (!branch) {
            const ctx = github.context;
            // If PR, use head ref
            if (ctx.eventName === 'pull_request' && ctx.payload.pull_request) {
                branch = ctx.payload.pull_request.head.ref;
            }
            // If a push on a branch, strip the refs/heads/ prefix
            else if (ctx.ref.startsWith('refs/heads/')) {
                branch = ctx.ref.replace('refs/heads/', '');
            }
            // Otherwise fall back to the repo default branch
            else {
                branch = ctx.payload.repository?.default_branch || '';
            }
        }

        const inputs: Inputs = { apiKey, branch };
        logInfo(`Starting Laragen Action on branch "${inputs.branch}"`);

        // 1. Generate the single OpenAPI JSON file
        const docsFilePath = await generateDocs(inputs.branch);

        // 2. Upload that file to the server
        await uploadDocs(inputs.apiKey, docsFilePath);

        core.setOutput('status', 'Action completed successfully');
    } catch (err: any) {
        logError(err);
        core.setFailed(err.message);
    }
}
