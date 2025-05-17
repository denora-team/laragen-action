import * as core from '@actions/core';
import { generateDocs } from './services/docGenerator';
import { uploadDocs } from './services/uploader';
import { logInfo, logError } from './utils/logger';
import { Inputs } from './types';

export async function main(): Promise<void> {
    try {
        // Gather inputs
        const inputs: Inputs = {
            apiKey: core.getInput('api_key', { required: true }),
            branch: core.getInput('branch') || ''
        };

        logInfo(`Starting Laragen Action on branch "${inputs.branch}"`);

        // 1. Generate the single OpenAPI JSON file
        const docsFilePath: string = await generateDocs(inputs.branch);

        // 2. Upload that file to the server
        await uploadDocs(inputs.apiKey, docsFilePath);

        core.setOutput('status', 'Action completed successfully');
    } catch (err: any) {
        logError(err);
        core.setFailed(err.message);
    }
}
