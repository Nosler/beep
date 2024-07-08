import { resolveResource } from '@tauri-apps/api/path';
import { Config } from './config';

export const createDefaultConfig = async (): Promise<Config> => ({
    volume: 1,
    sounds: [
        {
            label: 'Pikminn',
            file: await resolveResource('resources/pikmin-gcn.mp3'),
        },
    ],
});
