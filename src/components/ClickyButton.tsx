import cn from 'mxcn';
import { Button } from '../config';

interface ClickyButtonProps {
    button: Button;
    class?: string;
    action?: (label: string) => void | Promise<void>;
}

const buttonDefault = `
bg-black rounded-none text-white font-medium transition-colors duration-100
border-solid border-white border
mx-0.5 mt-1 mb-3
relative max-h-20vw min-h-12 min-w-20vw
shadow-clicky
`;
const buttonHover = `hover:text-magenta hover:border-magenta`;
const buttonActive = `active:text-yellow active:border-yellow active:shadow-none active:top-2`;

export const ClickyButton = (props: ClickyButtonProps) => {
    const audio = () => (props.button.file ? new Audio(props.button.file) : null);

    const play = () => {
        if (props.button.file && audio()) {
            void audio()!.play();
        }
    };

    return (
        <button
            class={cn(buttonDefault, buttonHover, buttonActive, props.class)}
            type="submit"
            onClick={play}
        >
            {props.button.label}
        </button>
    );
};
