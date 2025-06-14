import styles from "./StatsModal.module.css"
import closeIcon from "../assets/closeIcon.svg"
import type {GameStats} from "../Contexts.ts";

export function StatsModal(props: {
    visible: boolean,
    onModalClose: () => void,
    animateClass: string,
    storedStats: GameStats,
}) {

    function calcWidth(wonOn: number) {
        let width = 10; // min width
        if(props.storedStats.gamesWon > 0){
            width += wonOn / props.storedStats.gamesWon;
        }
        return `${width}%`
    }

    return (
        <>
            <div className={styles.modalContainer} style={{display: !props.visible ? "none" : "flex"}}>
                <div className={styles.modal + ` ${props.animateClass}`}>
                    <h1>Game Statistics</h1>
                    <div className={styles.statsContainer}>
                        <div className={styles.statItem}>
                            <h3>Games Played</h3>
                            <span>20</span>
                        </div>
                        <div className={styles.statItem}>
                            <h3>Win %</h3>
                            <span>100%</span>
                        </div>
                        <div className={styles.statItem}>
                            <h3>Current Streak</h3>
                            <span>40</span>
                        </div>
                        <div className={styles.statItem}>
                            <h3>Max Streak</h3>
                            <span>100</span>
                        </div>
                    </div>
                    <div className={styles.guessDistributionContainer}>
                        <h2>Guess Distribution</h2>
                        <div className={styles.chart}>
                            <div className={styles.chartItem}>
                                <span className={styles.chartLabel}>1</span>
                                <div className={styles.chartBar} style={{width: "20%"}}>
                                    <span className={styles.chartBarValueLabel}>1</span>
                                </div>
                            </div>
                            <div className={styles.chartItem}>
                                <span className={styles.chartLabel}>2</span>
                                <div className={styles.chartBar} style={{width: "30%"}}>
                                    <span className={styles.chartBarValueLabel}>1</span>
                                </div>
                            </div>
                            <div className={styles.chartItem}>
                                <span className={styles.chartLabel}>3</span>
                                <div className={styles.chartBar} style={{width: "60%"}}>
                                    <span className={styles.chartBarValueLabel}>1</span>
                                </div>
                            </div>
                            <div className={styles.chartItem}>
                                <span className={styles.chartLabel}>4</span>
                                <div className={styles.chartBar} style={{width: "10%"}}>
                                    <span className={styles.chartBarValueLabel}>1</span>
                                </div>
                            </div>
                            <div className={styles.chartItem}>
                                <span className={styles.chartLabel}>5</span>
                                <div className={styles.chartBar} style={{width: "20%"}}>
                                    <span className={styles.chartBarValueLabel}>1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.exitButton} onClick={props.onModalClose}><img className={styles.exitButtonImage} src={closeIcon} alt={"close"}/></button>
                </div>
                <div className={styles.backdrop} onClick={props.onModalClose}></div>
            </div>
        </>
    );
}