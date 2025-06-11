import axios from 'axios';


export async function getQuestion() {
    const url = `/api/question`;
    return axios.get(url);
}