import cn from 'mxcn';

interface SpacerProps {
    y?: string;
    x?: string;
}

export const Spacer = (props: SpacerProps) => {
    const ySpace = () => props.y || '1';
    const xSpace = () => props.x || '0';

    return <div class={cn(`h-${ySpace()} w-${xSpace()}`)} />;
};
