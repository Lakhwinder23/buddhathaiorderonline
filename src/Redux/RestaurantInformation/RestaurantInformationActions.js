import {
  FETCH_RESTAURANT_INFORMATION_REQUEST,
  FETCH_RESTAURANT_INFORMATION_SUCCESS,
  FETCH_RESTAURANT_INFORMATION_FALIURE
} from './RestaurantInformationConstants'
import {config} from '../../config'

export const fetchRestaurantInformationRequest = (restaurant_info_data) =>{
  return{
    type : FETCH_RESTAURANT_INFORMATION_REQUEST,
    payload:restaurant_info_data
  }
}

export const fetchRestaurantInformationSuccess = (restaurant_info_success) =>{
  return{
    type : FETCH_RESTAURANT_INFORMATION_SUCCESS,
    payload : restaurant_info_success
  }
}

export const fetchRestaurantInformationFaliure = (error) =>{
  return{
    type : FETCH_RESTAURANT_INFORMATION_FALIURE,
    payload : error
  }
}

export const fetchRestaurantInformation = (restaurant_info_data) =>{
    return(dispatch) => {
      dispatch(fetchRestaurantInformationRequest(restaurant_info_data))
      const url =`${restaurant_info_data.static_resource_endpoint}${config.resid}${restaurant_info_data.static_resource_sufix}`;
      const request_option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(restaurant_info_res =>{
      const restaurant_info_success = restaurant_info_res
      dispatch(fetchRestaurantInformationSuccess(restaurant_info_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchRestaurantInformationFaliure(errorMsg))
    })
    }
}
