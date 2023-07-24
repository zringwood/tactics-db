import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import "../pages/PuzzlePage.scss"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router"

function PuzzlePage({ category, categoryRange }) {
    const [movesPGN, setMovesPGN] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const puzzleID = useParams().id
    const navigate = useNavigate();
    //Read in the current puzzle from the backend. 
    const apiURL = `http://localhost:8080${category}/${puzzleID}`
    console.log(apiURL)
    useEffect(() => {
        axios.get(apiURL).then(response => {
            setMovesPGN(response.data.Moves);
            setPositionFEN(response.data.FEN);
        }).catch(response => {
            console.error(response);
        })
    }, [apiURL])
    if (!positionFEN || !movesPGN) {
        return <>
            Loading...
        </>
    }
    return (
        <>
        <div className="board-container">
            <PuzzleBoard positionFEN={positionFEN} movesArray={movesPGN.split(' ')} orientation={positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white" : "black"} />
        </div>
        <div className="navpanel">
        <button className="navbutton navbutton--backward"></button>
        <button className="navbutton navbutton--forward" onClick={() => { navigate(`${category}/${Math.ceil(Math.random() * categoryRange)}`) }}></button>
        </div>
        </>
    )
}


export default PuzzlePage