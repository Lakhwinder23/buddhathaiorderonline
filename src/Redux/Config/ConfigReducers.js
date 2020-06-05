import {
  FETCH_CONFIG_DATA_REQUEST,
  FETCH_CONFIG_DATA_SUCCESS,
  FETCH_CONFIG_DATA_FALIURE
} from './ConfigConstants'

const intialstate = {
  config_loading : false,
  config : [],
  config_error : ''
}

const ConfigReducers = (state = intialstate,action) =>{
  switch(action.type){
    case FETCH_CONFIG_DATA_REQUEST : return{
      ...state,
      config_loading:true
    }
    case FETCH_CONFIG_DATA_SUCCESS : return{
      ...state,
      config_loading:false,
      config:action.payload
    }
    case FETCH_CONFIG_DATA_FALIURE : return{
      ...state,
      config_error:action.payload
    }
    default: return state
  }

}

export default ConfigReducers
