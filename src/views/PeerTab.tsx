import { Show } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { ClickyButton } from '../components/ClickyButton';
import { ConnectForm } from '../components/ConnectForm';
import { useConfig } from '../config';
import { useConnection } from '../connection';
import { ConnectionState } from '../connection/connectionState';

export const PeerTab = () => {
    const { config } = useConfig();
    const { status } = useConnection();

    return (
        <div>
            <Show when={status() === ConnectionState.Ready || status() === ConnectionState.Error}>
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
            <div class="mt-2 flex w-full items-center justify-around">
                <ConnectForm />
                <button class="border-whitegrey border-width-1 ml-2 w-1/2 border border-solid bg-black pt-1">
                    CONNECT
                </button>
            </div>
        </div>
    );
};
