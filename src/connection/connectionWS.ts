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
            this.ws.onerror = () => reject(Logger.error('WebSocket error'));
            this.ws.onclose = () => {
                Logger.error('WebSocket closed');
                void this.connectWithRetries();
            };
        });
    }

    private async connectWithRetries(maxRetries: number = 3, delayMs: number = 500): Promise<void> {
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
        if (!event.data) {
            Logger.warn('Received unknown message', event.data);
            return;
        }
        const data = ZMessage.passthrough().parse(JSON.parse(event.data));
        Logger.info('Received message', data);
        switch (data.type) {
            case MessageTypes.enum.MATCH:
                this.handleMatch(ZMatchMessage.parse(data));
                break;
            case MessageTypes.enum.REQUEST:
                this.handleRequest(ZRequestMessage.parse(data));
                break;
            case MessageTypes.enum.ID:
                this.handleId(ZIdMessage.parse(data));
                break;
            case MessageTypes.enum.CLICK:
                this.handleClick(ZClickMessage.parse(data));
                break;
            case MessageTypes.enum.ERROR:
                Logger.error('Received error message', data);
                break;
            default:
                Logger.warn('Unknown message format', data);
                return;
        }
        Logger.info('Received message', data);
    }

    private handleClick(data: ClickMessage) {
        if (
            !this.connection
                .peers()
                .filter((p) => p.id === data.peerId)
                .some((p) => p.type === ConnectionType.Sending)
        ) {
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
        if (data.id !== this.connection.id() || data.peerId !== this.connection.requestedPeerId) {
            Logger.error(
                `Mismatched I:\nDataId: ${data.id}, Id: ${this.connection.id()}\nDataPeerId: ${data.peerId}, PendingPeerId: ${this.connection.pendingPeerId()}`
            );
            throw new Error('Mismatched ID');
        }
        this.connection.handleMatch(data.peerId, data.buttons);
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
