import {
  ADD_ITEMS_REQUEST,
  ADD_ITEMS_SUCCESS,
  ADD_ITEMS_FALIURE
} from './AddItemsConstants'

const intialstate = {
  add_item_loading : false,
  add_item : [],
  add_item_error : '',
  add_item_success : false
}

const AddItemsReducers = (state = intialstate,action) =>{
  switch(action.type){
    case ADD_ITEMS_REQUEST : return{
      ...state,
      add_item_loading:true
    }
    case ADD_ITEMS_SUCCESS : return{
      ...state,
      add_item_loading:false,
      add_item_success:true,
      add_item:action.payload
    }
    case ADD_ITEMS_FALIURE : return{
      ...state,
      add_item_error:action.payload
    }
    default: return state
  }

}

export default AddItemsReducers
