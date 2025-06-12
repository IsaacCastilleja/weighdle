import {createContext} from 'react';

export interface Question {
    name: string,
    weight: number | undefined,
    image: string | undefined,
}

export interface GuessObject {
    guessText: string;
    arrowState: "none" | "below" |"above" | "correct";
    colorHint: "none" | "close" | "far" | "correct";
}

export interface GameState {
    previousGuesses: GuessObject[],
    previousGuessCount: number,
    playerWon: WIN_STATE,
}

export type WIN_STATE = "WON" | "LOST" | "DNF";
export type Units = "lbs" | "oz" | "kg" | "g";


export const QuestionContext = createContext<Question | null>(null);
export const StoredGameStateContext = createContext<GameState | undefined>(undefined);