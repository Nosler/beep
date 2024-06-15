import { createSignal } from 'solid-js';
import { createMatchMessage } from '../connection/createWSMessage';
import { useConnection } from '../connection';

export const ConnectForm = () => {
    const [text, setText] = createSignal('');
    const { ws, id, setPeerId } = useConnection();

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const _id = id();
        if (_id) {
            ws()?.send(JSON.stringify(createMatchMessage(text(), _id)));
            setPeerId(text);
        } else {
            throw new Error('Discovery server not connected');
        }
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
