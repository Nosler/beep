import { For } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { Button } from '../config';

interface ButtonGridProps {
    buttons: Button[];
}

export const ButtonGrid = (props: ButtonGridProps) => {
    return (
        <div class="grid grid-rows-1">
            <div class="align-baseline">
                <For each={props.buttons}>{(button) => <ClickyButton button={button} />}</For>
            </div>
        </div>
    );
};
