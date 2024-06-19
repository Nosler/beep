import { ClickyButton } from './ClickyButton';
import { ConnectForm } from './ConnectForm';

export const OptionsGrid = () => (
    <div class="grid grid-rows-1 pt-1">
        <ConnectForm />
        <ClickyButton text="OPTIONS" class="mb-2 min-h-6 text-xs shadow-clicky-sm active:top-1" />
    </div>
);
