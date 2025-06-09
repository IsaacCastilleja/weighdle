import styles from  './Game.module.css'
import Guess from './Guess';
import { type Question } from "../Contexts.ts";
import {useState} from "react";


export type Units = "lbs" | "oz" | "kg" | "g";

// Converts the received lbs value to the other units
function unitConversions(value: number) {
    const answer: Record<Units, number> = {
        "lbs": value,
        "oz": value * 16,
        "kg": value * 0.453592,
        "g": value * 453.592
    }
    return answer;
}

export function Game(props: {question: Question}) {
    function UnitsChanged(unit: Units) {
        setInputUnit(unit)
    }

    function revealAnswer() {
        setAnswerString(`The answer was ${answerWeight[inputUnit].toFixed(2)} ${inputUnit} !`);
        setAnswerHidden(false);
    }

    function handleGameOver(playerWon: boolean) {
        revealAnswer();
        if(playerWon){
            // do some victory animation
        }
    }

    const answerWeight = unitConversions(props.question.weight);
    const [inputUnit, setInputUnit] = useState<Units>("lbs");
    const [answerHidden, setAnswerHidden] = useState(true);
    const [answerString, setAnswerString] = useState("");

    return (
        <>
            <div className={styles.GameContainer}>
                <div className={styles.FullQuestion}>
                    <div className={styles.QuestionContainerContainer}>
                        <div className={styles.QuestionContainer}>
                            <img className={styles.QuestionImage} src={props.question.image} alt={"oops"}/>
                        </div>
                    </div>
                    <p className={styles.QuestionName}>{props.question.name}</p>
                </div>
                <p hidden={answerHidden} className={styles.QuestionAnswer}>{answerString}</p>
                <Guess answer={answerWeight} onUnitsChanged={UnitsChanged} onGameOver={handleGameOver}/>
            </div>
        </>
    );
}

export default Game;