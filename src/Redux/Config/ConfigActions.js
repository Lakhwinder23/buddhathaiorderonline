import {
  FETCH_CONFIG_DATA_REQUEST,
  FETCH_CONFIG_DATA_SUCCESS,
  FETCH_CONFIG_DATA_FALIURE
} from './ConfigConstants'
import {config} from '../../config'

export const fetchConfigRequest = (user_token) =>{
  return{
    type : FETCH_CONFIG_DATA_REQUEST,
    payload:user_token
  }
}

export const fetchConfigSuccess = (config_data_success) =>{
  return{
    type : FETCH_CONFIG_DATA_SUCCESS,
    payload : config_data_success
  }
}

export const fetchConfigFaliure = (error) =>{
  return{
    type : FETCH_CONFIG_DATA_FALIURE,
    payload : error
  }
}

export const fetchConfig = (user_token) =>{
    return(dispatch) => {
      dispatch(fetchConfigRequest(user_token))
      const url =`${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${user_token}`;
      const request_option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(config_data_res =>{
      const config_data_success = config_data_res
      dispatch(fetchConfigSuccess(config_data_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchConfigFaliure(errorMsg))
    })
    }
}
