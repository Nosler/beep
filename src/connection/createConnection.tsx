import { createEffect, createSignal } from 'solid-js';
import SimplePeer from 'simple-peer';
import {
  WSMessageTypes,
  ZWSMessage,
  ZWSMatchMessage,
  ZWSSignalMessage,
  ZWSIdMessage,
} from './WSMessageTypes';
import { createSignalMessage } from './createWSMessage';

interface handleConnectArgs {
  setPeer: (peer: SimplePeer.Instance) => null;
  ws: WebSocket;
  setIsP2PConnected: (isP2PConnected: boolean) => null;
  initiator: boolean;
  peerId: string;
  id: string;
}

const handleConnect = ({
  setPeer,
  ws,
  setIsP2PConnected,
  initiator,
  peerId,
  id,
}: handleConnectArgs) => {
  const peer = new SimplePeer({ initiator, trickle: true });
  setPeer(peer);
  peer.on('signal', (data) => {
    ws.send(JSON.stringify(createSignalMessage(data, peerId, id)));
  });
  peer.on('connect', () => {
    setIsP2PConnected(true);
    console.log('Peer P2PConnected');
  });
  peer.on('data', (data: string) => {
    console.log('Received data:', data);
  });
};

export const createConnection = () => {
  const [id, setId] = createSignal<string | null>(null);
  const [isP2PConnected, setIsP2PConnected] = createSignal(false);
  const [isWSConnected, setIsWSConnected] = createSignal(false);
  const [peer, setPeer] = createSignal<SimplePeer.Instance | null>(null);
  const [ws, setWs] = createSignal<WebSocket | null>(null);
  const [peerId, setPeerId] = createSignal<string | null>(null);

  createEffect(() => {
    const url = new URL(
      '/connect',
      import.meta.env.VITE_DISCOVERY_SERVER_URL || 'wss://localhost:3000 '
    );
    console.log('Connecting to', url.href);
    const _ws = new WebSocket(url);
    setWs(_ws);

    _ws.onopen = () => {
      console.log('P2PConnected to Discovery server');
      setIsWSConnected(true);
    };

    _ws.onmessage = (event: MessageEvent<string>) => {
      if (!event.data) return;

      const data = ZWSMessage.passthrough().parse(JSON.parse(event.data));
      if (data.type === WSMessageTypes.enum.MATCH) {
        const matchData = ZWSMatchMessage.parse(data);
        setPeerId(matchData.peerId);
        handleConnect({
          setPeer,
          ws: _ws,
          setIsP2PConnected,
          initiator: true,
          peerId: matchData.peerId,
          id: id() as string,
        });
      } else if (data.type === WSMessageTypes.enum.SIGNAL && id()) {
        const signalData = ZWSSignalMessage.parse(data);
        handleConnect({
          setPeer,
          ws: _ws,
          setIsP2PConnected,
          initiator: false,
          peerId: signalData.id,
          id: id() as string,
        });
      } else if (data.type === WSMessageTypes.enum.ID) {
        const idData = ZWSIdMessage.parse(data);
        setId(idData.id);
      }
    };
    _ws.onclose = () => {
      setIsWSConnected(false);
    };

    return () => {
      _ws.close();
    };
  });

  return { ws, id, isP2PConnected, peer, peerId, isWSConnected };
};
