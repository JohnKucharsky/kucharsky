import { choiceI } from "../MemoryGame.service";
import s from "../MemoryGame.module.scss";

export default function Card({
    card,
    handleChoice,
    flipped,
    disabled,
}: {
    card: choiceI;
    handleChoice: (card: choiceI) => void;
    flipped: boolean;
    disabled: boolean;
}) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };
    return (
        <div className={s.card}>
            <div className={flipped ? s.flipped : ""}>
                <img src={card.src} className={s.front} alt="card front" />
                <img
                    src="/images/cover.png"
                    alt="card back"
                    className={s.back}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}
