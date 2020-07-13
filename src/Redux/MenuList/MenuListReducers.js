import {
  FETCH_MENULIST_REQUEST,
  FETCH_MENULIST_SUCCESS,
  FETCH_MENULIST_FALIURE
} from './MenuListConstants'

const intialstate = {
  menulist_loading : false,
  menulist : [],
  menulist_error : ''
}

const MenuListReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_MENULIST_REQUEST : return{
      ...state,
      menulist_loading:true
    }
    case FETCH_MENULIST_SUCCESS : return{
      ...state,
      menulist_loading:false,
      menulist:action.payload
    }
    case FETCH_MENULIST_FALIURE : return{
      ...state,
      menulist_error:action.payload
    }
    default: return state
  }

}

export default MenuListReducers
