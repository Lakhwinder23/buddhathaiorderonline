import {
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FALIURE
} from './ApplyCouponConstants'

const intialstate = {
  apply_coupon_loading : false,
  apply_coupon : [],
  apply_coupon_error : '',
  apply_coupon_success : false
}

const ApplyCouponReducers = (state = intialstate,action) =>{
  switch(action.type){
    case APPLY_COUPON_REQUEST : return{
      ...state,
      apply_coupon_loading:true
    }
    case APPLY_COUPON_SUCCESS : return{
      ...state,
      apply_coupon_loading:false,
      apply_coupon_success:true,
      apply_coupon:action.payload
    }
    case APPLY_COUPON_FALIURE : return{
      ...state,
      apply_coupon_error:action.payload
    }
    default: return state
  }

}

export default ApplyCouponReducers
