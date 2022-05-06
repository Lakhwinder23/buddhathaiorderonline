import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch, useStore } from 'react-redux';
import Header from './Header'
import Footer from './Footer'
import Modal from "react-bootstrap/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { fetchMerchantToken } from '../Redux/MerchantToken/MerchantTokenActions';
import { fetchConfig } from '../Redux/Config/ConfigActions';
import { fetchBucket } from '../Redux/Bucket/BucketActions';
import { updateShippingMethod } from '../Redux/UpdateShippingMethod/UpdateShippingMethodActions';
import { updateItemQuantity } from '../Redux/UpdateItemQuantity/UpdateItemQuantityActions';
import { addTip } from '../Redux/AddTip/AddTipActions';
import { fetchRestaurantInformation } from '../Redux/RestaurantInformation/RestaurantInformationActions';

function Cart(){

  useEffect(() => {
  window.scrollTo(0, 0)
}, [])
  // store data access start
const merchant_data = useSelector(state =>state.MerchantToken)
const config_data = useSelector(state =>state.Config)
const bucket_data = useSelector(state =>state.Bucket)
const updateShippingMethod_data = useSelector(state =>state.UpdateShippingMethod)
const updateItemQuantity_data = useSelector(state =>state.UpdateItemQuantity)
const tip_data = useSelector(state => state.AddTip)
const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
// store data access End
  const dispatch = useDispatch()  // for accessing the redux function
  const store = useStore()
  const propsStateShipping = store.getState().UpdateShippingMethod
  const propsStateBucket = store.getState().Bucket
  const propsStateAddTip = store.getState().AddTip
  console.log('propsState', propsStateAddTip);
  // component all states define start
  const [merchantInfo,setMerchantInfo] = useState([])
  const [configInfo,setConfigInfo] = useState([])
  const [finalUserEmail,setFinalUserEmail] = useState("")
  const [finalUserToken,setFinalUserToken] = useState("")
  const [uniqueBucketId,setUniqueBucketId] = useState("")
  const [bucketInfo,setBucketInfo] = useState([])
  const [updateItemQuantityInfo,setUpdateItemQuantityInfo] = useState([])
  const [bucketDciResponseData,setBucketDciResponseData] = useState({
                                                            Detailed_cart:[],
                                                            Detailed_cart_item:[],
                                                            cart_item_tip:[],
                                                            Detailed_cart_checkout_method:[],
                                                            Delivery_method:[],
                                                            pickup_restaurant:[],
                                                            current_shipment_method:null

                                                        })
const [configResponseData,setConfigDciResponseData] = useState({
                                                                url_info:[],
                                                                tip_fees:"",
                                                                static_resource_endpoint:null,
                                                                static_resource_sufix:null,
                                                              })

const [singleRestaurantResponseData,setSingleRestaurantResponseData] = useState({
                                                                                  banner_info:[]
                                                                              })
const [delivery_choose,setDelivery_choose] = useState(false)
const [showmodaldelivery,setShowmodaldelivery] = useState(false)
const [delivery_click,setDelivery_click] = useState(true)
const [delivery_info,setDelivery_info] = useState([])
const [delivery_cost,setDelivery_cost] = useState(0)
console.log("cart delivery_cost",delivery_cost)
const [test_cart,setTest_cart] = useState([])
const [quantity,setQuantity] = useState("")
const [loadingData,setLoadingData] = useState(null)
const [currentShippingMethodName,setCurrentShippingMethodName] = useState(null)
  // component all states define End

  //hooks start
  // fetch merchant api hook start
  // useEffect(() =>{
  //   dispatch(fetchMerchantToken())
  // },[dispatch])
// fetch merchant api hook end

// add data of merchant api into merchantinfo constant hook start
  useMemo(()=>{
     setMerchantInfo(merchant_data.merchant_token.object)
 },[merchant_data && merchant_data.merchant_token && merchant_data.merchant_token.object])
// add data of merchant api into merchantinfo constant hook End

// fetch config api hook start
 // useEffect(() =>{
 //   if(merchantInfo && merchantInfo.access_token){
 //     const user_token = merchantInfo.access_token
 //     dispatch(fetchConfig(user_token))
 //   }
 //
 // },[merchantInfo && dispatch])
// fetch api hook End

// add data of config api into confiinfo constant hook start
 useMemo(()=>{
  if(config_data && config_data.config && config_data.config.object){
    setConfigInfo(config_data.config.object)
  }
},[config_data])
// add data of config api into confiinfo constant hook End

// add config data into config const hook start
  useMemo(() =>{
    if(configInfo && Object.keys(configInfo).length > 0){
      setConfigDciResponseData({
        url_info:configInfo,
        tip_fees:configInfo.FEES,
        static_resource_endpoint:configInfo && configInfo.STATIC_RESOURCE_ENDPOINT ? configInfo.STATIC_RESOURCE_ENDPOINT : null,
        static_resource_sufix:configInfo && configInfo.STATIC_RESOURCE_SUFFIX ? configInfo.STATIC_RESOURCE_SUFFIX : null
      })
    }

  },[configInfo])
// add config data into config const hook end

// get restaurant related information and restaurant menu hook start
  useMemo(() =>{
    if(configResponseData && configResponseData.url_info && Object.keys(configResponseData.url_info).length>0){
      const restaurant_info_data = {
        static_resource_endpoint:configResponseData.static_resource_endpoint,
        static_resource_sufix:configResponseData.static_resource_sufix,
        rest_merchant_id:configResponseData.url_info.MERCHANT_ID
      }
      dispatch(fetchRestaurantInformation(restaurant_info_data))
    }
  },[configResponseData && configResponseData.url_info])
  // get restaurant related information and restaurant menu hook end

// add restaurant main information into const hook start
  useMemo(() =>{
    setSingleRestaurantResponseData({
      banner_info:restaurantInformation_data.restaurant_info.object
    })
  },[restaurantInformation_data && restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.request_status === true])
// add restaurant main information into const hook end

// get user email,user token and bucket id hook start
useMemo(() =>{
  if(merchantInfo && merchantInfo.access_token){
    const user_email =
            localStorage.getItem("user") === null
              ? "guest@onlinebites.com"
              : localStorage.getItem("user");
          const user_token =
            localStorage.getItem("access_token") === null
              ? merchantInfo.access_token
              : localStorage.getItem("access_token");
          const user_local_bucket_id = window.localStorage.getItem("user_local_bucket_id") == null && window.localStorage.getItem("user_local_bucket_id") == undefined
            ? ""
            : window.localStorage.getItem("user_local_bucket_id");
            setFinalUserEmail(user_email)
            setFinalUserToken(user_token)
            setUniqueBucketId(user_local_bucket_id)
  }
},[merchantInfo])
// get user email,user token and bucket id hook end




// when uniqueBucketId has value hook start
  useMemo(() =>{
    if(uniqueBucketId != ""){
      const bucket_info = {
        user_token:finalUserToken,
        user_local_bucket_id:uniqueBucketId,
        user_email:finalUserEmail
      }
      dispatch(fetchBucket(bucket_info))
      window.localStorage.setItem('user_local_bucket_id', uniqueBucketId);
    }
  },[uniqueBucketId])
// when uniqueBucketId has value hook end

// add bucket dci response data into constant hook start
useMemo(() =>{
  if(bucket_data && bucket_data.bucket &&  bucket_data.bucket.object && bucket_data.bucket.request_status === true){
    setBucketInfo(bucket_data.bucket.object)

  }
},[bucket_data && bucket_data.bucket &&  bucket_data.bucket.object])
// add bucket dci response data into constant hook End

// when bucket dci have error then respone add into constant hook start
  useMemo(() =>{
    if(bucket_data && bucket_data.bucket &&  bucket_data.bucket.object && bucket_data.bucket.request_status === false && bucket_data.bucket.object.error == "Invalid Bucket" ){
      setBucketInfo(bucket_data.bucket.object)
      setUniqueBucketId("")
      localStorage.removeItem("user_local_bucket_id");
    }
  },[bucket_data && bucket_data.bucket &&  bucket_data.bucket.object])
// when bucket dci have error then respone add into constant hook end

// add bucketinfo data into constant hook start
  useMemo(() =>{
    if(bucketInfo){
      setBucketDciResponseData({
        Detailed_cart:bucketInfo,
        Detailed_cart_item:bucketInfo.items ? bucketInfo.items : [],
        cart_item_tip:bucketInfo && bucketInfo.fees ? bucketInfo.fees : [],
        Detailed_cart_checkout_method:bucketInfo && bucketInfo.available_checkout_methods ? bucketInfo.available_checkout_methods : [],
        Delivery_method:bucketInfo && bucketInfo.available_delivery_methods ? bucketInfo.available_delivery_methods : [],
        pickup_restaurant:bucketInfo && bucketInfo.available_pickup_methods ? bucketInfo.available_pickup_methods : [],
        current_shipment_method:bucketInfo && bucketInfo.shippment_method ? bucketInfo.shippment_method : null,
      })
      setLoadingData(null)
    }
  },[bucketInfo])
// add bucketinfo data into constant hook End

// add data of updateshppingmethod api into constant hook start
useMemo(() =>{
  if(updateShippingMethod_data && updateShippingMethod_data.update_shipping_method && updateShippingMethod_data.update_shipping_method.object && updateShippingMethod_data.update_shipping_method.request_status === true){
      setDelivery_info(updateShippingMethod_data.update_shipping_method.object)

  }
},[updateShippingMethod_data && updateShippingMethod_data.update_shipping_method && updateShippingMethod_data.update_shipping_method.object && updateShippingMethod_data.update_shipping_method.requestId])
// add data of updateshppingmethod api into constant hook End

// when delivery_info change data add into constant hook start
useMemo(() =>{
  if(delivery_info && Object.keys(delivery_info).length > 0){
    setDelivery_cost(delivery_info.cost)
    setDelivery_choose(true)
    setDelivery_click(true)
    const bucket_info = {
      user_token:finalUserToken,
      user_local_bucket_id:uniqueBucketId,
      user_email:finalUserEmail
    }
    dispatch(fetchBucket(bucket_info))

  }
},[delivery_info])
// when delivery_info change data add into constant hook End


// add updateItemQuantity api response data into constant hook start
useMemo(() =>{
  if(updateItemQuantity_data && updateItemQuantity_data.update_item_qty && updateItemQuantity_data.update_item_qty.object && updateItemQuantity_data.update_item_qty.request_status === true){
    setUpdateItemQuantityInfo(updateItemQuantity_data.update_item_qty.object)
  }
},[updateItemQuantity_data && updateItemQuantity_data.update_item_qty && updateItemQuantity_data.update_item_qty.object && updateItemQuantity_data.update_item_qty.requestId])
// add updateItemQuantity api response data into constant hook End

// when updateItemQuantity api have error then  response data into constant hook start
useMemo(() =>{
  if(updateItemQuantity_data && updateItemQuantity_data.update_item_qty && updateItemQuantity_data.update_item_qty.object && updateItemQuantity_data.update_item_qty.request_status === false && updateItemQuantity_data.update_item_qty.object.error == "Invalid Bucket"){
    setUpdateItemQuantityInfo(updateItemQuantity_data.update_item_qty.object)
    setUniqueBucketId("")
    localStorage.removeItem("user_local_bucket_id");

  }
},[updateItemQuantity_data && updateItemQuantity_data.update_item_qty && updateItemQuantity_data.update_item_qty.object && updateItemQuantity_data.update_item_qty.requestId])
// when updateItemQuantity api have error then response data into constant hook End

// when updateItemQuantityInfo has value hook start
  useMemo(() =>{
    if(updateItemQuantityInfo){
      setTest_cart(updateItemQuantityInfo)
      setQuantity(updateItemQuantityInfo.quantity)
      const bucket_info = {
        user_token:finalUserToken,
        user_local_bucket_id:uniqueBucketId,
        user_email:finalUserEmail
      }
      dispatch(fetchBucket(bucket_info))
    }

  },[updateItemQuantityInfo])
// when updateItemQuantityInfo has value hook end

//fetch bucket api after fetch tip api hook start
useMemo(() =>{
  if(tip_data && tip_data.add_tip && tip_data.add_tip.object && tip_data.add_tip.request_status === true){
    const bucket_info = {
      user_token:finalUserToken,
      user_local_bucket_id:uniqueBucketId,
      user_email:finalUserEmail
    }
    dispatch(fetchBucket(bucket_info))

  }
},[tip_data && tip_data.add_tip && tip_data.add_tip.requestId])
//fetch bucket api after fetch tip api hook start

useMemo(() =>{
  if(bucketDciResponseData.current_shipment_method !=null){
    if(bucketDciResponseData.current_shipment_method === bucketDciResponseData.pickup_restaurant){
      setCurrentShippingMethodName("Pickup at Restaurant")
      setDelivery_cost("0")
    }
    else{
      const filterdata = bucketDciResponseData.Delivery_method.filter(item =>item.id === bucketDciResponseData.current_shipment_method)
      console.log("filterdata",filterdata[0].name)
      setCurrentShippingMethodName(filterdata[0].name)
      setDelivery_cost(filterdata[0].cost)
    }
  }
},[bucketDciResponseData.current_shipment_method])

  //hooks end

  // component function start

  // deliveryhandler function start
  const deliveryhandler = (event) =>{
    setDelivery_click(false)
    const update_shipping_method_info ={
      final_user_token:finalUserToken,
      final_user_email:finalUserEmail,
      Unique_bucket_Id:uniqueBucketId,
      shippingId:event.target.value
    }
      dispatch(updateShippingMethod(update_shipping_method_info))
  }
  // deliveryhandler function End

  // deliverChooseHandle function start
  const deliverChooseHandle = () => {
      setShowmodaldelivery(true)
    };
  // deliverChooseHandle function End

  // close delivery modal function start
  const handleclosedelivery = () => {
    setShowmodaldelivery(false)
    };
  // close delivery modal function end

  // incrementNew function start
  const incrementNew =(value1, value2, value3, value4) =>{
    setLoadingData(value4)
    const update_item_qty_info = {
      final_user_token:finalUserToken,
      bucket_id:value3,
      final_user_email:finalUserEmail,
      bucketItemId:value1,
      quantity:value2 + 1
    }
    dispatch(updateItemQuantity(update_item_qty_info))
  }
  // incrementNew function end

  // decrementNew function start
  const decrementNew = (value1, value2, value3, value4) =>{
    setLoadingData(value4)
    const update_item_qty_info = {
      final_user_token:finalUserToken,
      bucket_id:value3,
      final_user_email:finalUserEmail,
      bucketItemId:value1,
      quantity:value2 - 1
    }
    dispatch(updateItemQuantity(update_item_qty_info))
  }
  // decrementNew function end
  // incrementwithAddon function start
  const incrementwithAddon =(value1, value2, value3) =>{
    setLoadingData(value3)
    const update_item_qty_info = {
      final_user_token:finalUserToken,
      bucket_id:uniqueBucketId,
      final_user_email:finalUserEmail,
      bucketItemId:value1,
      quantity:value2 + 1
    }
    dispatch(updateItemQuantity(update_item_qty_info))
  }
  // incrementwithAddon function end

  // decrementwithAddon function start
  const decrementwithAddon =(value1, value2, value3) =>{
    setLoadingData(value3)
    const update_item_qty_info = {
      final_user_token:finalUserToken,
      bucket_id:uniqueBucketId,
      final_user_email:finalUserEmail,
      bucketItemId:value1,
      quantity:value2 - 1
    }
    dispatch(updateItemQuantity(update_item_qty_info))
  }
  // incrementwithAddon function end

// tiphandlerchange function start
  const tiphandlerchange = (event) =>{
    if(bucketDciResponseData.cart_item_tip &&
    bucketDciResponseData.cart_item_tip.length > 0){
      bucketDciResponseData.cart_item_tip.map((tip,index) =>{
        const tip_info = {
          final_user_token:finalUserToken,
          final_user_email:finalUserEmail,
          Unique_bucket_Id:uniqueBucketId,
          taxId:tip.fee_id,
          taxRate:event.target.value
        }
        dispatch(addTip(tip_info))
      })
    }

  }
// tiphandlerchange function end

  // component function end

  const loaderDiv = (
        <div className="cartLoader">
          <img src="/img/spinner.gif" />
        </div>
      );

  const tip_rate_fees = configResponseData.tip_fees != '' && configResponseData.tip_fees != undefined ? configResponseData.tip_fees.split("|") : null;

  // delivery content start
  const delivery_content = (
    <Form className="delivery-form">
      <Form.Label>Services Categories</Form.Label>
      <Form.Group controlId="formBasicPickup">
        <Form.Check
          type="radio"
          label="Pickup at Restaurant"
          name="formHorizontalRadios"
          id="Pickup at Restaurant"
          value={bucketDciResponseData.pickup_restaurant}
          checked={bucketDciResponseData.pickup_restaurant === bucketDciResponseData.current_shipment_method ? true : false}
          onClick={event => deliveryhandler(event)}
          //onChange={(evt) => this.changeTitle(evt)}
        />
        <Form.Text className="text-muted cart-text">$0</Form.Text>
      </Form.Group>
      {bucketDciResponseData.Delivery_method && bucketDciResponseData.Delivery_method.length > 0
        ? bucketDciResponseData.Delivery_method.map((delivery, index) => {
            return (
              <Form.Group controlId="formBasicPickup">
                <Form.Check
                  type="radio"
                  label={delivery.name}
                  name="formHorizontalRadios"
                  id={delivery.name}
                  value={delivery.id}
                  checked={delivery.id === bucketDciResponseData.current_shipment_method ? true : false}
                  onClick={event =>deliveryhandler(event)}
                  //onChange={(evt) => this.changeTitle(evt)}
                />
                <Form.Text className="text-muted cart-text">
                  ${delivery.cost}
                </Form.Text>
              </Form.Group>
            );
          })
        : null}
    </Form>
  );

// delivery content End

// cart content start
const cart =
        bucketDciResponseData.Detailed_cart_item && bucketDciResponseData.Detailed_cart_item.length > 0
          ? bucketDciResponseData.Detailed_cart_item.map((item, index) => {
              let totalprice = 0;
              let addons = [];
              totalprice = item.unit_price * item.qty;
              const showLoader =
                loadingData &&
                loadingData == item.product_id
                  ? "pamout show_loader"
                  : "pamout show_button";
              return (
                <div className="corn-contant" key={index}>
                  <p>{item.itemName}</p>
                  {item.addons.map((first_addon, index) => {
                    return (
                      <p className="cart-addon" key={index}>
                        {first_addon.addon_full_name}
                      </p>
                    );
                  })}
                  <div className={showLoader} id="pamut-number">
                    <span>${Number(totalprice, 2).toFixed(2)}</span>
                    <div className="count button_box" id="countted">
                      <div className=" handle-counter" id="handleCounter14">
                        {item.addons && item.addons.length > 0 ? (
                          <>
                            <button
                              className="counter-minus"
                              value={item.productId}
                              onClick={() =>decrementwithAddon(
                                item.item_id,
                                item.qty,
                                item.product_id
                              )}
                            >
                              -
                            </button>
                            {item.qty}
                            {/* <input type="text" defaultValue={1} />  */}
                            <button
                              className="counter-plus"
                              value={item.productId}
                              onClick={() =>incrementwithAddon(
                                item.item_id,
                                item.qty,
                                item.product_id
                              )}
                            >
                              +
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="counter-minus"
                              value={item.productId}
                              onClick={() =>decrementNew(
                                item.item_id,
                                item.qty,
                                uniqueBucketId,
                                item.product_id
                              )}
                            >
                              -
                            </button>
                            {item.qty}
                            {/* <input type="text" defaultValue={1} />  */}
                            <button
                              className="counter-plus"
                              value={item.productId}
                              onClick={() =>incrementNew(
                                item.item_id,
                                item.qty,
                                uniqueBucketId,
                                item.product_id
                              )}
                            >
                              +
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="count loader_box">{loaderDiv}</div>
                  </div>
                </div>
              );
            })
          : null;
// cart content End
  return(
    <>
    <Header configInfo={configInfo}
    Detailed_cart_item={bucketDciResponseData.Detailed_cart_item}
    />
    <div className="container" id="scrollmain" >
    <div className="row top_row"></div>
    </div>
    <div className="container">
      <div className="main1-wrapper">
        <div className="row">
          <div className="col-lg-4 col-md-4">
          </div>
          <div className={!propsStateAddTip.add_tip_loading && propsStateShipping && !propsStateShipping.update_shipping_method_loading && !propsStateBucket.bucket_loading ? 'col-lg-4 col-md-4 mobile-cart' : 'col-lg-4 col-md-4 mobile-cart loadingstate'}>
            {bucketDciResponseData.Detailed_cart && Object.keys(bucketDciResponseData.Detailed_cart).length > 0 ? (
              <div className="cart">
                <h2>Cart</h2>
                {bucketDciResponseData.Detailed_cart.total_amount ? (
                  <>
                    <div className="corn">{cart}</div>
                    <div className="row cart-below">
                      <div className="col-7 col-sm-6">
                        <h6>Subtotal</h6>
                        {bucketDciResponseData.Detailed_cart  && bucketDciResponseData.Detailed_cart.taxes ? bucketDciResponseData.Detailed_cart.taxes.map((taxes_name,index) =>(
                          <h6>{taxes_name.name}</h6>
                        )

                      ) :null }
                        <h6>Tip</h6>
                        <h6 className = "Tip-Amount-text">Tip Amount</h6>
                        {bucketDciResponseData.Detailed_cart  && bucketDciResponseData.Detailed_cart.additional_fees ? bucketDciResponseData.Detailed_cart.additional_fees.map((additional_fee_name,index) =>(
                        <h6>{additional_fee_name.name}</h6>
                      )

                    ) :null }
                        <h6>{currentShippingMethodName != null ? currentShippingMethodName : null}</h6>
                        <h6>Total</h6>
                      </div>
                      <div className="col-5 col-sm-6">
                        <h6>
                          $
                          {Number(
                            bucketDciResponseData.Detailed_cart.sub_total,
                            2
                          ).toFixed(2)}
                        </h6>
                        {bucketDciResponseData.Detailed_cart && bucketDciResponseData.Detailed_cart.taxes ? bucketDciResponseData.Detailed_cart.taxes.map((taxes_amount,index) =>(
                        <h6><>
                          {" "}
                          $
                          {Number(
                            taxes_amount
                              .amount,
                            2
                          ).toFixed(2)}
                        </>
                        </h6>
                      )

                    ) :null }
                        <h6>

                          <select
                            onChange={(e) =>tiphandlerchange(e)}
                            className="form-control"
                            id="tip-select"
                          >
                            {bucketDciResponseData.cart_item_tip && bucketDciResponseData.cart_item_tip.length > 0 ? (

                              tip_rate_fees != null &&  tip_rate_fees.length > 0 ? tip_rate_fees.map((item, index) => {
                                const fee_id = bucketDciResponseData.cart_item_tip[0].fee_id;
                                const fee_rate = bucketDciResponseData.cart_item_tip[0].rate;
                                const selected = fee_rate == item ? 'selected' : null;
                                    return (
                                      <option
                                        value={item}
                                        key={index}
                                        selected = {selected}
                                      >
                                        {item}%
                                      </option>
                                    );

                              }): null
                            ) : (
                              <option value="0">0%</option>
                            )}
                          </select>

                        </h6>
                        <h6>
                        ${bucketDciResponseData.cart_item_tip[0] ? bucketDciResponseData.cart_item_tip[0].amount: "0" }
                      </h6>
                      {bucketDciResponseData.Detailed_cart && bucketDciResponseData.Detailed_cart.additional_fees ? bucketDciResponseData.Detailed_cart.additional_fees.map((additional_fee_amount,index) =>(
                          <h6>
                          <>
                            {" "}
                            $
                            {Number(
                              additional_fee_amount
                                .amount,
                              2
                            ).toFixed(2)}
                          </>
                          </h6>
                        )

                      ) :null }
                        <h6>
                        {currentShippingMethodName != null ? ("$" + delivery_cost) : null}
                        </h6>
                        <h6>
                          $
                          {delivery_cost == 0
                            ? Number(
                                bucketDciResponseData.Detailed_cart
                                  .total_amount,
                                2
                              ).toFixed(2)
                            : Number(
                                bucketDciResponseData.Detailed_cart
                                  .total_amount,
                                2
                              ).toFixed(2)}
                        </h6>
                      </div>
                      <br /> <hr></hr>
                    </div>

                    <div className="row cart-below-form">
                      {/*<>propsStateShipping && !propsStateShipping.update_shipping_method_loading && !propsStateBucket.bucket_loading ? delivery_content : (<span className="delivery-processing">Processing...</span>)<>*/}
                      {console.log('delivery_process', propsStateBucket.bucket_loading)}
                      {delivery_content}
                    </div>
                    <div className="sub">
                      <div className="subtotal"></div>
                      {bucketDciResponseData.current_shipment_method != null ? (
                        <div className="checkout text-center">
                          <Link
                            to={{
                              pathname: "/checkout",
                              bucketDciResponseData: bucketDciResponseData,
                              banner_info:singleRestaurantResponseData.banner_info,
                              configInfo:configInfo,
                              merchantInfo:merchantInfo,
                              Delivery_cost: delivery_cost,
                              tip_rate_fees: tip_rate_fees,
                              currentShippingMethodName:currentShippingMethodName
                            }}
                          >
                            {!propsStateAddTip.add_tip_loading && propsStateShipping && !propsStateShipping.update_shipping_method_loading && !propsStateBucket.bucket_loading ? 'Checkout' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
                          </Link>
                        </div>
                      ) : (
                        <div className="checkout text-center">
                          <button
                            onClick={() =>deliverChooseHandle()}
                            disabled = {!delivery_click}
                            className="deliverymsg"
                          >
                            {!propsStateAddTip.add_tip_loading && propsStateShipping && !propsStateShipping.update_shipping_method_loading && !propsStateBucket.bucket_loading ? 'Checkout' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="col-lg-12">
                          <div className="cart-loader-img">
                          <img src="/img/emptycart.gif" alt="images not found" className="img-fluid" />
                          </div>
                          </div>
                )}
              </div>
            ) : (
              <div className="col-lg-12">
                      <div className="cart-loader-img">
                      <img src="/img/cartloader.gif" alt="images not found" className="img-fluid" />
                      </div>
                      </div>
            )}
          </div>
          <div className="col-lg-4 col-md-4">
          </div>
          </div>
          </div>
          </div>
    <Footer configInfo={configInfo} merchantInfo={merchantInfo} banner_info={singleRestaurantResponseData.banner_info}/>
    <Modal show={showmodaldelivery} id="modal3" size="sm">
            <Modal.Body>Please select a delivery method.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() =>handleclosedelivery()}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
    </>
  )
}

export default Cart
