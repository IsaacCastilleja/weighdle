import styles from "./HowToPlayModal.module.css"
import {PreviousGuess} from "./PreviousGuess.tsx";

export function HowToPlayModal(props: {visible: boolean}) {
    return (
        <>
            <div className={styles.modalContainer} style={{display: !props.visible ? "none" : "flex"}}>
                <div className={styles.modal}>
                    <h1>How to play</h1>
                    <h2><u>The Game</u></h2>
                    <h3>Guess the weight of the displayed item!</h3>
                    <div className={styles.bulletContainer}>
                        <div className={styles.bulletPoint}>•</div>
                        <span className={styles.bulletText}>You have five guesses</span>
                    </div>
                    <div className={styles.bulletContainer}>
                        <div className={styles.bulletPoint}>•</div>
                        <span className={styles.bulletText}>Each incorrect guess will give you a hint towards the answer</span>
                    </div>
                    <div className={styles.bulletContainer}>
                        <div className={styles.bulletPoint}>•</div>
                        <span className={styles.bulletText}>Answers only need to be within <strong>10%</strong> to be considered correct</span>
                    </div>
                    <h4>There's a new Weighdle every day after <strong>12:00 am CT</strong>!</h4>
                    <h2><u>Examples</u></h2>
                    <div className={styles.guessExampleContainer}>
                        <PreviousGuess guessObject={{guessText: "25 lbs", arrowState: "above", colorHint: "far"}} guessNumber={1} />
                        <span>This hint means that the guess was <strong>above</strong> the answer by more than <strong>30%</strong> of it.</span>
                    </div>
                    <div className={styles.guessExampleContainer}>
                        <PreviousGuess guessObject={{guessText: "10 lbs", arrowState: "below", colorHint: "close"}} guessNumber={1} />
                        <span>This hint means that the guess was <strong>below</strong> the answer but within <strong>30%</strong> of it.</span>
                    </div>
                    <div className={styles.guessExampleContainer}>
                        <PreviousGuess guessObject={{guessText: "15 lbs", arrowState: "correct", colorHint: "correct"}} guessNumber={1} />
                        <span>This hint means that the guess is <strong>correct</strong> by being within <strong>10%</strong> of it!</span>
                    </div>


                </div>
                <div className={styles.backdrop}></div>
            </div>
        </>
    );
}