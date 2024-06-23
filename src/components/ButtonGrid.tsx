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
                <For each={props.buttons}>
                    {(button) => <ClickyButton text={button.text} file={button.file} />}
                </For>
            </div>
        </div>
    );
};
