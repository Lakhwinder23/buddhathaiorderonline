import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import StripeCheckout from "react-stripe-checkout";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { injectStripe } from "react-stripe-elements";
import CardSection from "./CardSection";
import { fetchCountries } from "../Redux/GetCountries/GetCountriesActions";
import { fetchStates } from "../Redux/GetStates/GetStatesActions";
import { fetchAddress } from "../Redux/GetAddress/GetAddressActions";
import { updateShippingMethod } from "../Redux/UpdateShippingMethod/UpdateShippingMethodActions";
import { fetchBucket } from "../Redux/Bucket/BucketActions";
import { updateItemQuantity } from "../Redux/UpdateItemQuantity/UpdateItemQuantityActions";
import { addTip } from "../Redux/AddTip/AddTipActions";
import { applyCoupon } from "../Redux/ApplyCoupon/ApplyCouponActions";
import { removeCoupon } from "../Redux/RemoveCoupon/RemoveCouponActions";
import { paymentCheckout } from "../Redux/PaymentCheckout/PaymentCheckoutActions";
import { addAddress } from "../Redux/AddAddress/AddAddressActions";

function Checkout(props) {
  // store data access start
  const countries_data = useSelector(state => state.GetCountries);
  const states_data = useSelector(state => state.GetStates);
  const address_data = useSelector(state => state.GetStates);
  const updateShippingMethod_data = useSelector(
    state => state.UpdateShippingMethod
  );
  const bucket_data = useSelector(state => state.Bucket);
  const updateItemQuantity_data = useSelector(
    state => state.UpdateItemQuantity
  );
  const tip_data = useSelector(state => state.AddTip);
  const applyCoupon_data = useSelector(state => state.ApplyCoupon);
  const removeCoupon_data = useSelector(state => state.RemoveCoupon);
  const paymentCheckout_data = useSelector(state => state.PaymentCheckout);
  const addAddress_data = useSelector(state => state.AddAddress);
  // store data access End
  const dispatch = useDispatch(); // for accessing the redux function

  const store = useStore();
  const propsStatePayments = store.getState().PaymentCheckout;
  const propsStateBucket = store.getState().Bucket;
  const propsStateApplyCoupon = store.getState().ApplyCoupon;
  const propsStateRemoveCoupon = store.getState().RemoveCoupon;
  const propsStateAddTip = store.getState().AddTip;
  const propsStateShipping = store.getState().UpdateShippingMethod;
  console.log("propsStateApplyCoupon", propsStateApplyCoupon);

  // component all states define start
  const [finalUserEmail, setFinalUserEmail] = useState("");
  const [finalUserToken, setFinalUserToken] = useState("");
  const [uniqueBucketId, setUniqueBucketId] = useState("");
  const [banner_info, setBanner_info] = useState([]);
  const [delivery_cost, setDelivery_cost] = useState(0);
  console.log("delivery_cost---", delivery_cost);
  const [tip_rate_fees, setTip_rate_fees] = useState([]);
  const [configResponseData, setConfigDciResponseData] = useState({
    stripe_info: [],
    static_resource_endpoint: null,
    static_resource_sufix: null,
    is_shop_open: false,
    static_resource_categories_prefix: null
  });
  const [bucketDciResponseData, setBucketDciResponseData] = useState({
    Detailed_cart: [],
    Detailed_cart_item: [],
    cart_item_tip: [],
    Detailed_cart_checkout_method: [],
    Delivery_method: [],
    pickup_restaurant: [],
    current_shipment_method: null
  });
  const [country_info, setCountry_info] = useState([]);
  const [state_info, setState_info] = useState([]);
  const [checkout_address_user, setCheckout_address_user] = useState([]);
  const [selected_address, setSelected_address] = useState(null);
  const [delivery_info, setDelivery_info] = useState([]);
  const [bucketInfo, setBucketInfo] = useState([]);
  const [updateItemQuantityInfo, setUpdateItemQuantityInfo] = useState([]);
  const [loadingData, setLoadingData] = useState(null);
  const [applyCoupoon, setApplyCoupoon] = useState(null);
  const [applyCouponAmount, setApplyCouponAmount] = useState(0);
  const [applyCouponState, setApplyCouponState] = useState(false);
  const [applyCouponInfo, setApplyCouponInfo] = useState([]);
  const [couponError, setCouponError] = useState(null);
  const [couponErrorModal, setCouponErrorModal] = useState(false);
  const [removeCouponStatus, setRemoveCouponStatus] = useState(false);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    telephone: "",
    email: "",
    address: "",
    city: "",
    postal_code: "",
    state: "",
    country: "254",
    notes_restaurant: "",
    cardNumber: "",
    cardCvv: "",
    cardExpMonth: "",
    cardExpYear: "",
    publicKey: null,
    giftcheck: false,
    giftcard_number: "",
    giftcard_pin: ""
  });
  const [firstname_error, setFirstname_error] = useState(false);
  const [lastname_error, setLastname_error] = useState(false);
  const [phone_error, setPhone_error] = useState(false);
  const [email_error, setEmail_error] = useState(false);
  const [postal_code_error, setPostal_code_error] = useState(false);
  const [order_now_click, setOrder_now_click] = useState(false);
  const [payment_complete, setPayment_complete] = useState(false);
  const [payment_token, setPayment_token] = useState("");
  const [stripe_error, setStripe_error] = useState(null);
  const [cart_empty_click, setCart_empty_click] = useState(true);
  const [user_address_id, setUser_address_id] = useState(null);
  const [order_loader, setOrder_loader] = useState(false);
  const [order_info, setOrder_info] = useState([]);
  const [checkout_error, setCheckout_error] = useState(null);
  const [address_info, setAddress_info] = useState([]);
  const [showmodal_cart_empty, setShowmodal_cart_empty] = useState(false);
  const [showmodal_shop_closed, setShowmodal_shop_closed] = useState(false);
  const [currentShippingMethodName, setCurrentShippingMethodName] = useState(
    null
  );
  console.log("currentShippingMethodName-----", currentShippingMethodName);
  // component all states define END

  // hooks start
  // get user email,user token and bucket id hook start
  useEffect(() => {
    if (
      props.location &&
      props.location.merchantInfo &&
      props.location.merchantInfo.access_token
    ) {
      const user_email =
        localStorage.getItem("user") === null
          ? "guest@onlinebites.com"
          : localStorage.getItem("user");
      const user_token =
        localStorage.getItem("access_token") === null
          ? props.location.merchantInfo.access_token
          : localStorage.getItem("access_token");
      const user_local_bucket_id =
        localStorage.getItem("user_local_bucket_id") == null &&
        localStorage.getItem("user_local_bucket_id") == undefined
          ? ""
          : localStorage.getItem("user_local_bucket_id");
      setFinalUserEmail(user_email);
      setFinalUserToken(user_token);
      setUniqueBucketId(user_local_bucket_id);
    }
  }, [props.location]);
  // get user email,user token and bucket id hook end

  // fetch address api ,hook start
  useEffect(() => {
    if (
      localStorage &&
      localStorage.getItem("user") != null &&
      localStorage.getItem("access_token") != null
    ) {
      const address_info = {
        user_token: localStorage.getItem("access_token"),
        user_email: localStorage.getItem("user")
      };
      dispatch(fetchAddress(address_info));
    }
  }, [dispatch]);
  // fetch address api ,hook End

  // add config data into config const hook start
  useEffect(() => {
    if (
      props.location &&
      props.location.configInfo &&
      Object.keys(props.location.configInfo).length > 0
    ) {
      setConfigDciResponseData({
        stripe_info: props.location.configInfo,
        static_resource_endpoint:
          props.location.configInfo &&
          props.location.configInfo.STATIC_RESOURCE_ENDPOINT
            ? props.location.configInfo.STATIC_RESOURCE_ENDPOINT
            : null,
        static_resource_sufix:
          props.location.configInfo &&
          props.location.configInfo.STATIC_RESOURCE_SUFFIX
            ? props.location.configInfo.STATIC_RESOURCE_SUFFIX
            : null,
        is_shop_open:
          props.location.configInfo && props.location.configInfo.IS_SHOP_OPEN
            ? props.location.configInfo.IS_SHOP_OPEN
            : false
      });
    }
  }, [props.location]);
  // add config data into config const hook end

  // add config data into config const hook start
  useEffect(() => {
    if (
      props.location &&
      props.location.bucketDciResponseData &&
      props.location.bucketDciResponseData.length > 0
    ) {
      setBucketDciResponseData({
        Detailed_cart: props.location.bucketDciResponseData.Detailed_cart,
        Detailed_cart_item:
          props.location.bucketDciResponseData.Detailed_cart_item,
        cart_item_tip: props.location.bucketDciResponseData.cart_item_tip,
        Detailed_cart_checkout_method:
          props.location.bucketDciResponseData.Detailed_cart_checkout_method,
        Delivery_method: props.location.bucketDciResponseData.Delivery_method,
        pickup_restaurant:
          props.location.bucketDciResponseData.pickup_restaurant,
        current_shipment_method:
          props.location.bucketDciResponseData.current_shipment_method
      });
    }
  }, [props.location]);
  // add config data into config const hook end
  useMemo(() => {
    if (props.location && props.location.currentShippingMethodName) {
      setCurrentShippingMethodName(props.location.currentShippingMethodName);
    }
  }, [props.location]);
  // add deilvery cost props into constant, hook start
  useEffect(() => {
    if (props.location && props.location.Delivery_cost) {
      setDelivery_cost(props.location.Delivery_cost);
    }
  }, [props.location]);
  // add deilvery cost props into constant, hook end

  // add tip_rate_fees props into constant, hook start
  useEffect(() => {
    if (props.location && props.location.tip_rate_fees) {
      setTip_rate_fees(props.location.tip_rate_fees);
    }
  }, [props.location]);
  // add tip_rate_fees props into constant, hook End

  // add banner_info props into constant, hook start
  useEffect(() => {
    if (props.location && props.location.banner_info) {
      setBanner_info(props.location.banner_info);
    }
  }, [props.location]);
  // add banner_info props into constant, hook End

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
  }, [bucketDciResponseData.Delivery_method, bucketDciResponseData.current_shipment_method, bucketDciResponseData.pickup_restaurant]);

  // props function call, hook start
  useMemo(() => {
    if (
      configResponseData.stripe_info &&
      Object.keys(configResponseData.stripe_info).length > 0
    )
      props.stripe_info_parentCallback(configResponseData.stripe_info);
  }, [configResponseData.stripe_info, props]);
  // props function call, hook End

  // fetch countries and state api, hook start
  useMemo(() => {
    if (finalUserToken != "") {
      const countries_info = {
        user_token: finalUserToken
      };
      dispatch(fetchCountries(countries_info));
      const states_info = {
        user_token: finalUserToken
      };
      dispatch(fetchStates(states_info));
    }
  }, [dispatch, finalUserToken]);
  // fetch countries and state api, hook End

  // add data of countries api into constant,hook start
  useMemo(() => {
    if (
      countries_data &&
      countries_data.countries &&
      countries_data.countries.data
    ) {
      setCountry_info(countries_data.countries.data[0]);
    }
  }, [countries_data]);
  // add data of countries api into constant,hook end

  // add data of states api into constant,hook start
  useMemo(() => {
    if (states_data && states_data.states && states_data.states.data) {
      setState_info(states_data.states.data);
    }
  }, [states_data]);
  // add data of states api into constant,hook end

  // add data of address api into constant,hook start
  useMemo(() => {
    if (address_data && address_data.address && address_data.address.data) {
      setCheckout_address_user(address_data.address.data);
    }
  }, [address_data]);
  // add data of address api into constant,hook End

  //when checkout_address_user constant change then data add into constant,hook start
  useMemo(() => {
    if (
      localStorage.getItem("user") != null &&
      localStorage.getItem("access_token") != null
    ) {
      if (checkout_address_user && checkout_address_user.length > 0) {
        setSelected_address("Saved Address");
      } else {
        setSelected_address("New Address");
      }
    }
  }, [checkout_address_user]);
  //when checkout_address_user constant change then data add into constant,hook End

  // when uniqueBucketId has value hook start
  useMemo(() => {
    if (uniqueBucketId != "") {
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
      window.localStorage.setItem("user_local_bucket_id", uniqueBucketId);
    }
  }, [dispatch, finalUserEmail, finalUserToken, uniqueBucketId]);
  // when uniqueBucketId has value hook end

  // add data of updateshppingmethod api into constant hook start
  useMemo(() => {
    if (
      updateShippingMethod_data &&
      updateShippingMethod_data.update_shipping_method &&
      updateShippingMethod_data.update_shipping_method.object &&
      updateShippingMethod_data.update_shipping_method.request_status === true
    ) {
      setDelivery_info(updateShippingMethod_data.update_shipping_method.object);
    }
  }, [updateShippingMethod_data]);
  // add data of updateshppingmethod api into constant hook End

  // when delivery_info change data add into constant hook start
  useMemo(() => {
    if (delivery_info && Object.keys(delivery_info).length > 0) {
      setDelivery_cost(delivery_info.cost);
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
    }
  }, [delivery_info, dispatch, finalUserEmail, finalUserToken, uniqueBucketId]);
  // when delivery_info change data add into constant hook End

  // add updateItemQuantity api response data into constant hook start
  useMemo(() => {
    if (
      updateItemQuantity_data &&
      updateItemQuantity_data.update_item_qty &&
      updateItemQuantity_data.update_item_qty.object &&
      updateItemQuantity_data.update_item_qty.request_status === true
    ) {
      setUpdateItemQuantityInfo(updateItemQuantity_data.update_item_qty.object);
    }
  }, [updateItemQuantity_data]);
  // add updateItemQuantity api response data into constant hook End

  // when updateItemQuantity api have error then  response data into constant hook start
  useMemo(() => {
    if (
      updateItemQuantity_data &&
      updateItemQuantity_data.update_item_qty &&
      updateItemQuantity_data.update_item_qty.object &&
      updateItemQuantity_data.update_item_qty.request_status === false &&
      updateItemQuantity_data.update_item_qty.object.error == "Invalid Bucket"
    ) {
      setUpdateItemQuantityInfo(updateItemQuantity_data.update_item_qty.object);
      setUniqueBucketId("");
      localStorage.removeItem("user_local_bucket_id");
    }
  }, [updateItemQuantity_data]);
  // when updateItemQuantity api have error then response data into constant hook End

  // when updateItemQuantityInfo has value hook start
  useMemo(() => {
    if (updateItemQuantityInfo) {
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
    }
  }, [dispatch, finalUserEmail, finalUserToken, uniqueBucketId, updateItemQuantityInfo]);
  // when updateItemQuantityInfo has value hook end

  // add bucket dci response data into constant hook start
  useMemo(() => {
    if (
      bucket_data &&
      bucket_data.bucket &&
      bucket_data.bucket.object &&
      bucket_data.bucket.request_status === true
    ) {
      setBucketInfo(bucket_data.bucket.object);
    }
  }, [bucket_data]);
  // add bucket dci response data into constant hook End

  // when bucket dci have error then respone add into constant hook start
  useMemo(() => {
    if (
      bucket_data &&
      bucket_data.bucket &&
      bucket_data.bucket.object &&
      bucket_data.bucket.request_status === false &&
      bucket_data.bucket.object.error == "Invalid Bucket"
    ) {
      setBucketInfo(bucket_data.bucket.object);
      setUniqueBucketId("");
      localStorage.removeItem("user_local_bucket_id");
    }
  }, [bucket_data]);
  // when bucket dci have error then respone add into constant hook end

  // add bucketinfo data into constant hook start
  useMemo(() => {
    if (bucketInfo) {
      setBucketDciResponseData({
        Detailed_cart: bucketInfo,
        Detailed_cart_item: bucketInfo.items ? bucketInfo.items : [],
        cart_item_tip: bucketInfo && bucketInfo.fees ? bucketInfo.fees : [],
        Detailed_cart_checkout_method:
          bucketInfo && bucketInfo.available_checkout_methods
            ? bucketInfo.available_checkout_methods
            : [],
        Delivery_method:
          bucketInfo && bucketInfo.available_delivery_methods
            ? bucketInfo.available_delivery_methods
            : [],
        pickup_restaurant:
          bucketInfo && bucketInfo.available_pickup_methods
            ? bucketInfo.available_pickup_methods
            : [],
        current_shipment_method:
          bucketInfo && bucketInfo.shippment_method
            ? bucketInfo.shippment_method
            : null
      });
      setLoadingData(null);
    }
  }, [bucketInfo]);
  // add bucketinfo data into constant hook End

  //fetch bucket api after fetch tip api hook start
  useMemo(() => {
    if (
      tip_data &&
      tip_data.add_tip &&
      tip_data.add_tip.object &&
      tip_data.add_tip.request_status === true
    ) {
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
    }
  }, [dispatch, finalUserEmail, finalUserToken, tip_data, uniqueBucketId]);
  //fetch bucket api after fetch tip api hook End

  //when fetch applyCoupon api after that data add into constant,hook start
  useMemo(() => {
    if (
      applyCoupon_data &&
      applyCoupon_data.apply_coupon &&
      applyCoupon_data.apply_coupon.request_status === true
    ) {
      setApplyCouponInfo(applyCoupon_data.apply_coupon.object);
      setApplyCouponState(applyCoupon_data.apply_coupon.request_status);
      setApplyCouponAmount(applyCoupon_data.apply_coupon.object.amount);
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
    } else if (
      applyCoupon_data &&
      applyCoupon_data.apply_coupon &&
      applyCoupon_data.apply_coupon.request_status === false &&
      applyCoupon_data.apply_coupon.object.error
    ) {
      setApplyCouponAmount(0);
      setCouponErrorModal(true);
      setCouponError(applyCoupon_data.apply_coupon.object.error);
    }
  }, [applyCoupon_data, dispatch, finalUserEmail, finalUserToken, uniqueBucketId]);
  //when fetch applyCoupon api after that data add into constant,hook End

  //when fetch removeCoupon api after that data add into constant,hook start
  useMemo(() => {
    if (
      removeCoupon_data &&
      removeCoupon_data.remove_coupon &&
      removeCoupon_data.remove_coupon.request_status === true
    ) {
      setApplyCouponInfo(removeCoupon_data.remove_coupon.object);
      setRemoveCouponStatus(removeCoupon_data.remove_coupon.request_status);
      const bucket_info = {
        user_token: finalUserToken,
        user_local_bucket_id: uniqueBucketId,
        user_email: finalUserEmail
      };
      dispatch(fetchBucket(bucket_info));
    }
  }, [dispatch, finalUserEmail, finalUserToken, removeCoupon_data, uniqueBucketId]);
  //when fetch removeCoupon api after that data add into constant,hook End

  //when payment_token data change then fetch paymentcheckout api ,hook start
  useMemo(() => {
    if (payment_complete === true && payment_token != "") {
      if (user_address_id != null) {
        setOrder_loader(true);
        setCart_empty_click(false);
        const process_centeralized_payment =
          configResponseData.stripe_info &&
          Object.keys(configResponseData.stripe_info).length > 0 &&
          configResponseData.stripe_info.STRIPE_ACCOUNT_ID
            ? "true"
            : undefined;
        const payment_checkout_info = {
          final_user_checkout_token: finalUserToken,
          address: undefined,
          addressId: user_address_id,
          Unique_bucket_Id: uniqueBucketId,
          payment_token: payment_token,
          city: undefined,
          country: undefined,
          email: undefined,
          first_name: undefined,
          gatewayId: bucketDciResponseData.Detailed_cart_checkout_method[0].id,
          last_name: undefined,
          telephone: undefined,
          notes_restaurant: inputValues.notes_restaurant,
          postal_code: undefined,
          state: undefined,
          final_user_checkout_email: finalUserEmail,
          process_centeralized_payment: process_centeralized_payment,
          cardNumber : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardNumber : '',
          expiryMonth : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardExpMonth : '',
          expiryYear : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardExpYear : '',
          cvv : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardCvv : ''
        };
        dispatch(paymentCheckout(payment_checkout_info));
        setPayment_complete(false);
      } else if (
        user_address_id == null &&
        localStorage.getItem("user") != null &&
        localStorage.getItem("access_token") != null
      ) {
        setOrder_loader(true);
        setCart_empty_click(false);
        const address_info = {
          final_user_checkout_email: finalUserEmail,
          final_user_checkout_token: finalUserToken,
          first_name: inputValues.first_name,
          last_name: inputValues.last_name,
          address: inputValues.address,
          city: inputValues.city,
          state: inputValues.state,
          country: inputValues.country,
          postal_code: inputValues.postal_code,
          telephone: inputValues.telephone,
          email: inputValues.email
        };
        dispatch(addAddress(address_info));
        setPayment_complete(false);
      } else if (
        localStorage.getItem("user") === null &&
        localStorage.getItem("access_token") === null &&
        user_address_id === null
      ) {
        setOrder_loader(true);
        setCart_empty_click(false);
        const process_centeralized_payment =
          configResponseData.stripe_info &&
          Object.keys(configResponseData.stripe_info).length > 0 &&
          configResponseData.stripe_info.STRIPE_ACCOUNT_ID
            ? "true"
            : undefined;
        const payment_checkout_info = {
          final_user_checkout_token: finalUserToken,
          address: inputValues.address,
          addressId: undefined,
          Unique_bucket_Id: uniqueBucketId,
          payment_token: payment_token,
          city: inputValues.city,
          country: inputValues.country,
          email: inputValues.email,
          first_name: inputValues.first_name,
          gatewayId: bucketDciResponseData.Detailed_cart_checkout_method[0].id,
          last_name: inputValues.last_name,
          telephone: inputValues.telephone,
          notes_restaurant: inputValues.notes_restaurant,
          postal_code: inputValues.postal_code,
          state: inputValues.state,
          final_user_checkout_email: finalUserEmail,
          process_centeralized_payment: process_centeralized_payment,
          cardNumber : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardNumber : '',
          expiryMonth : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardExpMonth : '',
          expiryYear : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardExpYear : '',
          cvv : configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet" ? inputValues.cardCvv : ''
        };
        dispatch(paymentCheckout(payment_checkout_info));
        setPayment_complete(false);
      }
    }
  }, [bucketDciResponseData.Detailed_cart_checkout_method, configResponseData.stripe_info, dispatch, finalUserEmail, finalUserToken, inputValues.address, inputValues.city, inputValues.country, inputValues.email, inputValues.first_name, inputValues.last_name, inputValues.notes_restaurant, inputValues.postal_code, inputValues.state, inputValues.telephone, payment_complete, payment_token, uniqueBucketId, user_address_id]);
  //when payment_token data change then fetch paymentcheckout api ,hook End

  //add data of paymentcheckout api into constant,hook start
  useMemo(() => {
    if (
      paymentCheckout_data &&
      paymentCheckout_data.payment_checkout &&
      paymentCheckout_data.payment_checkout.request_status === true
    ) {
      setOrder_info(paymentCheckout_data.payment_checkout);
      setOrder_loader(false);
      setCart_empty_click(true);
    } else if (
      paymentCheckout_data &&
      paymentCheckout_data.payment_checkout &&
      paymentCheckout_data.payment_checkout.request_status === false
    ) {
      setCheckout_error(paymentCheckout_data.payment_checkout.object.error);
      setOrder_now_click(false);
    }
  }, [paymentCheckout_data]);
  //add data of paymentcheckout api into constant,hook End

  // add data of addAddress api into constant,hook start
  useMemo(() => {
    if (
      addAddress_data &&
      addAddress_data.add_address &&
      addAddress_data.add_address.object &&
      addAddress_data.add_address.request_status === true
    ) {
      setAddress_info(addAddress_data.add_address.object);
    }
  }, [addAddress_data]);
  // add data of addAddress api into constant,hook End

  //when data of address_info change then fetch paymentcheckout api,hook start
  useMemo(() => {
    if (address_info && Object.keys(address_info).length > 0) {
      const process_centeralized_payment =
        configResponseData.stripe_info &&
        Object.keys(configResponseData.stripe_info).length > 0 &&
        configResponseData.stripe_info.STRIPE_ACCOUNT_ID
          ? "true"
          : undefined;
      const payment_checkout_info = {
        final_user_checkout_token: finalUserToken,
        address: undefined,
        addressId: address_info.address_id,
        Unique_bucket_Id: uniqueBucketId,
        payment_token: payment_token,
        city: undefined,
        country: undefined,
        email: undefined,
        first_name: undefined,
        gatewayId: bucketDciResponseData.Detailed_cart_checkout_method[0].id,
        last_name: undefined,
        telephone: undefined,
        notes_restaurant: inputValues.notes_restaurant,
        postal_code: undefined,
        state: undefined,
        final_user_checkout_email: finalUserEmail,
        process_centeralized_payment: process_centeralized_payment
      };
      dispatch(paymentCheckout(payment_checkout_info));
    }
  }, [address_info, bucketDciResponseData.Detailed_cart_checkout_method, configResponseData.stripe_info, dispatch, finalUserEmail, finalUserToken, inputValues.notes_restaurant, payment_token, uniqueBucketId]);
  //when data of address_info change then fetch paymentcheckout api,hook End

  // hooks end

  // component function start
  // deliveryhandler function start
  const deliveryhandler = event => {
    const update_shipping_method_info = {
      final_user_token: finalUserToken,
      final_user_email: finalUserEmail,
      Unique_bucket_Id: uniqueBucketId,
      shippingId: event.target.value
    };
    dispatch(updateShippingMethod(update_shipping_method_info));
  };
  // deliveryhandler function End

  // incrementNew function start
  const incrementNew = (value1, value2, value3, value4) => {
    setLoadingData(value4);
    const update_item_qty_info = {
      final_user_token: finalUserToken,
      bucket_id: value3,
      final_user_email: finalUserEmail,
      bucketItemId: value1,
      quantity: value2 + 1
    };
    dispatch(updateItemQuantity(update_item_qty_info));
  };
  // incrementNew function end

  // decrementNew function start
  const decrementNew = (value1, value2, value3, value4) => {
    setLoadingData(value4);
    const update_item_qty_info = {
      final_user_token: finalUserToken,
      bucket_id: value3,
      final_user_email: finalUserEmail,
      bucketItemId: value1,
      quantity: value2 - 1
    };
    dispatch(updateItemQuantity(update_item_qty_info));
  };
  // decrementNew function end

  // incrementwithAddon function start
  const incrementwithAddon = (value1, value2, value3) => {
    setLoadingData(value3);
    const update_item_qty_info = {
      final_user_token: finalUserToken,
      bucket_id: uniqueBucketId,
      final_user_email: finalUserEmail,
      bucketItemId: value1,
      quantity: value2 + 1
    };
    dispatch(updateItemQuantity(update_item_qty_info));
  };
  // incrementwithAddon function end

  // decrementwithAddon function start
  const decrementwithAddon = (value1, value2, value3) => {
    setLoadingData(value3);
    const update_item_qty_info = {
      final_user_token: finalUserToken,
      bucket_id: uniqueBucketId,
      final_user_email: finalUserEmail,
      bucketItemId: value1,
      quantity: value2 - 1
    };
    dispatch(updateItemQuantity(update_item_qty_info));
  };
  // incrementwithAddon function end

  // tiphandlerchange function start
  const tiphandlerchange = event => {
    if (
      bucketDciResponseData.cart_item_tip &&
      bucketDciResponseData.cart_item_tip.length > 0
    ) {
      bucketDciResponseData.cart_item_tip.map((tip, index) => {
        const tip_info = {
          final_user_token: finalUserToken,
          final_user_email: finalUserEmail,
          Unique_bucket_Id: uniqueBucketId,
          taxId: tip.fee_id,
          taxRate: event.target.value
        };
        dispatch(addTip(tip_info));
      });
    }
  };
  // tiphandlerchange function End

  //handlerApplyCoupon function start
  const handlerApplyCoupon = () => {
    setRemoveCouponStatus(false);
    const apply_coupon_info = {
      final_user_checkout_token: finalUserToken,
      final_user_checkout_email: finalUserEmail,
      Unique_bucket_Id: uniqueBucketId,
      apply_coupoon: applyCoupoon
    };
    dispatch(applyCoupon(apply_coupon_info));
  };
  //handlerApplyCoupon function End


  //handlerRemoveCoupon function start
  const handlerRemoveCoupon = () => {
    setApplyCouponAmount(0);
    const remove_coupon_info = {
      final_user_checkout_token: finalUserToken,
      final_user_checkout_email: finalUserEmail,
      Unique_bucket_Id: uniqueBucketId,
      apply_coupoon: applyCoupoon
    };
    dispatch(removeCoupon(remove_coupon_info));
  };
  //handlerRemoveCoupon function End

  //handleFirstNameChange function start
  const handleFirstNameChange = event => {
    const first_name = event.target.value;
    if (first_name.match(/^[a-zA-Z ]*$/)) {
      setFirstname_error(false);
    } else {
      setFirstname_error(true);
    }
  };
  //handleFirstNameChange function End

  //handleLastNameChange function start
  const handleLastNameChange = event => {
    const last_name = event.target.value;
    if (last_name.match(/^[a-zA-Z ]*$/)) {
      setLastname_error(false);
    } else {
      setLastname_error(true);
    }
  };
  //handleLastNameChange function End

  //handlePhoneChange function start
  const handlePhoneChange = event => {
    const phone = event.target.value;
    const phone_digit = /^\d{10}$/;
    if (phone.length == 10) {
      setPhone_error(false);
    } else {
      setPhone_error(true);
    }
  };
  //handlePhoneChange function End

  //handleEmailChange function start
  const handleEmailChange = event => {
    const email = event.target.value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmail_error(false);
    } else {
      setEmail_error(true);
    }
  };
  //handleEmailChange function End

  //handlePostalCodeChange function start
  const handlePostalCodeChange = event => {
    const postal_code = event.target.value;
    if (postal_code.length > 5) {
      setPostal_code_error(true);
    } else {
      setPostal_code_error(false);
    }
  };
  //handlePostalCodeChange function end

  //handleFieldaddress function start
  const handleFieldaddress = event => {
    setSelected_address(event.target.value);
  };
  //handleFieldaddress function end

  //handleSubmit function start
  const handleSubmit = event => {
    event.preventDefault();
    setPayment_token('');
    setOrder_now_click(true);
    if (
      configResponseData.stripe_info &&
      configResponseData.stripe_info.PAYMENT_GATEWAY == "hps"
    ) {
      console.log("withoutstripe");
      const payment = new window.Heartland.HPS({
        publicKey: configResponseData.stripe_info.HEARTLAND_PUBLISHABLE_KEY,
        cardNumber: inputValues.cardNumber,
        cardCvv: inputValues.cardCvv,
        cardExpMonth: inputValues.cardExpMonth,
        cardExpYear: inputValues.cardExpYear,

        success: resp => {
          //this.success(resp.token_value)
          setPayment_complete(true);
          setPayment_token(resp.token_value);
        },

        error: resp => {
          //this.error(resp.error.message)
          setStripe_error(resp.error.message);
          setOrder_now_click(false);
        }
      });

      try {
        payment.tokenize();
      } catch (error) {
        console.log(error);
      }
    }

    else if (
      configResponseData.stripe_info &&
      configResponseData.stripe_info.PAYMENT_GATEWAY == "authnet"
    ) {
      console.log("with Authnet");
      setPayment_complete(true);
      setPayment_token('authnettoken');
    }

    else if (props.stripe) {
      props.stripe.createToken().then(payload => {
        if (payload && payload.token && payload.token.id) {
          setPayment_complete(true);
          setPayment_token(payload.token.id);
        } else if (payload && payload.error) {
          setStripe_error(payload.error.message);
          setOrder_now_click(false);
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  //handleSubmit function end

  //cartemptyhandler function start
  const cartemptyhandler = () => {
    setShowmodal_cart_empty(true);
  };
  //cartemptyhandler function End

  //handleclosecartempty function start
  const handleclosecartempty = () => {
    setShowmodal_cart_empty(false);
  };
  //handleclosecartempty function End

  //shopclosedhandler function start
  const shopclosedhandler = () => {
    setShowmodal_shop_closed(true);
  };
  //shopclosedhandler function End

  //handlecloseShopClosed function start
  const handlecloseShopClosed = () => {
    setShowmodal_shop_closed(false);
  };
  //handlecloseShopClosed function End

  //selectedaddress function start
  const selectedaddress = event => {
    setUser_address_id(event.target.value);
  };
  //selectedaddress function End

  //handleclosecoupon function start
  const handleclosecoupon = () => {
    setCouponErrorModal(false);
  };
  //handleclosecoupon function End

  // component function end

  // component constant start that contain small part of html

  //cart details constant start
  const cart_details =
    bucketDciResponseData.Detailed_cart_item &&
    bucketDciResponseData.Detailed_cart_item.length > 0 &&
    configResponseData.is_shop_open == "true" ? (
      bucketDciResponseData.Detailed_cart_item.map((item, index) => {
        let totalprice = 0;
        totalprice = item.unit_price * item.qty;
        return (
          <div className="pamout checkout" id="pamut-number" key={index}>
            <p>{item.itemName}</p>
            <span>${Number(totalprice, 2).toFixed(2)}</span>
            <div className="count" id="countted">
              <div className="handle-counter" id="handleCounter14">
                {item.addons && item.addons.length > 0 ? (
                  <>
                    <button
                      className="counter-minus"
                      onClick={() =>
                        decrementwithAddon(
                          item.item_id,
                          item.qty,
                          item.product_id
                        )
                      }
                    >
                      -
                    </button>
                    {item.qty}
                    <button
                      className="counter-plus"
                      onClick={() =>
                        incrementwithAddon(
                          item.item_id,
                          item.qty,
                          item.product_id
                        )
                      }
                    >
                      +
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="counter-minus"
                      onClick={() =>
                        decrementNew(item.item_id, item.qty, uniqueBucketId)
                      }
                    >
                      -
                    </button>
                    {item.qty}
                    <button
                      className="counter-plus"
                      onClick={() =>
                        incrementNew(item.item_id, item.qty, uniqueBucketId)
                      }
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="Empty-cart pamout checkout text-center" id="pamut-number">
        <h4>Empty cart</h4>
      </div>
    );
  //cart details constant End

  //delivery_content constant start
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
          defaultChecked={
            bucketDciResponseData.pickup_restaurant ===
            bucketDciResponseData.current_shipment_method
              ? true
              : false
          }
          onClick={event => deliveryhandler(event)}
          //onChange={(evt) => this.changeTitle(evt)}
        />
        <Form.Text className="text-muted cart-text">$0</Form.Text>
      </Form.Group>
      {bucketDciResponseData.Delivery_method &&
      bucketDciResponseData.Delivery_method.length > 0
        ? bucketDciResponseData.Delivery_method.map(
            (checkout_delivery, index) => {
              return (
                <Form.Group controlId="formBasicPickup">
                  <Form.Check
                    type="radio"
                    label={checkout_delivery.name}
                    name="formHorizontalRadios"
                    id={checkout_delivery.name}
                    value={checkout_delivery.id}
                    defaultChecked={
                      bucketDciResponseData.current_shipment_method ===
                      checkout_delivery.id
                        ? true
                        : false
                    }
                    onClick={event => deliveryhandler(event)}
                    //onChange={(evt) => this.changeTitle(evt)}
                  />
                  <Form.Text className="text-muted checkout-text">
                    ${checkout_delivery.cost}
                  </Form.Text>
                </Form.Group>
              );
            }
          )
        : null}
    </Form>
  );
  //delivery_content constant End

  //stripe_amount constant start
  const stripe_amount =
    bucketDciResponseData.Detailed_cart &&
    bucketDciResponseData.Detailed_cart.total_amount
      ? bucketDciResponseData.Detailed_cart.total_amount * 100
      : 0;
  //stripe_amount constant end
  const shipping_method_name =
    currentShippingMethodName != null ? currentShippingMethodName : null;
  // component constant end that contain small part of html
  return (
    <>
      {order_info &&
      Object.keys(order_info).length > 0 &&
      order_info.request_status == true ? (
        <Redirect to={{ pathname: "/thankyou", order_info: order_info }} />
      ) : null}
      {props.location &&
      props.location.banner_info &&
      Object.keys(props.location.banner_info).length > 0 ? null : (
        <Redirect to="/" />
      )}
      <Header
        configInfo={props.location.configInfo}
        Detailed_cart_item={bucketDciResponseData.Detailed_cart_item}
      />
      <div className="main1">
        <div className="container">
          <div className="main1-wrapper">
            <div className="row">
              <div
                className={
                  !propsStateApplyCoupon.apply_coupon_loading &&
                  !propsStateRemoveCoupon.remove_coupon_loading &&
                  !propsStateAddTip.add_tip_loading &&
                  !propsStateShipping.update_shipping_method_loading &&
                  !propsStateBucket.bucket_loading
                    ? "col-lg-4 col-md-4 left-panel checkout-main-left-sidebar"
                    : "col-lg-4 col-md-4 left-panel checkout-main-left-sidebar loadingstate loadingleft"
                }
              >
                <div className="row checkout-cart-banner">
                  <div className="col-md-3">
                    <div className="top-right-logo">
                      <img src={banner_info.BANNER} />
                    </div>
                  </div>
                  <div className="col-md-9">
                    <h5>{banner_info.name}</h5>
                    <p>{banner_info.city}</p>
                  </div>
                </div>
                <div id="overlay">
                  <i class="fa fa-spinner fa-spin spin-big"></i>
                </div>

                <div className="row main-checkout-row">
                  {cart_details}
                  <div className="row cart-below-form">{delivery_content}</div>
                </div>
                <div className="row Apply-Coupon">
                  <div className="Apply-Coupon-field">
                    <div className="Apply-Coupon-empty"></div>
                    <div className="Apply-Coupon-icon">
                      <img src="img/sales-coupon.png" />
                    </div>
                    <div className="Apply-Coupon-input">
                      {bucketDciResponseData.Detailed_cart ? (
                        bucketDciResponseData.Detailed_cart.applied_coupons ? (
                          Object.keys(
                            bucketDciResponseData.Detailed_cart.applied_coupons
                          ).length === 0 ? (
                            <>
                              <input
                                type="text"
                                name="ApplyCoupon"
                                placeholder="Apply Coupon"
                                value={applyCoupoon}
                                onChange={e => setApplyCoupoon(e.target.value)}
                              />
                              <button
                                type="button"
                                class="btn btn-secondary"
                                onClick={() => handlerApplyCoupon()}
                              >
                                Apply
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="Applied-coupon">
                                Applied Coupon -{" "}
                                {
                                  Object.keys(
                                    bucketDciResponseData.Detailed_cart
                                      .applied_coupons
                                  )[0]
                                }
                              </span>
                              <input
                                type="hidden"
                                name="ApplyCoupon"
                                placeholder="Apply Coupon"
                                value={
                                  Object.keys(
                                    bucketDciResponseData.Detailed_cart
                                      .applied_coupons
                                  )[0]
                                }
                                onChange={e => setApplyCoupoon(e.target.value)}
                              />
                              <button
                                type="button"
                                class="btn btn-secondary remove-btun"
                                onClick={() => handlerRemoveCoupon()}
                              >
                                Remove
                              </button>
                            </>
                          )
                        ) : null
                      ) : null}
                    </div>

                    {applyCouponState == false ||
                    removeCouponStatus == true ? null : (
                      <div>
                        <span className="Coupon-Applied">
                          Coupon Applied Successfully
                        </span>
                      </div>
                    )}
                  </div>
                  {
                    // <div className="Free-Delivery-field">
                    //   <div className="Free-Delivery-icon">
                    //     <img src="img/Delivery_Motorbike.png" />
                    //   </div>
                    //     <div className="Free-Delivery-txt">
                    //     <p>Freee Delivery</p>
                    //     <span>Order Above $4</span>
                    //   </div>
                    //
                    // </div>
                  }
                </div>
                <div className="row Bill-Details">
                  <div className="col-md-12">
                    <p>Bill Details</p>
                  </div>
                  {bucketDciResponseData.Detailed_cart ? (
                    <div className="col-md-12">
                      <ul>
                        <li>
                          Item total
                          <span>
                            {bucketDciResponseData.Detailed_cart.sub_total ? (
                              <>
                                $
                                {Number(
                                  bucketDciResponseData.Detailed_cart.sub_total,
                                  2
                                ).toFixed(2)}
                              </>
                            ) : (
                              "$0"
                            )}
                          </span>
                        </li>
                        {
                          // <li>
                          //   Restaurant Charges
                          //   <span>{this.state.cartdetails_checkout.object.taxes
                          //    ? (<>${Number(this.state.cartdetails_checkout.object.taxes[0]
                          //        .amount,2).toFixed(2)}</>)
                          //    : null}</span>
                          // </li>
                        }
                        {bucketDciResponseData.Detailed_cart &&
                        bucketDciResponseData.Detailed_cart.taxes
                          ? bucketDciResponseData.Detailed_cart.taxes.map(
                              (taxes, index) => (
                                <li>
                                  {taxes.name}
                                  <span>
                                    <> ${Number(taxes.amount, 2).toFixed(2)}</>
                                  </span>
                                </li>
                              )
                            )
                          : null}
                        <li>
                          Tip
                          <span>
                            <select
                              onChange={e => tiphandlerchange(e)}
                              className="form-control"
                              id="tip-select-checkout"
                            >
                              {bucketDciResponseData.cart_item_tip &&
                              bucketDciResponseData.cart_item_tip.length > 0 ? (
                                tip_rate_fees.map((item, index) => {
                                  const fee_id =
                                    bucketDciResponseData.cart_item_tip[0]
                                      .fee_id;
                                  const fee_rate =
                                    bucketDciResponseData.cart_item_tip[0].rate;
                                  const selected =
                                    fee_rate == item ? "selected" : null;
                                  return (
                                    <option
                                      value={item}
                                      key={index}
                                      selected={selected}
                                    >
                                      {item}%
                                    </option>
                                  );
                                })
                              ) : (
                                <option value="0">0%</option>
                              )}
                            </select>
                          </span>
                        </li>
                        <hr />
                        <li>
                          Tip Amount
                          <span>
                            $
                            {bucketDciResponseData.cart_item_tip &&
                            bucketDciResponseData.cart_item_tip[0]
                              ? bucketDciResponseData.cart_item_tip[0].amount
                              : "0"}
                          </span>
                        </li>
                        <hr />
                        {bucketDciResponseData.Detailed_cart &&
                        bucketDciResponseData.Detailed_cart.additional_fees
                          ? bucketDciResponseData.Detailed_cart.additional_fees.map(
                              (additional_fee, index) => (
                                <>
                                  <li>
                                    {additional_fee.name}
                                    <span>
                                      <>
                                        {" "}
                                        $
                                        {Number(
                                          additional_fee.amount,
                                          2
                                        ).toFixed(2)}
                                      </>
                                    </span>
                                  </li>
                                  <hr />
                                </>
                              )
                            )
                          : null}
                        {bucketDciResponseData.Detailed_cart.applied_coupons &&
                        Object.keys(
                          bucketDciResponseData.Detailed_cart.applied_coupons
                        ).length > 0 ? (
                          <>
                            <li>
                              Applied Coupon
                              <span>
                                {
                                  Object.keys(
                                    bucketDciResponseData.Detailed_cart
                                      .applied_coupons
                                  )[0]
                                }
                              </span>
                            </li>
                            <hr />
                            <li>
                              Coupon Discount
                              <span>
                                $
                                {
                                  Object.values(
                                    bucketDciResponseData.Detailed_cart
                                      .applied_coupons
                                  )[0]
                                }
                              </span>
                            </li>
                            <hr />
                          </>
                        ) : null}
                        <li>
                          {shipping_method_name}
                          <span>
                            $
                            {bucketDciResponseData.Delivery_method &&
                            bucketDciResponseData.Delivery_method.length > 0
                              ? delivery_cost
                              : 0}
                          </span>
                        </li>
                        <hr />
                        <li>
                          TO PAY
                          <span>
                            {bucketDciResponseData.Detailed_cart
                              .total_amount ? (
                              <>
                                $
                                {Number(
                                  bucketDciResponseData.Detailed_cart
                                    .total_amount,
                                  2
                                ).toFixed(2)}
                              </>
                            ) : (
                              "$0"
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-8 col-md-4 checkout-main-right-sidebar">
                <div className="main-contant">
                  <div className="row">
                    <div className="col-md-8">
                      {/* <div className="map-iframe" >
                                 <p>
                                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6860.370066073937!2d76.69101877351056!3d30.71319822657574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee566ec12caf%3A0xe82bcee83eb20ba5!2sPhase%208B%2C%20Industrial%20Area%2C%20Sector%2074%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140308!5e0!3m2!1sen!2sin!4v1567093539411!5m2!1sen!2sin" width="100%" height={400} frameBorder={0} style={{border: 0}} allowFullScreen />
                                 </p>
                               </div> */}

                      <div className="address-form">
                        <h2 className="inner">Your Order Details</h2>
                        {(selected_address != null &&
                          selected_address == "Saved Address") ||
                        selected_address == "New Address" ? (
                          <Form.Row>
                            <Form.Group as={Col} controlId="formBasicTelephone">
                              <Form.Check
                                type="radio"
                                label="New Address"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={
                                  selected_address == "New Address"
                                    ? true
                                    : false
                                }
                                Value="New Address"
                                onChange={e => handleFieldaddress(e)}
                              />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                              <Form.Check
                                type="radio"
                                label="Saved Address"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                defaultChecked={
                                  selected_address == "Saved Address"
                                    ? true
                                    : false
                                }
                                value="Saved Address"
                                onChange={e => handleFieldaddress(e)}
                              />
                            </Form.Group>
                          </Form.Row>
                        ) : null}

                        {selected_address == null ||
                        selected_address == "New Address" ? (
                          <>
                            <Form className="Loc-form" id="AddressForm">
                              <Form.Row>
                                <Form.Group as={Col} controlId="formBasicfname">
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={inputValues.first_name}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        first_name: e.target.value
                                      })
                                    }
                                    onBlur={e => handleFirstNameChange(e)}
                                    required
                                  />
                                  {firstname_error &&
                                  firstname_error === true ? (
                                    <span className="phone-error">
                                      *Please enter alphabet characters only.
                                    </span>
                                  ) : null}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasiclname">
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={inputValues.last_name}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        last_name: e.target.value
                                      })
                                    }
                                    onBlur={e => handleLastNameChange(e)}
                                    required
                                  />
                                  {lastname_error && lastname_error === true ? (
                                    <span className="phone-error">
                                      *Please enter alphabet characters only.
                                    </span>
                                  ) : null}
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  controlId="formBasicTelephone"
                                >
                                  <Form.Label>Telephone/mobile</Form.Label>
                                  <Form.Control
                                    type="text"
                                    pattern="[0-9]*"
                                    maxlength="10"
                                    placeholder="Telephone/mobile"
                                    value={inputValues.telephone}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        telephone: e.target.value
                                      })
                                    }
                                    onBlur={e => handlePhoneChange(e)}
                                    required
                                  />
                                  {phone_error && phone_error === true ? (
                                    <span className="phone-error">
                                      Phone Number must be 10 digits
                                    </span>
                                  ) : null}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={inputValues.email}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        email: e.target.value
                                      })
                                    }
                                    onBlur={e => handleEmailChange(e)}
                                    required
                                  />
                                  {email_error && email_error === true ? (
                                    <span className="phone-error">
                                      Please enter valid email
                                    </span>
                                  ) : null}
                                </Form.Group>
                              </Form.Row>
                              <Form.Group controlId="formBasicaddress">
                                <Form.Label>Your full address</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Your full address"
                                  value={inputValues.address}
                                  onChange={e =>
                                    setInputValues({
                                      ...inputValues,
                                      address: e.target.value
                                    })
                                  }
                                  required
                                />
                              </Form.Group>
                              <Form.Row>
                                <Form.Group as={Col} controlId="formBasicCity">
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={inputValues.city}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        city: e.target.value
                                      })
                                    }
                                    required
                                  />
                                </Form.Group>
                                <Form.Group
                                  as={Col}
                                  controlId="formBasicPostalcode"
                                >
                                  <Form.Label>Postal code</Form.Label>
                                  <Form.Control
                                    type="text"
                                    pattern="[0-9]*"
                                    maxlength="5"
                                    placeholder="Postal code"
                                    value={inputValues.postal_code}
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        postal_code: e.target.value
                                      })
                                    }
                                    onBlur={e => handlePostalCodeChange(e)}
                                    required
                                  />
                                  {postal_code_error &&
                                  postal_code_error === true ? (
                                    <span className="phone-error">
                                      Postal code must be in less than and equal
                                      to 5 digits
                                    </span>
                                  ) : null}
                                </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                <Form.Group as={Col} controlId="State">
                                  <Form.Label>State</Form.Label>
                                  <Form.Control
                                    as="select"
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        state: e.target.value
                                      })
                                    }
                                    required
                                  >
                                    <option value="">Select state</option>
                                    {state_info && state_info.length > 0
                                      ? state_info.map((statedata, index) => (
                                          <option
                                            value={statedata.id}
                                            key={index}
                                          >
                                            {statedata.name}
                                          </option>
                                        ))
                                      : null}
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="Country">
                                  <Form.Label>Country</Form.Label>
                                  <Form.Control
                                    as="select"
                                    onChange={e =>
                                      setInputValues({
                                        ...inputValues,
                                        country: e.target.value
                                      })
                                    }
                                    required
                                  >
                                    <option value={country_info.id}>
                                      {country_info.name}
                                    </option>
                                  </Form.Control>
                                </Form.Group>
                              </Form.Row>
                              <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>
                                  Notes for the restaurant
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows="3"
                                  value={inputValues.notes_restaurant}
                                  onChange={e =>
                                    setInputValues({
                                      ...inputValues,
                                      notes_restaurant: e.target.value
                                    })
                                  }
                                />
                              </Form.Group>
                            </Form>

                            {configResponseData.is_shop_open === "true" ||
                            configResponseData.is_shop_open === "True" ? (
                              stripe_amount != 0 ? (
                                inputValues.first_name != "" &&
                                inputValues.last_name != "" &&
                                inputValues.telephone != "" &&
                                inputValues.telephone.length == 10 &&
                                email_error === false &&
                                firstname_error === false &&
                                lastname_error === false &&
                                inputValues.address != "" &&
                                inputValues.city != "" &&
                                inputValues.postal_code != "" &&
                                inputValues.postal_code.length >= 5 &&
                                inputValues.postal_code.length <= 10 &&
                                inputValues.state != "" &&
                                inputValues.country != "" ? (
                                  <>
                                    <div>
                                      <div className="giftcardbox">
                                        <Form.Check
                                          type="checkBox"
                                          label="Pay By Gift Card"
                                          name="formHorizontalRadios"
                                          id="Pay By Gift Card"
                                          value={inputValues.giftcheck}
                                          checked={inputValues.giftcheck}
                                          onClick={e =>
                                            setInputValues({
                                              ...inputValues,
                                              giftcheck: !inputValues.giftcheck
                                            })
                                          }
                                          onChange={console.log('inputValues.giftcheck',inputValues.giftcheck)}
                                        />
                                        {inputValues.giftcheck ? (
                                          <div className="form-popup giftcard" id="form">


                                              <div className="col-md-12">
                                                <input
                                                  type="text"
                                                  name="giftcard_number"
                                                  className="input"
                                                  placeholder="Enter Card Number"
                                                  value={inputValues.giftcard_number}
                                                  onChange={e =>
                                                    setInputValues({
                                                      ...inputValues,
                                                      giftcard_number: e.target.value
                                                    })
                                                  }
                                                  required
                                                />
                                              </div>
                                              <div className="col-md-12">
                                                <input
                                                  type="password"
                                                  name="pin"
                                                  className="input"
                                                  placeholder="Enter Pin"
                                                  value={inputValues.giftcard_pin}
                                                  onChange={e =>
                                                    setInputValues({
                                                      ...inputValues,
                                                      giftcard_pin: e.target.value
                                                    })
                                                  }
                                                  required
                                                />
                                              </div>
                                              <div>
                                                <button className="btn btn-secondary">
                                                  Validate
                                                </button>
                                              </div>

                                          </div>
                                        ) : null}

                                      </div>
                                      {stripe_error != null ? (
                                        <span className="stripe-error">
                                          {stripe_error}
                                        </span>
                                      ) : null}
                                      {checkout_error != null ? (
                                        <span className="stripe-error">
                                          {checkout_error}
                                        </span>
                                      ) : null}

                                      {
                                        configResponseData.stripe_info
                                        .PAYMENT_GATEWAY == "hps" || configResponseData.stripe_info
                                        .PAYMENT_GATEWAY == "authnet" ? (
                                        <>
                                          <Form
                                            id="standard"
                                            action=""
                                            method="GET"
                                          >
                                            <Form.Group controlId="formBasicaddress">
                                              <Form.Label>
                                                Card Number:
                                              </Form.Label>
                                              <Form.Control
                                                type="tel"
                                                id="standardCardNumber"
                                                value={inputValues.cardNumber}
                                                onChange={e =>
                                                  setInputValues({
                                                    ...inputValues,
                                                    cardNumber: e.target.value
                                                  })
                                                }
                                                placeholder="1234 1234 1234 1234"
                                                maxlength="16"
                                                required
                                              />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicaddress">
                                              <Form.Label>
                                                Card Expiration:
                                              </Form.Label>
                                            </Form.Group>
                                            <Form.Row>
                                              <Form.Group
                                                as={Col}
                                                controlId="formBasicfname"
                                              >
                                                <Form.Label>
                                                  Expiration Month *
                                                </Form.Label>
                                                <Form.Control
                                                  type="tel"
                                                  placeholder="MM"
                                                  value={
                                                    inputValues.cardExpMonth
                                                  }
                                                  onChange={e =>
                                                    setInputValues({
                                                      ...inputValues,
                                                      cardExpMonth:
                                                        e.target.value
                                                    })
                                                  }
                                                  maxlength="2"
                                                  required
                                                />
                                              </Form.Group>
                                              <Form.Group
                                                as={Col}
                                                controlId="formBasiclname"
                                              >
                                                <Form.Label>
                                                  Expiration Year *
                                                </Form.Label>
                                                <Form.Control
                                                  type="tel"
                                                  placeholder="YYYY"
                                                  value={
                                                    inputValues.cardExpYear
                                                  }
                                                  onChange={e =>
                                                    setInputValues({
                                                      ...inputValues,
                                                      cardExpYear:
                                                        e.target.value
                                                    })
                                                  }
                                                  maxlength="4"
                                                  required
                                                />
                                              </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formBasicaddress">
                                              <Form.Label>Card CVV:</Form.Label>
                                              <Form.Control
                                                type="tel"
                                                id="standardCardCvv"
                                                placeholder="CVV"
                                                value={inputValues.cardCvv}
                                                onChange={e =>
                                                  setInputValues({
                                                    ...inputValues,
                                                    cardCvv: e.target.value
                                                  })
                                                }
                                                required
                                              />
                                            </Form.Group>
                                          </Form>
                                        </>
                                      ) : (
                                        <CardSection />
                                      )}
                                    </div>
                                    {console.log(
                                      "configResponseData",
                                      configResponseData
                                    )}
                                    <button
                                      disabled={order_now_click ? true : false}
                                      className="Loc-form-btn"
                                      onClick={e => handleSubmit(e)}
                                    >
                                      <span>
                                        {!propsStatePayments.payment_checkout_loading ? (
                                          "ORDER NOW"
                                        ) : (
                                          <span className="paymentload">
                                            PROCESSING{" "}
                                            <i class="fa fa-spinner fa-spin"></i>
                                          </span>
                                        )}{" "}
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="submit"
                                    form="AddressForm"
                                    className="StripeCheckout Loc-form-btn"
                                    value="submit"
                                    disabled={
                                      phone_error ||
                                      postal_code_error ||
                                      email_error ||
                                      firstname_error ||
                                      lastname_error
                                        ? true
                                        : false
                                    }
                                  >
                                    {" "}
                                    <span>ORDER NOW</span>
                                  </button>
                                )
                              ) : (
                                <button
                                  disabled={!cart_empty_click}
                                  className="StripeCheckout Loc-form-btn"
                                  onClick={() => cartemptyhandler()}
                                >
                                  {" "}
                                  <span>ORDER NOW</span>
                                </button>
                              )
                            ) : (
                              <button
                                className="StripeCheckout Loc-form-btn"
                                onClick={() => shopclosedhandler()}
                              >
                                {" "}
                                <span>ORDER NOW</span>
                              </button>
                            )}
                          </>
                        ) : selected_address != null &&
                          selected_address == "Saved Address" ? (
                          <>
                            {checkout_address_user &&
                            checkout_address_user.length > 0
                              ? checkout_address_user.map(address => {
                                  return (
                                    <div className="address-box">
                                      <input
                                        type="radio"
                                        name="gender"
                                        onClick={e => this.selectedaddress(e)}
                                        value={address.address_id}
                                      />
                                      <ul className="saved-address-data">
                                        <li>
                                          {address.firstName}
                                          {address.lastName}
                                          <i class="fas fa-address-book"></i>
                                        </li>
                                        <li>address1</li>
                                        <li>{address.address1}</li>
                                        <li>{address.postalCode}</li>
                                        <li>{address.mobileNumber}</li>
                                      </ul>
                                    </div>
                                  );
                                })
                              : null}
                            {configResponseData.is_shop_open === "true" ||
                            configResponseData.is_shop_open === "True" ? (
                              stripe_amount != 0 ? (
                                <>
                                  <div>
                                    {stripe_error != null ? (
                                      <span className="stripe-error">
                                        {stripe_error}
                                      </span>
                                    ) : null}
                                    {checkout_error != null ? (
                                      <span className="stripe-error">
                                        {checkout_error}
                                      </span>
                                    ) : null}
                                    <CardSection />
                                  </div>
                                  <button
                                    disabled={order_now_click ? true : false}
                                    className="Loc-form-btn"
                                    onClick={e => handleSubmit(e)}
                                  >
                                    <span>ORDER NOW</span>
                                  </button>
                                </>
                              ) : (
                                <button
                                  disabled={!cart_empty_click}
                                  className="StripeCheckout Loc-form-btn"
                                  onClick={() => cartemptyhandler()}
                                >
                                  {" "}
                                  <span>ORDER NOW</span>
                                </button>
                              )
                            ) : (
                              <button
                                className="StripeCheckout Loc-form-btn"
                                onClick={() => shopclosedhandler()}
                              >
                                {" "}
                                <span>ORDER NOW</span>
                              </button>
                            )}
                          </>
                        ) : null}
                        <div
                          className={
                            !propsStatePayments.payment_checkout_loading
                              ? "back-to-menu text-center"
                              : "back-to-menu text-center disabled-menu"
                          }
                        >
                          <Link
                            to={{
                              pathname: "/"
                            }}
                          >
                            Back To Menu
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="Delivery-box">
                        <div className="col-md-9">
                          {
                            // <h6>Delivery time</h6>
                          }
                        </div>
                        <div className="col-md-2">
                          <i className="fa fa-clock-o"></i>
                        </div>
                        <div className="col-md-1"></div>
                        {banner_info.MERCHANT_ADD_FEAT_DELIVERY && banner_info.MERCHANT_ADD_FEAT_DELIVERY === "TRUE" ?
                        (<p>
                          <span>Delivery :</span> Order will be delivered within{" "}
                          {banner_info.MERCHANT_ADD_FEAT_DELIVERY_TIME}.
                        </p>):null}

                        <p>
                          <span>Pickup :</span> Order will be ready within{" "}
                          {banner_info.MERCHANT_ADD_FEAT_PICKUP_TIME} to pickup.
                        </p>
                        <hr></hr>
                        <div className="row">
                          <div className="col-md-9 secure-payment">
                            <h6>Secure payment</h6>
                          </div>
                          <div className="col-md-2 credit-icon">
                            <i
                              className="fa fa-credit-card"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="col-md-3"></div>
                        </div>

                        <img src="img/ssl.png" />
                        <p className="secure-content">
                          All payments is 256 bits encrypted.
                        </p>
                      </div>
                      <div className="Help-box">
                        <a href="/contact-us">
                          <i className="fa fa-life-ring" aria-hidden="true"></i>
                        </a>
                        <a href="/contact-us">
                          <h4>Need Help?</h4>
                        </a>
                        {
                          // <p>+13034422500</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        configInfo={props.location.configInfo}
        merchantInfo={props.location.merchantInfo}
        banner_info={banner_info}
      />
      <Modal show={showmodal_cart_empty} id="modal3" size="sm">
        <Modal.Body>Cart is empty.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleclosecartempty()}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={couponErrorModal} id="modal3" size="sm">
        <Modal.Body>{couponError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleclosecoupon()}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showmodal_shop_closed} id="modal3" size="sm">
        <Modal.Body>Shop is Closed.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handlecloseShopClosed()}>
            ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default injectStripe(Checkout);
