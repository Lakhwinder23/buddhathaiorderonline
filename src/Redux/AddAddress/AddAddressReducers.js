import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FALIURE
} from './AddAddressConstants'

const intialstate = {
  add_address_loading : false,
  add_address : [],
  add_address_error : '',
  add_address_success : false
}

const AddAddressReducers = (state = intialstate,action) =>{
  switch(action.type){
    case ADD_ADDRESS_REQUEST : return{
      ...state,
      add_address_loading:true
    }
    case ADD_ADDRESS_SUCCESS : return{
      ...state,
      add_address_loading:false,
      add_address_success:true,
      add_address:action.payload
    }
    case ADD_ADDRESS_FALIURE : return{
      ...state,
      add_address_error:action.payload
    }
    default: return state
  }

}

export default AddAddressReducers
