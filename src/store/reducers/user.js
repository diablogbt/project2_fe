import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    userInfo: null
};



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'user_get_info': 
            actions.getUserInfo();
            return state;
        default:  
            return state;
    }
};

export default reducer;