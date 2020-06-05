import {
  FETCH_BUCKET_DATA_REQUEST,
  FETCH_BUCKET_DATA_SUCCESS,
  FETCH_BUCKET_DATA_FALIURE
} from './BucketConstants'
import {config} from '../../config'

export const fetchBucketRequest = (bucket_info) =>{
  return{
    type : FETCH_BUCKET_DATA_REQUEST,
    payload:bucket_info
  }
}

export const fetchBucketSuccess = (bucket_data_success) =>{
  return{
    type : FETCH_BUCKET_DATA_SUCCESS,
    payload : bucket_data_success
  }
}

export const fetchBucketFaliure = (error) =>{
  return{
    type : FETCH_BUCKET_DATA_FALIURE,
    payload : error
  }
}

export const fetchBucket = (bucket_info) =>{
    return(dispatch) => {
      dispatch(fetchBucketRequest(bucket_info))
      const url =`${config.api_base}/users/business/bucket/dci?access_token=${bucket_info.user_token}&bucket_id=${bucket_info.user_local_bucket_id}&user_id=${bucket_info.user_email}`;
      const request_option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
          }
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(bucket_data_res =>{
      const bucket_data_success = bucket_data_res
      dispatch(fetchBucketSuccess(bucket_data_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchBucketFaliure(errorMsg))
    })
    }
}
