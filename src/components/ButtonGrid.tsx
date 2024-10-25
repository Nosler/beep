import { Accessor, For, Show, createSignal } from 'solid-js';
import { ClickyButton } from './ClickyButton';
import { Button } from '../config';
import { AddButton } from './AddButton';
import { Portal } from 'solid-js/web';
import { EditSound } from '../views/EditSound';
interface ButtonGridProps {
    buttons: Button[];
    peerId?: string;
    edit?: Accessor<boolean>;
}

export const ButtonGrid = (props: ButtonGridProps) => {
    const rows = () => Math.floor(props.buttons.length / 3);
    const [currentlyEditing, setCurrentlyEditing] = createSignal<number | null>(null);

    return (
        <>
            <div class={`grid grid-cols-2 grid-rows-${rows()} `}>
                <For each={props.buttons}>
                    {(button, index) => (
                        <ClickyButton
                            label={button.label}
                            peerId={props.peerId}
                            index={index()}
                            action={props.edit && props.edit() ? setCurrentlyEditing : undefined}
                        />
                    )}
                </For>
                <Show when={props.edit && props.edit()}>
                    <AddButton
                        index={props.buttons.length}
                        edit={props.edit}
                        action={setCurrentlyEditing}
                    />
                </Show>
            </div>
            <Show when={currentlyEditing() !== null}>
                <Portal mount={document.querySelector('.main-view')!}>
                    <EditSound
                        index={currentlyEditing()!}
                        close={() => setCurrentlyEditing(null)}
                    />
                </Portal>
            </Show>
        </>
    );
};
