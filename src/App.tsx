import './App.css'
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getQuestion } from './services/backendService.ts'
import { type Question } from "./Contexts.ts";
import 'animate.css';
import skeletonLogo from "./assets/scaledleLogoSkeleton.svg";

function App() {
    // image link for question
    const [question, setQuestion] = useState<Question>({name: "", weight: undefined, image: skeletonLogo});
    useEffect(() => {
        getQuestion()
            .then(res => setQuestion(res.data))
            .catch(() => setQuestion({name: "Error Fetching Question", weight: undefined, image: skeletonLogo}));
    }, [])

  return (
    <>
        <div className="site-container">
            <div className="top-bar">
                <h1 className={"title"}> Scaledle </h1>
            </div>
            <Game question={question}></Game>
        </div>
        <div className="game-background"></div>
    </>
  )
}

export default App
