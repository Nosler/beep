import { useContext } from 'solid-js';
import { connectionContext } from './connectionContext';

export const useConnection = () => {
    const connection = useContext(connectionContext);
    if (!connection) {
        throw new Error('Could not instantiate connection context');
    }

    return connection;
};
