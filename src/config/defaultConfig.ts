import pikmin from '../assets/pikmin-gcn.mp3';
import { Config } from './config';

export const defaultConfig: Config = {
    volume: 1,
    sounds: [
        {
            label: 'Pikminn',
            file: pikmin,
        },
    ],
};
