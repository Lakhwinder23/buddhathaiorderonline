import {
  UPDATE_SHIPPING_METHOD_REQUEST,
  UPDATE_SHIPPING_METHOD_SUCCESS,
  UPDATE_SHIPPING_METHOD_FALIURE
} from './UpdateShippingMethodConstants'

const intialstate = {
  update_shipping_method_loading : false,
  update_shipping_method : [],
  update_shipping_method_error : '',
  update_shipping_method_success : false
}

const UpdateShippingMethodReducers = (state = intialstate,action) =>{
  switch(action.type){
    case UPDATE_SHIPPING_METHOD_REQUEST : return{
      ...state,
      update_shipping_method_loading:true
    }
    case UPDATE_SHIPPING_METHOD_SUCCESS : return{
      ...state,
      update_shipping_method_success:true,
      update_shipping_method:action.payload,
      update_shipping_method_loading:false,
    }
    case UPDATE_SHIPPING_METHOD_FALIURE : return{
      ...state,
      update_shipping_method_error:action.payload
    }
    default: return state
  }

}

export default UpdateShippingMethodReducers
