import styles from "./PreviousGuess.module.css";
import arrow from "../assets/arrow.svg";
import checkmark from "../assets/checkmark-svgrepo-com.svg";
import downArrow from "../assets/downArrow.svg";
import empty from "../assets/empty.svg";

import {useState} from "react";
import { type GuessObjectType } from "./Guess.tsx";


const hintColorMap: Record<string, string> = {
    "none": "",
    "close": "yellow",
    "far": "red",
    "correct": "green",
}

const hintArrowMap: Record<string, string> = {
    "none": empty,
    "below": downArrow,
    "above": arrow,
    "correct": checkmark
}

let previousGuessObject: GuessObjectType | null = null;

export function PreviousGuess(props: {guessObject: GuessObjectType}) {
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
                <input disabled={true} type={"text"} className={styles.Guess} value={props.guessObject.guessText || ""}/>
                    <div className={styles.HintContainer} style={{backgroundColor: distanceHint}}>
                        <img
                            src={imageSrc}
                            className={styles.Hint}
                            alt={`${props.guessObject.colorHint}, ${props.guessObject.arrowState}`}
                        />
                    </div>
            </div>
        </>
    );
}