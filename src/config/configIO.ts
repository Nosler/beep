import { Config } from './config';
import { appConfigDir, join } from '@tauri-apps/api/path';
import { exists, writeFile } from '@tauri-apps/api/fs';

export async function loadConfig(): Promise<Config> {
    const configDir = await appConfigDir();
    const configFilePath = await join(configDir, 'config.json');
    if (await exists(configFilePath)) {
        const config = await fetch(configFilePath);
        return (await config.json()) as Config;
    }
    throw new Error('No config found');
}

export async function saveConfig(config: Config) {
    const configDir = await appConfigDir();
    const configFilePath = await join(configDir, 'config.json');
    await writeFile(configFilePath, JSON.stringify(config));
}
