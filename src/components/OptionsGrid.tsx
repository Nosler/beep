import { Accessor } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { ConnectForm } from './ConnectForm';

export const OptionsGrid = (props: { ws: Accessor<WebSocket | null> }) => (
  <div class="grid grid-rows-1 pt-1">
    <ConnectForm ws={props.ws} />
    <ClickyButton
      text="OPTIONS"
      class="shadow-clicky-sm mb-2 min-h-6 text-xs active:top-1"
    />
  </div>
);
