import './App.css';
import questionMark from './assets/questionMarkIcon.svg';
import stats from './assets/statsIcon.svg';
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getQuestion } from './services/backendService.ts';
import {
    type GameState,
    type GameStats,
    type Question,
    StoredGameStateContext,
    StoredGameStatsContext
} from "./Contexts.ts";
import 'animate.css';
import skeletonLogo from "./assets/scaledleLogoSkeleton.svg";
import {HowToPlayModal} from "./components/HowToPlayModal.tsx";
import {StatsModal} from "./components/StatsModal.tsx";

const defaultGameStats: GameStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    wonOnOne: 0,
    wonOnTwo: 0,
    wonOnThree: 0,
    wonOnFour: 0,
    wonOnFive: 0,
}

function App() {
    const [question, setQuestion] = useState<Question>({name: "", weight: undefined, image: skeletonLogo});
    const [puzzleNumber, setPuzzleNumber] = useState(1);
    const [storedGameState, setStoredGameState] = useState<GameState | undefined>(undefined);
    const [storedGameStats, setStoredGameStats] = useState<GameStats>(defaultGameStats);
    const [modalVisible, setModalVisible] = useState(false);
    const [animateModal, setAnimateModal] = useState("");

    const [statsModalVisible, setStatsModalVisible] = useState(false);
    const [animateStatsModal, setAnimateStatsModal] = useState("");

    useEffect(() => {
        setStoredGameStats(retrieveStoredGameStats());
        getQuestion()
            .then((res) => {
                setQuestion(res.data.question);
                setPuzzleNumber(res.data.puzzle_number);
                setStoredGameState(retrieveStoredGameState(res.data.puzzle_number.toString()));
            })
            .catch(() => setQuestion({name: "Error Fetching Question", weight: undefined, image: skeletonLogo}));
    }, [])
    
    // Retrieve stored game state
    function retrieveStoredGameState(puzzleNumberString: string){
        const stored = localStorage.getItem("gameState");
        if(!stored) {
            return undefined;
        }
        const parsed: GameState = JSON.parse(stored)[puzzleNumberString];
        return parsed ?? undefined;
    }

    function retrieveStoredGameStats() {
        const stored = localStorage.getItem("gameStats");
        if(!stored) {
            localStorage.setItem("gameStats", JSON.stringify(defaultGameStats));
            return defaultGameStats;
        }
        const parsed: GameStats = JSON.parse(stored);
        return parsed;
    }

    function HandleToggleModal() {
        setModalVisible(!modalVisible)
        setAnimateModal(!modalVisible ? " animate__animated animate__fadeIn" : "")
    }

    function HandleToggleStatsModal() {
        setStatsModalVisible(!statsModalVisible)
        setAnimateStatsModal(!statsModalVisible ? " animate__animated animate__fadeIn" : "")
    }

    function HandleStatsUpdated(newStats: GameStats) {
        setStoredGameStats(newStats)
    }

  return (
    <>
        <StoredGameStatsContext value={{gameStats: storedGameStats, onStatsUpdated: HandleStatsUpdated}}>
        <StoredGameStateContext value={storedGameState}>
            <div className="site-container">
                <div className={"top-bar"}>
                    <button className={"top-bar-button"} onClick={HandleToggleModal}><img src={questionMark} alt={"Help"}/></button>
                    <h1 className={"title"}> Weighdle </h1>
                    <button className={"top-bar-button"} onClick={HandleToggleStatsModal}><img src={stats} alt={"Stats"}/></button>
                </div>
                <Game question={question} puzzleNumber={puzzleNumber}></Game>
            </div>
            <div className="game-background"></div>
            <HowToPlayModal animateClass={animateModal} onModalClose={HandleToggleModal} visible={modalVisible}/>
            <StatsModal storedStats={storedGameStats} visible={statsModalVisible} onModalClose={HandleToggleStatsModal} animateClass={animateStatsModal}/>
        </StoredGameStateContext>
        </StoredGameStatsContext>
    </>
  )
}

export default App
