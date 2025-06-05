import axios from 'axios';

export async function getAnswer() {
    const url = `/api/answer/`;
    return axios.get(url);
}

export async function getQuestion() {
    const url = `/api/question/`;
    return axios.get(url);
}