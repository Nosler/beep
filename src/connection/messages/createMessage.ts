import { Out, MatchMessage, MessageTypes, RequestMessage } from './messageValidators';

export function createMatchMessage(peerId: string): Out<MatchMessage> {
    return {
        type: MessageTypes.enum.MATCH,
        peerId,
    };
}

export function createRequestMessage(peerId: string): Out<RequestMessage> {
    return {
        type: MessageTypes.enum.REQUEST,
        peerId,
    };
}
