import cn from 'mxcn';

interface SoundButtonProps {
    text: string;
    file?: string;
    class?: string;
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

export const ClickyButton = (props: SoundButtonProps) => {
    const audio = () => (props.file ? new Audio(props.file) : null);

    const play = () => {
        if (props.file && audio()) {
            void audio()!.play();
        }
    };

    return (
        <button
            class={cn(buttonDefault, buttonHover, buttonActive, props.class)}
            type="submit"
            onClick={play}
        >
            {props.text}
        </button>
    );
};
