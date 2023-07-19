import './App.css'
import PuzzleBoard from './components/PuzzleBoard/PuzzleBoard'
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const [movesPGN, setMovesPGN] = useState("1. Qa5 Kxc1+ 2. Qe1# 1-0")
  const [positionFEN, setPositionFEN] = useState("8/8/8/8/1Q6/1K6/8/2Nk4 w - - 0 1")
  const apiURL = "http://localhost:8080/"
  //Read in the current puzzle from the backend. 
  useEffect(() => {
    axios.get(`${apiURL}1`).then(response => {
      setMovesPGN(response.data.Moves);
      setPositionFEN(response.data.FEN);
    }).catch(response => {
      console.error(response);
    })
  }, [])
  if(!positionFEN || !movesPGN){
    console.log(positionFEN, movesPGN)
    return <>
    Loading...
    </>
  }
  return (
    <>
      <div style={{ width: 500 + "px" }}>
        <PuzzleBoard positionFEN={positionFEN} movestrPGN={movesPGN} />
      </div>
    </>
  )
}

export default App
