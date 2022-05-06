import {
  APPLY_GIFTCARD_REQUEST,
  APPLY_GIFTCARD_SUCCESS,
  APPLY_GIFTCARD_FALIURE
} from './ApplyGiftcardConstants'
import {config} from '../../config'

export const applyGiftcardRequest = (apply_giftcard_info) =>{
  return{
    type : APPLY_GIFTCARD_REQUEST,
    payload : apply_giftcard_info
  }
}

export const applyGiftcardSuccess = (apply_giftcard_success) =>{
  return{
    type : APPLY_GIFTCARD_SUCCESS,
    payload : apply_giftcard_success
  }
}

export const applyGiftcardFaliure = (error) =>{
  return{
    type : APPLY_GIFTCARD_FALIURE,
    payload : error
  }
}

export const applyGiftCard = (apply_giftcard_info) =>{
    return(dispatch) => {
      dispatch(applyGiftcardRequest(apply_giftcard_info))
      const url =`${config.api_base}/users/business/bucket/apply_coupon?access_token=${apply_coupon_info.final_user_checkout_token}&user_id=${apply_coupon_info.final_user_checkout_email}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fields: {
              bucketId: apply_coupon_info.Unique_bucket_Id,
              rule: apply_coupon_info.apply_coupoon                                              //"10% Discount."
            },
            form_id: "",
            user_id: apply_coupon_info.final_user_checkout_email
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(apply_giftcard_res =>{
      const apply_giftcard_success = apply_giftcard_res
      dispatch(applyGiftcardSuccess(apply_giftcard_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(applyGiftcardFaliure(errorMsg))
    })
    }
}
