import {
  FETCH_RESTAURANT_INFORMATION_REQUEST,
  FETCH_RESTAURANT_INFORMATION_SUCCESS,
  FETCH_RESTAURANT_INFORMATION_FALIURE,
    FETCH_OFFERSLIST_SUCCESS
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
export const fetchOfferslistSuccess = (restaurant_info_success) =>{
  return{
    type : FETCH_OFFERSLIST_SUCCESS,
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

export const fetchOfferlists = (coupon_info) =>{
    return(dispatch) => {
      dispatch(fetchRestaurantInformationRequest(coupon_info))
      const bearer = "Bearer " + coupon_info.finalUserToken;
      const url = `${config.api_base}/merchants/coupon/describe/${coupon_info.mid}/public?&pageSize=100&pageNumber=0`;
      const request_option = {
      method: "GET",
      headers: {
          Authorization: bearer,
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(restaurant_info_res =>{
      const restaurant_info_success = restaurant_info_res
      dispatch(fetchOfferslistSuccess(restaurant_info_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchRestaurantInformationFaliure(errorMsg))
    })
    }
}
