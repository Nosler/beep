import { createEffect, createSignal } from 'solid-js';
import SimplePeer from 'simple-peer';
import wrtc from '@roamhq/wrtc';
import {
    WSMessageTypes,
    ZWSMessage,
    ZWSMatchMessage,
    ZWSSignalMessage,
    ZWSIdMessage,
} from './WSMessageTypes';
import { createSignalMessage } from './createWSMessage';
interface createP2PConnectionArgs {
    setPeer: (peer: SimplePeer.Instance) => null;
    ws: WebSocket;
    setIsP2PConnected: (isP2PConnected: boolean) => null;
    initiator: boolean;
    peerId: string;
    id: string;
}

const createP2PConnection = ({
    setPeer,
    ws,
    setIsP2PConnected,
    initiator,
    peerId,
    id,
}: createP2PConnectionArgs) => {
    const peer = new SimplePeer({ initiator, trickle: true, wrtc });
    setPeer(peer);
    peer.on('signal', (data) => {
        ws.send(JSON.stringify(createSignalMessage(data, peerId, id)));
    });
    peer.on('connect', () => {
        setIsP2PConnected(true);
        console.log('Peer P2PConnected');
    });
    peer.on('data', (data: string) => {
        console.log('Received data:', data);
    });
};

export const createConnection = () => {
    const [id, setId] = createSignal<string | null>(null);
    const [isP2PConnected, setIsP2PConnected] = createSignal(false);
    const [isWSConnected, setIsWSConnected] = createSignal(false);
    const [peer, setPeer] = createSignal<SimplePeer.Instance | null>(null);
    const [ws, setWs] = createSignal<WebSocket | null>(null);
    const [peerId, setPeerId] = createSignal<string | null>(null);
    const [pendingRequestId, setPendingRequestId] = createSignal<string | null>(null);

    createEffect(() => {
        const url = new URL(
            '/connect',
            import.meta.env.VITE_DISCOVERY_SERVER_URL || 'wss://localhost:3000 '
        );
        const _ws = new WebSocket(url);
        setWs(_ws);

        _ws.onopen = () => {
            console.log('P2PConnected to Discovery server');
            setIsWSConnected(true);
        };

        _ws.onmessage = (event: MessageEvent<string>) => {
            if (!event.data) return;

            const data = ZWSMessage.passthrough().parse(JSON.parse(event.data));
            console.log('Got Message', data);
            if (data.type === WSMessageTypes.enum.MATCH) {
                const matchData = ZWSMatchMessage.parse(data);
                setPendingRequestId(matchData.peerId);
            } else if (data.type === WSMessageTypes.enum.SIGNAL && id()) {
                const signalData = ZWSSignalMessage.parse(data);
                createP2PConnection({
                    setPeer,
                    ws: _ws,
                    setIsP2PConnected,
                    initiator: false,
                    peerId: signalData.id,
                    id: id() as string,
                });
            } else if (data.type === WSMessageTypes.enum.ID) {
                const idData = ZWSIdMessage.parse(data);
                setId(idData.id);
            }
        };
        _ws.onclose = () => {
            setIsWSConnected(false);
        };

        return () => {
            _ws.close();
        };
    });

    const acceptRequest = () => {
        if (!pendingRequestId() || !ws() || !id()) {
            throw new Error('Invalid state');
        }
        createP2PConnection({
            setPeer,
            ws: ws() as WebSocket,
            setIsP2PConnected,
            initiator: true,
            peerId: pendingRequestId() as string,
            id: id() as string,
        });
        setPeerId(pendingRequestId() as string);
        setPendingRequestId(null);
    };

    const denyRequest = () => {
        setPendingRequestId(null);
    };

    return {
        ws,
        id,
        isP2PConnected,
        peer,
        peerId,
        isWSConnected,
        setPeerId,
        pendingRequestId,
        acceptRequest,
        denyRequest,
    };
};
