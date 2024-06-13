import { getVersion } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";

interface TitleBarProps {
    text: string;
}

export const TitleBar = (props: TitleBarProps) => {
    return (
    <div data-tauri-drag-region class="titlebar">
        <p data-tauri-drag-region class=" text-xs text-left w-full pt-1 pl-2">{props.text}</p>
        <div class="titlebar-button" onClick={() => void appWindow.minimize()}>
            <img src="src\assets\minimize.png" alt="minimize" />
        </div>
        <div class="titlebar-button" onClick={() => void appWindow.close()}>
            <img src="src\assets\x.png" alt="close" />
        </div>
    </div>
)};
