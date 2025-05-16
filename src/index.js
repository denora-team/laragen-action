const core = require('@actions/core');

async function run() {
    try {
        // Read inputs (for testing)
        const apiKey = core.getInput('api_key');
        const projectSlug = core.getInput('project_slug');

        // Log inputs to the workflow
        core.info(`🛠️  Testing Laragen Action - API Key: ${apiKey}`);
        core.info(`🛠️  Testing Laragen Action - Project Slug: ${projectSlug}`);

        // Simple output for verification
        core.setOutput('status', 'Action is working!');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
