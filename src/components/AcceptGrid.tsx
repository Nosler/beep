import { Show } from 'solid-js';
import { useConnection } from '../connection';
import { useConfig } from '../config';

export const AcceptGrid = () => {
    const { config } = useConfig();
    const { pendingPeerId, acceptRequest, denyRequest } = useConnection();

    function accept() {
        void acceptRequest(config.sounds.map((sound) => sound.label));
    }

    return (
        <Show when={pendingPeerId()}>
            <div class="flex w-full items-end py-3">
                <span class="text-whitegrey text-center">{pendingPeerId()}</span>
                <div class="flex w-full items-center justify-around">
                    <button
                        type="button"
                        class="border-whitegrey border-width-1 ml-2 w-1/2 border border-solid bg-black pt-1"
                        onClick={accept}
                    >
                        YEA
                    </button>

                    <button
                        type="button"
                        class="border-whitegrey border-width-1 ml-2 w-1/2 border border-solid bg-black pt-1"
                        onClick={denyRequest}
                    >
                        NAH
                    </button>
                </div>
            </div>
        </Show>
    );
};
