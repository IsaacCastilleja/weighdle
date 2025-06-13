import styles from "./PreviousGuess.module.css";
import arrow from "../assets/arrowUp.svg";
import checkmark from "../assets/checkmark.svg";
import downArrow from "../assets/arrowDown.svg";
import empty from "../assets/empty.svg";

import {useState} from "react";
import { type GuessObject } from "../Contexts.ts";


const hintColorMap: Record<string, string> = {
    "none": "",
    "close": "gold",
    "far": "red",
    "correct": "green",
}

const hintBorderColorMap: Record<string, string> = {
    "none": "dimgray",
    "close": "goldenrod",
    "far": "darkred",
    "correct": "darkgreen",
}

const hintArrowMap: Record<string, string> = {
    "none": empty,
    "below": arrow,
    "above": downArrow,
    "correct": checkmark
}

let previousGuessObject: GuessObject | null = null;

export function PreviousGuess(props: {guessObject: GuessObject, guessNumber: number}) {
    const [distanceHint, setDistanceHint] = useState("");
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    if (previousGuessObject !== props.guessObject) {
        setImageSrc(hintArrowMap[props.guessObject.arrowState]);
        setDistanceHint(hintColorMap[props.guessObject.colorHint]);
        previousGuessObject = props.guessObject;
    }


    return (
        <>
            <div className={styles.PreviousGuess}>
                <input disabled={true}
                       type={"text"}
                       className={styles.Guess}
                       value={props.guessObject.guessText || ""}
                       placeholder={`Guess ${props.guessNumber}`}
                />
                    <div className={styles.HintContainer}>
                        <img
                            src={imageSrc}
                            className={styles.Hint}
                            alt={`${props.guessObject.colorHint}, ${props.guessObject.arrowState}`}
                            style={{backgroundColor: distanceHint, borderColor: hintBorderColorMap[props.guessObject.colorHint]}}
                        />
                    </div>
            </div>
        </>
    );
}