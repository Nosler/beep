import { JSX, createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createDefaultConfig } from './createDefaultConfig';
import { configContext } from './configContext';
import { Config, EditSoundData, Sound } from './config';
import { loadConfig, saveConfig } from './configIO';
import Logger from 'js-logger';
import { loadSoundBuffer } from './loadSoundBuffer';

export function ConfigProvider(props: { children: JSX.Element | JSX.Element[] }) {
    const [config, setConfig] = createStore<Config>({ volume: 1, sounds: [] });
    const [tabIndex, setTabIndex] = createSignal(0);
    const [audioContext] = createSignal(new AudioContext());

    onMount(() => {
        loadConfig(audioContext())
            .then((config) => {
                setConfig(config);
                saveConfigToFile();
            })
            .catch(async (e) => {
                Logger.info('Could not load config:', e);
                setConfig(await createDefaultConfig());
                saveConfigToFile();
            })
            .finally(() => {
                Logger.info('Config instantiated');
                Logger.debug('Config:', config);
            });
    });

    const saveConfigToFile = () => {
        saveConfig(config)
            .then(() => Logger.info('Config saved'))
            .catch((e) => Logger.error('Failed to save config:', e));
    };

    const setVolume = (volume: number) => {
        setConfig('volume', volume);
        saveConfigToFile();
    };

    const addSound = async (s: Omit<Sound, 'buffer'>) => {
        const buffer = await loadSoundBuffer(s, audioContext());
        setConfig('sounds', config.sounds.length, { ...s, buffer });
        saveConfigToFile();
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

    const editSound = async (
        index: number,
        data: EditSoundData,
        callback?: (buttons: string[]) => void | Promise<void>
    ) => {
        Logger.info('Editing sound', index, 'with', data);
        if (index >= config.sounds.length) {
            if (data.label && data.file) {
                await addSound({ label: config.sounds.length.toString(), file: data.file });
                return true;
            }
            return false;
        }
        const sound: Sound = {
            label: data.label ?? config.sounds[index].label,
            file: data.file ?? config.sounds[index].file,
        };

        sound.buffer = await loadSoundBuffer(sound, audioContext());

        // This is a workaround for Solid not updating the UI when the array is mutated
        setConfig('sounds', index, sound);
        if (callback) {
            void callback(config.sounds.map((s) => s.label));
        }
        return true;
    };

    return (
        <configContext.Provider
            value={{
                config,
                setVolume,
                addSound,
                audioContext,
                playBuffer,
                playSound,
                editSound,
                tabIndex,
                setTabIndex,
            }}
        >
            {props.children}
        </configContext.Provider>
    );
}
