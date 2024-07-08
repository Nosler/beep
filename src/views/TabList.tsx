import { Accessor, For } from 'solid-js';
import { TabButton } from '../components/TabButton';
import { Tab } from '../config';
import { VolumeSlider } from '../components/VolumeSlider';

interface TabList {
    tabs: Tab[];
    tabIndex: Accessor<number>;
    setTabIndex: (i: number) => void;
}

export const TabList = (props: TabList) => {
    return (
        <div
            id="top_bar"
            class="m-3 h-12 border border-dashed border-twentygrey bg-tengrey px-1 py-1.5"
        >
            <div class="flex w-full items-center justify-around">
                <For each={props.tabs}>
                    {(item, index) => (
                        <TabButton
                            title={item.title}
                            color={item.color}
                            hovercolor={item.hovercolor || 'dark' + item.color}
                            active={props.tabIndex() == index()}
                            onClick={() => props.setTabIndex(index())}
                        />
                    )}
                </For>
                <VolumeSlider />
            </div>
        </div>
    );
};
