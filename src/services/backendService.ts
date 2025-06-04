import axios from 'axios';

export async function getAnswer() {
    const url = `/api/answer/`;
    return axios.get(url);
}