import { JSX } from 'solid-js';
import { connectionContext } from './connectionContext';
import { Connection } from './connection';
import { useConfig } from '../config';

export function ConnectionProvider(props: { children: JSX.Element }) {
    const { playSound, config, setToken } = useConfig();
    const connection = new Connection(playSound, setToken, config.token);
    return (
        <connectionContext.Provider value={connection}>{props.children}</connectionContext.Provider>
    );
}
