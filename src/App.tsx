import './App.css'
import Game from "./components/Game.tsx";
import {useEffect, useState} from "react";
import { getAnswer } from './services/backendService.ts'
import { AnswerContext } from "./Contexts.ts";

function App() {
    const [answer, setAnswer] = useState(0.0);
    useEffect(() => {
        getAnswer().then(res => setAnswer(res.data)).catch(err => console.log(err));
    }, [])

  return (
    <>
        <AnswerContext value={answer}>
            <Game></Game>
        </AnswerContext>

    </>
  )
}

export default App
