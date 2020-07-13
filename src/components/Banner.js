import React from 'react'
import { useSelector } from 'react-redux';

function Banner(){
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
        <div className="banar">
        <div className="container">
          <div className="bn-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <div className="bn-left">
                  <div className="bnl-one">
                  {restaurantInformation_data.restaurant_info.object.LOGO ?
                    (
                    <img src={restaurantInformation_data.restaurant_info.object.LOGO} alt="images not found" />
                  ) : null}
                  </div>
                  <div className="dt-rest13 col-lg-8">
                    <div className="dt-rest6">
                      <div className="dt-rest2">
                        <div className="dt-rest3">
                          <h1 title="Tiffin's India Cafe" className="dt-rest5">
                          {restaurantInformation_data.restaurant_info.object.name}</h1>
                        </div>
                      </div>
                      <div className="dt-rest9 dt-rest10">{restaurantInformation_data.restaurant_info.object.tagLine ? restaurantInformation_data.restaurant_info.object.tagLine : null}</div>
                      <div className="dt-rest11 dt-rest12">{restaurantInformation_data.restaurant_info.object.address_address},  {restaurantInformation_data.restaurant_info.object.address_city}, {restaurantInformation_data.restaurant_info.object.name_point}</div>
                    </div>
                      <div className="dt-resthours">
                        <span>Hours of Operation</span>
                        {config_data && config_data.config && config_data.config.object && config_data.config.object.SHOP_TIMING_V2 && Object.keys(config_data.config.object.SHOP_TIMING_V2).length > 0 && config_data.config.object.SHOP_TIMING_V2.data && config_data.config.object.SHOP_TIMING_V2.data.length > 0 ? config_data.config.object.SHOP_TIMING_V2.data.map((shopTiming,index) =>(
                          <><br />{shopTiming.openingDay == shopTiming.closingDay ?  shopTiming.openingDay.slice(0,3) + ' ' +shopTiming.openingTime+'-'+shopTiming.closingTime:shopTiming.openingDay.slice(0,3)+'-'+shopTiming.closingDay.slice(0,3) + ' ' +shopTiming.openingTime+'-'+shopTiming.closingTime}</>
                        )):null}
                      </div>
                    <div className="dt-rest13 dt-rest14">
                      <div className="dt-rest15 ">
                        <div className="dt-rest7"><i style={{fontStyle: 'normal'}}>★</i> <span>5.0</span></div>
                        <div className="dt-rest16"><span className="dt-rest17">300+ ratings</span></div>
                      </div>
                      <div className="dt-rest15">
                        <div className="dt-rest7"><span className="dt-rest18">{restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_PICKUP_TIME}</span></div>
                        <div className="dt-rest16">Pickup Time</div>
                      </div>
                      <div className="dt-rest15">
                        <div className="dt-rest7"><span>{restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_MINIMUM_ORDER === 0 ? `$${restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_MINIMUM_ORDER}` : 'No'}</span></div>
                        <div className="dt-rest16">Minimum order</div>
                      </div>
                    </div>
                  </div>
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

export default Banner
