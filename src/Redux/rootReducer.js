import {combineReducers} from 'redux';
import MerchantTokenReducers from './MerchantToken/MerchantTokenReducers'
import ConfigReducers from './Config/ConfigReducers'
import BucketReducers from './Bucket/BucketReducers'
import RestaurantInformationReducers from './RestaurantInformation/RestaurantInformationReducers'
import MenuListReducers from './MenuList/MenuListReducers'
import BucketIdReducers from './BucketId/BucketIdReducers'
import AddItemsReducers from './AddItems/AddItemsReducers'
import UpdateItemQuantityReducers from './UpdateItemQuantity/UpdateItemQuantityReducers'
import AddTipReducers from './AddTip/AddTipReducers'
import UpdateShippingMethodReducers from './UpdateShippingMethod/UpdateShippingMethodReducers'
import RestaurantTimingReducers from './RestaurantTiming/RestaurantTimingReducers'
import ApplyCouponReducers from './ApplyCoupon/ApplyCouponReducers'
import RemoveCouponReducers from './RemoveCoupon/RemoveCouponReducers'
import PaymentCheckoutReducers from './PaymentCheckout/PaymentCheckoutReducers'
import AddAddressReducers from './AddAddress/AddAddressReducers'
import GetCountriesReducers from './GetCountries/GetCountriesReducers'
import GetStatesReducers from './GetStates/GetStatesReducers'
import GetAddressReducers from './GetAddress/GetAddressReducers'
import OrderAheadReducers from './OrderAheadData/OrderAheadReducers'



const rootReducer = combineReducers({
       MerchantToken:MerchantTokenReducers,
       Config:ConfigReducers,
       Bucket:BucketReducers,
       RestaurantInformation:RestaurantInformationReducers,
       MenuList:MenuListReducers,
       BucketId:BucketIdReducers,
       AddItems:AddItemsReducers,
       UpdateItemQuantity:UpdateItemQuantityReducers,
       AddTip:AddTipReducers,
       UpdateShippingMethod:UpdateShippingMethodReducers,
       RestaurantTiming:RestaurantTimingReducers,
       ApplyCoupon:ApplyCouponReducers,
       RemoveCoupon:RemoveCouponReducers,
       PaymentCheckout:PaymentCheckoutReducers,
       AddAddress:AddAddressReducers,
       GetCountries:GetCountriesReducers,
       GetStates:GetStatesReducers,
       GetAddress:GetAddressReducers,
       OrderAhead:OrderAheadReducers
})

export default rootReducer
