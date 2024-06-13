import { Accessor, createSignal } from 'solid-js';
import { createMatchMessage } from '../connection/createWSMessage';

export const ConnectForm = (props: { ws: Accessor<WebSocket | null> }) => {
  const [text, setText] = createSignal('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const ws = props.ws();
    if (ws) {
      ws.send(JSON.stringify(createMatchMessage(text())));
    } else {
      throw new Error('Discovery server not connected');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        class="text-bg text-center"
        placeholder="Enter Peer ID"
        value={text()}
        onInput={(e) => setText(e.target.value)}
      />
    </form>
  );
};
