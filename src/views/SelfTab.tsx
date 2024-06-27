import { ButtonGrid } from '../components/ButtonGrid';
import { useConfig } from '../config';

export const SelfTab = () => {
    const { config } = useConfig();

    return (
        <div>
            <ButtonGrid
                buttons={[
                    config.sounds[0],
                    config.sounds[0],
                    config.sounds[0],
                    config.sounds[0],
                    config.sounds[0],
                    config.sounds[0],
                ]}
            />
        </div>
    );
};
