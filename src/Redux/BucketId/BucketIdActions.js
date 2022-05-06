import {
  FETCH_BUCKET_ID_REQUEST,
  FETCH_BUCKET_ID_SUCCESS,
  FETCH_BUCKET_ID_FALIURE,
  FETCH_OFFER_DATA_REQUEST,
  FETCH_OFFER_DATA_SUCCESS,
  FETCH_OFFER_DATA_FALIURE
} from './BucketIdConstants'
import {config} from '../../config'

export const fetchBucketIdRequest = (bucket_id_info) =>{
  return{
    type : FETCH_BUCKET_ID_REQUEST,
    payload:bucket_id_info
  }
}

export const fetchBucketIdSuccess = (bucket_id_data_success) =>{
  return{
    type : FETCH_BUCKET_ID_SUCCESS,
    payload : bucket_id_data_success
  }
}

export const fetchBucketIdFaliure = (error) =>{
  return{
    type : FETCH_BUCKET_ID_FALIURE,
    payload : error
  }
}

export const fetchOfferDataRequest = (offername) =>{
  return{
    type : FETCH_OFFER_DATA_REQUEST,
    payload:offername
  }
}

export const fetchOfferDataSuccess = (bucket_id_data_success) =>{
  return{
    type : FETCH_OFFER_DATA_SUCCESS,
    payload : bucket_id_data_success
  }
}

export const fetchOfferDataFaliure = (error) =>{
  return{
    type : FETCH_OFFER_DATA_FALIURE,
    payload : error
  }
}

export const fetchBucketId = (bucket_id_info) =>{
    return(dispatch) => {
      dispatch(fetchBucketIdRequest(bucket_id_info))
      const url =`${config.api_base}/users/business/bucket?access_token=${bucket_id_info.user_token}&user_id=${bucket_id_info.user_email}`;
      const bearer = "Bearer " + bucket_id_info.user_token;
      const request_option = {
      method: "GET",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(bucket_id_data_res =>{
      const bucket_id_data_success = bucket_id_data_res
      dispatch(fetchBucketIdSuccess(bucket_id_data_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchBucketIdFaliure(errorMsg))
    })
    }
}

export const fetchOfferData = (offername) =>{
    return(dispatch) => {
      dispatch(fetchOfferDataRequest(offername))
      const url =`${config.api_base}/users/business/bucket/${offername.bucket_id}/offer/compliment/${offername.offer_name}`;
      const bearer = "Bearer " + offername.user_token;
      const request_option = {
      method: "GET",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(bucket_id_data_res =>{
      const bucket_id_data_success = bucket_id_data_res
      dispatch(fetchOfferDataSuccess(bucket_id_data_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchOfferDataFaliure(errorMsg))
    })
    }
}
