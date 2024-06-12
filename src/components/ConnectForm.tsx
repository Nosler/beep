import { createSignal } from 'solid-js';
import { createMatchMessage } from '../connection/createWSMessage';

export const ConnectForm = (props: { ws: WebSocket }) => {
  const [text, setText] = createSignal('asd');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    props.ws.send(JSON.stringify(createMatchMessage(text())));
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
