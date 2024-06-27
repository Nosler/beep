import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';
import { writeText } from '@tauri-apps/api/clipboard';
import { ConnectionState } from '../connection/connectionState';
import { useConfig } from '../config';
import { ClickyButton } from '../components/ClickyButton';
import { PeerTab } from './PeerTab';
import { SelfTab } from './SelfTab';
import { TabButton } from '../components/TabButton';

const tabs = [{title:"PEER", color:"cyan"}, {title:"SELF", color:"magenta"}, {title:"CONF", color:"yellow"}];

export const MainView = () => {
    const { config } = useConfig();
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
                        {(item,index)=><TabButton title={item.title} color={item.color} active={tabIndex() == index()} onClick={()=>setTabIndex(index)} />}
                    </For>
                    <input
                        id="default-range"
                        type="range"
                        value="100"
                        class="w-1/3 shrink slider-square-thumb border-white cursor-pointer appearance-none rounded-none border bg-black p-1.5"
                    />
                </div>
            </div>
            <div
                id="peer_data"
                class="h-50 m-3 hidden border border-dashed border-twentygrey bg-tengrey p-3"
            >
                <div>
                    <div class="mb-12">
                        <ClickyButton class="float-left h-1 w-3" button={config.sounds[0]} />
                        <ConnectForm />
                    </div>
                    <Show
                        when={
                            status() === ConnectionState.Ready || status() === ConnectionState.Error
                        }
                    >
                        <ButtonGrid
                            buttons={[
                                config.sounds[0],
                                config.sounds[0],
                                config.sounds[0],
                                config.sounds[0],
                                config.sounds[0],
                                config.sounds[0],
                            ]}
                        />
                    </Show>
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
                        <div></div>
                    </Match>
                </Switch>
            </div>

            {/* Debug Stuff */}
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
