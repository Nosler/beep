import { appWindow } from '@tauri-apps/api/window';
import { useConnection } from '../connection';
import { ConnectionState } from '../connection/connectionState';
import cyan from '../assets/cyan.png';
import green from '../assets/green.png';
import magenta from '../assets/magenta.png';
import yellow from '../assets/yellow.png';
import X from '../assets/x.png';
import minimize from '../assets/minimize.png';
import { writeText } from '@tauri-apps/api/clipboard';

export const TitleBar = () => {
    const { status, id } = useConnection();

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

    const titleText = () => {
        switch (status()) {
            case ConnectionState.Ready:
                return id();
            case ConnectionState.Connected:
                return id() + '- :3';
            case ConnectionState.Requested:
                return id() + ' - ~';
            case ConnectionState.Error:
                return 'Disconnected';
        }
    };

    return (
        <div
            data-tauri-drag-region
            class="flex h-fit w-full select-none items-start justify-end gap-1 border-b border-b-thirtygrey p-0.5"
        >
            <div
                class="inline-flex h-full w-6 select-none items-center justify-center"
                data-tauri-drag-region
            >
                <img src={statusColor()} alt="status" class="pointer-events-none" />
            </div>

            <p
                data-tauri-drag-region
                class="flex size-full cursor-default flex-col items-start justify-center text-left text-xs"
            >
                <span data-tauri-drag-region>
                    beboop -{' '}
                    <span
                        onClick={() => (id() ? void writeText(id() as string) : null)}
                        data-tauri-drag-region
                    >
                        {titleText()}
                    </span>
                </span>
            </p>
            <div
                class="inline-flex h-fit w-6 items-center justify-center p-0.5 text-center hover:bg-magenta active:bg-yellow"
                onClick={() => void appWindow.minimize()}
            >
                <img src={minimize} alt="minimize" />
            </div>
            <div
                class="inline-flex h-fit w-6 grow-0 items-center justify-center p-0.5 text-center hover:bg-magenta active:bg-yellow"
                onClick={() => void appWindow.close()}
            >
                <img src={X} alt="close" />
            </div>
        </div>
    );
};
