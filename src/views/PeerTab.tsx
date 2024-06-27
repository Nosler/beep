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
            <div class="mb-12">
                <ClickyButton class="float-left h-1 w-3" button={config.sounds[0]} />
                <ConnectForm />
            </div>
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
        </div>
    );
};
