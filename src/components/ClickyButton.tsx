import cn from 'mxcn';
import { useConnection } from '../connection';

interface ClickyButtonProps {
    label: string;
    index: number;
    class?: string;
    action?: (index: number) => void | Promise<void>;
    peerId?: string;
}

const buttonDefault = `
bg-black rounded-none text-white font-medium transition-colors duration-100
border-solid border-white border
mx-1 mt-1 mb-2
px-1
relative max-h-20vw min-h-12 min-w-20vw
shadow-clicky
`;
const buttonHover = `hover:text-magenta hover:border-magenta`;
const buttonActive = `active:text-yellow active:border-yellow active:shadow-none active:top-2`;

export const ClickyButton = (props: ClickyButtonProps) => {
    const { click, handleClick } = useConnection();
    const play = () => {
        if (props.action) {
            // If button has a specific action, prioritize that.
            void props.action(props.index);
        } else if (props.peerId) {
            // If the button has a peerId, send a ClickMessage to that peer
            void click(props.peerId, props.index);
        } else {
            // It's a local button, play the sound
            handleClick(props.index);
        }
    };

    return (
        <button
            class={cn(buttonDefault, buttonHover, buttonActive, props.class)}
            type="submit"
            onClick={play}
            style="
                  clip-path: polygon(
                    0 0%,
                    90% 0,
                    100% 20%,
                    100% 80%,
                    100% 100%,
                    0% 100%,
                    0% 80%
                )
            "
        >
            <span class="w-full text-center">{props.label}</span>
        </button>
    );
};
