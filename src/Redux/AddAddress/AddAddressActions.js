import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FALIURE
} from './AddAddressConstants'
import {config} from '../../config'

export const addAddressRequest = (address_info) =>{
  return{
    type : ADD_ADDRESS_REQUEST,
    payload : address_info
  }
}

export const addAddressSuccess = (add_address_success) =>{
  return{
    type : ADD_ADDRESS_SUCCESS,
    payload : add_address_success
  }
}

export const addAddressFaliure = (error) =>{
  return{
    type : ADD_ADDRESS_FALIURE,
    payload : error
  }
}

export const addAddress = (address_info) =>{
    return(dispatch) => {
      dispatch(addAddressRequest(address_info))
      const url =`${config.api_base}/users/address?user_id=${address_info.final_user_checkout_email}&access_token=${address_info.final_user_checkout_token}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            form_id: "",
            user_id: address_info.final_user_checkout_email,
            fields: {
            address_id: "",
            firstName: address_info.first_name,
            middleName: "",
            lastName: address_info.last_name,
            address1: address_info.address,
            address2: "",
            city: address_info.city,
            state: address_info.state,
            country: address_info.country,
            postalCode: address_info.postal_code,
            mobileNumber: address_info.telephone,
            email: address_info.email
            }

          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(add_address_res =>{
      const add_address_success = add_address_res
      dispatch(addAddressSuccess(add_address_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(addAddressFaliure(errorMsg))
    })
    }
}
