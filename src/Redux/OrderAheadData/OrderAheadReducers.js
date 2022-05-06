import {
  FETCH_ORDERAHEAD_REQUEST,
  FETCH_ORDERAHEADDATE_SUCCESS,
  FETCH_ORDERAHEADTIME_SUCCESS,
  FETCH_ORDERAHEAD_FALIURE
} from './OrderAheadConstants'

const intialstate = {
  orderahead_loading : false,
  orderahead : [],
  localdate:null,
  localtime:null,
  orderahead_error : ''
}

const OrderAheadReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_ORDERAHEAD_REQUEST : return{
      ...state,
      orderahead_loading:true
    }
    case FETCH_ORDERAHEADDATE_SUCCESS : return{
      ...state,
      orderahead_loading:false,
      localdate:action.payload
    }
    case FETCH_ORDERAHEADTIME_SUCCESS : return{
      ...state,
      orderahead_loading:false,
      localtime:action.payload
    }
    case FETCH_ORDERAHEAD_FALIURE : return{
      ...state,
      orderahead_error:action.payload
    }
    default: return state
  }

}

export default OrderAheadReducers
