import { readBinaryFile } from '@tauri-apps/api/fs';
import { Sound } from './config';
import Logger from 'js-logger';

export async function loadSoundBuffer(sound: Pick<Sound, 'buffer' | 'file'>, ctx: AudioContext) {
    Logger.debug('Loading sound buffer:', sound.file.substring(sound.file.lastIndexOf('/')));
    const bufferFile = await readBinaryFile(sound.file);
    const buffer = await ctx.decodeAudioData(bufferFile.buffer);

    const otx = new OfflineAudioContext(2, buffer.length, buffer.sampleRate);
    const offlineSrc = otx.createBufferSource();
    offlineSrc.buffer = buffer;
    offlineSrc.connect(otx.destination);
    offlineSrc.start();
    return await otx.startRendering();
}
