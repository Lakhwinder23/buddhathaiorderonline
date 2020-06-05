import {
  PAYMENT_CHECKOUT_REQUEST,
  PAYMENT_CHECKOUT_SUCCESS,
  PAYMENT_CHECKOUT_FALIURE
} from './PaymentCheckoutConstants'
import {config} from '../../config'

export const paymentCheckoutRequest = (payment_checkout_info) =>{
  return{
    type : PAYMENT_CHECKOUT_REQUEST,
    payload : payment_checkout_info
  }
}

export const paymentCheckoutSuccess = (payment_checkout_success) =>{
  return{
    type : PAYMENT_CHECKOUT_SUCCESS,
    payload : payment_checkout_success
  }
}

export const paymentCheckoutFaliure = (error) =>{
  return{
    type : PAYMENT_CHECKOUT_FALIURE,
    payload : error
  }
}

export const paymentCheckout = (payment_checkout_info) =>{
    return(dispatch) => {
      dispatch(paymentCheckoutRequest(payment_checkout_info))
      const url =`${config.api_base}/users/business/order/payment/checkout?access_token=${payment_checkout_info.final_user_checkout_token}`;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fields: {
              address1: payment_checkout_info.address != undefined ? payment_checkout_info.address : "" ,
              addressId: payment_checkout_info.addressId != undefined ? payment_checkout_info.addressId: "",
              bucketId: payment_checkout_info.Unique_bucket_Id,
              cardToken: payment_checkout_info.payment_token,
              city: payment_checkout_info.city != undefined ? payment_checkout_info.city : "" ,
              country: payment_checkout_info.country != undefined ? payment_checkout_info.country : "" ,
              email: payment_checkout_info.email != undefined ? payment_checkout_info.email : "",
              firstName: payment_checkout_info.first_name != undefined ? payment_checkout_info.first_name : "" ,
              gatewayId: payment_checkout_info.gatewayId,
              instrumentMode: "cc",
              lastName: payment_checkout_info.last_name != undefined ? payment_checkout_info.last_name:"",
              mobileNumber: payment_checkout_info.telephone != undefined ? payment_checkout_info.telephone:"",
              notes:payment_checkout_info.notes_restaurant,
              orderDate: "",
              orderTime: "",
              paymentType: "stripe",
              postalCode: payment_checkout_info.postal_code != undefined ? payment_checkout_info.postal_code :"",
              state: payment_checkout_info.state != undefined ? payment_checkout_info.state : ""
            },
            form_id: "",
            user_id: payment_checkout_info.final_user_checkout_email,
            process_centeralized_payment : payment_checkout_info.process_centeralized_payment


          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(payment_checkout_res =>{
      const payment_checkout_success = payment_checkout_res
      dispatch(paymentCheckoutSuccess(payment_checkout_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(paymentCheckoutFaliure(errorMsg))
    })
    }
}
