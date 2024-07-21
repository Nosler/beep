import { For, Show, createEffect, createSignal } from 'solid-js';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection, ConnectionState, ConnectionType } from '../connection';
import { AcceptGrid } from '../components/AcceptGrid';
import { ListenerView } from './ListenerView';

export const PeerTab = () => {
    const { status, peers, pendingPeerId } = useConnection();
    const [currentPeerIdx, setCurrentPeerIdx] = createSignal<number | null>(null);

    createEffect(() => {
        if (currentPeerIdx() === null && peers().length) {
            if (peers()[0].type === ConnectionType.Listening) {
                setCurrentPeerIdx(0);
                return;
            }
        } else if (currentPeerIdx() !== null && !peers().length) {
            setCurrentPeerIdx(null);
        }
    });

    return (
        <div>
            <Show when={status() >= ConnectionState.Ready}>
                <ConnectForm />
            </Show>

            <Show when={status() === ConnectionState.Ready && pendingPeerId()}>
                <AcceptGrid />
            </Show>
            <For each={peers()}>
                {(peer, idx) => (
                    <Show when={peer.type === ConnectionType.Listening}>
                        <ListenerView peerIdx={idx()} />
                    </Show>
                )}
            </For>
        </div>
    );
};
