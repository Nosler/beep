import { JSX } from 'solid-js';
import { connectionContext } from './connectionContext';
import { createConnection } from './createConnection';

export function ConnectionProvider(props: { children: JSX.Element }) {
    const connection = createConnection();
    return (
        <connectionContext.Provider value={connection}>{props.children}</connectionContext.Provider>
    );
}
