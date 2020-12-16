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
import { fetchRestaurantInformation } from '../Redux/RestaurantInformation/RestaurantInformationActions';
import { fetchMenuList } from '../Redux/MenuList/MenuListActions';
import { fetchBucketId } from '../Redux/BucketId/BucketIdActions';
import { addItems } from '../Redux/AddItems/AddItemsActions';
import { updateShippingMethod } from '../Redux/UpdateShippingMethod/UpdateShippingMethodActions';
import { updateItemQuantity } from '../Redux/UpdateItemQuantity/UpdateItemQuantityActions';
import { addTip } from '../Redux/AddTip/AddTipActions';

function Menu(props){
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
                                                            pickup_restaurant:[]
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
      const restaurant_info_data = {
        static_resource_endpoint:configResponseData.static_resource_endpoint,
        static_resource_sufix:configResponseData.static_resource_sufix
      }
      const menulist_info = {
        static_resource_endpoint:configResponseData.static_resource_endpoint,
        static_resource_categories_prefix:configResponseData.static_resource_categories_prefix,
        static_resource_sufix:configResponseData.static_resource_sufix
      }
      dispatch(fetchRestaurantInformation(restaurant_info_data))
      dispatch(fetchMenuList(menulist_info))
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
        pickup_restaurant:bucketInfo && bucketInfo.available_pickup_methods ? bucketInfo.available_pickup_methods : []
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
        final_user_email:finalUserEmail
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
      pickup_restaurant:bucketInfo && bucketInfo.available_pickup_methods ? bucketInfo.available_pickup_methods : []
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

  const items_info = {
    final_user_token : finalUserToken,
    final_addon_array :undefined,
    Unique_bucket_Id : uniqueBucketId,
    product_id : event.target.value,
    cookingInstruction:cookingInstruction,
    final_user_email:finalUserEmail
  }
  dispatch(addItems(items_info))
}
// add without addon product to bucket function end

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
    final_user_email:finalUserEmail
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

  const loaderDiv = (
        <div className="cartLoader">
          <img src="/img/spinner.gif" />
        </div>
      );

      const tip_rate_fees = [0,10,15,20];
  //menu category start
    const category = menuList_data.menulist.gift_certificates && menuList_data.menulist.gift_certificates.length > 0 ? menuList_data.menulist.gift_certificates.map((cat, index) => {
      const hashlink = `#${cat.category.categoryName}`;

      return (
        <li key={index}>
          <a href={hashlink}>{cat.category.categoryName}</a>
        </li>
      );
    }):null
    //menu category end

    // menu data of particular restaurant start

    const menuList = menuList_data.menulist.gift_certificates && menuList_data.menulist.gift_certificates.length > 0 ? menuList_data.menulist.gift_certificates.map((cat, index) => {
      const product = cat.products;
      console.log('menu-data', menuList_data.menulist.gift_certificates);
      return (
        <ScrollableAnchor id={cat.category.categoryName} key={index}>
          <div className="pizza1">
            <h2>{cat.category.categoryName}</h2>
            <div className="pizza1-contant">
              <div className="row">
                {product.map((item, index) => {

                //   const Add_Button =
                // singleRestaurantResponseData.maintenance_mode == "false" || singleRestaurantResponseData.maintenance_mode === undefined ?
                // configResponseData.is_shop_open == "false" || configResponseData.is_shop_open === undefined ? (
                //   <button
                //     className="addbutton"
                //     disabled
                //   >
                //     Closed
                //   </button>
                // ) : item.available_for_sale === false ? (
                //   <>
                //   <button
                //     className="available-for-sale"
                //     data-tip
                //     data-for='happyFace'
                //   >
                //     ADD
                //   </button>
                //   <ReactTooltip id='happyFace' type='error'>
                //       <span class="maintenance-content">Not Available at this Time.</span>
                //   </ReactTooltip>
                //   </>
                //   ):
                //   item.addonsGroups.length > 0 ? (
                //     <>
                //       <button
                //         className="addbutton"
                //         value={item.productId}
                //         onClick={e =>handleShow(e)}
                //       >
                //         ADD
                //       </button>
                //     </>
                //   ): item.enabledUserInstructions && item.enabledUserInstructions === true ? (
                //       <button
                //         className="addbutton"
                //         value={item.productId}
                //         onClick={(e) =>handleCookingInstruction(e)}
                //       >
                //         ADD
                //       </button>
                //     ) : (
                //     <button
                //       className="addbutton"
                //       value={item.productId}
                //       onClick={(e) =>handleSelect(e)}
                //     >
                //       ADD
                //     </button>
                //   ):(
                //     <>
                //     <button
                //       className="addbutton"
                //       data-tip
                //       data-for='happyFace'
                //     >
                //       ADD
                //     </button>
                //     <ReactTooltip id='happyFace' type='error'>
                //         <span class="maintenance-content">In Maintenance Mode</span>
                //     </ReactTooltip>
                //     </>
                //   )
                const Add_Button =
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
                    <div className="col-lg-4" key={index}>
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

  return(
    <>
    <div className="main1">
      <div className="container">
        <div className="main1-wrapper" id="menu">
        <div className="row menu-heading text-center giftcards">
        {
          <h3>{singleRestaurantResponseData.business_data && singleRestaurantResponseData.business_data.SPECIAL_MESSAGE ? singleRestaurantResponseData.business_data.SPECIAL_MESSAGE : null}</h3>

        }

          <h2>Gift Certificates</h2>

          </div>
          {menuListResponseData.restaurantsdata && menuListResponseData.restaurantsdata.length > 0 ? (
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className={`main-link sticky-top ${activeClass}`}>
                  <ul>
                    {/* <li className="active-item"><a href="#">Pizzas</a></li> */}
                    {category}
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="main-contant">{menuList}</div>
                {bucketDciResponseData.Detailed_cart
                && bucketDciResponseData.Detailed_cart.total_amount ? (<>
                  <div className="cart-mobile-view-button text-center">
                  <Link
                    to={{
                      pathname: "/cart",
                      // cartinfodata: this.state
                      //   .restaurantDataHeaderinfo,
                        cart_cart_above_data: singleRestaurantResponseData.banner_info,
                    //  business_data : this.state.business_data.business.FEES,
                      cartdetails_item: bucketDciResponseData.Detailed_cart_item,
                      cartdetails: bucketDciResponseData.Detailed_cart,
                      cartdetails_checkout_method: bucketDciResponseData.Detailed_cart_checkout_method,
                      cart_Delivery_method: bucketDciResponseData
                        .Delivery_method,
                      cart_pickup_restaurant: bucketDciResponseData
                        .pickup_restaurant,
                        bucket_id: uniqueBucketId,
                        cart_business_data:singleRestaurantResponseData.business_data,
                        cart_Delivery_cost: delivery_cost
                    }}
                  >
                    View cart
                  </Link>
                  </div>
                   </>) : null}
              </div>
              <div className="col-lg-3 col-md-4 hidden">
                {bucketDciResponseData.Detailed_cart
               ? singleRestaurantResponseData.maintenance_mode === "false" || singleRestaurantResponseData.maintenance_mode === undefined ? (
                  <>
                  <div className="sticky-top cart Right-side-cart-view">
                    <h2 className = "cart-heading">Cart</h2>
                    {bucketDciResponseData.Detailed_cart.total_amount ? (
                      <>
                        <div className="corn">{cart}</div>
                        <div className="row cart-below">
                          <div className="col-md-6">
                            <h6>Subtotal</h6>
                            {bucketDciResponseData.Detailed_cart && bucketDciResponseData.Detailed_cart.taxes ? bucketDciResponseData.Detailed_cart.taxes.map((taxes_name,index) =>(
                              <h6>{taxes_name.name}</h6>
                            )

                          ) :null }
                            <h6 className = "Tip">Tip</h6>
                            <h6 className = "Tip-Amount-text">Tip Amount</h6>
                          {bucketDciResponseData.Detailed_cart && bucketDciResponseData.Detailed_cart && bucketDciResponseData.Detailed_cart.additional_fees ? bucketDciResponseData.Detailed_cart.additional_fees.map((additional_fee_name,index) =>(
                            <h6>{additional_fee_name.name}</h6>
                          )

                        ) :null }
                            <h6 className = "Delivery-Fees">Delivery Fees</h6>
                            <h6 className = "Total">Total</h6>
                          </div>
                          <div className="col-md-6">
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
                                onChange={() =>tiphandlerchange()}
                                className="form-control"
                                id="tip-select"
                              >
                                {bucketDciResponseData.cart_item_tip && bucketDciResponseData.cart_item_tip.length > 0 ? (
                                  tip_rate_fees.map((item, index) => {
                                    const fee_id = bucketDciResponseData.cart_item_tip[0].fee_id;
                                    const fee_rate = bucketDciResponseData.cart_item_tip[0].rate;
                                    const selected = fee_rate === item ? 'selected' : null;
                                        return (
                                          <option
                                            value={item}
                                            key={index}
                                            selected = {selected}
                                          >
                                            {item}%
                                          </option>
                                        );

                                  })
                                ) : (
                                  <option value="0">0%</option>
                                )}
                              </select>
                            </h6>
                            <h6 className = "Tip-Amount">
                          ${bucketDciResponseData.cart_item_tip[0] ? bucketDciResponseData.cart_item_tip[0].amount: "0" }
                        </h6>
                        {bucketDciResponseData.Detailed_cart &&  bucketDciResponseData.Detailed_cart.additional_fees ? bucketDciResponseData.Detailed_cart.additional_fees.map((additional_fee_amount,index) =>(
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
                              $
                              {delivery_cost == 0
                                ? "0"
                                : delivery_cost}
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
                                      .total_amount +
                                      delivery_cost,
                                    2
                                  ).toFixed(2)}
                            </h6>
                          </div>
                          <br /> <hr></hr>
                        </div>

                        <div className="row cart-below-form">
                          {delivery_content}
                        </div>
                        <div className="sub">
                          <div className="subtotal"></div>
                          {delivery_choose == true ? (
                            <>
                            <div className="checkout text-center">
                              <Link
                                to={{
                                  pathname: "/checkout",
                                  // checkoutinfodata: this.state
                                  //   .restaurantDataHeaderinfo,
                                  checkout_cart_item_tip: bucketDciResponseData
                                    .cart_item_tip,
                                    tip_rate_fees : tip_rate_fees,
                                  cartdetails_checkout_method: bucketDciResponseData
                                    .Detailed_cart_checkout_method,
                                  cartdetails_item: bucketDciResponseData
                                    .Detailed_cart_item,
                                  cartdetails: bucketDciResponseData.Detailed_cart,
                                  cart_above_data: singleRestaurantResponseData.banner_info,
                                  Delivery_method: bucketDciResponseData
                                    .Delivery_method,
                                  pickup_restaurant: bucketDciResponseData
                                    .pickup_restaurant,
                                  bucket_id: uniqueBucketId,
                                  final_user_email: finalUserEmail,
                                  Delivery_cost: delivery_cost,
                                  final_user_token: finalUserToken,
                                  checkout_business_data:singleRestaurantResponseData.business_data,
                                  tip_rate: tip_rate_fees
                                }}
                              >
                                Checkout
                              </Link>

                            </div>

                            </>
                          ) : (
                            <div className="checkout text-center">
                              <button
                                onClick={() =>deliverChooseHandle()}
                                className="deliverymsg"
                              >
                                Checkout
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="Empty-cart">
                        <h4>Empty cart</h4>
                      </div>
                    )}
                  </div>
                  </>
                ) : null : null}
              </div>
            </div>
          ) : (
            <div className="menuLoader">
            <div className="">
              <img src="/img/loc-loader2.gif"/>

          </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Modal show={show} onHide={() =>handleClose()} id="modal1" data-backdrop="static" data-keyboard="false">
          <Modal.Body>
            {modal_content}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" className="total-butn">
              TOTAL $
              {total_price.toFixed(2)}
            </Button>
              {!propsStateAddItem.add_item_loading &&  !propsStateBucket.bucket_loading ? (<Button variant="secondary" className = "close-butn" onClick={() =>handleClose()}>
             CLOSE
            </Button>) : null}
            {isRequired_addongroup.length > 0 ?
              isRequired_addongroup_state == true ?
              (
              <Button
                variant="success"
                className="add-butn"
                onClick={() =>{saveAddon()}}
              >
                {!propsStateAddItem.add_item_loading && !propsStateBucket.bucket_loading ? 'ADD ITEMS' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
              </Button>
            ):(<Button
              variant="success"
              className="add-butn"
              //onClick={this.saveAddon}
            >
              {!propsStateAddItem.add_item_loading && !propsStateBucket.bucket_loading ? 'ADD ITEMS' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
            </Button>) : (
              <Button
                variant="success"
                className="add-butn"
                onClick={() =>{saveAddon();}}
              >
                {!propsStateAddItem.add_item_loading && !propsStateBucket.bucket_loading ? 'ADD ITEMS' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
              </Button>
            )}

          </Modal.Footer>
        </Modal>

        <Modal
          show={showmodal2}
          onHide={() =>handleClosemodal2()}
          id="modal2"
        >
          <Modal.Body>

              <Row className="show-grid">
                <Col md={12}>
                  <h4>Repeat last used customization?</h4>
                </Col>
              </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="Ichosse"
              value={current_product_id}
              onClick={e =>handleShow(e)}
            >
              I'LL CHOOSE
            </Button>
            {/* {this.state.current_product_token != null ? ( */}
            <Button
              variant="success"
              className="repeat-last"
              onClick={() =>repeat_last(
                current_modal_cart_item_id,
                current_modal_qty
              )}
            >
              REPEAT LAST
            </Button>
            {/* ) : null} */}
          </Modal.Footer>
        </Modal>

        <Modal show={showmodaldelivery} id="modal3" size="sm">
          <Modal.Body>Please select a delivery method.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() =>handleclosedelivery()}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={cookingShow} id="modal3" >
        <Modal.Body>{cooking_instruction_modal_content}</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" className = "close-butn" onClick={() =>handleCookingClose()}>
          CLOSE
        </Button>
        <Button
          variant="success"
          className="add-butn"
          value={withoutAddonProductId}
          onClick={(e) =>handleSelect(e)}
        >
        {!propsStateAddItem.add_item_loading &&  !propsStateBucket.bucket_loading ? 'ADD ITEMS' : (<span className="paymentload">PROCESSING <i class="fa fa-spinner fa-spin"></i></span>)}
        </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Menu
