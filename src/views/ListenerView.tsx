import { ButtonGrid } from '../components/ButtonGrid';
import { Listener, useConnection } from '../connection';

interface ListenerViewProps {
    peerIdx: number;
}

export const ListenerView = (props: ListenerViewProps) => {
    const { peers } = useConnection();
    const peer = () => peers()[props.peerIdx] as Listener;

    return <ButtonGrid buttons={peer().sounds} peerId={peer().id} />;
};
