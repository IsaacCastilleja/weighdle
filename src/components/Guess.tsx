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

function isValueClose(value: number, comparator: number, wiggleRoom: number)
{
    const delta = Math.abs(value - comparator);
    const wiggleValue = comparator * wiggleRoom/100.0;
    return delta <= wiggleValue;
}


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
    }));

    const [guessObjects, setGuessObjects] = useState<GuessObject[]>(defaultGuessObject);

    function checkGuess(inputValue: string) {
        const parsedValue = Number.parseFloat(inputValue);
        const guess: GuessObject = {
            guessText: `${parsedValue} lbs`,
            arrowState: "below",
            colorHint: "far",
        }

        if(isValueClose(parsedValue, answer, 10)){
            guess.colorHint = "correct";
            guess.arrowState = "correct";
        }
        else
        {
            guess.colorHint = isValueClose(parsedValue, answer, 30) ? "close" : "far";
            guess.arrowState = parsedValue > answer ? "above" : "below";
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

        const guess = checkGuess(inputValue);

        setGuessObjects(guessObjects => {
            const updatedItems = [...guessObjects];
            updatedItems[guessCount] = guess;
            return updatedItems;
        });

        if(guess.arrowState === "correct") {
            setInputDisabled(true);
        }

        setInputValue("");
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
                       type={"text"}
                       pattern={"^\\d*(\\.\\d{0,2})?$"}
                       className={styles.GuessInput}
                       inputMode={"decimal"}
                       onChange={e => setInputValue(e.target.value)}
                       value={inputValue}
                       disabled={inputDisabled}
                       required={true}
                />
            </form>

        </>
    );
}

export default Guess;