import { Show } from 'solid-js';
import './App.css';
import { OptionsGrid } from './components/OptionsGrid';
import { ButtonGrid } from './components/ButtonGrid';
import { createConnection } from './connection/createConnection';
import { ConnectForm } from './components/ConnectForm';

function App() {
  const { ws, isWSConnected, id, peerId } = createConnection();

  return (
    <div class="blue h-full bg-tengrey flex-col justify-center text-center">
      <div class='bg-tengrey pt-1 mt-6'>
        <button class="max-h-20vw relative active:top-1">OPTIONS</button>
        <button>STATUS</button></div>
      <ButtonGrid />
      <div class='text-xs mt-1.5 mr-3 text-right opacity-60'></div>
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
