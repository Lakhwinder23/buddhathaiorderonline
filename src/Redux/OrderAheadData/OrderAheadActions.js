import {
  FETCH_ORDERAHEAD_REQUEST,
  FETCH_ORDERAHEADDATE_SUCCESS,
  FETCH_ORDERAHEADTIME_SUCCESS,
  FETCH_ORDERAHEAD_FALIURE
} from './OrderAheadConstants'
import {config} from '../../config'

export const fetchOrderAheadRequest = (address_info) =>{
  return{
    type : FETCH_ORDERAHEAD_REQUEST,
    payload:address_info
  }
}

export const fetchOrderAheadDateSuccess = (address_success) =>{
  return{
    type : FETCH_ORDERAHEADDATE_SUCCESS,
    payload : address_success
  }
}
export const fetchOrderAheadTimeSuccess = (address_success) =>{
  return{
    type : FETCH_ORDERAHEADTIME_SUCCESS,
    payload : address_success
  }
}

export const fetchOrderAheadFaliure = (error) =>{
  return{
    type : FETCH_ORDERAHEAD_FALIURE,
    payload : error
  }
}

export const updateOrderAhead = (localdate,localtime) =>{
    return(dispatch) => {
      dispatch(fetchOrderAheadRequest(localdate))
      dispatch(fetchOrderAheadDateSuccess(localdate))
      dispatch(fetchOrderAheadTimeSuccess(localtime))
    }
}
