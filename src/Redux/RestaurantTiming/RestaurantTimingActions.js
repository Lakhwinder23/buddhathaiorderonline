import {
  FETCH_RESTAURANT_TIMING_REQUEST,
  FETCH_RESTAURANT_TIMING_SUCCESS,
  FETCH_RESTAURANT_TIMING_FALIURE
} from './RestaurantTimingConstants'
import {config} from '../../config'

export const fetchRestaurantTimingRequest = (user_token) =>{
  return{
    type : FETCH_RESTAURANT_TIMING_REQUEST,
    payload:user_token
  }
}

export const fetchRestaurantTimingSuccess = (restaurant_timing_success) =>{
  return{
    type : FETCH_RESTAURANT_TIMING_SUCCESS,
    payload : restaurant_timing_success
  }
}

export const fetchRestaurantTimingFaliure = (error) =>{
  return{
    type : FETCH_RESTAURANT_TIMING_FALIURE,
    payload : error
  }
}

export const fetchRestaurantTiming = (user_token) =>{
    return(dispatch) => {
      dispatch(fetchRestaurantTimingRequest(user_token))
      const url =`${config.api_base}/merchants/timing_v2`;
      const bearer = "Bearer " + user_token;
      const request_option = {
      method: "GET",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(restaurant_timing_res =>{
      const restaurant_timing_success = restaurant_timing_res
      dispatch(fetchRestaurantTimingSuccess(restaurant_timing_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchRestaurantTimingFaliure(errorMsg))
    })
    }
}
