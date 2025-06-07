import styles from  './Game.module.css'
import Guess from './Guess';
import { type Question } from "../Contexts.ts";

export function Game(props: {question: Question}) {
    return (
        <>
            <div className={styles.GameContainer}>
                <div className={styles.QuestionContainerContainer}>
                    <div className={styles.QuestionContainer}>
                        <img className={styles.QuestionImage} src={props.question.image} alt={"oops"}/>
                    </div>
                </div>

                <Guess answer={props.question.weight}/>
            </div>
        </>
    );
}

export default Game;