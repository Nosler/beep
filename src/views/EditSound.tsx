import { createEffect, createSignal } from 'solid-js';
import X from '../assets/x.png';
import { useConfig } from '../config';
import { useConnection } from '../connection';
import { open } from '@tauri-apps/api/dialog';
import Logger from 'js-logger';

interface EditSoundProps {
    index: number;
    close: () => void;
}

export const EditSound = (props: EditSoundProps) => {
    const { config, editSound } = useConfig();
    const { updateButtons } = useConnection();

    const isNew = () => {
        return props.index >= config.sounds.length;
    };

    const [soundLabel, setSoundLabel] = createSignal('Beep');
    const [soundFile, setSoundFile] = createSignal<string | undefined>(undefined);

    const [edited, setEdited] = createSignal(false);

    createEffect(() => {
        if (!isNew()) {
            setSoundLabel(config.sounds[props.index].label);
        }
    });

    createEffect(() => {
        if (edited()) {
            props.close();
        }
    });

    const fileText = () => {
        if (soundFile()) {
            return soundFile()!.substring(soundFile()!.lastIndexOf('/') + 1);
        }
        return 'sound';
    };
    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const label = soundLabel() ? soundLabel() : undefined;
        const file = soundFile();
        Logger.debug('Submitting sound', label, file);
        if (!label && !file) return;
        setEdited(await editSound(props.index, { label, file }, updateButtons));
    };

    const openFile = async (e: MouseEvent) => {
        e.preventDefault();
        Logger.info('Opening file dialog');
        const file = await open({
            multiple: false,
            directory: false,
            filters: [{ name: 'audio', extensions: ['mp3', 'wav', 'ogg'] }],
            title: 'Beep?',
        });
        Logger.info('file', file);
        if (file) {
            setSoundFile(file as string);
        }
    };

    const text = () => (isNew() ? 'Adding' : 'Editing') + ` Button ${props.index + 1}`;

    return (
        <div
            id="backdrop"
            class="absolute inset-0 z-10 m-0 size-full backdrop-blur-[2px]"
            onClick={(e) => (e.target.id === 'backdrop' ? props.close() : null)}
        >
            <div class="absolute inset-0 m-auto size-max border border-thirtygrey bg-tengrey p-2">
                <button
                    class="bg-red-500 absolute right-0 top-0 p-1 text-white"
                    onClick={() => props.close()}
                >
                    <img src={X} alt="close" />
                </button>

                <form
                    class="m-6 flex flex-col items-center gap-2 border border-dashed border-thirtygrey p-4"
                    onSubmit={(e) => void onSubmit(e)}
                >
                    <span class="text-xl">{text()}</span>
                    <input
                        type="text"
                        maxLength="10"
                        class="text-l w-32 border border-thirtygrey text-center text-tengrey"
                        value={soundLabel()}
                        onChange={(e) => setSoundLabel(e.target.value)}
                    />
                    <button
                        type="button"
                        value={fileText()}
                        class="bg-white px-2 text-tengrey"
                        onClick={(e) => void openFile(e)}
                    >
                        {fileText()}
                    </button>
                    <button type="submit" class="bg-tengrey px-2 text-white">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};
