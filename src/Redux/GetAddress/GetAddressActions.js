import {
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FALIURE
} from './GetAddressConstants'
import {config} from '../../config'

export const fetchAddressRequest = (address_info) =>{
  return{
    type : FETCH_ADDRESS_REQUEST,
    payload:address_info
  }
}

export const fetchAddressSuccess = (address_success) =>{
  return{
    type : FETCH_ADDRESS_SUCCESS,
    payload : address_success
  }
}

export const fetchAddressFaliure = (error) =>{
  return{
    type : FETCH_ADDRESS_FALIURE,
    payload : error
  }
}

export const fetchAddress = (address_info) =>{
    return(dispatch) => {
      dispatch(fetchAddressRequest(address_info))
      const url =`${config.api_base}/users/addresses?access_token=${address_info.user_token}&user_id=${address_info.user_email}&pageSize=10&pageNumber=0`;
      const request_option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "key" : config.key_value,
        "secret" : config.secret_value
      }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(address_res =>{
      const address_success = address_res
      dispatch(fetchAddressSuccess(address_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchAddressFaliure(errorMsg))
    })
    }
}
