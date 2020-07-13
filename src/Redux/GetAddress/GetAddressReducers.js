import {
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FALIURE
} from './GetAddressConstants'

const intialstate = {
  address_loading : false,
  address : [],
  address_error : ''
}

const GetAddressReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_ADDRESS_REQUEST : return{
      ...state,
      address_loading:true
    }
    case FETCH_ADDRESS_SUCCESS : return{
      ...state,
      address_loading:false,
      address:action.payload
    }
    case FETCH_ADDRESS_FALIURE : return{
      ...state,
      address_error:action.payload
    }
    default: return state
  }

}

export default GetAddressReducers
