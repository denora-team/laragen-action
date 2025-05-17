import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
    try {
        // Read inputs (for testing)
        const apiKey: string = core.getInput('api_key');
        const projectSlug: string = core.getInput('project_slug');

        // Log inputs to the workflow
        core.info(`🛠️  Testing Laragen Action - API Key: ${apiKey}`);
        core.info(`🛠️  Testing Laragen Action - Project Slug: ${projectSlug}`);

        // Simple output for verification
        core.setOutput('status', 'Action is working!');
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

run();
