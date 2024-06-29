import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';
import { writeText } from '@tauri-apps/api/clipboard';
import { ConnectionState } from '../connection/connectionState';
import { useConfig } from '../config';
import { PeerTab } from './PeerTab';
import { SelfTab } from './SelfTab';
import { ConfigTab } from './ConfigTab';
import { TabButton } from '../components/TabButton';
import { VolumeSlider } from '../components/VolumeSlider';

const tabs = [
    { title: 'PEER', color: 'cyan', hovercolor: 'darkcyan' },
    { title: 'SELF', color: 'magenta', hovercolor: 'darkmagenta' },
    { title: 'CONF', color: 'yellow', hovercolor: 'darkyellow' },
];

export const MainView = () => {
    const { config, setConfig } = useConfig();
    const { id, peers, pendingPeerId, status, acceptRequest } = useConnection();
    const [isLocal, setIsLocal] = createSignal(false);
    const [tabIndex, setTabIndex] = createSignal(0);

    return (
        <div class="blue h-full max-w-full flex-col justify-center bg-black text-center">
            <div
                id="top_bar"
                class="m-3 h-12 border border-dashed border-twentygrey bg-tengrey px-1 py-1.5"
            >
                <div class="flex w-full items-center justify-around">
                    <For each={tabs}>
                        {(item, index) => (
                            <TabButton
                                title={item.title}
                                color={item.color}
                                hovercolor={item.hovercolor}
                                active={tabIndex() == index()}
                                onClick={() => setTabIndex(index)}
                            />
                        )}
                    </For>
                    <VolumeSlider />
                </div>
            </div>

            <div class="h-50 m-3 border border-dashed border-twentygrey bg-tengrey p-2">
                <Switch>
                    <Match when={tabIndex() == 0}>
                        <PeerTab />
                    </Match>
                    <Match when={tabIndex() == 1}>
                        <SelfTab />
                    </Match>
                    <Match when={tabIndex() == 2}>
                        <ConfigTab />
                    </Match>
                </Switch>
            </div>

            {/* Debug Stuff */}
            <span>{config.volume}</span>
            <div class="mr-3 mt-1.5 hidden text-right text-xs opacity-60">
                <span>
                    Discovery server:{' '}
                    {status() === ConnectionState.Ready ? 'Connected' : 'Disconnected'}
                </span>
                <br />
                <span onClick={() => void writeText(id() as string)}>Id: {id()}</span>
                <br />
                <span>Peer Id: {peers()[0]?.id}</span>
            </div>
            <Show when={pendingPeerId()}>
                <div class="h-100 flex flex-col gap-1">
                    <span>Request from {pendingPeerId()}</span>
                    <button onClick={acceptRequest}>Accept</button>
                    <button>Deny</button>
                </div>
            </Show>
        </div>
    );
};
