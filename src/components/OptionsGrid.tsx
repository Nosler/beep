import { ClickyButton } from './ClickyButton';
import { ConnectForm } from './ConnectForm';

export const OptionsGrid = () => (
  <div class="pt-1 grid grid-rows-1">
    <ConnectForm ws={ws() as WebSocket} />
    <ClickyButton text="OPTIONS" class="shadow-clicky-sm mb-2 min-h-6 text-xs active:top-1" />
  </div>
);
