import './App.css'
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getAnswer, getQuestion } from './services/backendService.ts'
import { AnswerContext } from "./Contexts.ts";
import { QuestionContext } from "./Contexts.ts";

function App() {
    const [answer, setAnswer] = useState(0.0);
    useEffect(() => {
        getAnswer().then(res => setAnswer(res.data)).catch(err => console.log(err));
    }, [])

    // image link for question
    const [question, setQuestion] = useState("");
    useEffect(() => {
        getQuestion().then(res => setQuestion(res.data)).catch(err => console.log(err));
    }, [])

  return (
    <>
        <AnswerContext value={answer}>
            <QuestionContext value={question}>
                <Game></Game>
            </QuestionContext>
        </AnswerContext>

    </>
  )
}

export default App
