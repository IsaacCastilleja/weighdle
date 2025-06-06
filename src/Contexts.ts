import {createContext} from 'react';

export const AnswerContext = createContext<number>(0.0);
export const QuestionContext = createContext<string | undefined>(undefined);