import {
  REMOVE_COUPON_REQUEST,
  REMOVE_COUPON_SUCCESS,
  REMOVE_COUPON_FALIURE
} from './RemoveCouponConstants'
import {config} from '../../config'

export const removeCouponRequest = (remove_coupon_info) =>{
  return{
    type : REMOVE_COUPON_REQUEST,
    payload : remove_coupon_info
  }
}

export const removeCouponSuccess = (remove_coupon_success) =>{
  return{
    type : REMOVE_COUPON_SUCCESS,
    payload : remove_coupon_success
  }
}

export const removeCouponFaliure = (error) =>{
  return{
    type : REMOVE_COUPON_FALIURE,
    payload : error
  }
}

export const removeCoupon = (remove_coupon_info) =>{
    return(dispatch) => {
      dispatch(removeCouponRequest(remove_coupon_info))
      const url =`${config.api_base}/users/business/bucket/remove_coupon?access_token=${remove_coupon_info.final_user_checkout_token}&user_id=${remove_coupon_info.final_user_checkout_email}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fields: {
              bucketId: remove_coupon_info.Unique_bucket_Id,
              rule: remove_coupon_info.apply_coupoon                                              //"10% Discount."
            },
            form_id: "",
            user_id: remove_coupon_info.final_user_checkout_email
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(remove_coupon_res =>{
      const remove_coupon_success = remove_coupon_res
      dispatch(removeCouponSuccess(remove_coupon_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(removeCouponFaliure(errorMsg))
    })
    }
}
