import { JSX, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { defaultConfig } from './defaultConfig';
import { configContext } from './configContext';
import { Config } from './config';
import { loadConfig } from './configIO';

export function ConfigProvider(props: { children: JSX.Element | JSX.Element[] }) {
    const [config, setConfig] = createStore<Config>(defaultConfig);

    createEffect(() => {
        loadConfig().then(
            (config) => {
                setConfig(config);
            },
            () => {
                console.warn('No config found, using default');
            }
        );
    });

    return (
        <configContext.Provider value={{ config, setConfig }}>
            {props.children}
        </configContext.Provider>
    );
}
