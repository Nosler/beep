import { For } from 'solid-js';
import { SoundButton } from './SoundButton';

export const OptionsGrid = () => (
  <div class="bg-blue grid grid-rows-3">
    <div class="max-h-21vw min-h-14 align-baseline float-bottom">
      <For each={['1', '2', '3', '4']}>
        {(num) => <SoundButton text={num} />}
      </For>
    </div>
  </div>
);
