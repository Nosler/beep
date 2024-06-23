import { SetStoreFunction } from 'solid-js/store';

export interface Button {
    text: string;
    file: string;
}

export interface Config {
    buttons: Button[];
    token?: string;
    lastConnected?: string;
}

export interface ConfigContext {
    config: Config;
    setConfig: SetStoreFunction<Config>;
}
