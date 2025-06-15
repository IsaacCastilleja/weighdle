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


export interface GameStatsObject {
    gameStats: GameStats,
    onStatsUpdated: (newStats: GameStats) => void;
}

export interface GameStats {
    gamesPlayed: number,
    gamesWon: number,
    currentStreak: number,
    maxStreak: number,
    wonOnOne: number,
    wonOnTwo: number,
    wonOnThree: number,
    wonOnFour: number,
    wonOnFive: number,
}

export type WIN_STATE = "WON" | "LOST" | "DNF";
export type Units = "lbs" | "oz" | "kg" | "g";


export const StoredGameStatsContext = createContext<GameStatsObject | undefined>(undefined);
export const StoredGameStateContext = createContext<GameState | undefined>(undefined);