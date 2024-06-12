import './SoundButton.css';

interface SoundButtonProps {
  text: string;
}

export const SoundButton = (props: SoundButtonProps) => {
  return (
    <button class="clicky max-h-20vw min-w-20vw mt-1 min-h-12" type="submit">
      {props.text}
    </button>
  );
};
