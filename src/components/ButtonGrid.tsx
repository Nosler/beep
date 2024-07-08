import { For } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { Button } from '../config';

interface ButtonGridProps {
    buttons: Button[];
    peerId?: string;
}

export const ButtonGrid = (props: ButtonGridProps) => {
    const rows = () => Math.floor(props.buttons.length / 3);
    return (
        <div class={`grid grid-cols-3 grid-rows-${rows()} `}>
            <For each={props.buttons}>
                {(button, index) => (
                    <ClickyButton
                        label={button.label}
                        class="h-1"
                        peerId={props.peerId}
                        index={index()}
                    />
                )}
            </For>
        </div>
    );
};
