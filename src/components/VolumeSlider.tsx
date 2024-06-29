import { JSX } from 'solid-js';
import { useConfig } from '../config';
import Pikmin from '../assets/pikmin-gcn.mp3';

export const VolumeSlider = () => {
    const { config, setConfig } = useConfig();
    const audio = new Audio(Pikmin);
    const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
        const volume = +e.currentTarget.value;
        audio.volume = volume;
        audio.play();
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
