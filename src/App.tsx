import './App.css';
import { ConnectionProvider } from './connection/ConnectionProvider';
import { MainView } from './views/MainView';
import { MainWindow } from './views/MainWindow';

export default function App() {
    return (
        <ConnectionProvider>
            <MainWindow>
                <MainView />
            </MainWindow>
        </ConnectionProvider>
    );
}
