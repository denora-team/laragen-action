export function logInfo(msg: string): void {
    console.log(`ℹ️  ${msg}`);
}

export function logError(err: Error | string): void {
    console.error(`❌  ${typeof err === 'string' ? err : err.stack || err.message}`);
}
