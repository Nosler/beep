import { WSMatchMessage, WSMessageTypes, WSSignalMessage } from './WSMessageTypes';

export function createSignalMessage(data: unknown, peerId: string, id: string): WSSignalMessage {
    return {
        type: WSMessageTypes.enum.SIGNAL,
        peerId,
        data,
        id,
    };
}

export function createMatchMessage(peerId: string, id: string): WSMatchMessage {
    return {
        type: WSMessageTypes.enum.MATCH,
        peerId,
        id,
    };
}
