import cn from 'mxcn';
import { useConnection } from '../connection';

interface ClickyButtonProps {
    label: string;
    index: number;
    class?: string;
    action?: (label: string) => void | Promise<void>;
    peerId?: string;
}

const buttonDefault = `
bg-black rounded-none text-white font-medium transition-colors duration-100
border-solid border-white border
mx-1 mt-1 mb-2
px-4
relative max-h-20vw min-h-12 min-w-20vw
shadow-clicky
`;
const buttonHover = `hover:text-magenta hover:border-magenta`;
const buttonActive = `active:text-yellow active:border-yellow active:shadow-none active:top-2`;

export const ClickyButton = (props: ClickyButtonProps) => {
    const { click, handleClick } = useConnection();
    const play = () => {
        if (props.peerId) {
            void click(props.peerId, props.index);
        } else {
            handleClick(props.index);
        }
    };

    return (
        <button
            class={cn(buttonDefault, buttonHover, buttonActive, props.class)}
            type="submit"
            onClick={play}
        >
            {props.label}
        </button>
    );
};
