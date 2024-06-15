import { Accessor, Setter, createContext } from 'solid-js';
import SimplePeer from 'simple-peer';

interface ConnectionContext {
    ws: Accessor<WebSocket | null>;
    peerId: Accessor<string | null>;
    id: Accessor<string | null>;
    isP2PConnected: Accessor<boolean>;
    peer: Accessor<SimplePeer.Instance | null>;
    isWSConnected: Accessor<boolean>;
    setPeerId: Setter<string | null>;
    pendingRequestId: Accessor<string | null>;
    acceptRequest: () => void;
    denyRequest: () => void;
}

export const connectionContext = createContext<ConnectionContext>();
