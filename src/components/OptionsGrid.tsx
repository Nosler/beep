import { Accessor } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { ConnectForm } from './ConnectForm';

interface OptionsGridProps {
    ws: Accessor<WebSocket | null>;
    id: Accessor<string | null>;
}

export const OptionsGrid = (props: OptionsGridProps) => (
    <div class="grid grid-rows-1 pt-1">
        <ConnectForm ws={props.ws} id={props.id} />
        <ClickyButton text="OPTIONS" class="mb-2 min-h-6 text-xs shadow-clicky-sm active:top-1" />
    </div>
);
