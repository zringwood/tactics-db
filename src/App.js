import './App.css';
import PuzzleBoard from './components/PuzzleBoard/PuzzleBoard';

function App() {
  
  const movesPGN = "1. Qa5 Kxc1+ 2. Qe1# 1-0";
  const positionFEN = "8/8/8/8/1Q6/1K6/8/2Nk4 w - - 0 1"
  return (
    <>
      <div style={{ width: 500 + "px" }}>
        <PuzzleBoard positionFEN={positionFEN} movestrPGN={movesPGN} />
      </div>
    </>
  );
}

export default App;
