import { ClickyButton } from './ClickyButton';
import { MAX_BUTTONS } from '../config';
import cn from 'mxcn';
import { Accessor } from 'solid-js';

interface AddButtonProps {
    index: number;
    edit?: Accessor<boolean>;
}

export const AddButton = (props: AddButtonProps) => {
    const fits = () => props.index < MAX_BUTTONS;
    const enabled = () => props.edit && props.edit();
    return (
        <ClickyButton
            label="+"
            class={cn(
                'bg-thirtygrey transition-opacity delay-75 ease-in-out',
                enabled() ? 'opacity-100' : 'opacity-0',
                fits() || 'hidden'
            )}
            index={props.index}
        />
    );
};
