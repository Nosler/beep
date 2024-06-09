import { createSignal } from 'solid-js';
import logo from './assets/logo.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
  const [greetMsg, setGreetMsg] = createSignal('');
  const [name, setName] = createSignal('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('fuck', { name: name() }));
  }

  return (
    <div class="container">
      <div class='grid grid-rows-3'>
        <div class="row button-row align-baseline">
          <button id='sound-button' type="submit">1</button>
          <button id='sound-button' type="submit">2</button>
          <button id='sound-button' type="submit">3</button>
          <button id='sound-button' type="submit">4</button>
        </div>
      </div>
    </div>
  );
}

export default App;