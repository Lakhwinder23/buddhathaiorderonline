import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch, useStore } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import ReactTooltip from 'react-tooltip';
import StarRatingComponent from 'react-star-rating-component';
import {config} from '../config';
import { fetchBucket } from '../Redux/Bucket/BucketActions';
import { fetchRestaurantInformation, fetchOfferlists } from '../Redux/RestaurantInformation/RestaurantInformationActions';
import { fetchMenuList } from '../Redux/MenuList/MenuListActions';
import { fetchBucketId } from '../Redux/BucketId/BucketIdActions';
import { fetchOfferData } from '../Redux/BucketId/BucketIdActions';
import { updateOrderAhead } from '../Redux/OrderAheadData/OrderAheadActions';
import { addItems } from '../Redux/AddItems/AddItemsActions';
import { updateShippingMethod } from '../Redux/UpdateShippingMethod/UpdateShippingMethodActions';
import { updateItemQuantity } from '../Redux/UpdateItemQuantity/UpdateItemQuantityActions';
import { addTip } from '../Redux/AddTip/AddTipActions';
import moment from "moment-timezone";
import Select from "react-select";
import TimeSelect from "react-time-select";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";



import "react-datepicker/dist/react-datepicker.css";

function OrderAheadData(props){

//moment.tz.setDefault("America/Denver");
  // store data access start
const bucket_data = useSelector(state =>state.Bucket)
const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
const menuList_data = useSelector(state =>state.MenuList)
const bucketId_data = useSelector(state =>state.BucketId)
const item_data = useSelector(state =>state.AddItems)
const updateShippingMethod_data = useSelector(state =>state.UpdateShippingMethod)
const updateItemQuantity_data = useSelector(state =>state.UpdateItemQuantity)
const tip_data = useSelector(state => state.AddTip)
// store data access End
  const dispatch = useDispatch()  // for accessing the redux function

  const store = useStore()
  const propsStateBucket = store.getState().Bucket
  const propsStateAddItem = store.getState().AddItems
  const propsState = store.getState()
  const propsStateShipping = store.getState().UpdateShippingMethod;
  const propsStateAddTip = store.getState().AddTip;

  console.log('propsState',propsState);

  // component all states define start
  const [bucketInfo,setBucketInfo] = useState([])
  const [updateItemQuantityInfo,setUpdateItemQuantityInfo] = useState([])
  const [finalUserEmail,setFinalUserEmail] = useState("")
  const [finalUserToken,setFinalUserToken] = useState("")
  const [uniqueBucketId,setUniqueBucketId] = useState("")
  const [bucketDciResponseData,setBucketDciResponseData] = useState({
                                                            Detailed_cart:[],
                                                            Detailed_cart_item:[],
                                                            cart_item_tip:[],
                                                            Detailed_cart_checkout_method:[],
                                                            Delivery_method:[],
                                                            pickup_restaurant:[],
                                                            offer_data:[],
                                                            free_available_item:false
                                                          })

const [configResponseData,setConfigDciResponseData] = useState({
                                                                url_info:[],
                                                                static_resource_endpoint:null,
                                                                static_resource_sufix:null,
                                                                is_shop_open:false,
                                                                static_resource_categories_prefix:null,

                                                                  })

const [singleRestaurantResponseData,setSingleRestaurantResponseData] = useState({
                                                                          banner_info:[],
                                                                          logo:null,
                                                                          business_data:[],
                                                                          maintenance_mode:false,
                                                                          product_image_preview:false,
                                                                        })
const [menuListResponseData,setMenuListResponseData] = useState({
                                                                  restaurantsdata:[],
                                                                  })

const [activeClass,setActiveClass] = useState('normal')
const [currentShippingMethodName, setCurrentShippingMethodName] = useState(
  null
);
const [loadingData,setLoadingData] = useState(null)
const [cookingShow,setCookingShow] = useState(false)
const [current_product_id,setCurrent_product_id] = useState(null)
const [test_cart,setTest_cart] = useState([])
const [quantity,setQuantity] = useState("")
const [withoutAddonProductId,setWithoutAddonProductId] = useState(null)
const [cookingInstruction,setCookingInstruction] = useState(null)
const [showmodal2,setShowmodal2] = useState(false)
const [additemCicked,setAdditemCicked] = useState(false)
const [final_addon_array,setFinal_addon_array] = useState([])
console.log("final_addon_array",final_addon_array)
const [radio_final_addon_array,setRadio_final_addon_array] = useState(null)
const [select_final_addon_array,setSelect_final_addon_array] = useState(null)
const [checkbox_final_addon_array,setCheckbox_final_addon_array] = useState([])
console.log("checkbox_final_addon_array",checkbox_final_addon_array)
const [current_addongroups,setCurrent_addongroups] = useState([])
console.log("current_addongroups",current_addongroups)
const [selected_product_modal,setSelected_product_modal] = useState([])
const [show,setShow] = useState(false)
const [isRequired_addongroup,setIsRequired_addongroup] = useState([])

const [true_addongroups,setTrue_addongroups] = useState([])
const [isRequired_addongroup_state,setIsRequired_addongroup_state] = useState(false)
const [current_addon_total,setCurrent_addon_total] = useState(0)
const [intersections,setIntersections] = useState([])
const [isRequired_addongroups,setIsRequired_addongroups] = useState([])
const [delivery_info,setDelivery_info] = useState([])
const [delivery_cost,setDelivery_cost] = useState(0)
const [delivery_choose,setDelivery_choose] = useState(false)
const [showmodaldelivery,setShowmodaldelivery] = useState(false)
const [current_modal_cart_item_id,setCurrent_modal_cart_item_id] = useState(null)
const [current_modal_qty,setCurrent_modal_qty] = useState(null)
const [current_selected_addons_array,setCurrent_selected_addons_array] = useState([])
const [event_data,setEvent_data] = useState("")
const [addongroup_id,setAddongroup_id]  = useState("")
const [addon_id,setAddon_id] = useState("");
const [storage_all_user_addon,setStorage_all_user_addon] = useState([])
const [one_addon_of_particular_addongroups,setOne_addon_of_particular_addongroups] = useState([])
const [configInfo, setConfigInfo] = useState([]);
const config_data = useSelector(state => state.Config);
const [availableDates,setAvailableDates] = useState([]);
const [orderaheadSelectedDate, setOrderaheadSelectedDate] = useState({
  selectedDate: null
});
const [orderaheadSelectedTime, setOrderaheadSelectedTime] = useState({
  selectedTime: null
});
const [orderaheadactive, setOrderaheadactive] = useState([]);
const [localdate,setLocalDate] = useState(null)
const [localtime,setLocalTime] = useState(null)
const [localdateformatted,setLocalDateFormatted] = useState(null)
const [startDate, setStartDate] = useState(new Date());
const [startTime, setStartTime] = useState(new Date());
const [availableTimes, setAvailableTimes] = useState([]);
const [current_startTimeHours, setCurrent_startTimeHours] = useState(null);
const [current_startTimeMinutes, setCurrent_startTimeMinutes] = useState('00');
const [current_endTimeHours, setCurrent_endTimeHours] = useState('23');
const [current_endTimeMinutes, setCurrent_endTimeMinutes] = useState('55');
const [allTimeData,setAllTimeData] = useState([]);
const [freemodal,setFreemodal] = useState(false)
const [currentselectedoffer,setCurrentSelectedOffer] = useState(null)
const [availableOfferData,setAvailableOfferData] = useState([])
const [offerEnrolment,setOfferEnrolment] = useState(0)
const [freeItemdata,setFreeItemdata] = useState([])
const [currentFreeItemCount,setCurrentFreeItemCount] = useState(0)
const [currentFreeSelected,setCurrentFreeSelected] = useState(0)



  // component all states define End

// hooks start
// get user email,user token and bucket id hook start
  useEffect(() =>{
    if(props && props.merchantInfo && props.merchantInfo.access_token){
      const user_email =
              localStorage.getItem("user") === null
                ? "guest@onlinebites.com"
                : localStorage.getItem("user");
            const user_token =
              localStorage.getItem("access_token") === null
                ? props.merchantInfo.access_token
                : localStorage.getItem("access_token");
            const user_local_bucket_id = localStorage.getItem("user_local_bucket_id") == null && localStorage.getItem("user_local_bucket_id") == undefined
              ? ""
              : localStorage.getItem("user_local_bucket_id");
              setFinalUserEmail(user_email)
              setFinalUserToken(user_token)
              setUniqueBucketId(user_local_bucket_id)
    }
  },[props && props.merchantInfo && props.merchantInfo.access_token])
// get user email,user token and bucket id hook end


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

// get restaurant related information and restaurant menu hook start
  useMemo(() =>{
    if(configResponseData && configResponseData.url_info && Object.keys(configResponseData.url_info).length>0){
      //console.log('configResponseData11', configResponseData);
      const restaurant_info_data = {
        static_resource_endpoint:configResponseData.static_resource_endpoint,
        static_resource_sufix:configResponseData.static_resource_sufix,
        rest_merchant_id:configResponseData.url_info.MERCHANT_ID
      }
      const menulist_info = {
        static_resource_endpoint:configResponseData.static_resource_endpoint,
        static_resource_categories_prefix:configResponseData.static_resource_categories_prefix,
        static_resource_sufix:configResponseData.static_resource_sufix,
        rest_merchant_id:configResponseData.url_info.MERCHANT_ID
      }
      const coupon_info = {
      mid:configResponseData.url_info.MERCHANT_ID,
      finalUserToken:finalUserToken
    }
      const localdateparam = `localdate-${configResponseData.url_info.MERCHANT_ID}` ;
      const localtimeparam = `localtime-${configResponseData.url_info.MERCHANT_ID}` ;

      const localdate = localStorage.getItem(localdateparam) ;
      const localtime = JSON.parse(localStorage.getItem(localtimeparam));
      setLocalTime(localtime);
      setLocalDate(localdate);
      dispatch(updateOrderAhead(localdate,localtime))
      const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const selectedMonth = monthName[new Date(localdate).getDate()];
      setLocalDateFormatted(`${new Date(localdate).getMonth()} ${selectedMonth} ${new Date(localdate).getFullYear()}`);
      dispatch(fetchRestaurantInformation(restaurant_info_data))
      dispatch(fetchMenuList(menulist_info))
      dispatch(fetchOfferlists(coupon_info))
    }
  },[configResponseData && configResponseData.url_info])
  // get restaurant related information and restaurant menu hook end

// add restaurant main information into const hook start
  useMemo(() =>{
    setSingleRestaurantResponseData({
      banner_info:restaurantInformation_data.restaurant_info.object,
      logo:restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.LOGO ? restaurantInformation_data.restaurant_info.object.LOGO : null,
      business_data:restaurantInformation_data.restaurant_info.object,
      maintenance_mode:restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.MAINTENANCE_MODE ? restaurantInformation_data.restaurant_info.object.MAINTENANCE_MODE : false,
      product_image_preview:restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.PRODUCT_IMAGE_PREVIEW ? restaurantInformation_data.restaurant_info.object.PRODUCT_IMAGE_PREVIEW : false
    })
  },[restaurantInformation_data && restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.request_status === true])
// add restaurant main information into const hook end

// send banner_info data to app js hook start
useMemo(() =>{
  props.banner_info_parentcallbackfunction(singleRestaurantResponseData.banner_info)
},[singleRestaurantResponseData && singleRestaurantResponseData.banner_info])
// send banner_info data to app js hook end

// add restaurant menu data into constant hook start
  useMemo(() =>{
    setMenuListResponseData({
      restaurantsdata:menuList_data.menulist.data
    })
  },[menuList_data && menuList_data.menulist && menuList_data.menulist.data && menuList_data.menulist.request_status === true])
// add restaurant menu data into constant hook end

// get bucket id hook start
  useEffect(() =>{              // this hook execute once
    if(uniqueBucketId == "" && finalUserToken !="" && finalUserEmail !=""){
      const bucket_id_info = {
        user_token:finalUserToken,
        user_email:finalUserEmail
      }
      dispatch(fetchBucketId(bucket_id_info))
    }
  },[finalUserToken,finalUserEmail])
// get bucket id hook end

// add bucketid response data into constant hook start
  useMemo(() =>{
    if(bucketId_data && bucketId_data.bucket_id && bucketId_data.bucket_id.object){
      setUniqueBucketId(bucketId_data.bucket_id.object.bucketId)
      setTest_cart(bucketId_data.bucket_id.object)
      setQuantity(bucketId_data.bucket_id.object.quantity ? bucketId_data.bucket_id.object.quantity : "" )
    }
  },[bucketId_data && bucketId_data.bucket_id && bucketId_data.bucket_id.object && bucketId_data.bucket_id.object.request_status === true])
// add bucketid response data into constant hook End

useMemo(() => {
  if (bucketDciResponseData.current_shipment_method != null) {
    if (
      bucketDciResponseData.current_shipment_method ===
      bucketDciResponseData.pickup_restaurant
    ) {
      setCurrentShippingMethodName("Pickup at Restaurant");
      setDelivery_cost("0");
    } else {
      const filterdata = bucketDciResponseData.Delivery_method.filter(
        item => item.id === bucketDciResponseData.current_shipment_method
      );
      console.log("filterdata", filterdata[0].name);
      setCurrentShippingMethodName(filterdata[0].name);
      setDelivery_cost(filterdata[0].cost);
    }
  }
}, [
  bucketDciResponseData.Delivery_method,
  bucketDciResponseData.current_shipment_method,
  bucketDciResponseData.pickup_restaurant
]);

// add data of config api into confiinfo constant hook start
useMemo(() => {
  if (config_data && config_data.config && config_data.config.object) {
    setConfigInfo(config_data.config.object);
  }
}, [config_data]);
// add data of config api into confiinfo constant hook End

// add bucketid response data into constant hook start
  useMemo(() =>{
    if(bucketId_data && bucketId_data.bucket_offer && bucketId_data.bucket_offer.data){
     setFreeItemdata(bucketId_data.bucket_offer.data)
      setCurrentFreeItemCount(bucketId_data.bucket_offer.prerequisites.required_offer_item_enrolment_per_bucket)
    }
  },[bucketId_data && bucketId_data.bucket_offer && bucketId_data.bucket_offer.data])
// add bucketid response data into constant hook End

  useEffect(() =>{
    window.addEventListener('scroll', () => {
     let activeClass = 'normal';
     if(window.scrollY > 270){
         activeClass = 'top';
     }
     setActiveClass(activeClass)
  });
  })

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
        offer_data:bucketInfo && bucketInfo.offer_name && bucketInfo.offer_name.length > 0 ? bucketInfo.offer_name : [],
        free_available_item:bucketInfo && bucketInfo.offer_name && bucketInfo.offer_name.length > 0 ? true : false
      })
      setLoadingData(null)
      setShow(false)
      setCookingShow(false)
      current_addongroups.map((addongroup,index) =>{
          addongroup.addons.map((addon,index) =>{
            if("value" in addon){
              addon.value = false;
            }
          })
        })
        // : null;
        setTrue_addongroups([])
        setIsRequired_addongroup([])
        setIsRequired_addongroup_state(false)
        setCurrent_addon_total(0)
        setSelected_product_modal([])
        setAdditemCicked(false)
    }
  },[bucketInfo])
// add bucketinfo data into constant hook End

// send data to app js hook start
useMemo(() =>{
  props.detailed_cart_item_parentcallbackfunction(bucketDciResponseData.Detailed_cart_item)
},[bucketDciResponseData && bucketDciResponseData.Detailed_cart_item])
// send data to app js hook end

// when additem have error hook start
  useMemo(() =>{
    if(item_data.add_item && item_data.add_item.object && item_data.add_item.object.error && item_data.add_item.object.error == "Invalid Bucket"){
      setUniqueBucketId("")
      localStorage.removeItem("user_local_bucket_id");
      const items_info = {
        final_user_token : finalUserToken,
        final_addon_array :final_addon_array.length > 0 ? final_addon_array : undefined,
        Unique_bucket_Id : uniqueBucketId,
        product_id : current_product_id,
        cookingInstruction:cookingInstruction,
        final_user_email:finalUserEmail,
        orderDate:localdate,
        orderTime:localtime
      }
      dispatch(addItems(items_info))
    }
  },[item_data.add_item && item_data.add_item.object && item_data.add_item.object.error && item_data.add_item.object.error == "Invalid Bucket"])
// when additem have error hook End

// add additem response into constant and fetch bucket hook start
  useMemo(() =>{
    if(item_data.add_item && item_data.add_item.object && item_data.add_item.request_status && item_data.add_item.request_status === true ){
      setUniqueBucketId(item_data.add_item.object.bucket)
      setTest_cart(item_data.add_item.object)
      setQuantity(item_data.add_item.object.quantity)
      setWithoutAddonProductId(null)
      setCookingInstruction(null)
    }
    if(uniqueBucketId != ""){
      const bucket_info = {
        user_token:finalUserToken,
        user_local_bucket_id:uniqueBucketId,
        user_email:finalUserEmail
      }
      dispatch(fetchBucket(bucket_info))
      window.localStorage.setItem('user_local_bucket_id', uniqueBucketId);
    }
  },[item_data.add_item && item_data.add_item.object &&  item_data.add_item.requestId])
// add additem response into constant and fetch bucket hook End


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

// when current_addongroups has value hook start
  useMemo(() =>{
    if(current_addongroups && current_addongroups.length > 0){
      let isRequired_addongroups = []
       current_addongroups.map((addongroups,index) =>{
              if(addongroups.isRequired === true){
                isRequired_addongroups = isRequired_addongroups.concat(addongroups.addOnGroupId)
              }
            })
      setIsRequired_addongroup(isRequired_addongroups)
    }
  },[current_addongroups])
// when current_addongroups has value hook end

// when bucketinfo has data and final_addon_array has value hooks start
  useMemo(() =>{
    setBucketDciResponseData({
      Detailed_cart:bucketInfo,
      Detailed_cart_item:bucketInfo && bucketInfo.item ? bucketInfo.item : [],
      cart_item_tip:bucketInfo && bucketInfo.fees ? bucketInfo.fees : [],
      Detailed_cart_checkout_method:bucketInfo && bucketInfo.available_checkout_methods ? bucketInfo.available_checkout_methods : [],
      Delivery_method:bucketInfo && bucketInfo.available_delivery_methods ? bucketInfo.available_delivery_methods : [],
      pickup_restaurant:bucketInfo && bucketInfo.available_pickup_methods ? bucketInfo.available_pickup_methods : [],
      offer_data:bucketInfo && bucketInfo.offer_name && bucketInfo.offer_name.length > 0 ? bucketInfo.offer_name : [],
        free_available_item:bucketInfo && bucketInfo.offer_name && bucketInfo.offer_name.length > 0 ? true : false
    })
    setLoadingData(false)
  },[bucketInfo && bucketInfo.request_status === true && final_addon_array.length > 0])
// when bucketinfo has data and final_addon_array has value hooks end

  // store all addon hook start
  useMemo(() =>{
    if(select_final_addon_array && Object.keys(select_final_addon_array).length > 0){
      setStorage_all_user_addon([...storage_all_user_addon,select_final_addon_array])
    }
  },[select_final_addon_array])
  // store all addon hook End

// when storage_all_user_addon has value hook start
  useMemo(() =>{
    console.log("storage_all_user_addon--",storage_all_user_addon)
    if(storage_all_user_addon && storage_all_user_addon.length > 0){
        console.log("storage_all_user_addon------",storage_all_user_addon)
      current_addongroups.filter(itemq =>itemq.addOnGroupId == addongroup_id).map(item11 =>
        {
            if(item11.type != "CHECKBOX"){
              console.log("nehasaini",item11.type)
              return item11.addons.filter(addons =>addons.addOnId != event_data).map(item6 =>
                storage_all_user_addon.map((item8,index) =>{
                      if(item8.addOnId === item6.addOnId){
                        setCurrent_addon_total(current_addon_total - item6.unitPrice)
                        storage_all_user_addon.splice(index,1);

                      }
                })
              )
            }
            else{
              return null
            }
              });
    }

    setOne_addon_of_particular_addongroups(storage_all_user_addon)
  },[storage_all_user_addon])
// when storage_all_user_addon has value hook End

// when one_addon_of_particular_addongroups has value hook start
  useMemo(() =>{
    if(one_addon_of_particular_addongroups && one_addon_of_particular_addongroups.length > 0){
      const duplicate_value = one_addon_of_particular_addongroups.filter( (ele, ind) => ind != one_addon_of_particular_addongroups.findIndex( elem => elem.addOnId === ele.addOnId))
          const duplicate_id = duplicate_value && duplicate_value.length > 0 ? duplicate_value[0].addOnId : null ;
          if(duplicate_id != null){
                    current_addongroups.filter(itemq =>itemq.addOnGroupId === addongroup_id).map(duplicate_add =>{
                      duplicate_add.addons.filter(duplicate_addon => duplicate_addon.addOnId === duplicate_id).map(duplicate =>{
                        setCurrent_addon_total(current_addon_total - duplicate.unitPrice)
                      })
                    })
                    setOne_addon_of_particular_addongroups(one_addon_of_particular_addongroups.filter( (ele, ind) => ind === one_addon_of_particular_addongroups.findIndex( elem => elem.addOnId === ele.addOnId)))
                  }
      setFinal_addon_array(one_addon_of_particular_addongroups)
    }
  },[one_addon_of_particular_addongroups])
// when one_addon_of_particular_addongroups has value hook end

// when final_addon_array has value hook start
  useMemo(() =>{
    if (final_addon_array && final_addon_array.length > 0) {
    let final_array = [];
            let array2 = [];
            let array1 = [];
            let true_addon =[];
            let isRequired_addongroups = []
    array1 = final_addon_array.map(item1 => item1.addOnId);
    current_addongroups.map((addongroups,index) =>{
              if(addongroups.isRequired === true){
                isRequired_addongroups = isRequired_addongroups.concat(addongroups.addOnGroupId)
              }
               addongroups.addons.map(item =>{

                 array2 = array2.concat(item.addOnId)

                   if (item.addOnId === event_data){
                     true_addon = addongroups.addOnGroupId
                   }



               });
            });
    final_array = array1.filter(e => array2.indexOf(e) !== -1);
    setIntersections(final_array)
    setTrue_addongroups([...true_addongroups,true_addon])
    setIsRequired_addongroups(isRequired_addongroups)
  }
  },[final_addon_array])
// when final_addon_array has value hook End

// when intersections, true_addongroups and isRequired_addongroups has value hook start
  useMemo(() =>{
    if(intersections && intersections.length > 0 && true_addongroups && true_addongroups.length > 0 && isRequired_addongroups && isRequired_addongroups.length > 0){

      const final_array2 = true_addongroups.filter(e => isRequired_addongroup.indexOf(e) !== -1);
      if(final_array2.length === isRequired_addongroup.length){
                setIsRequired_addongroup_state(true)
            }
    }
  },[intersections && true_addongroups && isRequired_addongroups])
// when intersections, true_addongroups and isRequired_addongroups has value hook end

// when radio_final_addon_array has value hook start
  useMemo(() =>{
    if(radio_final_addon_array && Object.keys(radio_final_addon_array).length > 0){
      setStorage_all_user_addon([...storage_all_user_addon,radio_final_addon_array])
    }
  },[radio_final_addon_array])
// when radio_final_addon_array has value hook end

// when radio_final_addon_array has value hook start
  useMemo(() =>{
    if(checkbox_final_addon_array && checkbox_final_addon_array.length > 0){
      setFinal_addon_array([...final_addon_array,...checkbox_final_addon_array])
    }
  },[checkbox_final_addon_array])
// when radio_final_addon_array has value hook end

  useMemo(() =>{
    setDelivery_info(updateShippingMethod_data.update_shipping_method.object)
  },[updateShippingMethod_data && updateShippingMethod_data.update_shipping_method && updateShippingMethod_data.update_shipping_method.object && updateShippingMethod_data.update_shipping_method.object.request_status === true])

  useEffect(() =>{
    if(delivery_info && delivery_info.length > 0){
      setDelivery_cost(delivery_info.cost)
      setDelivery_choose(true)
    }
  },[delivery_info && delivery_info.length > 0 && delivery_info.cost])


useMemo(() =>{
  if(configResponseData && configResponseData.url_info && configResponseData.url_info.ORDER_AHEAD_DAYS){
    configResponseData.url_info.ORDER_AHEAD_DAYS.map((myDate, index) => {
      myDate = myDate.split("/");
      var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
      availableDates.push(newDate)

    });
//console.log('datedate', availableDates);
  }
},[configResponseData && configResponseData.url_info && configResponseData.url_info.ORDER_AHEAD_DAYS])


useMemo(() =>{
  if(configResponseData && configResponseData.url_info && configResponseData.url_info.SHOP_TIMING){
    configResponseData.url_info.SHOP_TIMING.map((myDay, index) => {
      const trimmedTime =  myDay.time.replaceAll(' ','');
    console.log('trimmedTime',trimmedTime);
      const myTime = trimmedTime.split("-");
      const start_time = myTime[0];
      const end_time = myTime[1];
      availableTimes.push({name:myDay.name,startTime:start_time,endTime:end_time})

    });
console.log('datedate', availableTimes);
  }
},[configResponseData && configResponseData.url_info && configResponseData.url_info.SHOP_TIMING])


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

  useEffect(() =>{
    if(tip_data && tip_data.add_tip && tip_data.add_tip.request_status === true){
      const bucket_info = {
        user_token:finalUserToken,
        user_local_bucket_id:uniqueBucketId,
        user_email:finalUserEmail
      }
      dispatch(fetchBucket(bucket_info))
    }
  },[tip_data && tip_data.add_tip && tip_data.add_tip.request_status === true])

// hooks end

// component function start

// open additional instruction modal function start
const handleCookingInstruction = event => {
  setCookingShow(true)
  setWithoutAddonProductId(event.target.value)
  }
// open additional instruction modal function end

// add without addon product to bucket function start
const handleSelect = (event) =>{
    setLoadingData(event.target.value)

    menuListResponseData.restaurantsdata.map(items => {
    items.products
      .filter(productdata => productdata.productId == event.target.value)
      .map(item => {
        setCurrent_product_id(item.productId)
      });
  })

  const items_info = event.target.getAttribute("offer") != null ? {
      final_user_token : finalUserToken,
      final_addon_array :undefined,
      Unique_bucket_Id : uniqueBucketId,
      product_id : event.target.value,
      cookingInstruction:cookingInstruction,
      final_user_email:finalUserEmail,
      offer_name:currentselectedoffer,
      orderDate:localdate,
      orderTime:localtime
    } :
    {
      final_user_token : finalUserToken,
      final_addon_array :undefined,
      Unique_bucket_Id : uniqueBucketId,
      product_id : event.target.value,
      cookingInstruction:cookingInstruction,
      final_user_email:finalUserEmail,
      orderDate:localdate,
      orderTime:localtime
  };

  dispatch(addItems(items_info))
}
// add without addon product to bucket function end

const dateoptions =
  configResponseData &&
  configResponseData.url_info &&
  configResponseData.url_info.ORDER_AHEAD_DAYS &&
  configResponseData.url_info.ORDER_AHEAD_DAYS.map((date, index) => {
    return { value: date, label: date };
  });




const handleDateChange = date => {
  console.log(`Option selected:`, date);
  setStartDate(date);
  setOrderaheadSelectedDate({ selectedDate: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`});
  const weekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
  const selectedDay = weekday[date.getDay()];
  console.log('selectedDayselectedDay',selectedDay);
  const filteredSelectedDay = availableTimes.filter((item,i)=>item.name === selectedDay);
  console.log('filteredSelectedDay',filteredSelectedDay);
  const amTime = filteredSelectedDay && filteredSelectedDay.length > 0 ? filteredSelectedDay[0].startTime === '12am' ? '12:00am': filteredSelectedDay[0].startTime : null;
  const morningTime = filteredSelectedDay && filteredSelectedDay.length > 0 ? amTime.replaceAll('am','') : '12:00';
  const eveningTime = filteredSelectedDay && filteredSelectedDay.length > 0 ? filteredSelectedDay[0].endTime.replaceAll('pm','') : '24:00';
  const finalOpeningTimeHours = filteredSelectedDay && filteredSelectedDay.length > 0 ? moment(filteredSelectedDay[0].startTime, ["h:mm a"]).format("HH") : '00';
  const finalOpeningTimeMinutes = filteredSelectedDay && filteredSelectedDay.length > 0 ? moment(filteredSelectedDay[0].startTime, ["h:mm a"]).format("mm") : '00';
  const finalClosingTimeHours = filteredSelectedDay && filteredSelectedDay.length > 0 ? moment(filteredSelectedDay[0].endTime, ["h:mm a"]).format("HH") : '23';
  const finalClosingTimeMinutes = filteredSelectedDay && filteredSelectedDay.length > 0 ? moment(filteredSelectedDay[0].endTime, ["h:mm a"]).format("mm") : '59';



  setCurrent_startTimeHours(finalOpeningTimeHours);
  setCurrent_startTimeMinutes(finalOpeningTimeMinutes);
  setCurrent_endTimeHours(finalClosingTimeHours);
  setCurrent_endTimeMinutes(finalClosingTimeMinutes);


    //Data
  let allTimes = [];
  let testTime = [];
  let timeStops = [];

  function getTimeStops(start, end){
  //  console.log('newstart', new moment(start).format('HH:mm'))
  //  console.log('newend', new moment(end).format('HH:mm'))
    var startTime = start;
    var endTime = end;

    if( endTime.isBefore(startTime) ){
    //  endTime.add(1, 'day');
    }



    while(startTime <= endTime){
      timeStops.push(new moment(startTime).format('HH:mm'));
      allTimes.push(setHours(setMinutes(new Date(), moment(startTime).format("mm")), startTime.format("HH")));
      startTime.add(15, 'minutes');
    }
    return timeStops;

  }

//  var timeStops = getTimeStops(startTime, endTime);


const finaltimes = filteredSelectedDay && filteredSelectedDay.length > 0 ? filteredSelectedDay.map(selectedDay => {
//  console.log('dayname',selectedDay.name);
  const openingTime =  moment(selectedDay.startTime, "h:mm a");
  const closingTime =  moment(selectedDay.endTime, "h:mm a");
//  console.log('morningTime-closingTime', openingTime+'-'+closingTime);
  getTimeStops(openingTime, closingTime);
}) : null;

setAllTimeData(allTimes);





};

const handleTimeChange = date => {
  //console.log(`Option selected:`, date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
//  console.log('orderaheadSelectedTime', minutes);
  setStartTime(date);
  setOrderaheadSelectedTime({ selectedTime: `${hours}:${minutes === 0 ? '00' : minutes}` });
};

const currentrestlocaltime =
  configResponseData && configResponseData.url_info
    ? `localtime-${configResponseData.url_info.MERCHANT_ID}`
    : null;
const currentrestlocaldate =
      configResponseData && configResponseData.url_info
        ? `localdate-${configResponseData.url_info.MERCHANT_ID}`
        : null;

const handleSaveDateChange = e => {
  console.log(`Option selected:`, e);
  // const saveddatetime = JSON.stringify([
  //   {
  //     selectedDate: orderaheadSelectedDate.selectedDate,
  //     selectedTime: orderaheadSelectedTime.selectedTime
  //   }
  // ]);
  window.localStorage.setItem(currentrestlocaldate, orderaheadSelectedDate.selectedDate ? orderaheadSelectedDate.selectedDate : null);

  window.localStorage.setItem(currentrestlocaltime, JSON.stringify(orderaheadSelectedTime.selectedTime));
  setLocalDate(orderaheadSelectedDate.selectedDate);
  setLocalTime(orderaheadSelectedTime.selectedTime);
  dispatch(updateOrderAhead(orderaheadSelectedDate.selectedDate,orderaheadSelectedTime.selectedTime))
  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const selectedMonth = monthName[new Date(orderaheadSelectedDate.selectedDate).getDate()-1];
  setLocalDateFormatted(`${new Date(orderaheadSelectedDate.selectedDate).getMonth()+1} ${selectedMonth} ${new Date(orderaheadSelectedDate.selectedDate).getFullYear()}`);
  setOrderaheadactive(false);
};

const resetdates = e => {
  console.log(`Option selected:`, e);
  // const saveddatetime = JSON.stringify([
  //   {
  //     selectedDate: orderaheadSelectedDate.selectedDate,
  //     selectedTime: orderaheadSelectedTime.selectedTime
  //   }
  // ]);
  window.localStorage.removeItem(currentrestlocaldate);
  window.localStorage.removeItem(currentrestlocaltime);
  setLocalDate(null);
  setLocalTime(null);
  setLocalDateFormatted(null);
  setOrderaheadactive(false);
  dispatch(updateOrderAhead(null,null))
};



// open the addon product modal function start
const handleShow = (event) =>{
  setShowmodal2(false)
  setFinal_addon_array([])
  setStorage_all_user_addon([])
  setOne_addon_of_particular_addongroups([])
  setRadio_final_addon_array(null)
  setSelect_final_addon_array(null)
  menuListResponseData.restaurantsdata.map(items => {
  items.products
    .filter(productdata => productdata.productId == event.target.value)
    .map(item => {
      setCurrent_product_id(item.productId)
      setCurrent_addongroups(item.addonsGroups)
      setSelected_product_modal(selected_product_modal.concat(item))
      setShow(true)
    });
})
}
// open the addon product modal function end


// close the addon product modal function start
const handleClose = () =>{
  // current_addongroups && current_addongroups.length > 0 ?
  current_addongroups.map((addongroup,index) =>{
      addongroup.addons.map((addon,index) =>{
        if("value" in addon){
          addon.value = false;
        }
      })
    })
    // : null;
    setShow(false)
    setTrue_addongroups([])
    setIsRequired_addongroup([])
    setIsRequired_addongroup_state(false)
    setCurrent_addon_total(0)
    setSelected_product_modal([])
    setAdditemCicked(false)
}
// close the addon product modal function end

// add with addon product to bucket function start
const saveAddon = () =>{
  setAdditemCicked(true)
  setShowmodal2(false)
  setTrue_addongroups([])
  setIsRequired_addongroup([])
  setIsRequired_addongroup_state(false)
  const items_info = {
    final_user_token : finalUserToken,
    final_addon_array :final_addon_array,
    Unique_bucket_Id : uniqueBucketId,
    product_id : current_product_id,
    cookingInstruction:cookingInstruction,
    final_user_email:finalUserEmail,
    orderDate:localdate,
    orderTime:localtime
  }
  dispatch(addItems(items_info))
}
// add with addon product to bucket function end

// select function start
const selecthandlechange = (event) =>{
  if (event.target.value != "") {
     setEvent_data(event.target.value)
      // current_addongroups.length > 0 ?
      current_addongroups.map(item2 =>{
        item2.addons.filter(addon => addon.addOnId === event.target.value).map(item3 =>{
          setAddongroup_id(item2.addOnGroupId)
          item3.value = true;
          setCurrent_addon_total(current_addon_total+item3.unitPrice)
        })
      })
      // :null
      // current_addongroups.length > 0 ?
      current_addongroups.filter(item4 =>item4.addOnGroupId === addongroup_id).map(item5 =>{
        item5.addons.filter(addons =>addons.addOnId != event.target.value).map(item6 => {
          item6.value = false;
        })
      })
      // :null

      const new_select_addon = { addOnId: event.target.value, quantity: 1 };
      setSelect_final_addon_array(new_select_addon)
  }
}
// select function End

// radiohandlechange function start
const radiohandlechange = (event) =>{
  const new_radio_addon = { addOnId: event.target.value, quantity: 1 };
     setEvent_data(event.target.value)
    current_addongroups.map(item2 =>{
      item2.addons.filter(addon => addon.addOnId === event.target.value).map(item3 =>{
        setAddongroup_id(item2.addOnGroupId)
        item3.value = true;
        setCurrent_addon_total(current_addon_total+item3.unitPrice)
      })
    });
    current_addongroups.filter(item4 =>item4.addOnGroupId === addongroup_id).map(item5 =>{
      item5.addons.filter(addons =>addons.addOnId != event.target.value).map(item6 => {
        item6.value = false;
      })
    });
    setRadio_final_addon_array(new_radio_addon)
}
// radiohandlechange function End

// toggle function start
const toggle = (event) =>{
  setEvent_data(event.target.value)
  current_addongroups.map(addongroup => {
        addongroup.addons
          .filter(addon => addon.addOnId === event.target.value)
          .map(addonstate => {
            // if("value" in addonstate)
            setAddongroup_id(addongroup.addOnGroupId)
            if (addonstate.value === true) {

               storage_all_user_addon.map((item8,index) =>{
                    if(item8.addOnId === event.target.value){
                      storage_all_user_addon.splice(index,1);
                    }
              })
              const remaining_selected_addons = current_selected_addons_array.filter(
                addon => addon.addOnId === addonstate.addOnId
              );
              setCurrent_addon_total(current_addon_total - addonstate.unitPrice)
              setCurrent_selected_addons_array(remaining_selected_addons)
              setStorage_all_user_addon(storage_all_user_addon.filter( (ele, ind) => ind === storage_all_user_addon.findIndex( elem => elem.addOnId === ele.addOnId)))
              addonstate.value = false;
            } else if(addonstate.value === false || addonstate.value === undefined) {
              const new_Addon = { addOnId: event.target.value, quantity: 1 };
              setCurrent_addon_total(current_addon_total + addonstate.unitPrice)
              setCurrent_selected_addons_array(current_selected_addons_array.concat(addonstate))
              setStorage_all_user_addon([...storage_all_user_addon,new_Addon])
              addonstate.value = true;
            }
          });
      });
}
// toggle function End

// deliveryhandler function start
const deliveryhandler = (event) =>{
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

// close free modal function start
const handleopenfreemodal = (e) => {
  setFreemodal(true)
  setCurrentSelectedOffer(e)
  const offername = {
    offer_name:e,
    user_token:finalUserToken,
    bucket_id:uniqueBucketId
  }
  dispatch(fetchOfferData(offername))
  };

  // close free modal function start

  const handleclosefreemodal = (e) => {
    setFreemodal(false)
    setFreeItemdata([])
    setCurrentFreeItemCount(0)
    setCurrentFreeSelected(0)
    };
  // close delivery modal function end

// close delivery modal function start
const handleclosedelivery = () => {
  setShowmodaldelivery(false)
  };
// close delivery modal function end

// handleClosemodal2 function start
const handleClosemodal2 =() =>{
      setShowmodal2(false)
}
// handleClosemodal2 function End

// close cooking modal function start
const handleCookingClose = () => {
  setCookingShow(false)
}
// close cooking modal function end

// handleShowmodal2 function start
const handleShowmodal2 = (value1, value2, value3) =>{
    setCurrent_product_id(value1)
    setCurrent_modal_cart_item_id(value2)
    setCurrent_modal_qty(value3)
    setShowmodal2(true)
}
// handleShowmodal2 function end

// repeat_last function start
const repeat_last = (value1, value2) =>{
  setShow(false)
  setSelected_product_modal([])
  setShowmodal2(false)
  const update_item_qty_info = {
    final_user_token:finalUserToken,
    bucket_id:uniqueBucketId,
    final_user_email:finalUserEmail,
    bucketItemId:value1,
    quantity:value2 + 1
  }
  dispatch(updateItemQuantity(update_item_qty_info))
}
// repeat_last function End

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

const decrementwithAddon = () =>{

}

const incrementwithAddon = () =>{

}
// component function end

let timeslots = [
    ['1', '2'], // 1:00 AM - 2:00 AM
    ['2', '3'], // 2:00 AM - 3:00 AM
    ['4', '6'], // 4:00 AM - 6:00 AM
    '5', // 5:00 AM
    ['4', '6', '7', '8'], // 4:00 AM - 6:00 AM - 7:00AM - 8:00AM
];

let timeslotProps = {
    format: 'h', // Each element in the timeslot array is an Hour
    showFormat: 'h:mm A', // They will be displayed as Hour:Minutes AM/PM
}
let onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
  /**
   * All timeslot objects include `startDate` and `endDate`.

   * It is important to note that if timelots provided contain a single
   * value (e.g: timeslots = [['8'], ['9', '10']) then only `startDate` is filled up with
   * the desired information.
   */
  console.log(lastSelectedTimeslot.startDate); // MomentJS object.

}

const orderaheadconainer = (
  <div className="container">
  {configResponseData && configResponseData.url_info && configResponseData.url_info.ORDER_AHEAD_DAYS ?
    <div className="order-ahead">
      <h1 className="selecttimehead">Select Date and Time for your order</h1>



      <Row className="orderaheadcol">

        <Col md={6}>
          <h5>Date</h5>

        <DatePicker
         selected={startDate}
         //onChange={(date) => setStartDate(date)}
         onChange={(date) => handleDateChange(date)}
         includeDates={availableDates}
         //showTimeSelect
         dateFormat="dd/MM/yyyy"
         className="form-control dates"
       />

        </Col>
        <Col md={6}>
          <h5>Time</h5>
          {current_startTimeHours && current_startTimeHours != null && allTimeData.length > 0 ?
          <DatePicker
      selected={startTime}
      onChange={(date) => handleTimeChange(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      includeTimes={allTimeData}
      dateFormat="h:mm aa"
       className="form-control times"
    />
    :
    <DatePicker
        showTimeSelectOnly
        timeIntervals={15}
        disabled
        placeholderText="Select an available Date"
        dateFormat="h:mm aa"
        className="form-control times"
/>
  }
        </Col>
        <Col md={12}>
          <button
            className="selectdatetime"
            onClick={e => handleSaveDateChange(e)}
          >
            Submit
          </button>
        </Col>
      </Row>


    </div>
      : null}
  </div>
);



  const loaderDiv = (
        <div className="cartLoader">
          <img src="/img/spinner.gif" />
        </div>
      );

      const tip_rate_fees = [0,10,15,20];
  //menu category start
    const category = menuListResponseData.restaurantsdata && menuListResponseData.restaurantsdata.length > 0 ? menuListResponseData.restaurantsdata.map((cat, index) => {
      const hashlink = `#${cat.category.categoryName}`;

      return (
        <li key={index}>
          <a href={hashlink}>{cat.category.categoryName}</a>
        </li>
      );
    }):null
    //menu category end

    // menu data of particular restaurant start

    const menuList = menuListResponseData.restaurantsdata && menuListResponseData.restaurantsdata.length > 0 ? menuListResponseData.restaurantsdata.map((cat, index) => {
      const product = cat.products;
      return (
        <ScrollableAnchor id={cat.category.categoryName} key={index}>
          <div className="pizza1">
            <h2>{cat.category.categoryName}</h2>
            <div className="pizza1-contant">
              <div className="row">
                {product.map((item, index) => {

                  const Add_Button =
                singleRestaurantResponseData.maintenance_mode == "false" || singleRestaurantResponseData.maintenance_mode === undefined ?
                (configResponseData.is_shop_open == "false" || configResponseData.is_shop_open === undefined) && localdate === null && localtime === null ? (
                  <button
                    className="addbutton"
                    disabled
                  >
                    Closed
                  </button>
                ) : item.available_for_sale === false ? (
                  <>
                  <button
                    className="available-for-sale"
                    data-tip
                    data-for='happyFace'
                  >
                    ADD
                  </button>
                  <ReactTooltip id='happyFace' type='error'>
                      <span class="maintenance-content">Not Available at this Time.</span>
                  </ReactTooltip>
                  </>
                  ):
                  item.addonsGroups.length > 0 ? (
                    <>
                      <button
                        className="addbutton"
                        value={item.productId}
                        onClick={e =>handleShow(e)}
                      >
                        ADD
                      </button>
                    </>
                  ): item.enabledUserInstructions && item.enabledUserInstructions === true ? (
                      <button
                        className="addbutton"
                        value={item.productId}
                        onClick={(e) =>handleCookingInstruction(e)}
                      >
                        ADD
                      </button>
                    ) : (
                    <button
                      className="addbutton"
                      value={item.productId}
                      onClick={(e) =>handleSelect(e)}
                    >
                      ADD
                    </button>
                  ):(
                    <>
                    <button
                      className="addbutton"
                      data-tip
                      data-for='happyFace'
                    >
                      ADD
                    </button>
                    <ReactTooltip id='happyFace' type='error'>
                        <span class="maintenance-content">In Maintenance Mode</span>
                    </ReactTooltip>
                    </>
                  )
                  let Current_Addons = [];
                  let current_Qnty = "";
                  let current_cart_item_id = "";
                  const Current_Qnty_array =
                    bucketDciResponseData.Detailed_cart_item &&
                    bucketDciResponseData.Detailed_cart_item.length > 0 ?
                    bucketDciResponseData.Detailed_cart_item.filter(
                      qty => qty.product_id === item.productId
                    ):null;

                    Current_Addons =
                      bucketDciResponseData.Detailed_cart_item &&
                      bucketDciResponseData.Detailed_cart_item.length > 0 &&
                      bucketDciResponseData.Detailed_cart_item.filter(
                        qty => qty.product_id == item.productId
                      ).map(addon_quantity => {
                        return addon_quantity.addons;
                      });

                      current_Qnty =
                      Current_Qnty_array &&
                      Current_Qnty_array.slice(-1)[0] &&
                      Current_Qnty_array.slice(-1)[0].qty
                        ? Current_Qnty_array.slice(-1)[0].qty
                        : 0;
                        let totalqty = 0;

                     const Current_Qnty2 =
                          Current_Qnty_array &&
                          Current_Addons.length > 0 ?
                          Current_Qnty_array.map(item => {
                           totalqty += item.qty
                           return totalqty;
                          }) : 0;
                     current_cart_item_id =
                      Current_Qnty_array &&
                      Current_Qnty_array.slice(-1)[0] &&
                      Current_Qnty_array.slice(-1)[0].item_id
                        ? Current_Qnty_array.slice(-1)[0].item_id
                        : 0;

                  const ConditionalIncreamentButton =
                    item.addonsGroups.length > 0 ? (
                      <button
                        className="counter-plus"
                        onClick={() =>handleShowmodal2(
                          item.productId,
                          current_cart_item_id,
                          current_Qnty
                        )}
                      >
                        +
                      </button>
                    ) : (
                      <>
                      <button
                        className="counter-plus"
                        value={item.productId}

                        //onClick={this.increment}
                        onClick={() =>{
                           incrementNew(
                          current_cart_item_id,
                          current_Qnty,
                          uniqueBucketId,
                          item.productId
                        )}}
                      >
                        +
                      </button>
                      </>
                    );

                  const showLoader =
                    loadingData &&
                    loadingData == item.productId
                      ? "pamout show_loader"
                      : "pamout show_button";

                  const PlusMinusButton =
                    bucketDciResponseData.Detailed_cart_item &&
                    bucketDciResponseData.Detailed_cart_item.length > 0 &&
                    bucketDciResponseData.Detailed_cart_item.filter(
                      qty => qty.product_id == item.productId
                    ).length > 0 ? (
                      <div className="handle-counter" id="handleCounter3">
                      {bucketDciResponseData.Detailed_cart_item.filter(qty1 => qty1.product_id == item.productId).length >= 2 && Current_Addons.length > 0 ? (
                      <>
                      <button
                        className="counter-minus"
                        data-tip
                        data-for={item.product_id}

                      >
                        -
                      </button>
                      <ReactTooltip id={item.product_id} type='error'>
                          <span class="addon-content">This item has multiple customizations added. Remove the correct item from the cart.</span>
                      </ReactTooltip>
                      </>
                    ) : (
                      <button
                        className="counter-minus"
                        value={item.productId}
                        onClick={() => decrementNew(
                          current_cart_item_id,
                          current_Qnty,
                          uniqueBucketId,
                          item.productId
                        )}
                      >
                        -
                      </button>
                    ) }
                        {Current_Addons.length > 0 ? totalqty : current_Qnty}

                        {ConditionalIncreamentButton}
                      </div>
                    ) : (
                      Add_Button
                    );

                  return (
                    <div className={
                      singleRestaurantResponseData.product_image_preview ===
                      "true"
                        ? "col-lg-6"
                        : "col-lg-12"
                    } key={index}>
                      <div className="ppara">
                        <div className="pizza-img">
                        {singleRestaurantResponseData.product_image_preview ===
                        "true" ? (
                          <div className="pizza-photo">
                            <img
                              src={item.image}
                              alt="images not found"
                            />
                          </div>
                        ) : null}
                          <div className="pprise">
                            <h6>{item.name}</h6>
                            <p>{item.shortDescription}</p>
                          </div>

                          <div className={showLoader}>
                            <span>${item.price}</span>
                            <div className="count button_box">
                              {PlusMinusButton}
                            </div>
                            <div className="count loader_box">{loaderDiv}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollableAnchor>
      );
    }):null
    // menu data of particular restaurant end

    // modal content start
  const modal_content =
    selected_product_modal.length > 0
      ? selected_product_modal.map((item, index) => {
          return (
            <Row className="show-grid" key={index}>
              <Col md={9}>
                <h3 className="product-name">{item.name}</h3>
              </Col>
              <Col md={3}>
                <p className="modal-price">${item.price}</p>
              </Col>
              {current_addongroups.length > 0 ? current_addongroups.map((addongroup, index) => {

                const array1 = final_addon_array && final_addon_array.length > 0 ? final_addon_array.map(item => item.addOnId):null;
                const array2 = addongroup.addons ? addongroup.addons.map(item =>item.addOnId):null;
                const intersections = array1 != null && array2 != null ? array1.filter(e => array2.indexOf(e) !== -1) : [];
                return (
                  <Row className="show-grid" key={index}>
                    <Col md={12}>
                    {addongroup.isRequired && intersections.length <= 0 ?
                    (<p className ="modal-required">Required</p>) :
                    null}
                      <h4>{addongroup.name}</h4>
                      {
                        // <hr className="product-line"></hr>
                      }
                    </Col>

                    {
                      //   <Col md={12}>
                      //   <h4>{addongroup.name}</h4>
                      // </Col>
                    }
                    {addongroup.type == "SELECT" ? (
                      <Col md={6}>
                        <code class="category-content">
                          <select
                            defaultValue=""
                            onChange={(e) =>selecthandlechange(e)}
                            class="form-control"
                            id="exampleFormControlSelect1"
                          >
                            <option value="" disabled={true}>
                              Choose a addon ...
                            </option>
                            {addongroup.addons.map((addon, index) => {
                              return (
                                <option value={addon.addOnId} key={index}>
                                  {addon.name} {addon.unitPrice != 0 ? ("($" + addon.unitPrice + ")") : null }
                                </option>
                              );
                            })}
                          </select>
                        </code>
                      </Col>
                    ) : addongroup.type == "RADIO" ? (
                      <>
                        {addongroup.addons && Object.keys(addongroup.addons).length > 0 ? addongroup.addons.map((addon, index) => {
                          return (
                            <Col md={6} key={index}>
                              <code>
                                <input
                                  type="radio"
                                  name="addon"
                                  value={addon.addOnId}
                                  onChange={(e) =>radiohandlechange(e)}
                                />{" "}
                                {addon.name} {addon.unitPrice != 0 ? ("($" + addon.unitPrice + ")") : null }
                              </code>
                            </Col>
                          );
                        }):null}
                      </>
                    ) : addongroup.type == "CHECKBOX" ? (
                      <>
                        {addongroup.addons.map((addon, index) => {
                          return (
                            <Col md={6} key={index}>
                              <code>
                                <input
                                  type="checkbox"
                                  checked={
                                    addon.value == "false" ? "checked" : null
                                  }
                                  value={addon.addOnId}
                                  onClick={(e) =>toggle(e)}
                                />{" "}
                                {addon.name} {addon.unitPrice != 0 ? ("($" + addon.unitPrice + ")") : null }
                              </code>
                            </Col>
                          );
                        })}
                      </>
                    ) : null}
                  </Row>
                );
              }):null}
              {item.enabledUserInstructions && item.enabledUserInstructions === true ? (
                <Row className="cooking-instruction">
                    <Col md={12}>
                    <code>
                      <h5>Additional Instructions</h5>
                      <input type="text" value={cookingInstruction} onChange={(e) =>setCookingInstruction(e.target.value)} placeholder="e.g. no cheese, no onions"  className="form-control" required/>
                    </code>
                    </Col>
                </Row>
              ) : null }

            </Row>
          );
        })
      : null;
  // modal content end

  // cooking instruction modal content start
      const cooking_instruction_modal_content =
      <Row className="cooking-instruction">
          <Col md={12}>
          <code>
            <h5>Additional Instructions</h5>
            <input type="text" value={cookingInstruction} onChange={(e) =>setCookingInstruction(e.target.value)} placeholder="e.g. no cheese, no onions"  className="form-control" required/>
          </code>
          </Col>
      </Row>
      // cooking instruction content end

  const delivery_content = (
    <Form className="delivery-form">
      <Form.Label>Delivery</Form.Label>
      <Form.Group controlId="formBasicPickup">
        <Form.Check
          type="radio"
          label="Pickup at Restaurant"
          name="formHorizontalRadios"
          id="Pickup at Restaurant"
          value={bucketDciResponseData.pickup_restaurant}
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

  // cart of without addons content start
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
                <p>{item.itemName.slice(0, 15)}</p>
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
                            onClick={() => decrementwithAddon(
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

    // cart of without addons content end

    const price_modal = selected_product_modal && selected_product_modal[0] ? selected_product_modal[0].price: 0;

    const total_price = ((current_addon_total)+price_modal) ;

    const freeitemcontent = (
    <div className="free-item-message">
      You're eligble to for following offers.<br/>
      {bucketDciResponseData.offer_data.map((offer,index) =>(
        <span onClick={(e) =>handleopenfreemodal(offer)} className="freeitemclick">{offer}</span>
      )

    )}
    </div>
  );

  const freemenuList = (<div className="row">
    {freeItemdata.length > 0 && freeItemdata.map((item, index) => {

      const selecteditem = bucketDciResponseData.Detailed_cart_item && bucketDciResponseData.Detailed_cart_item.length > 0 ? bucketDciResponseData.Detailed_cart_item.filter(product=>product.product_id === item.productId).length : null;
      //const freeitemaddedcheck = bucketDciResponseData.Detailed_cart_item && bucketDciResponseData.Detailed_cart_item.length > 0 ? bucketDciResponseData.Detailed_cart_item.every(product.product_id => secondArray.includes(obj => obj.id === id))
      const selectedproductClass = selecteditem > 0 ? 'col-lg-12 selectedproductitem' : 'col-lg-12';
      if(selecteditem > 0) {
      //  setCurrentFreeSelected(currentFreeSelected+1)
      }

      const Add_Button =
    singleRestaurantResponseData.maintenance_mode == "false" || singleRestaurantResponseData.maintenance_mode === undefined ?
    (configResponseData.is_shop_open == "false" || configResponseData.is_shop_open === undefined) && localdate === null && localtime === null ? (
      <button
        className="addbutton"
        disabled
      >
        Closed
      </button>
    ) : item.available_for_sale === false ? (
      <>
      <button
        className="available-for-sale"
        data-tip
        data-for='happyFace'
      >
        ADD
      </button>
      <ReactTooltip id='happyFace' type='error'>
          <span class="maintenance-content">Not Available at this Time.</span>
      </ReactTooltip>
      </>
      ):
      (<button
          className={currentFreeSelected >= currentFreeItemCount ? "addbutton disabled" : "addbutton"}
          value={item.productId}
          offer= {currentselectedoffer}
          onClick={(e) =>handleSelect(e)}
        >
          ADD
        </button>
      ):(
        <>
        <button
          className="addbutton"
          data-tip
          data-for='happyFace'
        >
          ADD
        </button>
        <ReactTooltip id='happyFace' type='error'>
            <span class="maintenance-content">In Maintenance Mode</span>
        </ReactTooltip>
        </>
      )
      let Current_Addons = [];
      let current_Qnty = "";
      let current_cart_item_id = "";
      const Current_Qnty_array =
        bucketDciResponseData.Detailed_cart_item &&
        bucketDciResponseData.Detailed_cart_item.length > 0 ?
        bucketDciResponseData.Detailed_cart_item.filter(
          qty => qty.product_id === item.productId
        ):null;

        Current_Addons =
          bucketDciResponseData.Detailed_cart_item &&
          bucketDciResponseData.Detailed_cart_item.length > 0 &&
          bucketDciResponseData.Detailed_cart_item.filter(
            qty => qty.product_id == item.productId
          ).map(addon_quantity => {
            return addon_quantity.addons;
          });

          current_Qnty =
          Current_Qnty_array &&
          Current_Qnty_array.slice(-1)[0] &&
          Current_Qnty_array.slice(-1)[0].qty
            ? Current_Qnty_array.slice(-1)[0].qty
            : 0;
            let totalqty = 0;

         const Current_Qnty2 =
              Current_Qnty_array &&
              Current_Addons.length > 0 ?
              Current_Qnty_array.map(item => {
               totalqty += item.qty
               return totalqty;
              }) : 0;
         current_cart_item_id =
          Current_Qnty_array &&
          Current_Qnty_array.slice(-1)[0] &&
          Current_Qnty_array.slice(-1)[0].item_id
            ? Current_Qnty_array.slice(-1)[0].item_id
            : 0;

      const ConditionalIncreamentButton =
      (
          <>
          <button
            className="counter-plus"
            value={item.productId}

            //onClick={this.increment}
            onClick={() =>{
               incrementNew(
              current_cart_item_id,
              current_Qnty,
              uniqueBucketId,
              item.productId
            )}}
          >
            +
          </button>
          </>
        );

      const showLoader =
        loadingData &&
        loadingData == item.productId
          ? "pamout show_loader"
          : "pamout show_button";

      const PlusMinusButton =
        bucketDciResponseData.Detailed_cart_item &&
        bucketDciResponseData.Detailed_cart_item.length > 0 &&
        bucketDciResponseData.Detailed_cart_item.filter(
          qty => qty.product_id == item.productId
        ).length > 0 ? (
          <div className="handle-counter" id="handleCounter3">
          {bucketDciResponseData.Detailed_cart_item.filter(qty1 => qty1.product_id == item.productId).length >= 2 && Current_Addons.length > 0 ? (
          <>
          <button
            className="counter-minus"
            data-tip
            data-for={item.product_id}

          >
            -
          </button>
          <ReactTooltip id={item.product_id} type='error'>
              <span class="addon-content">This item has multiple customizations added. Remove the correct item from the cart.</span>
          </ReactTooltip>
          </>
        ) : (
          <button
            className="counter-minus"
            value={item.productId}
            onClick={() => decrementNew(
              current_cart_item_id,
              current_Qnty,
              uniqueBucketId,
              item.productId
            )}
          >
            -
          </button>
        ) }
            {Current_Addons.length > 0 ? totalqty : current_Qnty}

            {ConditionalIncreamentButton}
          </div>
        ) : (
          Add_Button
        );

      return (
        <div className={selectedproductClass} key={index}>
          <div className="ppara">
            <div className="pizza-img">
              <div className="pizza-photo">
                <img src={item.image} alt="images not found" />
              </div>
              <div className="pprise">
                <h6>{item.name}</h6>
                <p>{item.shortDescription}</p>
              </div>

              <div className={showLoader}>
                <span>${item.price}</span>
                <div className="count button_box">
                  {selecteditem && selecteditem > 0 ? (<button
                    className="counter-minus removebtn"
                    value={item.productId}
                    onClick={() => decrementNew(
                      current_cart_item_id,
                      current_Qnty,
                      uniqueBucketId,
                      item.productId
                    )}
                  >
                    Remove
                  </button>) : PlusMinusButton}
                </div>
                <div className="count loader_box">{loaderDiv}</div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>);




  return (
    <div className="main2">
    {configResponseData &&
    configResponseData.url_info &&
    configResponseData.url_info.ENABLE_ORDER_AHEAD == true &&
    orderaheadactive == false ? (
    <div className="container">
    {localdate === null && localtime === null ? (
      <h3 className="orderahead-txt">
        We are open and accepting orders.For Future Order{" "}
        <span
          className="futuredateclick"
          onClick={e => setOrderaheadactive(true)}
        >
          Click here
        </span>{" "}
      </h3>
    ) : (
      <h3 className="orderahead-txt">
        Your selected date for order is {" "}
        <span
          className="futuredateclick"
          //onClick={e => setOrderaheadactive(true)}
        >
        {localdate}
        </span> at{" "}
        <span
          className="futuredateclick"
          //onClick={e => setOrderaheadactive(true)}
        >
         {localtime}
        </span>
        <span
          className="futuredateclick reset"
          onClick={e => resetdates(e)}
        >
         Reset
        </span>
      </h3>
    )}
    </div>
  ) : (
    orderaheadconainer
  )}
    </div>
  )
}

export default OrderAheadData
