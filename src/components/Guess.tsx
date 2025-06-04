import styles from "./Game.module.css";

export function Guess() {
    return (
        <>
            <form className={styles.GuessesContainer}>
                <input type={"text"} className={styles.Guess}/>
                <input type={"text"} className={styles.Guess}/>
                <input type={"text"} className={styles.Guess}/>
                <input type={"text"} className={styles.Guess}/>
            </form>

        </>
    );
}

export default Guess;