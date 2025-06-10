import {createContext} from 'react';

export interface Question {
    name: string,
    weight: number | undefined,
    image: string | undefined,
}

export const QuestionContext = createContext<Question | null>(null);