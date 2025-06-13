import styles from "./Game.module.css";
import {
    useState,
    type ChangeEvent,
    type CompositionEvent,
    useContext, useReducer, useEffect,
    useCallback,
} from "react";
import {PreviousGuess} from "./PreviousGuess.tsx";
import enterIconLight from "../assets/enterIconLightOutline.svg";
import {type GameState, type Units, type WIN_STATE, type GuessObject, StoredGameStateContext} from "../Contexts.ts";


const maxGuesses = 4;

function isValueClose(value: number, comparator: number, wiggleRoom: number)
{
    const delta = Math.abs(value - comparator);
    const wiggleValue = comparator * wiggleRoom/100.0;
    return delta <= wiggleValue;
}

const ACTIONS = {
    UPDATE_GUESS_COUNT: 0,
    UPDATE_GUESSES: 1,
    UPDATE_WIN_STATE: 2,
    UPDATE_GAME_STATE: 4,
}

interface GameStateDispatch {
    type: number,
    payload: GameState
}

export function Guess(props: {
    answer: Record<string, number>  | undefined,
    puzzleNumber: string,
    onUnitsChanged: (unit: Units) => void,
    onGameOver: (playerWon: boolean) => void
}) {

    const puzzleNumber = props.puzzleNumber;
    const [inputValue, setInputValue] = useState("");
    const [inputUnit, setInputUnit] = useState<Units>("lbs");
    const storedState = useContext(StoredGameStateContext);
    const answer = props.answer;

    const defaultGuessObject: GuessObject[] = Array.from({ length: 5 }, () => ({
        guessText: "",
        arrowState: "none",
        colorHint: "none"
    }));

    const gameOver = useCallback((playerWon: boolean) => {
        props.onGameOver(playerWon);
    }, [props]);

    function reducer(state: GameState, action: GameStateDispatch) {
        let prevState = state;
        switch (action.type) {
            case ACTIONS.UPDATE_GUESS_COUNT:
                prevState.previousGuessCount = action.payload.previousGuessCount;
                break;
            case ACTIONS.UPDATE_GUESSES:
                prevState.previousGuesses = action.payload.previousGuesses;
                break;
            case ACTIONS.UPDATE_WIN_STATE:
                prevState.playerWon = action.payload.playerWon;
                break;
            case ACTIONS.UPDATE_GAME_STATE:
                prevState = action.payload;
        }
        localStorage.setItem(puzzleNumber, JSON.stringify(prevState));
        return prevState
    }

    const [gameState, dispatch] = useReducer(reducer, storedState ?? {previousGuessCount: 0, previousGuesses: defaultGuessObject, playerWon: "DNF"});

    useEffect(() => {
        if(storedState){
            dispatch({type: ACTIONS.UPDATE_GAME_STATE, payload: storedState})
        }

    }, [storedState]);

    useEffect(() => {
        if(gameState.playerWon !== "DNF") {
            gameOver(gameState.playerWon === "WON");
        }
    }, [gameState.playerWon, gameOver]);

    function updateGuessCount(newValue: number) {
        dispatch({type: ACTIONS.UPDATE_GUESS_COUNT, payload: {
                previousGuessCount: newValue,
                previousGuesses: [],
                playerWon: "WON"
            }});
    }

    function updateGuesses(newValue: GuessObject[]) {
        dispatch({type: ACTIONS.UPDATE_GUESSES, payload: {
                previousGuesses: newValue,
                previousGuessCount: 0,
                playerWon: "WON"
            }});
    }

    function updateWinState(newValue: WIN_STATE) {
        dispatch({type: ACTIONS.UPDATE_WIN_STATE, payload: {
                playerWon: newValue,
                previousGuesses: [],
                previousGuessCount: 0
            }});
    }


    function checkGuess(inputValue: string) {
        if(!answer) return;
        const parsedValue = Number.parseFloat(inputValue);
        const guess: GuessObject = {
            guessText: `${parsedValue} ${inputUnit}`,
            arrowState: "below",
            colorHint: "far",
        }

        if(isValueClose(parsedValue, answer[inputUnit], 10)){
            guess.colorHint = "correct";
            guess.arrowState = "correct";
        }
        else
        {
            guess.colorHint = isValueClose(parsedValue, answer[inputUnit], 30) ? "close" : "far";
            guess.arrowState = parsedValue > answer[inputUnit] ? "above" : "below";
        }

        return guess;
    }


    function HandleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const guess = checkGuess(inputValue);
        if(!guess) return;

        if(guess.arrowState === "correct") {
            updateWinState("WON");
            gameOver(true);
        }
        else if(gameState.previousGuessCount  >= maxGuesses)
        {
            updateWinState("LOST");
            gameOver(false);
        }
        const updatedGuesses = gameState.previousGuesses;
        updatedGuesses[gameState.previousGuessCount] = guess;
        updateGuesses(updatedGuesses);
        updateGuessCount(gameState.previousGuessCount + 1);
        setInputValue("");
    }

    function HandleInput(e: CompositionEvent<HTMLInputElement>)
    {
        if(e.data !== "." && !Number.isFinite(Number(e.data)))
        {
            e.preventDefault();
        }

    }

    function HandleInputUnitsChanged(e: ChangeEvent<HTMLSelectElement>)
    {
        const unit = e.currentTarget.value as Units;
        setInputUnit(unit);
        props.onUnitsChanged(unit);
    }
    
    return (
        <>
            <div className={styles.GuessesContainer}>
                <PreviousGuess guessObject={gameState.previousGuesses[0]} guessNumber={1}/>
                <PreviousGuess guessObject={gameState.previousGuesses[1]} guessNumber={2}/>
                <PreviousGuess guessObject={gameState.previousGuesses[2]} guessNumber={3}/>
                <PreviousGuess guessObject={gameState.previousGuesses[3]} guessNumber={4}/>
                <PreviousGuess guessObject={gameState.previousGuesses[4]} guessNumber={5}/>
            </div>
            <div className={styles.GuessContainer}>
                <div className={styles.GuessInputContainer}>
                    {/*@ts-expect-error Stack overflow gave me that working type for HandleInput and I cant find a different one*/}
                    <form id={"enterGuessForm"} className={styles.GuessInputForm} onSubmit={HandleSubmit} onBeforeInput={HandleInput}>
                        <input placeholder={"Enter a guess..."}
                               type={"text"}
                               pattern={"^\\d*(\\.\\d{0,})?$"} // Only allow numbers
                               className={styles.GuessInput}
                               inputMode={"decimal"}
                               onChange={e => setInputValue(e.target.value)}
                               value={inputValue}
                               disabled={gameState.playerWon !== "DNF" || !props.answer}
                               required={true}
                        />
                    </form>
                    <div className={styles.UnitSelectContainer}>
                        <select className={styles.UnitSelect} name={"units"} onChange={HandleInputUnitsChanged}>
                            <option value={"lbs"}>lbs</option>
                            <option value={"oz"}>oz</option>
                            <option value={"kg"}>kg</option>
                            <option value={"g"}>g</option>
                        </select>
                    </div>
                </div>
                <div className={styles.GuessInputSubmitContainer}>
                    <button className={styles.GuessInputSubmit}
                            type={"submit"}
                            form={"enterGuessForm"}
                            value={"Submit"}
                            disabled={gameState.playerWon !== "DNF" || !props.answer}
                    >
                        <img style={{height: "100%", width: "100%"}} src={enterIconLight} alt={"Submit"}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Guess;