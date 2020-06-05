import {
  ADD_TIP_REQUEST,
  ADD_TIP_SUCCESS,
  ADD_TIP_FALIURE
} from './AddTipConstants'

const intialstate = {
  add_tip_loading : false,
  add_tip : [],
  add_tip_error : '',
  add_tip_success : false
}

const AddTipReducers = (state = intialstate,action) =>{
  switch(action.type){
    case ADD_TIP_REQUEST : return{
      ...state,
      add_tip_loading:true
    }
    case ADD_TIP_SUCCESS : return{
      ...state,
      add_tip_loading:false,
      add_tip_success:true,
      add_tip:action.payload
    }
    case ADD_TIP_FALIURE : return{
      ...state,
      add_tip_error:action.payload
    }
    default: return state
  }

}

export default AddTipReducers
