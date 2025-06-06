import styles from  './Game.module.css'
import Guess from './Guess';

export function Game(questionURL: { questionURL: string | undefined }) {
    return (
        <>
            <div className={styles.GameContainer}>
                <img className={styles.Game} src={questionURL.questionURL}  alt={"oops"}/>
                <Guess />
            </div>
        </>
    );
}

export default Game;