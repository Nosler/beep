import { Accessor, Setter, createSignal } from 'solid-js';
import { ConnectionWS } from './ConnectionWS';
import { Out, SendableMessage } from './messages/messageValidators';
import { ConnectionState, ConnectionType, Peer } from './connectionState';
import { createMatchMessage, createRequestMessage } from './messages';

export class Connection {
    private ws: ConnectionWS;
    public id: Accessor<string | undefined>;
    private setId: Setter<string | undefined>;
    public peers: Accessor<Peer[]>;
    private setPeers: Setter<Peer[]>;
    public pendingPeerId: Accessor<string | undefined>;
    private setPendingPeerId: Setter<string | undefined>;
    private requestedPeerId?: string;
    public status: Accessor<ConnectionState> = () => this._status();

    constructor() {
        this.ws = new ConnectionWS(this);
        const [id, setId] = createSignal<string | undefined>(undefined);
        this.id = id;
        this.setId = setId;
        const [peers, setPeers] = createSignal<Peer[]>([]);
        this.peers = peers;
        this.setPeers = setPeers;
        const [pendingPeerId, setPendingPeerId] = createSignal<string | undefined>(undefined);
        this.pendingPeerId = pendingPeerId;
        this.setPendingPeerId = setPendingPeerId;
    }

    public handleId = (id: string) => {
        this.setId(id);
    };

    public handleMatch = (peerId: string) => {
        if (this.status() === ConnectionState.Requested) {
            this.setPeers([...this.peers(), { id: peerId, type: ConnectionType.Sending }]);
            this.requestedPeerId = undefined;
        } else {
            // TODO reject
        }
    };

    public handleRequest = (peerId: string) => {
        if (this.status() === ConnectionState.Ready) {
            this.setPendingPeerId(peerId);
        } else {
            // TODO reject
        }
    };

    public cleanup = () => {
        this.ws.cleanup();
    };

    private send(data: Out<SendableMessage>) {
        console.log(data);
        this.ws.send(data);
    }

    private _status(): ConnectionState {
        if (!this.id() || !this.ws.ready) {
            return ConnectionState.Error;
        } else if (this.requestedPeerId) {
            return ConnectionState.Requested;
        } else if (this.peers().length) {
            return ConnectionState.Connected;
        } else {
            return ConnectionState.Ready;
        }
    }

    public sendRequest = (id: string) => {
        this.requestedPeerId = id;
        this.send(createRequestMessage(id));
    };

    public acceptRequest = () => {
        if (!this.pendingPeerId()) {
            throw new Error('Unexpected State');
        }
        const newPeer: Peer = { id: this.pendingPeerId()!, type: ConnectionType.Listening };
        this.setPeers([...this.peers(), newPeer]);
        this.setPendingPeerId(undefined);
        this.send(createMatchMessage(newPeer.id));
    };
}
