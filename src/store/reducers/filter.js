import {updateObject} from '../utility';
import * as actions from '../actions/Index';

const initialState = {
    sideitems: {
        Product_Type:{
          ModelYear: {title: 'Model year', min:2000, max: 2050, value: [2000,2050]}
        },
        Technical_Specifications:{
          Airflow: {title: 'Airflow', unit: 'CFM', min: 2000, max: 10000, value: [2000,10000]},
          MaxPower: {title: 'Max power', unit: 'W', min: 9.84, max: 96.52, value: [9.84,96.52]},
          SoundAtMaxSpeed: {title: 'Sound at max speed', unit: 'dBA', min:20, max:80, value: [20,80]},
          FanSweepDiameter: {title: 'Fan sweep diameter', unit: 'in', min: 18, max:96, value: [18,96]},
        },
        Brand:[],
        Past_Selections:{
            Firm: {title: 'Firm', min:0, max:10, value: [0,10]},
            Global: {title: 'Global', min:0, max: 1492, value: [0,1492]}
        }
    }
};

// const setUserInfo = (state,action) => {
//     return updateObject(state, {userInfo: action.userInfo});
// }

const filterValueChangeEnd = (state, action) => {
    console.log('filter value changed: ');
    console.log(state.sideitems[action.accid][action.innerid].title+': '+
    action.newvalues);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'filter_value_change': 
            filterValueChangeEnd(state, action);
            return state;
        default:  
            return state;
    }
};

export default reducer;
