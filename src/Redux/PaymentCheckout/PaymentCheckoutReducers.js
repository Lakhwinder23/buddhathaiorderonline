import {
  PAYMENT_CHECKOUT_REQUEST,
  PAYMENT_CHECKOUT_SUCCESS,
  PAYMENT_CHECKOUT_FALIURE
} from './PaymentCheckoutConstants'

const intialstate = {
  payment_checkout_loading : false,
  payment_checkout : [],
  payment_checkout_error : '',
  payment_checkout_success : false
}

const PaymentCheckoutReducers = (state = intialstate,action) =>{
  switch(action.type){
    case PAYMENT_CHECKOUT_REQUEST : return{
      ...state,
      payment_checkout_loading:true
    }
    case PAYMENT_CHECKOUT_SUCCESS : return{
      ...state,
      payment_checkout_loading:false,
      payment_checkout_success:true,
      payment_checkout:action.payload
    }
    case PAYMENT_CHECKOUT_FALIURE : return{
      ...state,
      payment_checkout_error:action.payload
    }
    default: return state
  }

}

export default PaymentCheckoutReducers
