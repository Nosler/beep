import cn from 'mxcn';
import { Accessor } from 'solid-js';

interface ToggleProps {
    value: Accessor<boolean>;
    onToggle: (value: boolean) => void;
    className?: string;
    scale?: number;
}

export const Toggle = (props: ToggleProps) => {
    const handleToggle = () => {
        const newValue = !props.value();
        props.onToggle(newValue);
    };

    return (
        <div
            onClick={handleToggle}
            class={cn(
                'relative inline-flex cursor-pointer items-center border-2 border-white',
                'h-8 w-14 rounded-full transition-colors duration-200',
                props.value() ? 'bg-darkcyan' : 'bg-tengrey',
                props.scale ? `scale-[${props.scale}]` : ''
            )}
        >
            <span
                class={cn(
                    'absolute left-0.5 h-6 w-6 transform rounded-full border-2 transition-transform duration-200',
                    props.value() ? 'translate-x-full' : 'translate-x-0',
                    props.value() ? 'border-twentygrey bg-white' : 'border-white bg-tengrey'
                )}
            />
        </div>
    );
};
