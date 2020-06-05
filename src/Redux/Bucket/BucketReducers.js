import {
  FETCH_BUCKET_DATA_REQUEST,
  FETCH_BUCKET_DATA_SUCCESS,
  FETCH_BUCKET_DATA_FALIURE
} from './BucketConstants'

const intialstate = {
  bucket_loading : false,
  bucket : [],
  bucket_error : ''
}

const BucketReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_BUCKET_DATA_REQUEST : return{
      ...state,
      bucket_loading:true
    }
    case FETCH_BUCKET_DATA_SUCCESS : return{
      ...state,
      bucket_loading:false,
      bucket:action.payload
    }
    case FETCH_BUCKET_DATA_FALIURE : return{
      ...state,
      bucket_error:action.payload
    }
    default: return state
  }

}

export default BucketReducers
