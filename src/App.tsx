import './App.css';
import { ConnectionProvider } from './connection';
import { MainView } from './views/MainView';
import { MainWindow } from './views/MainWindow';
import { ConfigProvider, useConfig } from './config';

export default function App() {
    return (
        <ConfigProvider>
            <ConnectionProvider config={useConfig().config}>
                <MainWindow>
                    <MainView />
                </MainWindow>
            </ConnectionProvider>
        </ConfigProvider>
    );
}
