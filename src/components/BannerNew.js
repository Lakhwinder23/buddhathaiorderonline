import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch, useStore } from 'react-redux';
import {config} from '../config';
import StarRatingComponent from 'react-star-rating-component';
import Tabs, { Tab } from "react-awesome-tabs";
import Menu from './Menu'
import OrderAheadData from './OrderAheadData'

import { fetchRestaurantInformation, fetchOfferlists } from '../Redux/RestaurantInformation/RestaurantInformationActions';
function BannerNew(props){
  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
  const merchant_data = useSelector(state =>state.MerchantToken)
  const [configResponseData,setConfigDciResponseData] = useState({
                                                                  url_info:[],
                                                                  static_resource_endpoint:null,
                                                                  static_resource_sufix:null,
                                                                  is_shop_open:false,
                                                                  static_resource_categories_prefix:null,

                                                                    })
  const config_data = useSelector(state =>state.Config)
  const dispatch = useDispatch()  // for accessing the redux function
  const [activeTab,setActiveTab] = useState(1)
  const [merchantInfo,setMerchantInfo] = useState([])
  const [configInfo,setConfigInfo] = useState([])
  const [detailed_cart_item,setDetailed_cart_item] = useState([])
  const [banner_info,setBanner_info] = useState([])

  useMemo(()=>{
     setMerchantInfo(merchant_data.merchant_token.object)
 },[merchant_data && merchant_data.merchant_token && merchant_data.merchant_token.object])

 // useEffect(() =>{
 //   if(merchantInfo && merchantInfo.access_token){
 //     const user_token = merchantInfo.access_token
 //     dispatch(fetchConfig(user_token))
 //   }
 //
 // },[merchantInfo && dispatch])

 useMemo(()=>{
  if(config_data && config_data.config && config_data.config.object){
    setConfigInfo(config_data.config.object)
  }
},[config_data])
  //hooks end

const detailed_cart_item_callbackFunction = (childdata) =>{
 setDetailed_cart_item(childdata)
}
const banner_info_callbackFunction = (childdata) =>{
 setBanner_info(childdata)
}

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


      const handleTabSwitch = (active) => {
        setActiveTab(active);
      }


        const tabscontent = restaurantInformation_data &&
          Object.keys(restaurantInformation_data).length > 0 &&
          restaurantInformation_data.restaurant_info &&
          restaurantInformation_data.restaurant_info.object &&
          restaurantInformation_data.restaurant_info.request_status === true &&
          Object.keys(restaurantInformation_data.restaurant_info.object).length > 0 ? (
          <Tabs
            active={activeTab}
            onTabSwitch={e=>handleTabSwitch(e)}
          >
            <Tab title="Overview">
              <div className="rview">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-md-4">
                    <div className="rview-one-wrapper">
                      <div className="rview-one">
                        <h6>Phone Number</h6>
                        <p>{restaurantInformation_data.restaurant_info.object.MERCHANT_CONTACT}</p>

                      </div>
                      <div className="rview-one review-two">
                        <h6>Cuisines</h6>
                        <p>{restaurantInformation_data.restaurant_info.object.tagLine}</p>

                      </div>
                      <div className="rview-one review-two review-three">
                        <h6>Average Cost</h6>
                        <p>{restaurantInformation_data.restaurant_info.object.AVERAGE_COST ? restaurantInformation_data.restaurant_info.object.AVERAGE_COST : '$50'} for two People</p>
                        <p>Exclusive of applicable taxes and charges, if any</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-4">
                    <div className="r-maps-wrapper">
                      <div className="r-maps">
                      <iframe
      width="300"
      height="170"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src={`https://maps.google.com/maps?q=${restaurantInformation_data.restaurant_info.object.location_latitude},${restaurantInformation_data.restaurant_info.object.location_longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
     >
     </iframe>

                        <h6>Address</h6>
                        <p>{restaurantInformation_data.restaurant_info.object.address_address}</p>
                        <p>{restaurantInformation_data.restaurant_info.object.address_city}, {restaurantInformation_data.restaurant_info.object.address_state} </p>
                        <p>{restaurantInformation_data.restaurant_info.object.address_country}</p>
                      </div>
                      <div className="r-maps-para">
                        <h6>Opening hours</h6>
                        <p>
                        <table>{config_data && config_data.config && config_data.config.object && config_data.config.object.SHOP_TIMING_V2 && Object.keys(config_data.config.object.SHOP_TIMING_V2).length > 0 && config_data.config.object.SHOP_TIMING_V2.data && config_data.config.object.SHOP_TIMING_V2.data.length > 0
                          ? config_data.config.object.SHOP_TIMING_V2.data.map(
                              (shopTiming, index) => (
                                <tr> <td><span className="hoursname">{shopTiming.name}:</span></td><td>
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
                                </td></tr>
                              )
                            )
                          : null}</table></p>

                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                  <div className="r-more">
                      <h6>More Info</h6>
                      <ul>
                        <li>
                          {" "}
                          <span>
                            <i className="fas fa-check" />
                          </span>
                          Wheelchair Accessible
                        </li>
                        <li>
                          {" "}
                          <span>
                            <i className="fas fa-check" />
                          </span>
                          Wine and Beer
                        </li>
                        <li>
                          {" "}
                          <span>
                            <i className="fas fa-check" />
                          </span>
                          Valet Parking Available
                        </li>
                        <li>
                          {" "}
                          <span>
                            <i className="fas fa-check" />
                          </span>
                          Indoor Seating
                        </li>
                      </ul>
                    </div>
                    <div className="r-more downloadapp">

                      <ul>
                      {restaurantInformation_data.restaurant_info.object.APP_STORE_APP ? (<h6>Download App</h6>) : null}
                      {restaurantInformation_data.restaurant_info.object.APP_STORE_APP ?

                        (<li>
                          {" "}
                          <a href={restaurantInformation_data.restaurant_info.object.APP_STORE_APP ? restaurantInformation_data.restaurant_info.object.APP_STORE_APP : "#"}><img src="/img/app-store.png"/></a>
                        </li>
                      ):null}
                      {restaurantInformation_data.restaurant_info.object.PLAY_STORE_APP ?
                        (<li>
                          {" "}
                          <a href={restaurantInformation_data.restaurant_info.object.PLAY_STORE_APP ? restaurantInformation_data.restaurant_info.object.PLAY_STORE_APP : "#"}><img src="/img/google-play.png"/></a>
                        </li>):null}

                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </Tab>
            <Tab title="Menu">
            <div className="viewmenu row">
              <div className="col-lg-12">
            <Menu configInfo={configInfo}
            merchantInfo={merchantInfo}
            detailed_cart_item_parentcallbackfunction = {detailed_cart_item_callbackFunction}
            banner_info_parentcallbackfunction = {banner_info_callbackFunction}
            />
            </div>
            </div>
            </Tab>

            <Tab title="Contact Info">
            <div className="rview">
              <div className="row no-gutters">
                <div className="col-lg-6 col-md-6">
                  <div className="rview-one-wrapper">
                    <div className="rview-one first">
                      <h6>Phone Number</h6>
                    <p>{restaurantInformation_data.restaurant_info.object.MERCHANT_CONTACT}</p>

                    </div>
                    <div className="rview-one">

                      <h6>Address</h6>
                      <p>{restaurantInformation_data.restaurant_info.object.address_address}</p>
                      <p>{restaurantInformation_data.restaurant_info.object.address_city}, {restaurantInformation_data.restaurant_info.object.address_state} </p>
                      <p>{restaurantInformation_data.restaurant_info.object.address_country}</p>
                    </div>

                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="r-maps-wrapper">
                    <div className="r-maps">
                      <iframe
                        src={`https://maps.google.com/maps?q=${restaurantInformation_data.restaurant_info.object.location_latitude},${restaurantInformation_data.restaurant_info.object.location_longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        frameBorder={0}
                        allowFullScreen
                        style={{ border: "0px" }}
                      />

                    </div>

                  </div>
                </div>

              </div>
            </div>
            </Tab>
          </Tabs>
        ) : null;

  console.log('restaurantInformation_datarestaurantInformation_data', restaurantInformation_data);

  return(
    <>
        <div className="hometop">
        <section id="Restaurant_banner_section" style={{
          backgroundImage: `url(${restaurantInformation_data && restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.BANNER_WATERMARK ? restaurantInformation_data.restaurant_info.object.BANNER_WATERMARK : null})`,
        }}>
        <div className="container">
        {restaurantInformation_data &&
          Object.keys(restaurantInformation_data).length > 0 &&
          restaurantInformation_data.restaurant_info &&
          restaurantInformation_data.restaurant_info.object &&
          restaurantInformation_data.restaurant_info.request_status === true &&
          Object.keys(restaurantInformation_data.restaurant_info.object).length > 0 ?
          (
            <div className="row">
              <div className="col-lg-3 banner_left-side">
                <div className="retaurent-banner_img">
                  {console.log('restaurantInformation_data', restaurantInformation_data)}
                {restaurantInformation_data.restaurant_info.object.BANNER ?
                  (
                  <img src={restaurantInformation_data.restaurant_info.object.BANNER} alt="images not found" />
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
                        <b>Available Offers</b>
                          <p>
                          <ul><marquee style={{ color: '#000'}}>{restaurantInformation_data && restaurantInformation_data.offerslist && restaurantInformation_data.offerslist.data && restaurantInformation_data.offerslist.data.length > 0 ? restaurantInformation_data.offerslist.data.filter((item,index)=> item.expired !== true).map((offer,index) =>{
                          return (<li>{offer.name} - <span className="offerdes">{offer.description}</span></li>)
                        }) : null}</marquee></ul>
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
            </div>):(<div className="headerloader"><img src="/img/header-loader.gif"/></div>) }
          </div>
          </section>
          <div class="main1 profile">
          {restaurantInformation_data &&
            Object.keys(restaurantInformation_data).length > 0 &&
            restaurantInformation_data.restaurant_info &&
            restaurantInformation_data.restaurant_info.object &&
            restaurantInformation_data.restaurant_info.request_status === true &&
            Object.keys(restaurantInformation_data.restaurant_info.object).length > 0 ?
            (
          <div id="Restaurents_details" class="activeshop">
          <div class="container booknow" id="activeshopmenu">
          <OrderAheadData
          configInfo={configInfo}
          merchantInfo={merchantInfo}
          detailed_cart_item_parentcallbackfunction = {detailed_cart_item_callbackFunction}
          banner_info_parentcallbackfunction = {banner_info_callbackFunction}
          />
          {tabscontent}
          </div>
            </div>

    ): null
   }
   </div>
   </div>
    </>
  )
}

export default BannerNew
