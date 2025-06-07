import './App.css'
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getQuestion } from './services/backendService.ts'
import { type Question } from "./Contexts.ts";

function App() {
    // image link for question
    const [question, setQuestion] = useState<Question>({name: "ERROR", weight: 404, image: undefined});
    useEffect(() => {
        getQuestion().then(res => setQuestion(res.data)).catch(err => console.log(err));
    }, [])

  return (
    <>
        <div className="site-container">
            <div className="top-bar">
                <h1 className={"title"}> Scaledle </h1>
            </div>
            <Game question={question}></Game>
        </div>
    </>
  )
}

export default App
