import { ButtonGrid } from '../components/ButtonGrid';
import { ConnectForm } from '../components/ConnectForm';
import { useConnection } from '../connection';

export const MainView = () => {
    const { id, isWSConnected, peerId } = useConnection();
    return (
        <div class="blue h-full flex-col justify-center bg-tengrey text-center">
            <div>
                <ConnectForm />
            </div>
            <ButtonGrid />
            <div class="mr-3 mt-1.5 text-right text-xs opacity-60">
                <span class="select-text">
                    Discovery server: {isWSConnected() ? 'Connected' : 'Disconnected'}
                </span>
                <br />
                <span>Id: {id()}</span> <br />
                <span>Peer Id: {peerId()}</span>
            </div>
        </div>
    );
};
