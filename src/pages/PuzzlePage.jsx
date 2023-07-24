import PuzzleBoard from "../components/PuzzleBoard/PuzzleBoard"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router"

function PuzzlePage() {
    const [movesPGN, setMovesPGN] = useState("")
    const [positionFEN, setPositionFEN] = useState("")
    const query = useLocation()
    console.log(query)
    const navigate = useNavigate();
    //Read in the current puzzle from the backend. 
    const apiURL = "http://localhost:8080"
    useEffect(() => {
        axios.get(`${apiURL}${query.pathname}${query.search}`).then(response => {
            setMovesPGN(response.data.Moves);
            setPositionFEN(response.data.FEN);
            console.log(response)
        }).catch(response => {
            console.error(response);
        })
    }, [query])
    if (!positionFEN || !movesPGN ) {
        return <>
          Loading...
        </>
      }
    return (
        <>
            <div style={{ width: 500 + "px" }}>
                <PuzzleBoard positionFEN={positionFEN} movesArray={movesPGN.split(' ')} orientation = {positionFEN.indexOf('b') > positionFEN.indexOf('w') ? "white":"black"}  />
            </div>
            <button onClick={() => { navigate(`/puzzle/${Math.ceil(Math.random() * 3e6)}`)}}>New Puzzle</button>
            
        </>
    )
}


export default PuzzlePage