import { For, Show } from 'solid-js';
import { ConnectionState, ConnectionType, Listener, Peer } from '../connection/connectionState';
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
    const { id, peers, status } = useConnection();
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
                <span>Peers:</span>
                <div class="flex-col">
                    <For each={peers()}>
                        {(peer) => (
                            <div class="flex w-full gap-1">
                                <span>Id: {peer.id}</span>
                                <span>Type: {peer.type}</span>
                                <Show when={peer.type === ConnectionType.Listening}>
                                    <span>Sounds: {(peer as Listener).sounds.length}</span>
                                </Show>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};
