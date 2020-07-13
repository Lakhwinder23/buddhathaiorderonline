import {
  UPDATE_SHIPPING_METHOD_REQUEST,
  UPDATE_SHIPPING_METHOD_SUCCESS,
  UPDATE_SHIPPING_METHOD_FALIURE
} from './UpdateShippingMethodConstants'
import {config} from '../../config'

export const updateShippingMethodRequest = (update_shipping_method_info) =>{
  return{
    type : UPDATE_SHIPPING_METHOD_REQUEST,
    payload : update_shipping_method_info
  }
}

export const updateShippingMethodSuccess = (update_shipping_method_success) =>{
  return{
    type : UPDATE_SHIPPING_METHOD_SUCCESS,
    payload : update_shipping_method_success
  }
}

export const updateShippingMethodFaliure = (error) =>{
  return{
    type : UPDATE_SHIPPING_METHOD_FALIURE,
    payload : error
  }
}

export const updateShippingMethod = (update_shipping_method_info) =>{
    return(dispatch) => {
      dispatch(updateShippingMethodRequest(update_shipping_method_info))
      const url =`${config.api_base}/users/business/bucket/update_shipping_method?access_token=${update_shipping_method_info.final_user_token}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            form_id: "",
            user_id: update_shipping_method_info.final_user_email,
            fields: {
              bucketId: update_shipping_method_info.Unique_bucket_Id,
              shippingId: update_shipping_method_info.shippingId
            }
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(update_shipping_method_res =>{
      const update_shipping_method_success = update_shipping_method_res
      dispatch(updateShippingMethodSuccess(update_shipping_method_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(updateShippingMethodFaliure(errorMsg))
    })
    }
}
