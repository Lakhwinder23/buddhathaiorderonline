import {
  FETCH_MERCHANT_TOKEN_REQUEST,
  FETCH_MERCHANT_TOKEN_SUCCESS,
  FETCH_MERCHANT_TOKEN_FALIURE
} from './MerchantTokenConstants'

const intialstate = {
  merchant_token_loading : false,
  merchant_token : [],
  merchant_token_error : ''
}

const MerchantTokenReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_MERCHANT_TOKEN_REQUEST : return{
      ...state,
      merchant_token_loading:true
    }
    case FETCH_MERCHANT_TOKEN_SUCCESS : return{
      ...state,
      merchant_token_loading:false,
      merchant_token:action.payload
    }
    case FETCH_MERCHANT_TOKEN_FALIURE : return{
      ...state,
      merchant_token_error:action.payload
    }
    default: return state
  }

}

export default MerchantTokenReducers
