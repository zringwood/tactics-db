import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function PuzzleBoard({ positionFEN, movestrPGN }) {
    const [chess, setChess] = useState(new Chess(positionFEN));
    const [moveIndex, setMoveIndex] = useState(0);
    //Convert the move string to a move array. 
    let movesArray = movestrPGN.split(' ');
    //Gut the headers from the array
    movesArray = movesArray.filter((element) => !element.match(/(\d\.|[01]-[01])+/))
    const onDrop = (sourceSquare, targetSquare) => {

        console.log(sourceSquare, chess.get(sourceSquare));
        //Build the algebraic string
        let strInAlgebraic = `${chess.get(sourceSquare).type.toUpperCase()}${!!chess.get(targetSquare).type ? 'x' : ''}${targetSquare}`;
        //The Regex is there to strip out the special characters in the PGN. 
        if (strInAlgebraic === movesArray[moveIndex].replace(/([#+])+/, '')) {
            //TODO: Promotion?
            chess.move(strInAlgebraic);
            setChess(new Chess(chess.fen()));
            if (moveIndex + 1 < movesArray.length) {
                setTimeout(() => {
                    chess.move(movesArray[moveIndex + 1]);
                    setChess(new Chess(chess.fen()));
                }, 500)
            }
            setMoveIndex(moveIndex + 2);
        }
    }
    return (
        <>
            <Chessboard position={chess.fen()} onPieceDrop={onDrop} />
            {moveIndex > movesArray.length && <p>You Win!</p>}
        </>
    )
}

export default PuzzleBoard;