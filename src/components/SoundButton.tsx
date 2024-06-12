import './SoundButton.css';
interface SoundButtonProps {
  text: string;
}

export const SoundButton = (props: SoundButtonProps) => {
  return (
    <button
      class="max-h-20vw min-w-20vw active:mt mt-1 min-h-12 active:mt-3"
      type="submit"
    >
      {props.text}
    </button>
  );
};
