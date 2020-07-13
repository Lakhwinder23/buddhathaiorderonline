import {
  FETCH_BUCKET_ID_REQUEST,
  FETCH_BUCKET_ID_SUCCESS,
  FETCH_BUCKET_ID_FALIURE
} from './BucketIdConstants'

const intialstate = {
  bucket_id_loading : false,
  bucket_id : [],
  bucket_id_error : ''
}

const BucketIdReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_BUCKET_ID_REQUEST : return{
      ...state,
      bucket_id_loading:true
    }
    case FETCH_BUCKET_ID_SUCCESS : return{
      ...state,
      bucket_id_loading:false,
      bucket_id:action.payload
    }
    case FETCH_BUCKET_ID_FALIURE : return{
      ...state,
      bucket_id_error:action.payload
    }
    default: return state
  }

}

export default BucketIdReducers
