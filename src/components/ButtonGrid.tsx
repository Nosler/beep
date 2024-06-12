import { For } from 'solid-js';
import { SoundButton } from './SoundButton';

export const ButtonGrid = () => (
  <div class="grid grid-rows-3">
    <div class="bg-pink max-h-21vw min-h-14 align-baseline">
      <For each={['1', '2', '3', '4']}>
        {(num) => <SoundButton text={num} />}
      </For>
    </div>
  </div>
);
