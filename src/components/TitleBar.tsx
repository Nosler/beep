import { appWindow } from '@tauri-apps/api/window';
import { createSignal } from 'solid-js';

interface TitleBarProps {
    text: string;
}

export const TitleBar = (props: TitleBarProps) => {
    const [status, setStatus] = createSignal('green');

    const statusClick = () => {
        const colors = ['green', 'cyan', 'magenta', 'yellow'];
        setStatus(colors[Math.floor(Math.random() * colors.length)]);
    };

    return (
        <div data-tauri-drag-region class="titlebar">
            <div class="size-[24px] pl-1 pt-1" onClick={statusClick}>
                <img src={`src\\assets\\${status()}.png`} alt="minimize" />
            </div>

            <p data-tauri-drag-region class="w-full pl-2 pt-1 text-left text-xs">
                {props.text}
            </p>
            <div class="titlebar-button" onClick={() => void appWindow.minimize()}>
                <img src="src\assets\minimize.png" alt="minimize" />
            </div>
            <div class="titlebar-button" onClick={() => void appWindow.close()}>
                <img src="src\assets\x.png" alt="close" />
            </div>
        </div>
    );
};
