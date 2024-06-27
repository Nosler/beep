import { For } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { Button } from '../config';

interface ButtonGridProps {
    buttons: Button[];
}

export const ButtonGrid = (props: ButtonGridProps) => {
    const rows = () => Math.floor(props.buttons.length / 3);
    return (
        <div class={`grid grid-cols-3 grid-rows-${rows} `}>
            <For each={props.buttons}>
                {(button) => <ClickyButton button={button} class="h-1" />}
            </For>
        </div>
    );
};
