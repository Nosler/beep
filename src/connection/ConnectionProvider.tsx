import { JSX } from 'solid-js';
import { connectionContext } from './connectionContext';
import { Connection } from './connection';
import { useConfig } from '../config';

export function ConnectionProvider(props: { children: JSX.Element }) {
    const { playSound } = useConfig();
    const connection = new Connection(playSound);
    return (
        <connectionContext.Provider value={connection}>{props.children}</connectionContext.Provider>
    );
}
