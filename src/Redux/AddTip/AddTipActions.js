import {
  ADD_TIP_REQUEST,
  ADD_TIP_SUCCESS,
  ADD_TIP_FALIURE
} from './AddTipConstants'
import {config} from '../../config'

export const addTipRequest = (tip_info) =>{
  return{
    type : ADD_TIP_REQUEST,
    payload : tip_info
  }
}

export const addTipSuccess = (add_tip_success) =>{
  return{
    type : ADD_TIP_SUCCESS,
    payload : add_tip_success
  }
}

export const addTipFaliure = (error) =>{
  return{
    type : ADD_TIP_FALIURE,
    payload : error
  }
}

export const addTip = (tip_info) =>{
    return(dispatch) => {
      dispatch(addTipRequest(tip_info))
      const url =`${config.api_base}/users/business/bucket/custom_taxrate?access_token=${tip_info.final_user_token}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            form_id: "",
            user_id: tip_info.final_user_email,
            fields: {
              bucketId: tip_info.Unique_bucket_Id,
              taxId: tip_info.taxId,
              taxRate:  tip_info.taxRate
            }
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(add_tip_res =>{
      const add_tip_success = add_tip_res
      dispatch(addTipSuccess(add_tip_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(addTipFaliure(errorMsg))
    })
    }
}
