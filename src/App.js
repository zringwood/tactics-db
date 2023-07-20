import './App.css'
import PuzzleBoard from './components/PuzzleBoard/PuzzleBoard'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [movesPGN, setMovesPGN] = useState("")
  const [positionFEN, setPositionFEN] = useState("")
  const [puzzleID, setPuzzleID] = useState(2);
  const [solver, setSolver] = useState("");
  //Read in the current puzzle from the backend. 
  const apiURL = "http://localhost:8080/"
  useEffect(() => {
    axios.get(`${apiURL}${puzzleID}`).then(response => {
      setMovesPGN(response.data.Moves);
      setPositionFEN(response.data.FEN);
      setSolver(response.data.solver);
      console.log(response);
    }).catch(response => {
      console.error(response);
    })
  },[puzzleID])
  if(!positionFEN || !movesPGN){
    return <>
    Loading...
    </>
  }
  return (
    <>
      <div style={{ width: 500 + "px" }}>
        <PuzzleBoard positionFEN={positionFEN} movestrPGN={movesPGN} puzzleID={puzzleID} solver={solver}/>
      </div>
      <button onClick = {() => {setPuzzleID((puzzleID+1)%10)}}>Next Puzzle</button>
    </>
  )
}

export default App
