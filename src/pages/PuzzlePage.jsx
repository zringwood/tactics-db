import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"

function PuzzlePage() {
    const [movesPGN, setMovesPGN] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const puzzleID = Number(useParams().id);
    //This does need to be defined here. React sometimes interprets one click as two with the next page button.
    const nextPuzzle = puzzleID+1;
    const [solver, setSolver] = useState("");
    const navigate = useNavigate();
    //Read in the current puzzle from the backend. 
    const apiURL = "http://localhost:8080/"
    useEffect(() => {
        axios.get(`${apiURL}${puzzleID}`).then(response => {
            setMovesPGN(response.data.Moves);
            setPositionFEN(response.data.FEN);
            setSolver(response.data.solver);
        }).catch(response => {
            console.error(response);
        })
    }, [puzzleID])
    console.log(positionFEN)
    if (!positionFEN || !movesPGN || !solver) {
        return <>
          Loading...
        </>
      }
    return (
        <>
            <div style={{ width: 500 + "px" }}>
                <PuzzleBoard positionFEN={positionFEN} movestrPGN={movesPGN} solver={solver} id={puzzleID} />
            </div>
            <button onClick={() => { navigate(`/${(nextPuzzle % 7)}`)}}>Next Puzzle</button>
        </>
    )
}


export default PuzzlePage