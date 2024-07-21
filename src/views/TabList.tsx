import { For } from 'solid-js';
import { TabButton } from '../components/TabButton';
import { Tab, useConfig } from '../config';
import { VolumeSlider } from '../components/VolumeSlider';

interface TabListProps {
    tabs: Tab[];
}

export const TabList = (props: TabListProps) => {
    const { tabIndex, setTabIndex } = useConfig();
    return (
        <div
            id="top_bar"
            class="h-12 border border-dashed border-twentygrey bg-tengrey px-1 py-1.5"
        >
            <div class="flex w-full items-center justify-around">
                <For each={props.tabs}>
                    {(item, index) => (
                        <TabButton
                            title={item.title}
                            color={item.color}
                            hovercolor={item.hovercolor || 'dark' + item.color}
                            active={tabIndex() == index()}
                            onClick={() => setTabIndex(index())}
                        />
                    )}
                </For>
                <VolumeSlider />
            </div>
        </div>
    );
};
