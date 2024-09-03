import { Accessor } from 'solid-js';
export interface Button {
    label: string;
}

export interface Sound extends Button {
    file: string;
    buffer?: AudioBuffer;
}
export interface Config {
    sounds: Sound[];
    volume: number;
    token?: string;
    lastConnected?: string;
}

type EditSoundData = Omit<Partial<Sound>, 'buffer'>;

export interface ConfigContext {
    config: Config;
    setVolume: (volume: number) => void;
    addSound: (s: Omit<Sound, 'buffer'>) => Promise<void>;
    audioContext: Accessor<AudioContext>;
    playBuffer: (buffer: AudioBuffer, volume?: number) => Promise<void>;
    playSound: (index: number) => void;
    editSound: (
        index: number,
        data: EditSoundData,
        callback?: (buttons: string[]) => void | Promise<void>
    ) => Promise<boolean>;
    deleteSound: (index: number, callback?: (buttons: string[]) => void | Promise<void>) => void;
    tabIndex: Accessor<number>;
    setTabIndex: (i: number) => void;
    setToken: (token?: string) => void;
}

export interface Tab {
    title: string;
    color: string;
    hovercolor?: string;
    component: () => JSX.Element;
}
