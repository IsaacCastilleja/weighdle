import styles from  './Game.module.css'
import Guess from './Guess';
import {type Question, type Units} from "../Contexts.ts";
import {useRef, useState} from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import type {TConductorInstance} from "react-canvas-confetti/dist/types";



// Converts the received lbs value to the other units
function unitConversions(value: number | undefined) {
    if(!value) return undefined;
    const answer: Record<Units, number> = {
        "lbs": value,
        "oz": value * 16,
        "kg": value * 0.453592,
        "g": value * 453.592
    }
    return answer;
}

export function Game(props: {question: Question, puzzleNumber: number}) {
    function UnitsChanged(unit: Units) {
        setInputUnit(unit)
    }

    function revealAnswer() {
        if(!answerWeight) return;
        setAnswerString(`The answer was ${answerWeight[inputUnit].toFixed(2)} ${inputUnit} !`);
        setAnswerHidden(false);
        setAnimation(" animate__animated animate__zoomIn");
    }

    function handleGameOver(playerWon: boolean) {
        revealAnswer();
        if(playerWon){
            // do some victory animation
            animateVictory();
        }
    }

    function animateVictory() {
        controller.current?.shoot();
    }

    const controller = useRef<TConductorInstance>(undefined);

    const onInitHandler = (conductor: TConductorInstance) => {
        controller.current = conductor;
    };

    const answerWeight = unitConversions(props.question.weight);
    const [inputUnit, setInputUnit] = useState<Units>("lbs");
    const [answerHidden, setAnswerHidden] = useState(true);
    const [answerString, setAnswerString] = useState("");
    const [animation, setAnimation] = useState("");

    return (
        <>
            <div className={styles.GameContainer}>
                <div className={styles.FullQuestion}>
                    <div className={styles.QuestionContainerContainer}>
                        <div className={styles.QuestionContainer}>
                            <img className={styles.QuestionImage} src={props.question.image} alt={props.question.name}/>
                        </div>
                    </div>
                    <p className={styles.QuestionName}>{props.question.name}</p>
                </div>
                <p hidden={answerHidden} className={styles.QuestionAnswer + animation}>{answerString}</p>
                <Guess answer={answerWeight} puzzleNumber={props.puzzleNumber.toString()} onUnitsChanged={UnitsChanged} onGameOver={handleGameOver}/>
                <Realistic onInit={(e) => {onInitHandler(e.conductor)}}></Realistic>
            </div>
        </>
    );
}

export default Game;