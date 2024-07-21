import { TabList } from './TabList';
import { tabs } from './Tabs';
import { Dynamic } from 'solid-js/web';
import { useConfig } from '../config';

export const MainView = () => {
    const { tabIndex } = useConfig();

    return (
        <div class="flex size-full max-h-full flex-col justify-start gap-2 overflow-hidden bg-black text-center">
            <TabList tabs={tabs} />

            <div class="main-view h-fit border border-dashed border-twentygrey bg-tengrey p-2">
                <Dynamic component={tabs[tabIndex()].component} />
            </div>
        </div>
    );
};
