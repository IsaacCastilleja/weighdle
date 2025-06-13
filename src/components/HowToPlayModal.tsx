import styles from "./HowToPlayModal.module.css"

export function HowToPlayModal() {
    return (
        <>
            <div className={styles.modalContainer}>
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
                </div>
                <div className={styles.backdrop}></div>
            </div>
        </>
    );
}