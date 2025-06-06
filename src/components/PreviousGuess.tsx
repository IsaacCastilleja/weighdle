import styles from "./PreviousGuess.module.css";
import arrow from "../assets/arrow.svg";
import {useState} from "react";
import { type GuessObjectType } from "./Guess.tsx";

const down_arrow = "180";
const up_arrow = "0";

const hintColorMap: Record<string, string> = {
    "none": "",
    "close": "yellow",
    "far": "red",
    "correct": "green",
}

let previousGuessObject: GuessObjectType | null = null;

export function PreviousGuess(props: {guessObject: GuessObjectType}) {
    const [arrowDirection, setArrowDirection] = useState(up_arrow);
    const [distanceHint, setDistanceHint] = useState("");
    const [hideImage, setHideImage] = useState(false);

    if (previousGuessObject !== props.guessObject) {
        setHideImage(props.guessObject.arrowState === "correct");

        setDistanceHint(hintColorMap[props.guessObject.colorHint]);
        setArrowDirection(props.guessObject.arrowState === "below" ? down_arrow : up_arrow);
        previousGuessObject = props.guessObject;
    }


    return (
        <>
            <div className={styles.PreviousGuess}>
                <input disabled={true} type={"text"} className={styles.Guess} value={props.guessObject.guessText || ""}/>
                    <div className={styles.HintContainer}>
                        <img
                            src={arrow}
                            className={styles.Hint}
                            alt="arrow"
                            style={{
                                transform: `rotate(${arrowDirection}deg)`,
                                backgroundColor: distanceHint,
                                opacity: hideImage ? "0" : "1"
                            }}
                        />
                    </div>
            </div>
        </>
    );
}