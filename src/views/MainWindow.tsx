import { JSX } from 'solid-js';
import { TitleBar } from '../components/TitleBar';

export const MainWindow = (props: { children: JSX.Element }) => {
    return (
        <div>
            <TitleBar text="Beep - Disconnected" />
            <div class="mb-1 h-[24px]" />
            {props.children}
        </div>
    );
};
