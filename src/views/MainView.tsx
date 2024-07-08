import { createSignal } from 'solid-js';
import { TabList } from './TabList';
import { tabs } from './Tabs';
import { Dynamic } from 'solid-js/web';

export const MainView = () => {
    const [tabIndex, setTabIndex] = createSignal(0);

    return (
        <div class="blue size-full max-h-full flex-col justify-center overflow-hidden bg-black text-center">
            <TabList tabs={tabs} setTabIndex={setTabIndex} tabIndex={tabIndex} />

            <div class="h-50 m-3 border border-dashed border-twentygrey bg-tengrey p-2">
                <Dynamic component={tabs[tabIndex()].component} />
            </div>
        </div>
    );
};
