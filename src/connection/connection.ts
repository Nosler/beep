import { Accessor, Setter, createSignal } from 'solid-js';
import { ConnectionWS } from './connectionWS';
import { Out, SendableMessage } from './messages/messageValidators';
import { ConnectionState, ConnectionType, Listener, Peer } from './connectionState';
import { createClickMessage, createMatchMessage, createRequestMessage } from './messages';
import Logger from 'js-logger';

export class Connection {
    private ws: ConnectionWS;
    public id: Accessor<string | undefined>;
    private setId: Setter<string | undefined>;
    public peers: Accessor<Peer[]>;
    private setPeers: Setter<Peer[]>;
    public pendingPeerId: Accessor<string | undefined>;
    private setPendingPeerId: Setter<string | undefined>;
    public requestedPeerId?: string;
    public status: Accessor<ConnectionState> = () => this._status();
    private playSound: (index: number) => void;

    constructor(playSound: (index: number) => void) {
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
        this.playSound = playSound;
        Logger.debug('Connection created.');
    }

    public handleId = (id: string) => {
        this.setId(id);
    };

    private getPeer = (id: string): Peer | undefined => {
        for (const peer of this.peers()) {
            if (peer.id === id) {
                return peer;
            }
        }
    };

    public handleMatch = (peerId: string, buttons: string[]) => {
        if (this.status() === ConnectionState.Requested) {
            const newPeer: Listener = {
                id: peerId,
                type: ConnectionType.Listening,
                sounds: buttons.map((i) => ({ label: i })),
            };
            this.setPeers([...this.peers(), newPeer]);
            this.requestedPeerId = undefined;
        } else {
            // update buttons
            const peer = this.getPeer(peerId);
            if (peer && peer.type === ConnectionType.Listening) {
                (peer as Listener).sounds = buttons.map((i) => ({ label: i }));
            }
        }
    };

    public handleInvalidToken = () => {};

    public handleRequest = (peerId: string) => {
        if (this.status() === ConnectionState.Ready) {
            this.setPendingPeerId(peerId);
        } else {
            // TODO reject request automatically
        }
    };

    public handleClick = (index: number) => {
        this.playSound(index);
    };

    public cleanup = () => {
        this.ws.cleanup();
    };

    private send(data: Out<SendableMessage>) {
        Logger.debug('Sending ', data);
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

    public acceptRequest = (buttons: string[]) => {
        if (!this.pendingPeerId()) {
            throw new Error('Unexpected State');
        }
        const newPeer: Peer = { id: this.pendingPeerId()!, type: ConnectionType.Sending };
        this.setPeers([...this.peers(), newPeer]);
        this.setPendingPeerId(undefined);
        this.send(createMatchMessage(newPeer.id, buttons));
    };

    public denyRequest = () => {
        if (!this.pendingPeerId()) {
            throw new Error('Unexpected State');
        }
        // TODO send deny message
        this.setPendingPeerId(undefined);
    };

    public click = (peerId: string, button: number) => {
        this.send(createClickMessage(peerId, button));
    };

    public updateButtons = (buttons: string[]) => {
        this.peers()
            .filter((p) => p.type === ConnectionType.Sending)
            .forEach((peer) => {
                this.ws.send(createMatchMessage(peer.id, buttons));
            });
    };
}
