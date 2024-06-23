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
    type: ConnectionType;
}
