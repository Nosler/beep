import { readBinaryFile } from '@tauri-apps/api/fs';
import { Sound } from './config';

export async function loadSoundBuffer(sound: Pick<Sound, 'buffer' | 'file'>, ctx: AudioContext) {
    const bufferFile = await readBinaryFile(sound.file);

    const buffer = await ctx.decodeAudioData(bufferFile.buffer);
    return buffer;
}
