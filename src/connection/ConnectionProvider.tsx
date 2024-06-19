import { JSX } from 'solid-js';
import { connectionContext } from './connectionContext';
import { Connection } from './connection';

export function ConnectionProvider(props: { children: JSX.Element }) {
    const connection = new Connection();
    return (
        <connectionContext.Provider value={connection}>{props.children}</connectionContext.Provider>
    );
}
