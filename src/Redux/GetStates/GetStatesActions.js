import {
  FETCH_STATES_REQUEST,
  FETCH_STATES_SUCCESS,
  FETCH_STATES_FALIURE
} from './GetStatesConstants'
import {config} from '../../config'

export const fetchStatesRequest = (states_info) =>{
  return{
    type : FETCH_STATES_REQUEST,
    payload:states_info
  }
}

export const fetchStatesSuccess = (states_success) =>{
  return{
    type : FETCH_STATES_SUCCESS,
    payload : states_success
  }
}

export const fetchStatesFaliure = (error) =>{
  return{
    type : FETCH_STATES_FALIURE,
    payload : error
  }
}

export const fetchStates = (states_info) =>{
    return(dispatch) => {
      dispatch(fetchStatesRequest(states_info))
      const url =`${config.api_base}/enterprised/countries/states?access_token=${states_info.user_token}&country_id=254&pageSize=250&status=ACTIVE`;
      const request_option = {
      method: "GET"
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(states_res =>{
      const states_success = states_res
      dispatch(fetchStatesSuccess(states_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchStatesFaliure(errorMsg))
    })
    }
}
