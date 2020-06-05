import {
  UPDATE_ITEM_QNTY_REQUEST,
  UPDATE_ITEM_QNTY_SUCCESS,
  UPDATE_ITEM_QNTY_FALIURE
} from './UpdateItemQuantityConstants'
import {config} from '../../config'

export const updateItemQuantityRequest = (update_item_qty_info) =>{
  return{
    type : UPDATE_ITEM_QNTY_REQUEST,
    payload : update_item_qty_info
  }
}

export const updateItemQuantitySuccess = (update_item_qty_success) =>{
  return{
    type : UPDATE_ITEM_QNTY_SUCCESS,
    payload : update_item_qty_success
  }
}

export const updateItemQuantityFaliure = (error) =>{
  return{
    type : UPDATE_ITEM_QNTY_FALIURE,
    payload : error
  }
}

export const updateItemQuantity = (update_item_qty_info) =>{
    return(dispatch) => {
      dispatch(updateItemQuantityRequest(update_item_qty_info))
      const url =`${config.api_base}/users/business/bucket/update/item/qty?access_token=${update_item_qty_info.final_user_token}&bucket_id=${update_item_qty_info.bucket_id}&user_id=${update_item_qty_info.final_user_email}`;
      const bearer = "Bearer" + update_item_qty_info.final_user_token;
      const request_option = {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
              //"user_id" : "hjjcjcjcj@gmail.com",
              Authorization: bearer
          },
          body: JSON.stringify({
            fields: {
              bucketId: update_item_qty_info.bucket_id,
              bucketItemId: update_item_qty_info.bucketItemId,
              quantity: update_item_qty_info.quantity
            },
            form_id: "",
            user_id: update_item_qty_info.final_user_email
          })
    }
    fetch(url, request_option)
    .then(response => response.json())
    .then(update_item_qty_res =>{
      const update_item_qty_success = update_item_qty_res
      dispatch(updateItemQuantitySuccess(update_item_qty_success))
    })
    .catch(error => {
      const errorMsg = error
      dispatch(updateItemQuantityFaliure(errorMsg))
    })
    }
}
