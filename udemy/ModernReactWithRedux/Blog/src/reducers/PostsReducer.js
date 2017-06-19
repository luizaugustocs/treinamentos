import {GET_POST, FETCH_POST} from '../actions'
import _ from 'lodash';

export default function(state = {}, action){
    switch (action.type){
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = { ...state};
            // newState[post.id] = post;
            // return newState;
            return {... state, [action.payload.data.id]: action.payload.data };
        case GET_POST:
            return _.mapKeys(action.payload.data,'id');
        default:
            return state;
    }
}