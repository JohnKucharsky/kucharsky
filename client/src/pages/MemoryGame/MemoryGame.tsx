import { useEffect, useState } from "react";
import { cardImages, choiceI } from "./MemoryGame.service";
import Card from "./components/Card";
import s from "./MemoryGame.module.scss";
import { useTranslation } from "react-i18next";

export default function MemoryGame() {
    const [cards, setCards] = useState<choiceI[]>([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState<choiceI | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<choiceI | null>(null);
    const [disabled, setDisabled] = useState(false);

    const { t } = useTranslation("translation");

    const shuffleCards = () => {
        const shuffle = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffle);
        setTurns(0);
    };

    const handleChoice = (card: choiceI) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        shuffleCards();
    }, []);

    const resetTurn = (): void => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    return (
        <div className={s.main}>
            <div className={s.wrapper}>
                <h1>{t("magicMatch")}</h1>
                <button className={s.new_game_button} onClick={shuffleCards}>
                    {t("newGame")}
                </button>
                <p>
                    {t("turns")}: {turns}
                </p>
                <div className={s.card_grid}>
                    {cards.map((card: choiceI) => (
                        <Card
                            card={card}
                            key={card.id}
                            handleChoice={handleChoice}
                            flipped={
                                card === choiceOne ||
                                card === choiceTwo ||
                                card.matched
                            }
                            disabled={disabled}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
