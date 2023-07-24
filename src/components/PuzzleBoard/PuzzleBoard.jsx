import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

//Because of state scheduling I don't think this can be part of state. 
let moveIndex = 0;
function PuzzleBoard({ positionFEN, movestrPGN }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    //If we don't update the state variables through useEffect they won't actually change. 
    useEffect(() => {
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        moveIndex = 0;
    }, [positionFEN])
    console.log(movestrPGN)
    const delayInMillis = 500
    const moveNumberOrGameResult = /(\d\.{1,3}|[01]-[01]|\*)+/
    //Convert the move string to a move array and gut the headers. 
    let movesArray = movestrPGN.split(' ').map((element) => element.replace(moveNumberOrGameResult, ''))
    //Remove blank moves. 
    movesArray = movesArray.filter((element) => !!element)
    const onDrop = (sourceSquare, targetSquare) => {
        let move = `${sourceSquare}${targetSquare}`
        if (isCorrectMove(move)) {
            updatePuzzle(move)
            if (!isEndofPuzzle()) {
                setTimeout(() => {
                   updatePuzzle(movesArray[moveIndex])
                }, delayInMillis)
            }
        }
    }
    const isCorrectMove = (move) => {
        const specialPGNCharacters = /([#+])+/
        const noCharacter = ''
        return move === movesArray[moveIndex].replace(specialPGNCharacters, noCharacter)
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length
    }
    const updatePuzzle = (move) => {
            moveLogic.move(move)
            moveIndex += 1;
            setMoveLogic(new Chess(moveLogic.fen()))
    }
    return (
        <>
            <Chessboard position={moveLogic.fen()} onPieceDrop={onDrop}  />
            {moveIndex >= movesArray.length && <p>You Win!</p>}
            <button onClick={() => { }}>Hint</button>
        </>
    )
}

export default PuzzleBoard