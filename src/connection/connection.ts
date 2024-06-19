import { Accessor, Setter, createSignal } from 'solid-js';
import { ConnectionWS } from './ConnectionWS';
import { Out, SendableMessage } from './WSMessageTypes';
import { ConnectionState } from './connectionState';
import { createMatchMessage } from './createWSMessage';

export class Connection {
    private ws: ConnectionWS;
    public id: Accessor<string | undefined>;
    private setId: Setter<string | undefined>;
    public peerId: Accessor<string | undefined>;
    private setPeerId: Setter<string | undefined>;
    public pendingPeerId: Accessor<string | undefined>;
    private setPendingPeerId: Setter<string | undefined>;
    private requestedPeerId?: string;
    public status: Accessor<ConnectionState> = () => this._status();

    constructor() {
        this.ws = new ConnectionWS(this);
        const [id, setId] = createSignal<string | undefined>(undefined);
        this.id = id;
        this.setId = setId;
        const [peerId, setPeerId] = createSignal<string | undefined>(undefined);
        this.peerId = peerId;
        this.setPeerId = setPeerId;
        const [pendingPeerId, setPendingPeerId] = createSignal<string | undefined>(undefined);
        this.pendingPeerId = pendingPeerId;
        this.setPendingPeerId = setPendingPeerId;
    }

    public handleId(id: string) {
        this.setId(id);
    }

    public handleMatch(peerId: string) {
        if (this.status() === ConnectionState.Requested) {
            this.setPeerId(peerId);
            this.requestedPeerId = undefined;
        } else if (this.status() === ConnectionState.Ready) {
            this.setPendingPeerId(peerId);
        } else {
            // TODO reject
        }
    }

    public cleanup() {
        this.ws.cleanup();
    }

    private send(data: Out<SendableMessage>) {
        console.log(data);
        this.ws.send(data);
    }

    private _status(): ConnectionState {
        if (!this.id() || !this.ws.ready) {
            return ConnectionState.Error;
        } else if (this.requestedPeerId) {
            return ConnectionState.Requested;
        } else if (this.peerId()) {
            return ConnectionState.Connected;
        } else {
            return ConnectionState.Ready;
        }
    }

    public sendRequest(id: string) {
        console.log(id);
        this.requestedPeerId = id;
        this.send(createMatchMessage(id));
    }

    public acceptRequest() {
        if (!this.pendingPeerId()) {
            throw new Error('Unexpected State');
        }
        this.setPeerId(this.pendingPeerId());
        this.setPendingPeerId(undefined);
        // this.send(accept)
    }
}
