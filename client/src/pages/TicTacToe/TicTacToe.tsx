import { useState } from "react";
import { Board } from "./components/Board";
import s from "./TicTacToe.module.scss";
import { Button } from "@chakra-ui/react";

export default function TicTacToe() {
    const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);

    const handlePlay = (nextSquares: string[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove);
    };

    const description = (move: number) => {
        if (move > 0) {
            return "Go to move #" + move;
        }
        return "Go to game start";
    };

    return (
        <div className={s.main}>
            <Board
                xIsNext={currentMove % 2 === 0}
                squares={history[currentMove]}
                onPlay={handlePlay}
            />

            <div className={s.moves_buttons}>
                {history.map((squares, move) => (
                    <Button
                        key={move}
                        size="sm"
                        colorScheme={move === currentMove ? "red" : "blue"}
                        onClick={() => jumpTo(move)}
                    >
                        {description(move)}
                    </Button>
                ))}
            </div>
        </div>
    );
}
