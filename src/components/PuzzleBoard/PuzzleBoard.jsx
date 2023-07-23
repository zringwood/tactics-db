import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"

//Known bug, for whatever reason this just doesn't work with state. 
let moveIndex = 0;
function PuzzleBoard({ positionFEN, movestrPGN, solver }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    //We updated the state variables using useEffect so that they actually change on load
    useEffect(() => {
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
       moveIndex = 0
    }, [positionFEN])
    const delayInMillis = 500
    const moveNumberOrGameResult = /(\d\.{1,3}|[01]-[01]|\*)+/
    //Convert the move string to a move array and gut the headers. 
    let movesArray = movestrPGN.split(' ').map((element) => element.replace(moveNumberOrGameResult, ''))
    //Remove blank moves. 
    movesArray = movesArray.filter((element) => !!element)
    const onDrop = (sourceSquare, targetSquare) => {
        let moveAlgebraic = convertObjectToAlgebraic(sourceSquare, targetSquare)

        if (isCorrectMove(moveAlgebraic)) {
            updatePuzzle(moveAlgebraic)
        }
        if (!isEndofPuzzle()) {
            setTimeout(() => {
                updatePuzzle(movesArray[moveIndex])
            }, delayInMillis)
        }
    }
    const convertObjectToAlgebraic = (sourceSquare, targetSquare) => {
        return `${moveLogic.get(sourceSquare).type.toUpperCase()}${!!moveLogic.get(targetSquare).type ? 'x' : ''}${targetSquare}`
    }
    const isCorrectMove = (moveAlgebraic) => {
        const specialPGNCharacters = /([#+])+/
        const noCharacter = ''
        return moveAlgebraic === movesArray[moveIndex].replace(specialPGNCharacters, noCharacter)
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length
    }
    const updatePuzzle = (moveAlgebraic) => {
        moveLogic.move(moveAlgebraic)
        setMoveLogic(new Chess(moveLogic.fen()))
        moveIndex +=1;
    }
    //In the event that the solver is different from the first move, we need to animate the first move. 
    if (solver.charAt(0).toLowerCase() !== moveLogic.turn()) {
        setTimeout(() => {
            //This check is necessary because setTimeout is an asyncronous function. 
            //Without this check, setTimeout can call this function after moveIndex has already incremented to 1.  
            if (moveIndex === 0) {
                updatePuzzle(movesArray[moveIndex])
            }
        }, delayInMillis*2)

    }
    return (
        <>
            <Chessboard position={moveLogic.fen()} onPieceDrop={onDrop} boardOrientation={solver.toLowerCase()} />
            {moveIndex >= movesArray.length && <p>You Win!</p>}
        </>
    )
}

export default PuzzleBoard