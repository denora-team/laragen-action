import * as fs from 'fs';
import * as path from 'path';
import { logInfo } from '../utils/logger';

/**
 * Fake uploader for testing.
 * Reads the single JSON file and logs what would be sent.
 */
export async function uploadDocs(apiKey: string, docsFile: string): Promise<void> {
    logInfo(`(fake) Uploading ${docsFile} with API key: ${apiKey}`);

    if (!fs.existsSync(docsFile)) {
        throw new Error(`Docs file not found: ${docsFile}`);
    }

    // Read file size (just as an example)
    const stats = fs.statSync(docsFile);
    logInfo(`(fake) File size: ${stats.size} bytes`);

    // List the first few bytes
    const content = fs.readFileSync(docsFile, 'utf8').slice(0, 100);
    logInfo(`(fake) File preview:\n${content.replace(/\n/g, '')}...`);

    // simulate network latency
    await new Promise((r) => setTimeout(r, 300));

    logInfo(`(fake) Upload complete`);
}
