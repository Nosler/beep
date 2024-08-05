import {
    Out,
    MatchMessage,
    MessageTypes,
    RequestMessage,
    ClickMessage,
    NewIdMessage,
    LoginMessage,
} from './messageValidators';

export function createMatchMessage(peerId: string, buttons: string[]): Out<MatchMessage> {
    return {
        type: MessageTypes.enum.MATCH,
        peerId,
        buttons,
    };
}

export function createRequestMessage(peerId: string): Out<RequestMessage> {
    return {
        type: MessageTypes.enum.REQUEST,
        peerId,
    };
}

export function createClickMessage(peerId: string, buttonIndex: number): Out<ClickMessage> {
    return {
        type: MessageTypes.enum.CLICK,
        peerId,
        buttonIndex,
    };
}

export function createNewIdMessage(): Out<NewIdMessage> {
    return {
        type: MessageTypes.enum.NEWID,
    };
}

export function createLoginMessage(token: string): Out<LoginMessage> {
    return {
        type: MessageTypes.enum.LOGIN,
        token,
    };
}
