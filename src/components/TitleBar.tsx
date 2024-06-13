import { getVersion } from "@tauri-apps/api/app";
import { appWindow } from "@tauri-apps/api/window";
import { createSignal } from "solid-js";

interface TitleBarProps {
    text: string;
}

export const TitleBar = (props: TitleBarProps) => {
    const [status, setStatus] = createSignal("green");

    const statusClick =()=> {
        const colors = ["green", "cyan", "magenta", "yellow"];
        setStatus(colors[Math.floor(Math.random() * colors.length)])
    }

    return (
    <div data-tauri-drag-region class="titlebar">
        <div class="pt-1 pl-1 w-[24px] h-[24px]" onClick={ statusClick }>
            <img src={`src\\assets\\${status()}.png`} alt="minimize" />
        </div>

        <p data-tauri-drag-region class=" text-xs text-left w-full pt-1 pl-2">{props.text}</p>
        <div class="titlebar-button" onClick={() => void appWindow.minimize()}>
            <img src="src\assets\minimize.png" alt="minimize" />
        </div>
        <div class="titlebar-button" onClick={() => void appWindow.close()}>
            <img src="src\assets\x.png" alt="close" />
        </div>
    </div>
)};
