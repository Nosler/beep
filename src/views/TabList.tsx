import { For } from 'solid-js';
import { TabButton } from '../components/TabButton';
import { Tab, useConfig } from '../config';

interface TabListProps {
    tabs: Tab[];
}

export const TabList = (props: TabListProps) => {
    const { tabIndex, setTabIndex } = useConfig();
    return (
        <div id="tabs" class="flex max-h-full pb-2">
            <div class="flex w-full items-center justify-center gap-1.5">
                <For each={props.tabs}>
                    {(item, index) => (
                        <TabButton
                            title={item.title}
                            color={item.color}
                            icon={item.icon}
                            active={tabIndex() == index()}
                            onClick={() => setTabIndex(index())}
                        />
                    )}
                </For>
            </div>
        </div>
    );
};
