import cn from 'mxcn';

interface SoundButtonProps {
    text: string;
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
    return (
        <button class={cn(buttonDefault, buttonHover, buttonActive, props.class)} type="submit">
            {props.text}
        </button>
    );
};
