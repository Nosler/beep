import { appWindow } from '@tauri-apps/api/window';
import { createEffect, createSignal } from 'solid-js';
import { useConnection } from '../connection';

interface TitleBarProps {
    text: string;
}

export const TitleBar = (props: TitleBarProps) => {
    const [status, setStatus] = createSignal('green');
    const { isWSConnected, isP2PConnected, peerId } = useConnection();

    createEffect(() => {
        if (isP2PConnected()) {
            setStatus('green');
        } else if (peerId()) {
            setStatus('cyan');
        } else if (isWSConnected()) {
            setStatus('yellow');
        } else {
            setStatus('magenta');
        }
    });

    return (
        <div data-tauri-drag-region class="titlebar">
            <div class="size-[24px] select-none pl-1 pt-1" data-tauri-drag-region>
                <img
                    src={`src\\assets\\${status()}.png`}
                    alt="status"
                    class="pointer-events-none"
                />
            </div>

            <p data-tauri-drag-region class="w-full cursor-default pl-2 pt-1 text-left text-xs">
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
