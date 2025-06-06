import styles from "./Game.module.css";
import {useContext, useState, type ChangeEvent} from "react";
import {AnswerContext} from "../Contexts.ts";
import {PreviousGuess} from "./PreviousGuess.tsx";

interface GuessObject {
    guessText: string;
    arrowState: "correct" | "below" |"above";
    colorHint: "none" | "close" | "far" | "correct";
}

export type { GuessObject as GuessObjectType };

const maxGuesses = 4;

export function Guess() {
    const useGetAnswer = () => useContext(AnswerContext)
    const [guessCount, setGuessCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);
    const answer = useGetAnswer();

    const defaultGuessObject: GuessObject[] = Array.from({ length: 5 }, () => ({
        guessText: "",
        arrowState: "correct",
        colorHint: "none"
    }));    const [guessObjects, setGuessObjects] = useState<GuessObject[]>(defaultGuessObject);

    function checkGuess(inputValue: string) {
        const guess: GuessObject = {
            guessText: inputValue,
            arrowState: "below",
            colorHint: "far",
        }
        return guess;
    }


    function HandleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setGuessCount(guessCount + 1);
        if(guessCount >= maxGuesses)
        {
            setInputDisabled(true);
        }

        setGuessObjects(guessObjects => {
            const updatedItems = [...guessObjects];
            updatedItems[guessCount] = checkGuess(inputValue);
            return updatedItems;
        });
        const inputAnswer = Number.parseFloat(inputValue);
        checkAnswer(inputAnswer);
        setInputValue("");
    }

    function checkAnswer(inputAnswer: number) {
        console.log(inputAnswer, answer);
        if(inputAnswer === answer) {
            setInputDisabled(true);
        }
    }

    return (
        <>
            <div className={styles.GuessesContainer}>
                <PreviousGuess guessObject={guessObjects[0]}/>
                <PreviousGuess guessObject={guessObjects[1]}/>
                <PreviousGuess guessObject={guessObjects[2]}/>
                <PreviousGuess guessObject={guessObjects[3]}/>
                <PreviousGuess guessObject={guessObjects[4]}/>
            </div>

            <form className={styles.GuessesContainer} onSubmit={HandleSubmit}>
                <input placeholder={"Enter a guess... NOW!!!!"}
                       type={"text"} className={styles.GuessInput}
                       onChange={e => setInputValue(e.target.value)}
                       value={inputValue}
                       disabled={inputDisabled}
                />
            </form>

        </>
    );
}

export default Guess;