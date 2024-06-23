import './App.css';
import { ConnectionProvider } from './connection';
import { MainView } from './views/MainView';
import { MainWindow } from './views/MainWindow';
import { ConfigProvider } from './config';

export default function App() {
    return (
        <ConfigProvider>
            <ConnectionProvider>
                <MainWindow>
                    <MainView />
                </MainWindow>
            </ConnectionProvider>
        </ConfigProvider>
    );
}
