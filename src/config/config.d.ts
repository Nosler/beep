import { StoreSetter } from 'solid-js/store';
import { Accessor } from 'solid-js';
export interface Button {
    label: string;
}

export interface Sound extends Button {
    file: string;
    buffer?: AudioBuffer;
    isResource?: boolean;
}
export interface Config {
    sounds: Sound[];
    volume: number;
    token?: string;
    lastConnected?: string;
}

export interface ConfigContext {
    config: Config;
    setConfig: (setter: StoreSetter<Config>) => void;
    addSound: (s: Omit<Sound, 'buffer'>) => Promise<void>;
    audioContext: Accessor<AudioContext>;
    playBuffer: (buffer: AudioBuffer, volume?: number) => void;
    playSound: (index: number) => void;
}

export interface Tab {
    title: string;
    color: string;
    hovercolor?: string;
    component: () => JSX.Element;
}
