import { Connection } from './connection';
import { ConnectionType } from './connectionState';
import {
    ZMatchMessage,
    ZIdMessage,
    ZMessage,
    MatchMessage,
    IdMessage,
    SendableMessage,
    Out,
    MessageTypes,
    RequestMessage,
    ZRequestMessage,
    ZClickMessage,
    ClickMessage,
} from './messages/messageValidators';
import Logger from 'js-logger';

export class ConnectionWS {
    private ws!: WebSocket;
    private connection: Connection;

    constructor(connection: Connection) {
        void this.connectWithRetries();
        this.connection = connection;
    }

    public get ready(): boolean {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    private instantiateWS(): Promise<void> {
        const url = new URL(
            '/connect',
            import.meta.env.VITE_DISCOVERY_SERVER_URL || 'wss://localhost:3000'
        );
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(url);
            this.ws.onopen = () => {
                Logger.info('Connected to server.');
                resolve();
            };
            this.ws.onmessage = this.handleMessage.bind(this);
            this.ws.onerror = () => reject(new Error('WebSocket error'));
        });
    }

    private async connectWithRetries(maxRetries: number = 3, delayMs: number = 250): Promise<void> {
        let retries = 0;

        while (retries < maxRetries) {
            try {
                await this.instantiateWS();
                return;
            } catch (err) {
                retries++;
                if (retries < maxRetries) {
                    await new Promise((resolve) => setTimeout(resolve, delayMs));
                }
            }
        }

        Logger.error('Failed to connect to WebSocket.');
    }

    private handleMessage(event: MessageEvent<string>) {
        Logger.debug('Received message', event.data);
        if (!event.data) return;
        const data = ZMessage.passthrough().parse(JSON.parse(event.data));
        switch (data.type) {
            case MessageTypes.enum.MATCH:
                this.handleMatch(ZMatchMessage.parse(data));
                return;
            case MessageTypes.enum.REQUEST:
                this.handleRequest(ZRequestMessage.parse(data));
                return;
            case MessageTypes.enum.ID:
                this.handleId(ZIdMessage.parse(data));
                return;
            case MessageTypes.enum.CLICK:
                this.handleClick(ZClickMessage.parse(data));
                return;
            case MessageTypes.enum.ERROR:
                Logger.error('Received error message', data);
                return;
            default:
                Logger.warn('Unknown message format', data);
        }
    }

    private handleClick(data: ClickMessage) {
        if (!(data.peerId in this.connection.peers)) {
            throw new Error('Mismatched ID');
        }
        if (this.connection.peers()[data.peerId].type !== ConnectionType.Sending) {
            Logger.warn('Received click message from non-sending peer');
            return;
        }
        this.connection.handleClick(data.buttonIndex);
    }

    private handleRequest(data: RequestMessage) {
        if (data.peerId !== this.connection.id()) {
            throw new Error('Mismatched ID');
        }
        this.connection.handleRequest(data.id);
    }

    private handleMatch(data: MatchMessage) {
        if (data.peerId !== this.connection.id()) {
            throw new Error('Mismatched ID');
        }
        this.connection.handleMatch(data.id, data.buttons);
    }

    private handleId(data: IdMessage) {
        this.connection.handleId(data.id);
    }

    public send(data: Out<SendableMessage>) {
        this.ws.send(JSON.stringify(data));
    }

    public cleanup() {
        this.ws.close();
    }
}
