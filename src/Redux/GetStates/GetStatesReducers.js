import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FALIURE
} from './GetStatesConstants'

const intialstate = {
  states_loading : false,
  states : [],
  states_error : ''
}

const GetStatesReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_STATES_REQUEST : return{
      ...state,
      states_loading:true
    }
    case FETCH_STATES_SUCCESS : return{
      ...state,
      states_loading:false,
      states:action.payload
    }
    case FETCH_STATES_FALIURE : return{
      ...state,
      states_error:action.payload
    }
    default: return state
  }

}

export default GetStatesReducers
