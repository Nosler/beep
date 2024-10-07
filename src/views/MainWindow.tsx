import { JSX } from 'solid-js';
import { TitleBar } from '../components/TitleBar';
import { TabList } from './TabList';
import { tabs } from './Tabs';

export const MainWindow = (props: { children: JSX.Element }) => {
    return (
        <div class="flex h-screen max-h-screen w-screen flex-col overflow-hidden">
            <TitleBar />
            <div class="relative grow overflow-hidden p-1">{props.children}</div>
            <div class="grow" />
            <TabList tabs={tabs} />
        </div>
    );
};
