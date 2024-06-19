import { Out, WSMatchMessage, WSMessageTypes } from './WSMessageTypes';

export function createMatchMessage(peerId: string): Out<WSMatchMessage> {
    return {
        type: WSMessageTypes.enum.MATCH,
        peerId,
    };
}
