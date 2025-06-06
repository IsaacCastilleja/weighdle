import styles from  './Game.module.css'
import Guess from './Guess';

export function Game(questionURL: { questionURL: string | undefined }) {
    return (
        <>
            <div className={styles.GameContainer}>
                <div className={styles.QuestionContainerContainer}>
                    <div className={styles.QuestionContainer}>
                        <img className={styles.QuestionImage} src={questionURL.questionURL} alt={"oops"}/>
                    </div>
                </div>

                <Guess />
            </div>
        </>
    );
}

export default Game;