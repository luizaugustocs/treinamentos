import axios from 'axios';

export const GET_POST = 'get_post';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';

const apiUrl = 'http://reduxblog.herokuapp.com/api/';
const apiKey = '?key=luizaugustocs';

export function getPosts() {
    const request = axios.get(`${apiUrl}/posts${apiKey}`);
    return {
        type: GET_POST,
        payload: request
    }
}
export function fetchPost(id) {
    const request = axios.get(`${apiUrl}/posts/${id}${apiKey}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function createPost(values,callback){
    const request = axios.post(`${apiUrl}/posts${apiKey}`,values)
        .then(() => callback());
    return  {
        type: CREATE_POST,
        payload: request
    }
}