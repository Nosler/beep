import { JSX } from 'solid-js';
import { useConfig } from '../config';
import VolumeClick from '../assets/fader_click.mp3';

export const VolumeSlider = () => {
    const { config, setConfig } = useConfig();
    const audio = new Audio(VolumeClick);
    audio.preload = 'auto';
    const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const volume = +e.currentTarget.value;
        audio.volume = volume;
        audio.play().catch(err => handle(err));
        setConfig((c) => ({ ...c, volume }));
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
        />
    );
};
function handle(err: any): any {
    throw new Error('Function not implemented.');
}

