import { calculateWinner } from "../TicTacToe.service";
import s from "../TicTacToe.module.scss";
import { Button } from "@chakra-ui/react";

export function Board({
    xIsNext,
    squares,
    onPlay,
}: {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[]) => void;
}) {
    const handleClick = (i: number) => {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = [...squares];
        const getOIndex = (nextSquares: (string | null)[]) => {
            const numbers: number[] = [];
            nextSquares.forEach((val, index) => {
                if (!val) {
                    numbers.push(index);
                }
            });

            return numbers[Math.floor(Math.random() * numbers.length)];
        };

        nextSquares[i] = "X";
        onPlay(nextSquares);
        nextSquares[getOIndex(nextSquares)] = "O";
        onPlay(nextSquares);
    };

    const getBorders = (i: number) => {
        if (i === 2 || i === 5) {
            return s.border_bottom;
        }
        if (i === 6 || i === 7) {
            return s.border_right;
        }
        if (i === 8) return;
        return `${s.border_bottom} ${s.border_right}`;
    };

    return (
        <div className={s.game}>
            <div className={s.winner}>
                {calculateWinner(squares)
                    ? "Winner: " + calculateWinner(squares)
                    : "Next player: " + (xIsNext ? "X" : "O")}
            </div>
            <div className={s.board}>
                {Array(9)
                    .fill(null)
                    .map((_, i) => (
                        <Button
                            key={i}
                            className={`${getBorders(i)} ${
                                squares[i] === "X" ? s.text_x : s.text_o
                            }`}
                            onClick={() => handleClick(i)}
                            size="lg"
                        >
                            {squares[i]}
                        </Button>
                    ))}
            </div>
        </div>
    );
}
