import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

let moveIndex = 0;
function PuzzleBoard({ positionFEN, movestrPGN }) {
    const [chess] = useState(new Chess(positionFEN));
    const [, setPosition] = useState(chess.fen());
    const delayInMillis = 500;

    const moveNumberOrGameResult = /(\d\.|[01]-[01])+/;
    //Convert the move string to a move array and gut the headers. 
    let movesArray = movestrPGN.split(' ').filter((element) => !element.match(moveNumberOrGameResult));
    const onDrop = (sourceSquare, targetSquare) => {
        let moveAlgebraic = convertObjectToAlgebraic(sourceSquare, targetSquare);
        if (isCorrectMove(moveAlgebraic)) {
            updatePuzzle(moveAlgebraic)
            if (!isEndofPuzzle()) {
                setTimeout(() => {
                    updatePuzzle(movesArray[moveIndex])
                }, delayInMillis)
            }
        }
    }
    const convertObjectToAlgebraic = (sourceSquare, targetSquare) => {
        return `${chess.get(sourceSquare).type.toUpperCase()}${!!chess.get(targetSquare).type ? 'x' : ''}${targetSquare}`;
    }
    const isCorrectMove = (moveAlgebraic) => {
        const specialPGNCharacters = /([#+])+/;
        const noCharacter = '';
        return moveAlgebraic === movesArray[moveIndex].replace(specialPGNCharacters, noCharacter)
    }
    const isEndofPuzzle = () => {
        return moveIndex >= movesArray.length;
    }
    const updatePuzzle = (moveAlgebraic) => {
        chess.move(moveAlgebraic);
        moveIndex += 1;
        setPosition(chess.fen());
    }
    return (
        <>
            <Chessboard position={chess.fen()} onPieceDrop={onDrop} />
            {moveIndex >= movesArray.length && <p>You Win!</p>}
        </>
    )
}

export default PuzzleBoard;