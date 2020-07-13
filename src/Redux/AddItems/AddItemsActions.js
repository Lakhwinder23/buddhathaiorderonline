import {
  ADD_ITEMS_REQUEST,
  ADD_ITEMS_SUCCESS,
  ADD_ITEMS_FALIURE
} from './AddItemsConstants'
import {config} from '../../config'

export const addItemsRequest = (items_info) =>{
  return{
    type : ADD_ITEMS_REQUEST,
    payload : items_info
  }
}

export const addItemsSuccess = (add_items_success) =>{
  return{
    type : ADD_ITEMS_SUCCESS,
    payload : add_items_success
  }
}

export const addItemsFaliure = (error) =>{
  return{
    type : ADD_ITEMS_FALIURE,
    payload : error
  }
}

export const addItems = (items_info) =>{
    return(dispatch) => {
      dispatch(addItemsRequest(items_info))
      const url =`${config.api_base}/users/business/bucket/item`;
      const bearer = "Bearer" + items_info.final_user_token;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
              //"user_id" : "hjjcjcjcj@gmail.com",
              Authorization: bearer
          },
          body: JSON.stringify({
            fields: {
              addOns:items_info.final_addon_array == undefined ? undefined : items_info.final_addon_array,
              bucketId: items_info.Unique_bucket_Id,
              productId: items_info.product_id,
              cookingInstruction:items_info.cookingInstruction != null ? items_info.cookingInstruction : undefined,
              quantity: "1"
            },
            form_id: "",
            user_id: items_info.final_user_email
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(add_items_res =>{
      const add_items_success = add_items_res
      dispatch(addItemsSuccess(add_items_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(addItemsFaliure(errorMsg))
    })
    }
}
