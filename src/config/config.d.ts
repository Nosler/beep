import { SetStoreFunction } from 'solid-js/store';

export interface Sound {
    label: string;
    file: string;
}

export interface Button {
    label: string;
    file?: string;
}

export interface Config {
    sounds: Sound[];
    volume: number;
    token?: string;
    lastConnected?: string;
}

export interface ConfigContext {
    config: Config;
    setConfig: SetStoreFunction<Config>;
}
