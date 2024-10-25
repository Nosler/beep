import { createSignal } from 'solid-js';
import { useConnection } from '../connection';

export const ConnectForm = () => {
    const [text, setText] = createSignal('');
    const connection = useConnection();
    const handleSubmit = (e: SubmitEvent) => {
        console.log('submit');
        e.preventDefault();
        if (text().length === 8) {
            connection.sendRequest(text());
        }
    };

    return (
        <form onSubmit={handleSubmit} class="mt-2 flex w-full items-center justify-around gap-2">
            <input
                type="text"
                maxlength="10"
                class="max-w-32 bg-white text-center text-black"
                placeholder="PeerID"
                value={text()}
                onInput={(e) => setText(e.target.value)}
            />
            <input
                class="border-whitegrey shrink grow border border-solid bg-black p-0.5"
                type="submit"
                value="Send Request"
            />
        </form>
    );
};
