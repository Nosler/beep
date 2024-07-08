import { Show, createEffect } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection, ConnectionState, ConnectionType, Listener } from '../connection';
import Logger from 'js-logger';

export const PeerTab = () => {
    const { status, peers } = useConnection();

    createEffect(() => {
        Logger.info('PeerTab mounted');
    });
    return (
        <div>
            <div class="mt-2 flex w-full items-center justify-around">
                <ConnectForm />
                <button class="border-whitegrey border-width-1 ml-2 w-1/2 border border-solid bg-black pt-1">
                    CONNECT
                </button>
            </div>
            <Show
                when={
                    status() === ConnectionState.Connected &&
                    peers()[0]?.type === ConnectionType.Listening
                }
            >
                <ButtonGrid buttons={(peers()[0] as Listener).sounds} peerId={peers()[0].id} />
            </Show>
        </div>
    );
};
