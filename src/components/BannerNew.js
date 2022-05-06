import React from 'react'
import { useSelector } from 'react-redux';
import {config} from '../config';
function BannerNew(){
  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
  const config_data = useSelector(state =>state.Config)
  return(
    <>
    {restaurantInformation_data &&
      Object.keys(restaurantInformation_data).length > 0 &&
      restaurantInformation_data.restaurant_info &&
      restaurantInformation_data.restaurant_info.object &&
      restaurantInformation_data.restaurant_info.request_status === true &&
      Object.keys(restaurantInformation_data.restaurant_info.object).length > 0 ?
      (
      <div className="row banner">
        <div className="container">
          <div className="banner-info">
            <div className="row">
              <div className="col-xs-12 col-lg-3 col-md-3 banner-left">
              {restaurantInformation_data.restaurant_info.object.BANNER ?
                (
                <img src={restaurantInformation_data.restaurant_info.object.BANNER} alt="images not found" />
                ) : null}
              </div>
              <div className="col-xs-12 col-lg-9  col-md-9 banner-right" >
                <div className="row">
                  <div className="col-xs-12 col-lg-4 col-md-4 restaurant-info">
                    <h3>{restaurantInformation_data.restaurant_info.object.name}</h3>
                    <p>{restaurantInformation_data.restaurant_info.object.tagLine ? restaurantInformation_data.restaurant_info.object.tagLine : null}</p>
                    <p className="Hdraddress">{restaurantInformation_data.restaurant_info.object.address_address},</p>
                    <p className="Hdraddresscity">{restaurantInformation_data.restaurant_info.object.address_city}, {restaurantInformation_data.restaurant_info.object.address_state} {restaurantInformation_data.restaurant_info.object.name_point}</p>
                  </div>
                  <div className="col-xs-12 col-lg-4 col-md-4">
                    <div className="restaurant-hours">
                      <span className="font-weight-bold">Hours of Operation</span>
                      {config_data && config_data.config && config_data.config.object && config_data.config.object.SHOP_TIMING_V2 && Object.keys(config_data.config.object.SHOP_TIMING_V2).length > 0 && config_data.config.object.SHOP_TIMING_V2.data && config_data.config.object.SHOP_TIMING_V2.data.length > 0 ? config_data.config.object.SHOP_TIMING_V2.data.map((shopTiming,index) =>(
                        <><br />{shopTiming.openingDay == shopTiming.closingDay ?  shopTiming.openingDay.slice(0,3) + ' ' +shopTiming.openingTime+'-'+shopTiming.closingTime:shopTiming.openingDay.slice(0,3)+'-'+shopTiming.closingDay.slice(0,3) + ' ' +shopTiming.openingTime+'-'+shopTiming.closingTime}</>
                      )):null}
                    </div>
                  </div>
                  <div className ="col-lg-4 col-md-4"></div>
                </div>
                <div className="row restaurant-extra-info">
                  <div className="col-lg-2 col-md-2 col-xs-4 restaurant-extra-info-part">
                    <div className="star"><i style={{fontStyle: 'normal'}}>★</i> <span>5.0</span></div>
                    <p>300+ Ratings</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xs-4 restaurant-extra-info-part" >
                    <span>{restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_PICKUP_TIME}</span>
                    <p>Pickup Time</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-xs-4 restaurant-extra-info-part">
                    <span>{restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_MINIMUM_ORDER === 0 ? `$${restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_MINIMUM_ORDER}` : 'No'}</span>
                    <p>Minimum order</p>
                  </div>
                  <div className="col-lg-6 col-md-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ): null
   }
    </>
  )
}

export default BannerNew
