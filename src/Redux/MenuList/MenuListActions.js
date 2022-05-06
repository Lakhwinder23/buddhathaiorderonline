import {
  FETCH_MENULIST_REQUEST,
  FETCH_MENULIST_SUCCESS,
  FETCH_MENULIST_FALIURE
} from './MenuListConstants'
import {config} from '../../config'

export const fetchMenuListRequest = (menulist_info) =>{
  return{
    type : FETCH_MENULIST_REQUEST,
    payload:menulist_info
  }
}

export const fetchMenuListSuccess = (menulist_info_success) =>{
  return{
    type : FETCH_MENULIST_SUCCESS,
    payload : menulist_info_success
  }
}

export const fetchMenuListFaliure = (error) =>{
  return{
    type : FETCH_MENULIST_FALIURE,
    payload : error
  }
}

export const fetchMenuList = (menulist_info) =>{
  console.log('menulist_info1', menulist_info);
    return(dispatch) => {
      dispatch(fetchMenuListRequest(menulist_info))
      const url =`${menulist_info.static_resource_endpoint}${menulist_info.static_resource_categories_prefix}${menulist_info.rest_merchant_id}${menulist_info.static_resource_sufix}`;
      const request_option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(menulist_info_res =>{
      const menulist_info_success = menulist_info_res
      dispatch(fetchMenuListSuccess(menulist_info_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchMenuListFaliure(errorMsg))
    })
    }
}
