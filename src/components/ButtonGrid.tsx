import { For } from 'solid-js';
import { SoundButton } from './SoundButton';

export const ButtonGrid = () => (
  <div class="bg-grossmagenta grid grid-rows-1">
    <div class="align-baseline">
      <For each={['1', '2', '3', '4', '5', '6', '7', '8']}>
        {(num) => <SoundButton text={num} />}
      </For>
    </div>
  </div>
);
