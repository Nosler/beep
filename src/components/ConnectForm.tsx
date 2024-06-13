import { Accessor, createSignal } from 'solid-js';
import { createMatchMessage } from '../connection/createWSMessage';

interface ConnectFormProps {
  ws: Accessor<WebSocket | null>;
  id: Accessor<string | null>;
}

export const ConnectForm = (props: ConnectFormProps) => {
  const [text, setText] = createSignal('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const ws = props.ws();
    const id = props.id();
    if (ws && id) {
      ws.send(JSON.stringify(createMatchMessage(text(), id)));
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
