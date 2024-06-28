import { ConnectForm } from '../components/ConnectForm';
import { useConfig } from '../config';
import { useConnection } from '../connection';

export const ConfigTab = () => {
    const { config } = useConfig();
    const { status } = useConnection();

    return (
        <div>
            <div class="mt-2 flex w-full items-center justify-around">
                <ConnectForm/>
                <button class='border pt-1 ml-2 w-1/2 bg-black border-solid border-whitegrey border-width-1'>CONNECT</button>
            </div>
        </div>
    );
};
