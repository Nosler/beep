import { For } from 'solid-js';
import { ClickyButton } from './ClickyButton';

export const ButtonGrid = () => (
    <div class="grid grid-rows-1">
        <div class="align-baseline">
            <For each={['1', '2', '3', '4', '5', '6', '7', '8']}>
                {(num) => <ClickyButton text={num} />}
            </For>
        </div>
    </div>
);
