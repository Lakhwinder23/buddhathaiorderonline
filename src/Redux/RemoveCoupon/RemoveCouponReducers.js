import {
  REMOVE_COUPON_REQUEST,
  REMOVE_COUPON_SUCCESS,
  REMOVE_COUPON_FALIURE
} from './RemoveCouponConstants'

const intialstate = {
  remove_coupon_loading : false,
  remove_coupon : [],
  remove_coupon_error : '',
  remove_coupon_success : false
}

const RemoveCouponReducers = (state = intialstate,action) =>{
  switch(action.type){
    case REMOVE_COUPON_REQUEST : return{
      ...state,
      remove_coupon_loading:true
    }
    case REMOVE_COUPON_SUCCESS : return{
      ...state,
      remove_coupon_loading:false,
      remove_coupon_success:true,
      remove_coupon:action.payload
    }
    case REMOVE_COUPON_FALIURE : return{
      ...state,
      remove_coupon_error:action.payload
    }
    default: return state
  }

}

export default RemoveCouponReducers
