import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FALIURE
} from './GetCountriesConstants'

const intialstate = {
  countries_loading : false,
  countries : [],
  countries_error : ''
}

const GetCountriesReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_COUNTRIES_REQUEST : return{
      ...state,
      countries_loading:true
    }
    case FETCH_COUNTRIES_SUCCESS : return{
      ...state,
      countries_loading:false,
      countries:action.payload
    }
    case FETCH_COUNTRIES_FALIURE : return{
      ...state,
      countries_error:action.payload
    }
    default: return state
  }

}

export default GetCountriesReducers
