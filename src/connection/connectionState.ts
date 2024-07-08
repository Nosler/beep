import { Button } from '../config';

export const enum ConnectionState {
    Error,
    Ready,
    /**
     * When you're waiting for a reply.
     */
    Requested,
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
