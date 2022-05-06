import {
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FALIURE,
  APPLY_GIFT_SUCCESS
} from './ApplyCouponConstants'
import {config} from '../../config'

export const applyCouponRequest = (apply_coupon_info) =>{
  return{
    type : APPLY_COUPON_REQUEST,
    payload : apply_coupon_info
  }
}

export const applyCouponSuccess = (apply_coupon_success) =>{
  return{
    type : APPLY_COUPON_SUCCESS,
    payload : apply_coupon_success
  }
}

export const applyGiftSuccess = (apply_coupon_success) =>{
  return{
    type : APPLY_GIFT_SUCCESS,
    payload : apply_coupon_success
  }
}

export const applyCouponFaliure = (error) =>{
  return{
    type : APPLY_COUPON_FALIURE,
    payload : error
  }
}

export const applyCoupon = (apply_coupon_info) =>{
    return(dispatch) => {
      dispatch(applyCouponRequest(apply_coupon_info))
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
    .then(apply_coupon_res =>{
      const apply_coupon_success = apply_coupon_res
      dispatch(applyCouponSuccess(apply_coupon_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(applyCouponFaliure(errorMsg))
    })
    }
}

export const applyGiftCard = (apply_coupon_info) =>{
    return(dispatch) => {
      dispatch(applyCouponRequest(apply_coupon_info))
      const url =`${config.api_base}/instrument/giftcards/balance?access_token=${apply_coupon_info.final_user_checkout_token}&user_id=${apply_coupon_info.final_user_checkout_email}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            card_number: apply_coupon_info.giftcard_number,
            pin: apply_coupon_info.giftcard_pin,
            bucket_id: apply_coupon_info.bucket_id,
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(apply_coupon_res =>{
      const apply_coupon_success = apply_coupon_res
      dispatch(applyGiftSuccess(apply_coupon_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(applyCouponFaliure(errorMsg))
    })
    }
}
