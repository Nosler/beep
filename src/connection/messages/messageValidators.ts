import z from 'zod';

export const MessageTypes = z.enum(['MATCH', 'REQUEST', 'NEWID', 'CLICK', 'ERROR', 'ID', 'LOGIN']);

export const ZMessage = z.object({
    type: MessageTypes,
    id: z.string(),
});

export const ZNewIdMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.NEWID),
});

export const ZIdMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.ID),
    token: z.string(),
});

export const ZMatchMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.MATCH),
    peerId: z.string(),
    buttons: z.array(z.string()).min(1).max(9),
});

export const ZRequestMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.REQUEST),
    peerId: z.string(),
});

export const ZLoginMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.LOGIN),
    token: z.string(),
});

export const ZErrorMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.ERROR),
    error: z.string(),
});

export const ZClickMessage = ZMessage.extend({
    type: z.literal(MessageTypes.enum.CLICK),
    peerId: z.string(),
    buttonIndex: z.number(),
});

export type MessageTypes = z.infer<typeof MessageTypes>;
export type Message = z.infer<typeof ZMessage>;
export type NewIdMessage = z.infer<typeof ZNewIdMessage>;
export type IdMessage = z.infer<typeof ZIdMessage>;
export type LoginMessage = z.infer<typeof ZLoginMessage>;
export type MatchMessage = z.infer<typeof ZMatchMessage>;
export type ClickMessage = z.infer<typeof ZClickMessage>;
export type ErrorMessage = z.infer<typeof ZErrorMessage>;
export type RequestMessage = z.infer<typeof ZRequestMessage>;

export type SendableMessage =
    | MatchMessage
    | RequestMessage
    | ClickMessage
    | NewIdMessage
    | LoginMessage;
export type ReceivableMessage =
    | MatchMessage
    | RequestMessage
    | ClickMessage
    | IdMessage
    | ErrorMessage;
export type Out<T extends SendableMessage> = Omit<T, 'id'>;

export interface MessageLog {
    message: ReceivableMessage;
    timestamp: Date;
}
