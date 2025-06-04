import styles from "./Game.module.css";

export function Guess() {
    return (
        <>
            <form className={styles.GuessesContainer}>
                <input disabled={true} type={"text"} className={styles.Guess}/>
                <input disabled={true} type={"text"} className={styles.Guess}/>
                <input disabled={true} type={"text"} className={styles.Guess}/>
                <input disabled={true} type={"text"} className={styles.Guess}/>
                <input disabled={true} type={"text"} className={styles.Guess}/>
                <input placeholder={"Enter a guess... NOW!!!!"} type={"text"} className={styles.GuessInput}/>
            </form>

        </>
    );
}

export default Guess;