import axios from 'axios';

export const GET_POST = 'get_post';

const apiUrl = 'http://reduxblog.herokuapp.com/api/';
const apiKey = '?key=luizaugustocs';

export function getPosts() {
    const request = axios.get(`${apiUrl}/posts${apiKey}`);
    return {
        type: GET_POST,
        payload: request
    }
}