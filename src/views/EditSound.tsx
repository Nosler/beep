import { createEffect, createSignal } from 'solid-js';
import { useConfig } from '../config';
import { useConnection } from '../connection';
import { open } from '@tauri-apps/api/dialog';
import Logger from 'js-logger';

interface EditSoundProps {
    index: number;
    close: () => void;
}

export const EditSound = (props: EditSoundProps) => {
    const { config, editSound, deleteSound } = useConfig();
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
        return 'Select Audio';
    };
    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const label = soundLabel() || undefined;
        const file = soundFile();
        if (!label && !file) return;
        Logger.debug('Submitting sound', label, file);
        setEdited(await editSound(props.index, { label, file }, updateButtons));
    };

    const onDelete = (e: Event) => {
        e.preventDefault();
        Logger.debug('Deleting sound', soundLabel());
        deleteSound(props.index, updateButtons);
        setEdited(true);
    };

    const openFile = async (e: MouseEvent) => {
        e.preventDefault();
        Logger.info('Opening file dialog');
        const file = await open({
            multiple: false,
            directory: false,
            filters: [{ name: 'audio', extensions: ['mp3', 'wav', 'ogg', 'flac'] }],
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
            class="m-full opacity-m absolute inset-0 z-10 backdrop-blur-lg"
            onClick={(e) => (e.target.id === 'backdrop' ? props.close() : null)}
        >
            <div class="absolute inset-0 m-auto size-max border border-thirtygrey bg-tengrey p-4">
                <form
                    class="w-vw flex flex-col items-center gap-3 p-2"
                    onSubmit={(e) => void onSubmit(e)}
                >
                    <div class="flex w-full gap-2">
                        <div class="h-12 w-3 bg-cyan"></div>
                        <input
                            type="text"
                            maxLength="15"
                            class="h-12 w-32 border border-cyan bg-black text-center text-cyan"
                            value={soundLabel()}
                            onChange={(e) => setSoundLabel(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        value={fileText()}
                        class="text-fourtygrey w-full border border-dashed bg-black px-2"
                        onClick={(e) => void openFile(e)}
                    >
                        {fileText()}
                    </button>
                    <div class="flex gap-4 pt-2">
                        <button
                            class="size-full border border-thirtygrey bg-tengrey px-2 text-lg text-thirtygrey"
                            onClick={() => props.close()}
                        >
                            B
                        </button>

                        <button
                            type="button"
                            class="size-full border border-thirtygrey bg-tengrey px-2 text-lg text-thirtygrey"
                            onClick={onDelete}
                        >
                            D
                        </button>

                        <button
                            type="submit"
                            class="size-full border border-thirtygrey bg-tengrey px-2 text-lg text-thirtygrey"
                        >
                            S
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
