import { Config } from './config';
import { appConfigDir, join } from '@tauri-apps/api/path';
import { exists, writeFile, readTextFile, createDir, Dir } from '@tauri-apps/api/fs';
import Logger from 'js-logger';
import { loadSoundBuffer } from './loadSoundBuffer';

export async function loadConfig(ctx: AudioContext): Promise<Config> {
    const configFilePath = 'config.json';
    Logger.debug('Loading config from ', await join(await appConfigDir(), configFilePath));
    if (await exists(configFilePath, { dir: Dir.AppConfig })) {
        Logger.log('Config found');
        const config = await readTextFile(configFilePath, { dir: Dir.AppConfig });
        const configJson = JSON.parse(config) as Config;
        await Promise.all(
            Object.entries(configJson.sounds).map(
                async ([_, v]) => (v.buffer = await loadSoundBuffer(v, ctx))
            )
        );
        Logger.info('Config loaded');
        Logger.debug(configJson);
        return configJson;
    }
    throw new Error('No config found');
}

function removeSounds(config: Config) {
    return { ...config, sounds: config.sounds.map(({ label, file }) => ({ label, file })) };
}

export async function saveConfig(config: Config) {
    const configDir = await appConfigDir();
    if (!(await exists(configDir))) {
        Logger.debug('Creating config directory ', configDir);
        await createDir(configDir);
    }
    const configFilePath = await join(configDir, 'config.json');
    Logger.debug('Saving config to ', configFilePath);
    await writeFile(configFilePath, JSON.stringify(removeSounds(config), null, 2));
}
