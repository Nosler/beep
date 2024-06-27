import cn from 'mxcn';

interface TabButtonProps {
    title: string;
    color: string;
    active: boolean;
    onClick: () => void;
}

export const TabButton = (props: TabButtonProps) => {
    return (
        <span
            onClick={props.onClick}
            class={cn(
                `border border-${props.color} cursor-pointer bg-black px-2 py-1 border-twentygrey text-twentygrey`,
                props.active && `text-${props.color} border-${props.color} `
            )}
        >
            {props.title}
        </span>
    );
};
