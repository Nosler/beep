import { Button } from '../config';

export const enum ConnectionState {
    /**
     * When you're not connected to the server.
     */
    Error,
    /**
     * Connected to server and waiting for a peer to request.
     */
    Ready,
    /**
     * When you're waiting for a reply.
     */
    Requested,
    /**
     * When you're connected to a peer.
     */
    Connected,
}

export const enum ConnectionType {
    Listening,
    Sending,
}

export interface Peer {
    id: string;
    /**
     * Peer is [type] to you.
     */
    type: ConnectionType;
}

export interface Listener extends Peer {
    type: ConnectionType.Listening;
    sounds: Button[];
}
