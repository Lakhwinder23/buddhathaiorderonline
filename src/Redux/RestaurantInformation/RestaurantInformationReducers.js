import {
  FETCH_RESTAURANT_INFORMATION_REQUEST,
  FETCH_RESTAURANT_INFORMATION_SUCCESS,
  FETCH_RESTAURANT_INFORMATION_FALIURE
} from './RestaurantInformationConstants'

const intialstate = {
  restaurant_info_loading : false,
  restaurant_info : [],
  restaurant_info_error : ''
}

const RestaurantInformationReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_RESTAURANT_INFORMATION_REQUEST : return{
      ...state,
      restaurant_info_loading:true
    }
    case FETCH_RESTAURANT_INFORMATION_SUCCESS : return{
      ...state,
      restaurant_info_loading:false,
      restaurant_info:action.payload
    }
    case FETCH_RESTAURANT_INFORMATION_FALIURE : return{
      ...state,
      restaurant_info_error:action.payload
    }
    default: return state
  }

}

export default RestaurantInformationReducers
