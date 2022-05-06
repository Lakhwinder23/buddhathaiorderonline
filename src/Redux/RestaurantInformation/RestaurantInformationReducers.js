import {
  FETCH_RESTAURANT_INFORMATION_REQUEST,
  FETCH_RESTAURANT_INFORMATION_SUCCESS,
  FETCH_RESTAURANT_INFORMATION_FALIURE,
  FETCH_OFFERSLIST_SUCCESS
} from './RestaurantInformationConstants'

const intialstate = {
  restaurant_info_loading : false,
  restaurant_info : [],
  restaurant_info_error : '',
  offerslist:[]
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
    case FETCH_OFFERSLIST_SUCCESS : return{
      ...state,
      restaurant_info_loading:false,
      offerslist:action.payload
    }
    default: return state
  }

}

export default RestaurantInformationReducers
