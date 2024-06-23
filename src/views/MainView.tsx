import { Show } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';
import { writeText } from '@tauri-apps/api/clipboard';
import { ConnectionState } from '../connection/connectionState';
import { useConfig } from '../config';

export const MainView = () => {
    const { config } = useConfig();
    const { id, peers, pendingPeerId, status, acceptRequest } = useConnection();

    return (
        <div class="blue h-full flex-col justify-center bg-tengrey text-center">
            <div>
                <ConnectForm />
            </div>
            <h1>{config.buttons.length}</h1>
            <Show when={status() === ConnectionState.Ready || status() === ConnectionState.Error}>
                <ButtonGrid buttons={config.buttons} />
            </Show>

            {/* Debug Stuff */}
            <div class="mr-3 mt-1.5 text-right text-xs opacity-60">
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
