import cn from 'mxcn';

interface TabButtonProps {
    title: string;
    color: string;
    icon: string;
    hovercolor: string;
    active: boolean;
    onClick: () => void;
}

export const TabButton = (props: TabButtonProps) => {
    function getFilter(color: string) {
        switch (color) {
            case 'cyan':
                return 'filter: invert(88%) sepia(78%) saturate(7434%) hue-rotate(100deg) brightness(104%) contrast(104%);';
                break;
            case 'magenta':
                return 'filter: invert(24%) sepia(97%) saturate(5953%) hue-rotate(295deg) brightness(121%) contrast(127%);';
                break;
            case 'yellow':
                return 'filter: invert(100%) sepia(100%) saturate(7498%) hue-rotate(357deg) brightness(104%) contrast(104%);';
                break;
            default:
                return 'filter: invert(25%) sepia(0%) saturate(0%) hue-rotate(219deg) brightness(101%) contrast(95%);';
        }
    }

    return (
        <div
            onClick={() => props.onClick()}
            class={cn(
                `flex w-24 cursor-pointer flex-col items-center justify-start text-center text-lg font-bold leading-5 text-twentygrey`,
                props.active && `text-${props.color}`,
                !props.active &&
                    `hover:border-dark${props.color} hover:text-dark${props.color} group`
            )}
        >
            <div class="flex gap-1 pb-1">
                {props.title} <img class="h-5" style={getFilter(props.color)} src={props.icon} />
            </div>
            <div
                class={cn(
                    `h-1.5 bg-twentygrey`,
                    props.active && `bg-${props.color}`,
                    !props.active && `group-hover:bg-dark${props.color}`
                )}
                style="
                  clip-path: polygon(
                    10% 0%,
                    100% 0,
                    90% 100%,
                    0% 100%,
                    0% 100%
                )
            "
            ></div>
        </div>
    );
};
