import { useContext } from 'solid-js';
import { configContext } from './configContext';

export const useConfig = () => {
    const config = useContext(configContext);
    if (!config) {
        throw new Error('Could not instantiate config context');
    }

    return config;
};
