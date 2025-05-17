import * as fs from 'fs';
import * as path from 'path';
import { logInfo } from '../utils/logger';
import { promisify } from 'util';
import { exec } from 'child_process';

// If you want to simulate a small delay:
const wait = promisify(setTimeout);

/**
 * Fake doc generator for testing.
 * Writes a single `openapi.json` to the repo root and returns its path.
 */
export async function generateDocs(branch: string): Promise<string> {
    logInfo(`(fake) Generating single openapi.json for branch "${branch}"`);

    // simulate some work
    await wait(200);

    const outputPath = path.resolve(process.cwd(), 'openapi.json');
    const payload = {
        info: {
            title: `Fake API Docs for ${branch}`,
            version: branch || 'unknown',
        },
        timestamp: new Date().toISOString(),
    };

    fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8');
    logInfo(`(fake) Wrote ${outputPath}`);

    return outputPath;
}
