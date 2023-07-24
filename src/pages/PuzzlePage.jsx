import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"

function PuzzlePage() {
    const [movesPGN, setMovesPGN] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const puzzleID = Number(useParams().id);
    const navigate = useNavigate();
    //Read in the current puzzle from the backend. 
    const apiURL = "http://localhost:8080/"
    useEffect(() => {
        axios.get(`${apiURL}${puzzleID}`).then(response => {
            setMovesPGN(response.data.Moves);
            setPositionFEN(response.data.FEN);
        }).catch(response => {
            console.error(response);
        })
    }, [puzzleID])
    if (!positionFEN || !movesPGN ) {
        return <>
          Loading...
        </>
      }
      console.log(positionFEN.indexOf('b') > positionFEN.indexOf('w'))
    return (
        <>
            <div style={{ width: 500 + "px" }}>
                <PuzzleBoard positionFEN={positionFEN} movesArray={movesPGN.split(' ')} orientation = {positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white":"black"}  />
            </div>
            <button onClick={() => { navigate(`/${puzzleID+1}`)}}>Next Puzzle</button>
            
        </>
    )
}


export default PuzzlePage