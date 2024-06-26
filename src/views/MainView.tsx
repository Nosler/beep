import { Show } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';
import { writeText } from '@tauri-apps/api/clipboard';
import { ConnectionState } from '../connection/connectionState';
import { useConfig } from '../config';
import { ClickyButton } from '../components/ClickyButton';

export const MainView = () => {
    const { config } = useConfig();
    const { id, peers, pendingPeerId, status, acceptRequest } = useConnection();

    return (
        <div class="blue h-full flex-col justify-center bg-tengrey text-center">
            <div id='peer_data' class='bg-grossmagenta h-40 p-2'>
                <div>
                    <div class='mb-12'>
                        <ClickyButton class='float-left w-3 h-1' button={config.sounds[0]}/>
                        <ConnectForm />
                    </div>
                    <Show when={status() === ConnectionState.Ready || status() === ConnectionState.Error}>
                        <ButtonGrid buttons={[config.sounds[0],config.sounds[0],config.sounds[0],config.sounds[0]]} />
                    </Show>
                </div>
            </div>
            <div id='self_data' class='bg-cyan h-20 p-2'>
                <ButtonGrid buttons={[config.sounds[0],config.sounds[0],config.sounds[0],config.sounds[0]]} />

                <label for="Toggle4" class="p-0 inline-flex border-2 border-magenta peer-checked:dark:border-yellow items-center cursor-pointer">
                    <input id="Toggle4" type="checkbox" class="hidden peer"/>
                    <span class="px-4 py-2 dark:bg-black peer-checked:dark:bg-magenta">LOCAL</span>
                    <span class="px-4 py-2 dark:bg-magenta peer-checked:dark:bg-black">INTERNET</span>
                </label>

            </div>


            {/* Debug Stuff */}
            <div class="hidden mr-3 mt-1.5 text-right text-xs opacity-60">
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
