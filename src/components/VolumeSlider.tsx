import { JSX, createEffect, createSignal } from 'solid-js';
import { useConfig } from '../config';
import ClickSound from '../assets/fader_click.mp3';

export const VolumeSlider = () => {
    const { config, setVolume, audioContext, playBuffer } = useConfig();
    const [buffer, setBuffer] = createSignal<AudioBuffer | null>(null);

    createEffect(() => {
        async function load() {
            const arrayBuffer = await fetch(ClickSound).then((res) => res.arrayBuffer());
            setBuffer(await audioContext().decodeAudioData(arrayBuffer));
        }
        void load();
    });

    const playSound = (volume: number) => {
        if (buffer()) {
            playBuffer(buffer() as AudioBuffer, volume);
        }
    };

    const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const volume = +e.currentTarget.value;
        playSound(volume);
    };

    const onChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const volume = +e.currentTarget.value;
        setVolume(volume);
    };

    return (
        <input
            id="default-range"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={config.volume}
            class="slider-square-thumb w-1/3 shrink cursor-pointer appearance-none rounded-none border border-white bg-black p-1.5"
            onInput={onInput}
            onChange={onChange}
        />
    );
};
