import { Show } from 'solid-js';
import './App.css';
import { ButtonGrid } from './components/ButtonGrid';
import { createConnection } from './connection/createConnection';
import { ConnectForm } from './components/ConnectForm';

function App() {
  const { ws, isWSConnected, id, peerId } = createConnection();

  return (
    <div class="h-screen flex-col justify-center text-center">
      <ButtonGrid />
      <h1>
        Discovery server: {isWSConnected() ? 'Connected' : 'Disconnected'}
      </h1>
      <h1>Id: {id()}</h1>
      <h1>Peer Id: {peerId()}</h1>
      <Show when={isWSConnected()}>
        <ConnectForm ws={ws() as WebSocket} />
      </Show>
    </div>
  );
}

export default App;
