import {
  FETCH_RESTAURANT_TIMING_REQUEST,
  FETCH_RESTAURANT_TIMING_SUCCESS,
  FETCH_RESTAURANT_TIMING_FALIURE
} from './RestaurantTimingConstants'

const intialstate = {
  restaurant_timing_loading : false,
  restaurant_timing : [],
  restaurant_timing_error : ''
}

const RestaurantTimingReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_RESTAURANT_TIMING_REQUEST : return{
      ...state,
      restaurant_timing_loading:true
    }
    case FETCH_RESTAURANT_TIMING_SUCCESS : return{
      ...state,
      restaurant_timing_loading:false,
      restaurant_timing:action.payload
    }
    case FETCH_RESTAURANT_TIMING_FALIURE : return{
      ...state,
      restaurant_timing_error:action.payload
    }
    default: return state
  }

}

export default RestaurantTimingReducers
