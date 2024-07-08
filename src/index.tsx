/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import App from './App';
import Logger from 'js-logger';

Logger.useDefaults();
Logger.setLevel(import.meta.env.VITE_DEBUG_LEVEL === 'debug' ? Logger.DEBUG : Logger.ERROR);

render(() => <App />, document.getElementById('root') as HTMLElement);
