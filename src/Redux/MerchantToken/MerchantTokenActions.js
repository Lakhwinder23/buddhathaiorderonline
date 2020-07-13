import {
  FETCH_MERCHANT_TOKEN_REQUEST,
  FETCH_MERCHANT_TOKEN_SUCCESS,
  FETCH_MERCHANT_TOKEN_FALIURE
} from './MerchantTokenConstants'
import {config} from '../../config'

export const fetchMerchantTokenRequest = () =>{
  return{
    type : FETCH_MERCHANT_TOKEN_REQUEST
  }
}

export const fetchMerchantTokenSuccess = (merchant_token_success) =>{
  return{
    type : FETCH_MERCHANT_TOKEN_SUCCESS,
    payload : merchant_token_success
  }
}

export const fetchMerchantTokenFaliure = (error) =>{
  return{
    type : FETCH_MERCHANT_TOKEN_FALIURE,
    payload : error
  }
}

export const fetchMerchantToken = () =>{
    return(dispatch) => {
      dispatch(fetchMerchantTokenRequest())
      const url =`${config.api_root}/security/session/merchants?Key=${config.key_value}&Secret=${config.secret_value}&device_id=21212121121212wqwqw`;
      const request_option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Key" : config.key_value,
        "Secret" : config.secret_value
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(merchant_token_res =>{
      const merchant_token_success = merchant_token_res
      dispatch(fetchMerchantTokenSuccess(merchant_token_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchMerchantTokenFaliure(errorMsg))
    })
    }
}
