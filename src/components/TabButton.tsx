import cn from 'mxcn';
import './TabButton.css';
interface TabButtonProps {
    title: string;
    color: string;
    icon: string;
    active: boolean;
    onClick: () => void;
}

export const TabButton = (props: TabButtonProps) => {
    return (
        <div
            onClick={() => props.onClick()}
            class={cn(
                `flex w-24 cursor-pointer flex-col items-center gap-0 rounded-br-md rounded-tl-lg border text-center text-lg font-bold leading-4 text-black`,
                props.active
                    ? `filter-${props.color} mt-1.5`
                    : `hover:mb-1 hover:filter-light${props.color} [&:not(:hover)]:filter-dark${props.color} filter-dark${props.color}`
            )}
        >
            <div class="flex grow-0 gap-1 pb-1 pl-1 pt-1">
                {props.title}
                <img class={cn('w-4')} src={props.icon} />
            </div>
            <div
                class={cn(`h-1 w-full rounded-md bg-black`)}
                style="
                        clip-path: polygon(
                            10% 0%,
                            100% 0,
                            100% 100%,
                            0% 100%,
                            0% 100%
                    )"
            ></div>
        </div>
    );
};
