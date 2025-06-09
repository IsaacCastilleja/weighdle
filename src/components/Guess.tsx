import styles from "./Game.module.css";
import {useState, type ChangeEvent, type CompositionEvent} from "react";
import {PreviousGuess} from "./PreviousGuess.tsx";
import { type Units } from "./Game.tsx";

interface GuessObject {
    guessText: string;
    arrowState: "none" | "below" |"above" | "correct";
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


export function Guess(props: {answer: Record<string, number>, onUnitsChanged: (unit: Units) => void, onGameOver: (playerWon: boolean) => void}) {
    const [guessCount, setGuessCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);
    const [inputUnit, setInputUnit] = useState<Units>("lbs");
    const answer = props.answer;

    const defaultGuessObject: GuessObject[] = Array.from({ length: 5 }, () => ({
        guessText: "",
        arrowState: "none",
        colorHint: "none"
    }));

    const [guessObjects, setGuessObjects] = useState<GuessObject[]>(defaultGuessObject);

    function checkGuess(inputValue: string) {
        const parsedValue = Number.parseFloat(inputValue);
        const guess: GuessObject = {
            guessText: `${parsedValue} ${inputUnit}`,
            arrowState: "below",
            colorHint: "far",
        }

        if(isValueClose(parsedValue, answer[inputUnit], 10)){
            guess.colorHint = "correct";
            guess.arrowState = "correct";
        }
        else
        {
            guess.colorHint = isValueClose(parsedValue, answer[inputUnit], 30) ? "close" : "far";
            guess.arrowState = parsedValue > answer[inputUnit] ? "above" : "below";
        }

        return guess;
    }


    function HandleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setGuessCount(guessCount + 1);

        const guess = checkGuess(inputValue);

        setGuessObjects(guessObjects => {
            const updatedItems = [...guessObjects];
            updatedItems[guessCount] = guess;
            return updatedItems;
        });

        setInputValue("");

        if(guess.arrowState === "correct") {
            setInputDisabled(true);
            props.onGameOver(true);
        }
        else if(guessCount >= maxGuesses)
        {
            setInputDisabled(true);
            props.onGameOver(false);
        }
    }

    function HandleInput(e: CompositionEvent<HTMLInputElement>)
    {
        if(e.data !== "." && !Number.isFinite(Number(e.data)))
        {
            e.preventDefault();
        }

    }

    function HandleInputUnitsChanged(e: ChangeEvent<HTMLSelectElement>)
    {
        const unit = e.currentTarget.value as Units;
        setInputUnit(unit);
        props.onUnitsChanged(unit);
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
            <div className={styles.GuessInputContainer}>
                {/*@ts-expect-error Stack overflow gave me that working type for HandleInput and I cant find a different one*/}
                <form className={styles.GuessInputForm} onSubmit={HandleSubmit} onBeforeInput={HandleInput}>
                    <input placeholder={"Enter a guess... NOW!!!!"}
                           type={"text"}
                           pattern={"^\\d*(\\.\\d{0,})?$"} // Only allow numbers
                           className={styles.GuessInput}
                           inputMode={"decimal"}
                           onChange={e => setInputValue(e.target.value)}
                           value={inputValue}
                           disabled={inputDisabled}
                           required={true}
                    />
                </form>
                <div className={styles.UnitSelectContainer}>
                    <select className={styles.UnitSelect} name={"units"} onChange={HandleInputUnitsChanged}>
                        <option value={"lbs"}>lbs</option>
                        <option value={"oz"}>oz</option>
                        <option value={"kg"}>kg</option>
                        <option value={"g"}>g</option>
                    </select>
                </div>

            </div>


        </>
    );
}

export default Guess;