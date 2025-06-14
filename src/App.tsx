import './App.css';
import questionMark from './assets/questionMarkIcon.svg';
import stats from './assets/statsIcon.svg';
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getQuestion } from './services/backendService.ts';
import {type GameState, type Question, StoredGameStateContext} from "./Contexts.ts";
import 'animate.css';
import skeletonLogo from "./assets/scaledleLogoSkeleton.svg";
import {HowToPlayModal} from "./components/HowToPlayModal.tsx";

function App() {
    const [question, setQuestion] = useState<Question>({name: "", weight: undefined, image: skeletonLogo});
    const [puzzleNumber, setPuzzleNumber] = useState(1);
    const [storedGameState, setStoredGameState] = useState<GameState | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
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
        const stored = localStorage.getItem(puzzleNumberString);
        if(!stored) {
            return undefined;
        }
        const parsed: GameState = JSON.parse(stored);
        return parsed;
    }

    function HandleToggleModal() {
        setModalVisible(!modalVisible)
    }

  return (
    <>
        <StoredGameStateContext value={storedGameState}>
            <div className="site-container">
                <div className={"top-bar"}>
                    <button className={"top-bar-button"} onClick={HandleToggleModal}><img src={questionMark} alt={"Help"}/></button>
                    <h1 className={"title"}> Weighdle </h1>
                    <button className={"top-bar-button"}><img src={stats} alt={"Stats"}/></button>
                </div>
                <Game question={question} puzzleNumber={puzzleNumber}></Game>
            </div>
            <div className="game-background"></div>
            <HowToPlayModal onModalClose={HandleToggleModal} visible={modalVisible}/>
        </StoredGameStateContext>
    </>
  )
}

export default App
