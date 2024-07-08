import { appWindow } from '@tauri-apps/api/window';
import { useConnection } from '../connection';
import { ConnectionState } from '../connection/connectionState';
import cyan from '../assets/cyan.png';
import green from '../assets/green.png';
import magenta from '../assets/magenta.png';
import yellow from '../assets/yellow.png';
import X from '../assets/x.png';
import minimize from '../assets/minimize.png';
interface TitleBarProps {
    text: string;
}

export const TitleBar = (props: TitleBarProps) => {
    const { status } = useConnection();

    const statusColor = () => {
        switch (status()) {
            case ConnectionState.Ready:
                return yellow;
            case ConnectionState.Connected:
                return green;
            case ConnectionState.Requested:
                return cyan;
            case ConnectionState.Error:
                return magenta;
        }
    };

    return (
        <div data-tauri-drag-region class="titlebar">
            <div class="size-[24px] select-none pl-1 pt-1" data-tauri-drag-region>
                <img src={statusColor()} alt="status" class="pointer-events-none" />
            </div>

            <p data-tauri-drag-region class="w-full cursor-default pl-2 pt-1 text-left text-xs">
                {props.text}
            </p>
            <div class="titlebar-button" onClick={() => void appWindow.minimize()}>
                <img src={minimize} alt="minimize" />
            </div>
            <div class="titlebar-button" onClick={() => void appWindow.close()}>
                <img src={X} alt="close" />
            </div>
        </div>
    );
};
