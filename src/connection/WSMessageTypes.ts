import z from 'zod';

export const WSMessageTypes = z.enum(['MATCH', 'SIGNAL', 'ID']);

export const ZWSMessage = z.object({
    type: WSMessageTypes,
    id: z.string(),
});

export const ZWSIdMessage = ZWSMessage.extend({
    type: z.literal(WSMessageTypes.enum.ID),
});

export const ZWSMatchMessage = ZWSMessage.extend({
    type: z.literal(WSMessageTypes.enum.MATCH),
    peerId: z.string(),
});

export interface MessageMatchers {
    MATCH: WSMatchMessage;
    ID: WSIdMessage;
}

export type MessageTypes = z.infer<typeof WSMessageTypes>;
export type WSMessage = z.infer<typeof ZWSMessage>;
export type WSIdMessage = z.infer<typeof ZWSIdMessage>;
export type WSMatchMessage = z.infer<typeof ZWSMatchMessage>;

export type SendableMessage = WSMatchMessage;
export type Out<T extends SendableMessage> = Omit<T, 'id'>;
