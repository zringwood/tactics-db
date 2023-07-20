import { useState, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"


function PuzzleBoard({ positionFEN, movestrPGN, solver }) {
    const [moveLogic, setMoveLogic] = useState(new Chess(positionFEN))
    const [, setPosition] = useState(positionFEN)
    const [moveIndex, setMoveIndex] = useState(0)
    //We updated the state variables using usEffect so that they actually change on load
    useEffect(() => {
        setPosition(positionFEN);
        setMoveLogic(new Chess(positionFEN));
        //moveIndex must be reset when the puzzle resets.
        setMoveIndex(0);
    }, [positionFEN])
    const delayInMillis = 500
    const moveNumberOrGameResult = /(\d\.{1,3}|[01]-[01]|\*)+/
    //Convert the move string to a move array and gut the headers. 
    let movesArray = movestrPGN.split(' ').map((element) => element.replace(moveNumberOrGameResult, ''))
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
        setMoveIndex(moveIndex + 1)
        setPosition(moveLogic.fen())
    }
    //In some cases, the first move of the move array is the opponent's move rather than the players. 
    //In this case we need to update the board immediately.
    if(moveLogic.turn() !== solver.charAt(0).toLowerCase() && (movesArray[0].search("...") > -1 && solver === "White")){
        //First move is for black but the solver is white. 
        updatePuzzle(movesArray[moveIndex])
    }

    return (
        <>
            <Chessboard position={moveLogic.fen()} onPieceDrop={onDrop} boardOrientation={solver.toLowerCase()}/>
            {moveIndex >= movesArray.length && <p>You Win!</p>}
        </>
    )
}

export default PuzzleBoard