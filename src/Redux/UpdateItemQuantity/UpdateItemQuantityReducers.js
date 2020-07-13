import {
  UPDATE_ITEM_QNTY_REQUEST,
  UPDATE_ITEM_QNTY_SUCCESS,
  UPDATE_ITEM_QNTY_FALIURE
} from './UpdateItemQuantityConstants'

const intialstate = {
  update_item_qty_loading : false,
  update_item_qty : [],
  update_item_qty_error : '',
  update_item_qty_success : false
}

const UpdateItemQuantityReducers = (state = intialstate,action) =>{
  switch(action.type){
    case UPDATE_ITEM_QNTY_REQUEST : return{
      ...state,
      update_item_qty_loading:true
    }
    case UPDATE_ITEM_QNTY_SUCCESS : return{
      ...state,
      update_item_qty_loading:false,
      update_item_qty_success:true,
      update_item_qty:action.payload
    }
    case UPDATE_ITEM_QNTY_FALIURE : return{
      ...state,
      update_item_qty_error:action.payload
    }
    default: return state
  }

}

export default UpdateItemQuantityReducers
