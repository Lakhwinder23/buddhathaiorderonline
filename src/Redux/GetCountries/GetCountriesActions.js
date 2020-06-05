import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FALIURE
} from './GetCountriesConstants'
import {config} from '../../config'

export const fetchCountriesRequest = (countries_info) =>{
  return{
    type : FETCH_COUNTRIES_REQUEST,
    payload:countries_info
  }
}

export const fetchCountriesSuccess = (countries_success) =>{
  return{
    type : FETCH_COUNTRIES_SUCCESS,
    payload : countries_success
  }
}

export const fetchCountriesFaliure = (error) =>{
  return{
    type : FETCH_COUNTRIES_FALIURE,
    payload : error
  }
}

export const fetchCountries = (countries_info) =>{
    return(dispatch) => {
      dispatch(fetchCountriesRequest(countries_info))
      const url =`${config.api_base}/enterprised/countries?access_token=${countries_info.user_token}&pageSize=250&status=ACTIVE`;
      const request_option = {
      method: "GET"
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(countries_res =>{
      const countries_success = countries_res
      dispatch(fetchCountriesSuccess(countries_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(fetchCountriesFaliure(errorMsg))
    })
    }
}
