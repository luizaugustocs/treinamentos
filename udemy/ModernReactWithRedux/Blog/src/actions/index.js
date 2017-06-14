import axios from 'axios';

export const GET_POST = 'get_post';
export const CREATE_POST = 'create_post';

const apiUrl = 'http://reduxblog.herokuapp.com/api/';
const apiKey = '?key=luizaugustocs';

export function getPosts() {
    const request = axios.get(`${apiUrl}/posts${apiKey}`);
    return {
        type: GET_POST,
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