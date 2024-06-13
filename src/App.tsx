import { Show } from 'solid-js';
import './App.css';
import { OptionsGrid } from './components/OptionsGrid';
import { ButtonGrid } from './components/ButtonGrid';
import { createConnection } from './connection/createConnection';
import { ConnectForm } from './components/ConnectForm';
import { TitleBar } from './components/TitleBar';

function App() {
  const { ws, isWSConnected, id, peerId } = createConnection();

  return (
    <div>
      <TitleBar text='Beep - Disconnected' />
      <div class='h-[24px]'></div>
      <div class="blue h-full flex-col justify-center bg-tengrey text-center">
        <div>
          <ConnectForm ws={ws() as WebSocket} />
        </div>
        <ButtonGrid />
        <div class="mr-3 mt-1.5 text-right text-xs opacity-60">
          <span class="select-text">
            Discovery server: {isWSConnected() ? 'Connected' : 'Disconnected'}
          </span>{' '}  
          <br />
          <span>Id: {id()}</span> <br />
          <span>Peer Id: {peerId()}</span>
        </div>
        <Show when={isWSConnected()}>
          <ConnectForm ws={ws() as WebSocket} />
        </Show>
      </div>
    </div>
  );
}

export default App;
