import { DebugInfo } from './DebugInfo';
import { VolumeSlider } from '../components/VolumeSlider';

export const ConfigTab = () => {
    return (
        <div>
            <VolumeSlider />
            <DebugInfo />
        </div>
    );
};
