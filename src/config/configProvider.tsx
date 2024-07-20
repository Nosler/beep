import { JSX, createSignal, onMount } from 'solid-js';
import { StoreSetter, createStore } from 'solid-js/store';
import { createDefaultConfig } from './createDefaultConfig';
import { configContext } from './configContext';
import { Config, Sound } from './config';
import { loadConfig, saveConfig } from './configIO';
import Logger from 'js-logger';
import { loadSoundBuffer } from './loadSoundBuffer';

export function ConfigProvider(props: { children: JSX.Element | JSX.Element[] }) {
    const [config, _setConfig] = createStore<Config>({ volume: 1, sounds: [] });
    const [audioContext] = createSignal(new AudioContext());

    onMount(() => {
        loadConfig(audioContext())
            .then((config) => {
                _setConfig(config);
            })
            .catch(async (e) => {
                Logger.info('Could not load config:', e);
                setConfig(await createDefaultConfig());
            })
            .finally(() => {
                Logger.info('Config instantiated');
                Logger.debug('Config:', config);
            });
    });

    const setConfig = (args: StoreSetter<Config>) => {
        _setConfig(args);
        saveConfig(config)
            .then(() => Logger.info('Config saved'))
            .catch((e) => Logger.error('Failed to save config:', e));
    };

    const addSound = async (s: Omit<Sound, 'buffer'>) => {
        const buffer = await loadSoundBuffer(s, audioContext());
        setConfig((c) => ({ ...c, sounds: [...c.sounds, { ...s, buffer }] }));
    };

    const playBuffer = (buffer: AudioBuffer, volume?: number) => {
        const source = audioContext().createBufferSource();
        source.buffer = buffer;
        const gainNode = audioContext().createGain();
        gainNode.gain.value = volume !== undefined ? volume : config.volume;
        source.connect(gainNode);
        gainNode.connect(audioContext().destination);
        source.start(0);
    };

    const playSound = (index: number) => {
        const sound = config.sounds[index];
        if (!sound) {
            Logger.error(`Sound ${index} not found`);
            return;
        } else if (!sound.buffer) {
            Logger.error(`Sound ${sound.label} has no buffer`);
            return;
        }
        playBuffer(sound.buffer);
    };

    return (
        <configContext.Provider
            value={{ config, setConfig, addSound, audioContext, playBuffer, playSound }}
        >
            {props.children}
        </configContext.Provider>
    );
}
