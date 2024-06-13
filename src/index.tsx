/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import App from './App';
import { appWindow } from '@tauri-apps/api/window';

render(() => <App />, document.getElementById('root') as HTMLElement);

document
  .getElementById('titlebar-minimize')
  ?.addEventListener('click', () => void appWindow.minimize());
document
  .getElementById('titlebar-maximize')
  ?.addEventListener('click', () => void appWindow.toggleMaximize());
document
  .getElementById('titlebar-close')
  ?.addEventListener('click', () => void appWindow.close());
