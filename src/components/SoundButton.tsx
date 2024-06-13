import './SoundButton.css';

interface SoundButtonProps {
  text: string;
}

export const SoundButton = (props: SoundButtonProps) => {
  return (
    <button
      class="max-h-20vw min-w-20vw min-h-12 relative active:top-2"
      type="submit"
    >
      {props.text}
    </button>
  );
};
