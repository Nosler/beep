import './App.css';
import { OptionsGrid } from './components/OptionsGrid';
import { ButtonGrid } from './components/ButtonGrid';

function App() {
  return (
    <div class="blue h-full bg-tengrey flex-col justify-center text-center">
      <div class='bg-tengrey pt-1 mt-6'>
        <button class="max-h-20vw relative active:top-1">OPTIONS</button>
        <button>STATUS</button></div>
      <ButtonGrid />
      <div class='text-xs mt-1.5 mr-3 text-right opacity-60'></div>
    </div>
  );
}

export default App;
