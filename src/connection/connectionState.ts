export const enum ConnectionState {
    Error,
    Ready,
    Requested, // when you're waiting for a reply
    Connected,
}
