import { Connection } from './connection';
import {
    ZWSMatchMessage,
    ZWSIdMessage,
    ZWSMessage,
    WSMatchMessage,
    WSIdMessage,
    SendableMessage,
    Out,
} from './WSMessageTypes';

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
            this.ws.onopen = () => resolve();
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

        throw new Error('Failed to connect to WebSocket.');
    }

    private handleMessage(event: MessageEvent<string>) {
        if (!event.data) return;
        const data = ZWSMessage.passthrough().parse(JSON.parse(event.data));
        switch (data.type) {
            case 'MATCH':
                this.handleMatch(ZWSMatchMessage.parse(data));
                return;
            case 'ID':
                this.handleId(ZWSIdMessage.parse(data));
                return;
        }
        console.error('Unknown message format', data);
    }

    private handleMatch(data: WSMatchMessage) {
        if (data.peerId !== this.connection.id()) {
            throw new Error('Mismatched ID');
        }
        this.connection.handleMatch(data.id);
    }

    private handleId(data: WSIdMessage) {
        this.connection.handleId(data.id);
    }

    public send(data: Out<SendableMessage>) {
        this.ws.send(JSON.stringify(data));
    }

    public cleanup() {
        this.ws.close();
    }
}
