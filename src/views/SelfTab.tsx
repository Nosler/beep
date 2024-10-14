import { createSignal } from 'solid-js';
import { ButtonGrid } from '../components/ButtonGrid';
import { useConfig } from '../config';
import { Toggle } from '../components/Toggle';
import { Spacer } from '../components/Spacer';

export const SelfTab = () => {
    const { config } = useConfig();
    const [editMode, setEditMode] = createSignal(false);

    return (
        <div>
            <Spacer y="2" />
            <Toggle value={editMode} onToggle={setEditMode} />
            <ButtonGrid buttons={config.sounds} edit={editMode} />
        </div>
    );
};
