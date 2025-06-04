import styles from "./Game.module.css";
import * as React from "react";
import {useContext, useState} from "react";
import {AnswerContext} from "../Contexts.ts";




export function Guess() {
    const useGetAnswer = () => useContext(AnswerContext)
    const [guessArray, setGuessArray] = useState(["", "", "", "", ""]);
    const [guessCount, setGuessCount] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const answer = useGetAnswer();

    function HandleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("EnterGuess", e);
        setGuessCount(guessCount + 1);
        setGuessArray(guessArray => {
            const updatedItems = [...guessArray]
            updatedItems[guessCount] = inputValue;
            return updatedItems;
        });
        const inputAnswer = Number.parseFloat(inputValue);
        console.log(inputAnswer, answer, inputAnswer === answer)
        setInputValue("");
        console.log(guessArray);
    }
    return (
        <>
            <div className={styles.GuessesContainer}>
                <input disabled={true} type={"text"} className={styles.Guess} value={guessArray[0] || ""}/>
                <input disabled={true} type={"text"} className={styles.Guess} value={guessArray[1] || ""}/>
                <input disabled={true} type={"text"} className={styles.Guess} value={guessArray[2] || ""}/>
                <input disabled={true} type={"text"} className={styles.Guess} value={guessArray[3] || ""}/>
                <input disabled={true} type={"text"} className={styles.Guess} value={guessArray[4] || ""}/>
            </div>

            <form className={styles.GuessesContainer} onSubmit={HandleSubmit}>
                <input placeholder={"Enter a guess... NOW!!!!"} type={"text"} className={styles.GuessInput} onChange={e => setInputValue(e.target.value)} value={inputValue}/>
            </form>

        </>
    );
}

export default Guess;