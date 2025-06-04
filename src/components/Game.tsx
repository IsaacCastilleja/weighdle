import styles from  './Game.module.css'
import Guess from './Guess';

export function Game() {
    return (
        <>
            <div className={styles.GameContainer}>
                <div className={styles.Game}></div>
                <div>
                    <Guess />
                    <Guess />
                </div>
            </div>
        </>
    );
}

export default Game;