import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch, useStore } from 'react-redux';
import {config} from '../config';
import StarRatingComponent from 'react-star-rating-component';
import { fetchRestaurantInformation, fetchOfferlists } from '../Redux/RestaurantInformation/RestaurantInformationActions';
function RestaurantProfile(props){
  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
  const [configResponseData,setConfigDciResponseData] = useState({
                                                                  url_info:[],
                                                                  static_resource_endpoint:null,
                                                                  static_resource_sufix:null,
                                                                  is_shop_open:false,
                                                                  static_resource_categories_prefix:null,

                                                                    })
  const config_data = useSelector(state =>state.Config)
  const dispatch = useDispatch()  // for accessing the redux function

  // get restaurant related information and restaurant menu hook start
    useMemo(() =>{
      if(configResponseData && configResponseData.url_info && Object.keys(configResponseData.url_info).length>0){
        console.log('configResponseDataconfigResponseData', configResponseData);

        const coupon_info = {
          mid:configResponseData.url_info.MERCHANT_ID,
          finalUserToken:props && props.merchantInfo && props.merchantInfo.access_token
        }
        dispatch(fetchOfferlists(coupon_info))
      }
    },[configResponseData && configResponseData.url_info])

    // add config data into config const hook start
      useMemo(() =>{
        if(props && props.configInfo && Object.keys(props.configInfo).length > 0){
          setConfigDciResponseData({
            url_info:props.configInfo,
            static_resource_endpoint:props.configInfo && props.configInfo.STATIC_RESOURCE_ENDPOINT ? props.configInfo.STATIC_RESOURCE_ENDPOINT : null,
            static_resource_sufix:props.configInfo && props.configInfo.STATIC_RESOURCE_SUFFIX ? props.configInfo.STATIC_RESOURCE_SUFFIX : null,
            is_shop_open:props.configInfo && props.configInfo.IS_SHOP_OPEN ? props.configInfo.IS_SHOP_OPEN : false,
            static_resource_categories_prefix:props.configInfo && props.configInfo.STATIC_RESOURCE_CATEGORIES_PREFIX ? props.configInfo.STATIC_RESOURCE_CATEGORIES_PREFIX : null
          })
        }

      },[props && props.configInfo && Object.keys(props.configInfo).length > 0])
    // add config data into config const hook end
  return(
    <>
    {restaurantInformation_data &&
      Object.keys(restaurantInformation_data).length > 0 &&
      restaurantInformation_data.restaurant_info &&
      restaurantInformation_data.restaurant_info.object &&
      restaurantInformation_data.restaurant_info.request_status === true &&
      Object.keys(restaurantInformation_data.restaurant_info.object).length > 0 ?
      (

        <section id="Restaurant_banner_section">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 banner_left-side">
                <div className="retaurent-banner_img">
                  {console.log('restaurantInformation_data', restaurantInformation_data)}
                {restaurantInformation_data.restaurant_info.object.LOGO ?
                  (
                  <img src={restaurantInformation_data.restaurant_info.object.LOGO} alt="images not found" />
                  ) : null}
                </div>
              </div>
              <div className="col-lg-9 banner_right-side">
                <div className="row">
                  <div className="col-lg-5">
                    <div className="R_title">
                      <h2>{restaurantInformation_data.restaurant_info.object.name}</h2>
                      <p>
                        {restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object.tagLine
                          ? restaurantInformation_data.restaurant_info.object.tagLine
                          : null}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="row top_r-row">
                      <div className="col-lg-12">
                        <div className="R_hours">
                          <b>Hours of Operation</b>
                          <p>
                            {config_data && config_data.config && config_data.config.object && config_data.config.object.SHOP_TIMING_V2 && Object.keys(config_data.config.object.SHOP_TIMING_V2).length > 0 && config_data.config.object.SHOP_TIMING_V2.data && config_data.config.object.SHOP_TIMING_V2.data.length > 0
                              ? config_data.config.object.SHOP_TIMING_V2.data.map(
                                  (shopTiming, index) => (
                                    <>
                                      {shopTiming.openingDay ==
                                      shopTiming.closingDay
                                        ? shopTiming.openingDay.slice(0, 3) +
                                          " " +
                                          shopTiming.openingTime +
                                          "-" +
                                          shopTiming.closingTime
                                        : shopTiming.openingDay.slice(0, 3) +
                                          "-" +
                                          shopTiming.closingDay.slice(0, 3) +
                                          " " +
                                          shopTiming.openingTime +
                                          "-" +
                                          shopTiming.closingTime}
                                    </>
                                  )
                                )
                              : null}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-6" style={{ display: "none" }}>
                        <div className="R_offer">
                          <p>
                            <i className="fas fa-percentage" aria-hidden="true" />{" "}
                            Family Combo - $59.99{" "}
                            <i className="fa fa-angle-down" aria-hidden="true" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 addrss">
                    <p>
                      <span>
                        <img src="/img/map-icon.png" />
                      </span>{" "}
                      {restaurantInformation_data.restaurant_info.object.address_address},{" "}
                      {restaurantInformation_data.restaurant_info.object.address_city},{" "}
                      {restaurantInformation_data.restaurant_info.object.name_point}
                    </p>
                  </div>
                </div>
                <div className="row bottom_row">
                  <div className="col-lg-3">
                    <div className="R_rating">
                      <b>
                        <i className="fas fa-star" /> 5.0
                      </b>
                      <p>300+ Ratings</p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="R_time">
                      <b>
                        {restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_PICKUP_TIME}
                      </b>
                      <p>Pickup Time</p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="R_order">
                      <b>
                        {restaurantInformation_data.restaurant_info.object
                          .MERCHANT_ADD_FEAT_MINIMUM_ORDER === 0
                          ? `$${restaurantInformation_data.restaurant_info.object.MERCHANT_ADD_FEAT_MINIMUM_ORDER}`
                          : "No"}
                      </b>
                      <p>Minimum Order</p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="R_donate">
                      {restaurantInformation_data.restaurant_info.object.DONATION == "TRUE" ? (
                        <a
                          href={`/donation/${restaurantInformation_data.restaurant_info.object.MERCHANT_ID}`}
                          className="donate_btn"
                        >
                          {" "}
                          Donate{" "}
                          <i
                            className="fas fa-long-arrow-alt-right"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

              </div>
              <div className="row offersbanner">
                <div className="col-lg-3 offerhead">
                <h5>Available Offers</h5>
                </div>
                <div className="col-lg-9">
                  <ul><marquee style={{ color: '#000'}}>{restaurantInformation_data && restaurantInformation_data.offerslist && restaurantInformation_data.offerslist.data && restaurantInformation_data.offerslist.data.length > 0 ? restaurantInformation_data.offerslist.data.filter((item,index)=> item.expired !== true).map((offer,index) =>{
                  return (<li>{offer.name} - <span className="offerdes">{offer.description}</span></li>)
                }) : null}</marquee></ul>
                </div>
              </div>
            </div>
          </div>

        </section>
    ): null
   }
    </>
  )
}

export default RestaurantProfile
