import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

//This doesn't work with state because setState is asynchronous.  
let moveIndex = 0;
function PuzzleBoard({ positionFEN, movesArray }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))

    //If we don't update the state variables through useEffect they won't actually change. 
    useEffect(() => {
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        moveIndex = 0;
    }, [positionFEN])
    console.log(movesArray)


    const onDrop = (sourceSquare, targetSquare) => {
        let move = `${sourceSquare}${targetSquare}`
        if (isCorrectMove(move)) {
            updatePuzzle(move)
            if (!isEndofPuzzle()) {
                const halfSecond = 500
                setTimeout(() => {
                    updatePuzzle(movesArray[moveIndex])
                }, halfSecond)
            }
        }
    }
    const isCorrectMove = (move) => {
        return move === movesArray[moveIndex]
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length
    }
    const updatePuzzle = (move) => {
        moveLogic.move(move)
        moveIndex += 1;
        setMoveLogic(new Chess(moveLogic.fen()))
    }
    if (moveIndex === 0)
        {setTimeout(() => {
            updatePuzzle(movesArray[0])
        }, 500)}
    return (
        <>
            <Chessboard position={moveLogic.fen()} onPieceDrop={onDrop} />
            {moveIndex >= movesArray.length && <p>You Win!</p>}
            <button onClick={() => { }}>Hint</button>
        </>
    )
}

export default PuzzleBoard