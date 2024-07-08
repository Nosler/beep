import { Show } from 'solid-js';
import { ConnectionState } from '../connection/connectionState';
import { useConnection } from '../connection';
import { useConfig } from '../config';
import { writeText } from '@tauri-apps/api/clipboard';

function replaceSound<T>(key: string, value: T) {
    if (key === 'buffer') {
        return undefined;
    }
    return value;
}

export const DebugInfo = () => {
    const { config } = useConfig();
    const { id, peers, pendingPeerId, status, acceptRequest } = useConnection();
    return (
        <div class="">
            <div class="mr-3 mt-1.5 flex flex-col text-left text-xs opacity-60">
                <span>--- Config Info ---</span>
                <span>Volume: {config.volume}</span>
                <span>Sounds:</span>
                <pre id="json">{JSON.stringify(config.sounds, replaceSound, 2)}</pre>
                <span>--- Connection Info ---</span>
                <span>
                    Discovery server:{' '}
                    {status() === ConnectionState.Ready ? 'Connected' : 'Disconnected'}
                </span>
                <span onClick={() => void writeText(id() as string)}>Id: {id()}</span>
                <span>Peer Id: {peers()[0]?.id}</span>
            </div>
            <Show when={pendingPeerId()}>
                <div class="h-100 flex flex-col gap-1">
                    <span>Request from {pendingPeerId()}</span>
                    <button onClick={() => acceptRequest(Object.keys(config.sounds))}>
                        Accept
                    </button>
                    <button>Deny</button>
                </div>
            </Show>
        </div>
    );
};
