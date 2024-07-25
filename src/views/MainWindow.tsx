import { JSX } from 'solid-js';
import { TitleBar } from '../components/TitleBar';

export const MainWindow = (props: { children: JSX.Element }) => {
    return (
        <div class="flex h-screen w-screen flex-col overflow-hidden">
            <TitleBar />
            <div class="relative grow p-2">{props.children}</div>
        </div>
    );
};
