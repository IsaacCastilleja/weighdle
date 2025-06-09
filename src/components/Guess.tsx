import styles from "./Game.module.css";
import {useState, type ChangeEvent, type CompositionEvent} from "react";
import {PreviousGuess} from "./PreviousGuess.tsx";

interface GuessObject {
    guessText: string;
    arrowState: "none" | "below" |"above" | "correct";
    colorHint: "none" | "close" | "far" | "correct";
}

type InputUnit = "lbs" | "oz" | "kg" | "g";

export type { GuessObject as GuessObjectType };

const maxGuesses = 4;

function isValueClose(value: number, comparator: number, wiggleRoom: number)
{
    const delta = Math.abs(value - comparator);
    const wiggleValue = comparator * wiggleRoom/100.0;
    return delta <= wiggleValue;
}

function convertUnitToLbs(value: number, unit: InputUnit)
{
    switch (unit){
        case "lbs":
            return value;
        case "oz":
            return value / 16;
        case "kg":
            return value * 2.2046;
        case "g":
            return value * 2.2046 / 1000;
    }
}


export function Guess(props: {answer: number}) {
    const [guessCount, setGuessCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [inputDisabled, setInputDisabled] = useState(false);
    const [inputUnit, setInputUnit] = useState<InputUnit>("lbs");
    const answer = props.answer;

    const defaultGuessObject: GuessObject[] = Array.from({ length: 5 }, () => ({
        guessText: "",
        arrowState: "none",
        colorHint: "none"
    }));

    const [guessObjects, setGuessObjects] = useState<GuessObject[]>(defaultGuessObject);

    function checkGuess(inputValue: string) {
        const parsedValue = Number.parseFloat(inputValue);
        const convertedValue = convertUnitToLbs(parsedValue, inputUnit);
        const guess: GuessObject = {
            guessText: `${parsedValue} ${inputUnit}`,
            arrowState: "below",
            colorHint: "far",
        }

        if(isValueClose(convertedValue, answer, 10)){
            guess.colorHint = "correct";
            guess.arrowState = "correct";
        }
        else
        {
            guess.colorHint = isValueClose(convertedValue, answer, 30) ? "close" : "far";
            guess.arrowState = convertedValue > answer ? "above" : "below";
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

    function HandleInput(e: CompositionEvent<HTMLInputElement>)
    {
        if(e.data !== "." && !Number.isFinite(Number(e.data)))
        {
            e.preventDefault();
        }

    }

    function HandleInputUnitsChanged(e: ChangeEvent<HTMLSelectElement>)
    {
        const unit = e.currentTarget.value as InputUnit;
        setInputUnit(unit);
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