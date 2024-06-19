import { createSignal } from 'solid-js';
import { createMatchMessage } from '../connection/createWSMessage';
import { useConnection } from '../connection';

export const ConnectForm = () => {
    const [text, setText] = createSignal('');
    const connection = useConnection();
    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        connection.sendRequest(text());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                class="text-center text-tengrey"
                placeholder="Enter Peer ID"
                value={text()}
                onInput={(e) => setText(e.target.value)}
            />
        </form>
    );
};
