import { Show } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';
import { writeText } from '@tauri-apps/api/clipboard';
import { ConnectionState } from '../connection/connectionState';

export const MainView = () => {
    const connection = useConnection();
    const { id, peerId, pendingPeerId, status } = connection;

    return (
        <div class="blue h-full flex-col justify-center bg-tengrey text-center">
            <div>
                <ConnectForm />
            </div>
            <ButtonGrid />
            {/* Debug Stuff */}
            <div class="mr-3 mt-1.5 text-right text-xs opacity-60">
                <span>
                    Discovery server:{' '}
                    {status() === ConnectionState.Ready ? 'Connected' : 'Disconnected'}
                </span>
                <br />
                <span onClick={() => void writeText(id() as string)}>Id: {id()}</span>
                <br />
                <span>Peer Id: {peerId()}</span>
            </div>
            <Show when={pendingPeerId()}>
                <div class="h-100 flex flex-col gap-1">
                    <span>Request from {pendingPeerId()}</span>
                    <button onClick={() => connection.acceptRequest()}>Accept</button>
                    <button>Deny</button>
                </div>
            </Show>
        </div>
    );
};
