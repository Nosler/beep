import { tabs } from './Tabs';
import { Dynamic } from 'solid-js/web';
import { useConfig } from '../config';

export const MainView = () => {
    const { tabIndex } = useConfig();

    return (
        <div class="flex size-full max-h-full flex-col justify-start gap-2 overflow-hidden bg-black text-center">
            <div class="main-view h-fit border border-tengrey bg-black p-2">
                <Dynamic component={tabs[tabIndex()].component} />
            </div>
        </div>
    );
};
