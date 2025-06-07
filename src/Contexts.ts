import {createContext} from 'react';

export interface Question {
    name: string,
    weight: number,
    image: string | undefined,
}

export const QuestionContext = createContext<Question | null>(null);