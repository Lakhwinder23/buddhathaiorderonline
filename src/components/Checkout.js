import React, { Component } from 'react';
import CheckoutHeader from './CheckoutDataHeader';
import StripeCheckout from 'react-stripe-checkout';
import HeaderTwo from './HeaderTwo';
import CheckoutDataHeader from './CheckoutDataHeader';
import Modal from "react-bootstrap/Modal";
import Footer from './Footer';
import {config} from '../config';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Button ,
  Container,
    Row,
    Col,
  Form,
  } from 'react-bootstrap';
  import {injectStripe} from 'react-stripe-elements';
  import CardSection from './CardSection';
class Checkout extends Component {
      constructor(props){
        super(props);
        this.state = {
          checkout_header_info : this.props.location && this.props.location.checkoutinfodata
          ? this.props.location.checkoutinfodata
          : [],
          Delivery_info : [],
          showmodal_cart_empty : false,
          cart_empty_click : true,
          checkout_Delivery_cost : this.props.location && this.props.location.Delivery_cost ? this.props.location.Delivery_cost : 0,
          apply_coupon_info : [],
          coupon_applied : [],
           apply_coupon_state : false,
           apply_coupon_amount : '0',
           remove_coupon_status : false,
           order_loader : false,
          first_name : '',
          last_name : '',
          telephone : '',
          email : '',
          address : '',
          city : '',
          postal_code : '',
          state: '122',
          country : '254',
          notes_restaurant :'',
          payment_token :'',
          payment_complete :false,
          order_info :[],
          country_info :'',
          state_info : [],
          address_info:[],
          phone_error : false,
          email_error : false,
          lastname_error : false,
          firstname_error : false,
          postal_code_error : false,
          Unique_bucket_Id : this.props.location && this.props.location.bucket_id ? this.props.location.bucket_id : "",
          checkout_Delivery_method:this.props.location && this.props.location.Delivery_method ? this.props.location.Delivery_method : [],
          checkout_pickup_restaurant:this.props.location && this.props.location.pickup_restaurant ? this.props.location.pickup_restaurant : "",
          cart_item_tip:this.props.location && this.props.location.checkout_cart_item_tip ? this.props.location.checkout_cart_item_tip : [],
          checkout_tip_rate_fees:this.props.location && this.props.location.tip_rate_fees ? this.props.location.tip_rate_fees : [],
          checkout_address_user : [],
          user_address_id : null,
          stripe_key:null,
          checkout_tip_rate:this.props.location && this.props.location.tip_rate ? this.props.location.tip_rate : null,
          stripe_info : [],
          merchant_info : [],
          final_user_checkout_email : '',
          final_user_checkout_token : '',
          selected_address : '',
          apply_coupoon : null,
          cart_above_data_checkout : this.props.location && this.props.location.cart_above_data ?
          this.props.location.cart_above_data : [],
          cartdetails_checkout :this.props.location && this.props.location.cartdetails ? this.props.location.cartdetails :[],
          business_data :[],
          coupon_error : null,
           coupon_error_modal : false,
           is_shop_open : false,
           static_resource_endpoint : null,
           static_resource_sufix : null,
           stripe_error : null,
           checkout_error:null,
          order_now_click:false,
          cartdetails_item_checkout : this.props.location && this.props.location.cartdetails_item ? this.props.location.cartdetails_item : []
        }
        this.Getinformation = this.Getinformation.bind(this);
        this.checkoutinfo = this.checkoutinfo.bind(this);
        this.guestcheckoutinfo = this.guestcheckoutinfo.bind(this);

        this.incrementNew = this.incrementNew.bind(this);
        this.decrementNew = this.decrementNew.bind(this);
        this.incrementwithAddon = this.incrementwithAddon.bind(this);
        this.decrementwithAddon = this.decrementwithAddon.bind(this);
      }


      deliveryhandler = event => {
        const url4 =
          `${config.api_base}/users/business/bucket/update_shipping_method?access_token=${this.state.final_user_checkout_token}`;
        fetch(url4, {
          method: "POST",
          body: JSON.stringify({
            form_id: "",
            user_id: this.state.final_user_checkout_email,
            fields: {
              bucketId: this.state.Unique_bucket_Id,
              shippingId : event.target.value
            }
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
              .then(delivery => {
                this.setState({
                  Delivery_info: delivery.object
                });
              }).then(() =>{
                this.setState({
                  checkout_Delivery_cost : this.state.Delivery_info.cost
                })
              })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
        }

        handleFieldChange = (field, event) => {
          const new_state = {};
          new_state[field] = event.target.value;
          this.setState(new_state);
      };
      handleclosecoupon = () => {
        this.setState({
          coupon_error_modal: false
        });
      };

      cartemptyhandler = () =>{
        this.setState({
          showmodal_cart_empty: true
        });
      };
      handleclosecartempty = () => {
        this.setState({
          showmodal_cart_empty: false
        });
      };
      shopclosedhandler = () =>{
    this.setState({
      showmodal_shop_closed: true
    });
  };

  handlecloseShopClosed = () => {
    this.setState({
      showmodal_shop_closed: false
    });
  };
      handlePhoneChange = (field, event) => {

        const phone = event.target.value;
        const phone_digit = /^\d{10}$/;
        if(phone.length == 10){
            this.setState({phone_error : false});
        }
        else {
          this.setState({phone_error : true});
        }

    };

    handleEmailChange = (field, event) => {

      const email = event.target.value;
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          this.setState({email_error : false});
      }
      else {
        this.setState({email_error : true});
      }

  };
  handleFirstNameChange = (field, event) => {

const first_name = event.target.value;
if (first_name.match(/^[a-zA-Z ]*$/)){
    this.setState({firstname_error : false});
}
else {
  this.setState({firstname_error : true});
}

};

handleLastNameChange = (field, event) => {

const last_name = event.target.value;
if (last_name.match(/^[a-zA-Z ]*$/)){
    this.setState({lastname_error : false});
}
else {
  this.setState({lastname_error : true});
}

};
    handlePostalCodeChange = (field, event) => {

      const postal_code = event.target.value;
      if(postal_code.length < 5 || postal_code.length > 10){
          this.setState({postal_code_error : true});
      }
      else {
        this.setState({postal_code_error : false});
      }

  };

      selectedaddress = (event) =>{
          this.setState({
            user_address_id : event.target.value
          })
          console.log("address radio id", this.state.user_address_id);
      };
      handlerApplyCouponState = (event) =>{
        this.setState({
          apply_coupoon : event.target.value
        })
      }
      handlerApplyCoupon = (event) =>{
        this.setState({
          remove_coupon_status : false
        })
            const url_coupon =
        `${config.api_base}/users/business/bucket/apply_coupon?access_token=${this.state.final_user_checkout_token}&user_id=${this.state.final_user_checkout_email}`;
      fetch(url_coupon, {
        method: "POST",
        body: JSON.stringify({
          fields: {
            bucketId: this.state.Unique_bucket_Id,
            //bucketId: "9f027dc54d6096d5dff07b44e9eb7fcd",
            rule: this.state.apply_coupoon                                              //"10% Discount."
          },
          form_id: "",
          user_id: this.state.final_user_checkout_email
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
            .then(coupon => {
              if(coupon.object.error){
                this.setState({
                  apply_coupon_amount : "0",
                  coupon_error_modal : true,
                  coupon_error : coupon.object.error
                })
              }
              else{
                this.setState({
                  apply_coupon_info: coupon.object,
                  apply_coupon_state : coupon.request_status,
                  apply_coupon_amount : coupon.object.amount
                },() =>{
                  const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
                  fetch(url5, {
                    method: "GET",
                    headers: {
                      //Authorization: bearer,
                      "Content-Type": "application/json"
                    }
                  })
                    .then(response => response.json())
                    .then(cartData => {
                      console.log("Second search results", cartData);
                      this.setState({
                        cartdetails_checkout: cartData,
                        cartdetails_item_checkout: cartData.object.items,
                        cart_item_tip : cartData.object.fees,
                        checkout_Delivery_method : cartData.object.available_delivery_methods,
                        checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                        Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                        loadingData: null
                      });
                    }).catch(error =>
                      this.setState({
                        message: "Something bad happened " + error
                      })
                    );
                });
              }
            })
        .catch(error =>
          this.setState({
            message: "Something bad happened " + error
          })
        );


      //       if(localStorage.getItem("user") != null && localStorage.getItem("access_token") != null){
      //       const url_coupon_remove =
      //   `${config.api_base}/users/business/bucket/remove_coupon?access_token=${this.state.final_user_checkout_token}&user_id=${this.state.final_user_checkout_email}`;
      // fetch(url_coupon_remove, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     fields: {
      //       bucketId: this.state.Unique_bucket_Id,
      //      // bucketId: "9f027dc54d6096d5dff07b44e9eb7fcd",
      //       rule: "10% Discount."                                              //"10% Discount."
      //     },
      //     form_id: "",
      //     user_id: this.state.final_user_checkout_email
      //   }),
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // }).then(response => response.json())
      //       .then(coupon => {
      //         this.setState({
      //           apply_coupon_info: coupon.object
      //         });
      //       })
      //   .catch(error =>
      //     this.setState({
      //       message: "Something bad happened " + error
      //     })
      //   );
      // }



      }
      handlerRemoveCoupon = (event) =>{
        this.setState({
          apply_coupon_amount : "0"
        })
            const url_coupon_remove =
        `${config.api_base}/users/business/bucket/remove_coupon?access_token=${this.state.final_user_checkout_token}&user_id=${this.state.final_user_checkout_email}`;
      fetch(url_coupon_remove, {
        method: "POST",
        body: JSON.stringify({
          fields: {
            bucketId: this.state.Unique_bucket_Id,
           // bucketId: "9f027dc54d6096d5dff07b44e9eb7fcd",
            rule: this.state.apply_coupoon                                              //"10% Discount."
          },
          form_id: "",
          user_id: this.state.final_user_checkout_email
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
            .then(coupon => {
              this.setState({
                apply_coupon_info: coupon.object,
                remove_coupon_status : coupon.request_status
              });
            }).then(() =>{
                const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
                fetch(url5, {
                  method: "GET",
                  headers: {
                    //Authorization: bearer,
                    "Content-Type": "application/json"
                  }
                })
                  .then(response => response.json())
                  .then(cartData => {
                    console.log("Second search results", cartData);
                    this.setState({
                      cartdetails_checkout: cartData,
                      cartdetails_item_checkout: cartData.object.items,
                      cart_item_tip : cartData.object.fees,
                      checkout_Delivery_method : cartData.object.available_delivery_methods,
                      checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                      Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                      loadingData: null
                    });
                  }).catch(error =>
                    this.setState({
                      message: "Something bad happened " + error
                    })
                  );
              })
        .catch(error =>
          this.setState({
            message: "Something bad happened " + error
          })
        );




      }
      guestcheckoutinfo(){
        this.setState({
          order_loader : true,
          cart_empty_click : false
        })
        const process_centeralized_payment = this.state.stripe_info  && Object.keys(this.state.stripe_info).length>0 && this.state.stripe_info.STRIPE_ACCOUNT_ID ? "true" : undefined;
        const url4 =
        `${config.api_base}/users/business/order/payment/checkout?access_token=${this.state.final_user_checkout_token}`;
      fetch(url4, {
        method: "POST",
        body: JSON.stringify({
          // form_id: "",
          // user_id: "guest@onlinebites.com",
          // fields: {
          // instrumentMode: "cc",
          // gatewayId: this.props.location.cartdetails_checkout_method[0].id,
          // bucketId: this.state.Unique_bucket_Id,
          // addressId: this.state.address_info.address_id,

          // notes: this.state.notes_restaurant,
          // // lastName: data.last_name,
          // // country: 1,
          //  paymentType: "stripe",
          // cardToken: this.state.payment_token,
          // // state: 824,
          // // postalCode: data.postal_code,
          // // mobileNumber: data.telephone,
          // //  city: data.city,
          // // address1: data.address,
          // // firstName: data.first_name,
          // // email: data.email
          // }
          fields: {
            address1: this.state.address,
            addressId: "",
            bucketId: this.state.Unique_bucket_Id,
            cardToken: this.state.payment_token,
            city: this.state.city,
            country: this.state.country ,
            email: this.state.email,
            firstName: this.state.first_name,
            gatewayId: this.props.location.cartdetails_checkout_method[0].id,
            instrumentMode: "cc",
            lastName: this.state.last_name,
            mobileNumber: this.state.telephone,
            notes: this.state.notes_restaurant,
            orderDate: "",
            orderTime: "",
            paymentType: "stripe",
            postalCode: this.state.postal_code,
            state: this.state.state
          },
          form_id: "",
          user_id: this.state.final_user_checkout_email,
          process_centeralized_payment : process_centeralized_payment


        }),
        headers: {
          //"Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g",
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
            .then(order => {
              this.setState({
                order_info: order,
                order_loader : false,
                cart_empty_click : true
              });
              if(order.object && order.object.error){
                this.setState({
                  checkout_error : order.object.error,
                  order_now_click:false
                })
              }
            })
        .catch(error =>
          this.setState({
            message: "Something bad happened " + error
          }))
        }
      checkoutinfo(){
        this.setState({
          order_loader : true,
          cart_empty_click : false
        })
        const process_centeralized_payment = this.state.stripe_info  && Object.keys(this.state.stripe_info).length>0 && this.state.stripe_info.STRIPE_ACCOUNT_ID ? "true" : undefined;
        const url4 =
        `${config.api_base}/users/business/order/payment/checkout?access_token=${this.state.final_user_checkout_token}`;
      fetch(url4, {
        method: "POST",
        body: JSON.stringify({
          // form_id: "",
          // user_id: "guest@onlinebites.com",
          // fields: {
          // instrumentMode: "cc",
          // gatewayId: this.props.location.cartdetails_checkout_method[0].id,
          // bucketId: this.state.Unique_bucket_Id,
          // addressId: this.state.address_info.address_id,

          // notes: this.state.notes_restaurant,
          // // lastName: data.last_name,
          // // country: 1,
          //  paymentType: "stripe",
          // cardToken: this.state.payment_token,
          // // state: 824,
          // // postalCode: data.postal_code,
          // // mobileNumber: data.telephone,
          // //  city: data.city,
          // // address1: data.address,
          // // firstName: data.first_name,
          // // email: data.email
          // }

          fields: {
            address1: "",
            addressId: this.state.user_address_id,
            bucketId: this.state.Unique_bucket_Id,
            cardToken: this.state.payment_token,
            city: "",
            country: "" ,
            email: "",
            firstName: "",
            gatewayId: this.props.location.cartdetails_checkout_method[0].id,
            instrumentMode: "cc",
            lastName: "",
            mobileNumber: "",
            notes: this.state.notes_restaurant,
            orderDate: "",
            orderTime: "",
            paymentType: "stripe",
            postalCode: "",
            state: ""
          },
          form_id: "",
          user_id: this.state.final_user_checkout_email,
          process_centeralized_payment : process_centeralized_payment


        }),
        headers: {
          //"Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g",
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
            .then(order => {
              this.setState({
                order_info: order,
                order_loader : false,
                cart_empty_click : true
              });
              if(order.object && order.object.error){
                this.setState({
                  checkout_error : order.object.error,
                  order_now_click:false
                })
              }
            })
        .catch(error =>
          this.setState({
            message: "Something bad happened " + error
          }))
        }

      Getinformation(event){
        const data = {
          "first_name" : this.state.first_name,
          "last_name" : this.state.last_name,
          "telephone" : this.state.telephone,
          "email" : this.state.email,
          "address" : this.state.address,
          "city" : this.state.city,
          "postal_code" : this.state.postal_code,
          "state": this.state.state,
          "country" : this.state.country,
          "notes_restaurant" :this.state.notes_restaurant
        }

        const address_url =
          `${config.api_base}/users/address?user_id=${this.state.final_user_checkout_email}&access_token=${this.state.final_user_checkout_token}`;
        fetch(address_url, {
          method: "POST",
          body: JSON.stringify({
            form_id: "",
            user_id: this.state.final_user_checkout_email,
            fields: {
            address_id: "",
            firstName: this.state.first_name,
            middleName: "",
            lastName: this.state.last_name,
            address1: this.state.address,
            address2: "",
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            postalCode: this.state.postal_code,
            mobileNumber: this.state.telephone,
            email: this.state.email
            }

          }),
          headers: {
            //"Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g",
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
              .then(address => {
                this.setState({
                  address_info: address.object
                },() =>{
                  const process_centeralized_payment = this.state.stripe_info  && Object.keys(this.state.stripe_info).length>0 && this.state.stripe_info.STRIPE_ACCOUNT_ID ? "true" : undefined;
                  const url4 =
                  `${config.api_base}/users/business/order/payment/checkout?access_token=${this.state.final_user_checkout_token}`;
                fetch(url4, {
                  method: "POST",
                  body: JSON.stringify({
                    // form_id: "",
                    // user_id: "guest@onlinebites.com",
                    // fields: {
                    // instrumentMode: "cc",
                    // gatewayId: this.props.location.cartdetails_checkout_method[0].id,
                    // bucketId: this.state.Unique_bucket_Id,
                    // addressId: this.state.address_info.address_id,

                    // notes: this.state.notes_restaurant,
                    // // lastName: data.last_name,
                    // // country: 1,
                    //  paymentType: "stripe",
                    // cardToken: this.state.payment_token,
                    // // state: 824,
                    // // postalCode: data.postal_code,
                    // // mobileNumber: data.telephone,
                    // //  city: data.city,
                    // // address1: data.address,
                    // // firstName: data.first_name,
                    // // email: data.email
                    // }

                    fields: {
                      address1: "",
                      addressId: this.state.address_info.address_id,
                      bucketId: this.state.Unique_bucket_Id,
                      cardToken: this.state.payment_token,
                      city: "",
                      country: "" ,
                      email: "",
                      firstName: "",
                      gatewayId: this.props.location.cartdetails_checkout_method[0].id,
                      instrumentMode: "cc",
                      lastName: "",
                      mobileNumber: "",
                      notes: this.state.notes_restaurant,
                      orderDate: "",
                      orderTime: "",
                      paymentType: "stripe",
                      postalCode: "",
                      state: ""
                    },
                    form_id: "",
                    user_id: this.state.final_user_checkout_email,
                    process_centeralized_payment : process_centeralized_payment


                  }),
                  headers: {
                    //"Authorization" : "Bearer eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g",
                    "Content-Type": "application/json"
                  }
                }).then(response => response.json())
                      .then(order => {
                        this.setState({
                          order_info: order
                        });
                        if(order.object && order.object.error){
                          this.setState({
                            checkout_error : order.object.error,
                            order_now_click:false
                          })
                        }
                      })

                });


              })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );

        console.log("data first name",data.first_name);


      }

      incrementNew(value1, value2 ,value3, value4) {
        this.setState({
          loadingData: value4
        });
        //console.log("increment id", this.state.bucket_id);
        const bearer =
      "Bearer" + this.state.final_user_checkout_token;
    const url4 =
      `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_checkout_token}&bucket_id=${value3}&user_id=${this.state.final_user_checkout_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: value3,
          bucketItemId: value1,
          quantity: value2 + 1
        },
        form_id: "",
        user_id: this.state.final_user_checkout_email
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : bearer
      }
        })
          .then(response => response.json())
          .then(responseData => {
            const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${value3}&user_id=${this.state.final_user_checkout_email}`;
            //console.log("search results", responseData);
            this.setState({
              test_cart: responseData,
              quantity: responseData.object.quantity
            });
            fetch(url5, {
              method: "GET",
              headers: {
                //Authorization: bearer,
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(cartData => {
                console.log("Second search results", cartData);
                this.setState({
                  cartdetails_checkout: cartData,
                  cartdetails_item_checkout: cartData.object.items,
                  cart_item_tip : cartData.object.fees,
                  checkout_Delivery_method : cartData.object.available_delivery_methods,
                  checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                  Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                  loadingData: null
                });
              });
          })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      };

      decrementNew(value1, value2, value3 ,value4) {
        this.setState({
          loadingData: value4
        });
        console.log("increment id", this.state.Unique_bucket_Id);
        const bearer =
      "Bearer" + this.state.final_user_checkout_token;
    const url4 =
    `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_checkout_token}&bucket_id=${value3}&user_id=${this.state.final_user_checkout_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: value3,
          bucketItemId: value1,
          quantity: value2 - 1
        },
        form_id: "",
        user_id: this.state.final_user_checkout_email
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : bearer
      }
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.object.error == "Invalid Bucket") {
              this.setState({
                Unique_bucket_Id: ""
              });
              localStorage.removeItem("user_local_bucket_id");
            }
            const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
            //console.log("search results", responseData);
            this.setState({
              test_cart: responseData,
              quantity: responseData.object.quantity
            });
            fetch(url5, {
              method: "GET",
              headers: {
                //Authorization: bearer,
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(cartData => {
                console.log("Second search results", cartData);
                this.setState({
                  cartdetails_checkout: cartData,
                  cartdetails_item_checkout: cartData.object.items,
                  cart_item_tip : cartData.object.fees,
                  checkout_Delivery_method : cartData.object.available_delivery_methods,
                  checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                  Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                  loadingData: null
                });
              }).then(() => {
                  if (this.state.cartdetails_checkout.object.error) {
                    this.setState({
                      Unique_bucket_Id: ""
                    });
                    localStorage.removeItem("user_local_bucket_id");
                  }
                });
          })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      };

      incrementwithAddon(value1, value2 ,value3) {
        this.setState({
          loadingData: value3
        });
        console.log("repeat_last_value3", value2);
        this.setState({
          show: false,
          selected_product_modal: [],
          showmodal2: false
        });
        const bearer =
          "Bearer" + this.state.final_user_checkout_token;
        const url4 =
        `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
        fetch(url4, {
          method: "POST",
          body: JSON.stringify({
            form_id: "",
            user_id: this.state.final_user_checkout_email,
            fields: {
              bucketId: this.state.Unique_bucket_Id,
              bucketItemId: value1,
              quantity: value2 + 1
            }
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : bearer
          }
        })
          .then(response => response.json())
          .then(responseData => {
            console.log("search results", responseData);
            const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
            this.setState({
              test_cart: responseData,
              quantity: responseData.object.quantity
            });
            fetch(url5, {
              method: "GET",
              headers: {
                //"Authorization": bearer,
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(cartData => {
                this.setState({
                  cartdetails_checkout: cartData,
                  cartdetails_item_checkout: cartData.object.items,
                  cart_item_tip : cartData.object.fees,
                  checkout_Delivery_method : cartData.object.available_delivery_methods,
                  checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                  Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                  loadingData: null
                });
              });
          })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      }



      decrementwithAddon(value1, value2, value3) {
        this.setState({
          loadingData: value3
        });
        console.log("repeat_last_value3", value2);
        const bearer =
          "Bearer" + this.state.final_user_checkout_token;
        const url4 =
        `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
        fetch(url4, {
          method: "POST",
          body: JSON.stringify({
            form_id: "",
            user_id: this.state.final_user_checkout_email,
            fields: {
              bucketId: this.state.Unique_bucket_Id,
              bucketItemId: value1,
              quantity: value2 - 1
            }
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization" : bearer
          }
        })
          .then(response => response.json())
          .then(responseData => {
            console.log("search results", responseData);
            if (responseData.object.error == "Invalid Bucket") {
              this.setState({
                Unique_bucket_Id: ""
              });
              localStorage.removeItem("user_local_bucket_id");
            }
            const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;
            this.setState({
              test_cart: responseData,
              quantity: responseData.object.quantity
            });
            fetch(url5, {
              method: "GET",
              headers: {
                //Authorization: bearer,
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(cartData => {
                this.setState({
                  cartdetails_checkout: cartData,
                  cartdetails_item_checkout: cartData.object.items,
                  cart_item_tip : cartData.object.fees,
                  checkout_Delivery_method : cartData.object.available_delivery_methods,
                  checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                  Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                  loadingData: null
                });
              })  .then(() => {
                  if (this.state.cartdetails_checkout.object.error) {
                    this.setState({
                      Unique_bucket_Id: ""
                    });
                    localStorage.removeItem("user_local_bucket_id");
                  }
                });
          })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      }



    async  componentDidMount(){
        const url_merchant_token =
        `${config.api_root}/security/session/merchants?Key=${config.key_value}&Secret=${config.secret_value}&device_id=21212121121212wqwqw`;
      fetch(url_merchant_token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Key" : config.key_value,
          "Secret" : config.secret_value
        }
      }).then(response => response.json())
            .then(merchant => {
              this.setState({
                merchant_info: merchant.object.access_token
              });
            }).then(() =>{
              const user_email =
                localStorage.getItem("user") === null
                  ? "guest@onlinebites.com"
                  : localStorage.getItem("user");
              const user_token =
                localStorage.getItem("access_token") === null
                  ? this.state.merchant_info
                  : localStorage.getItem("access_token");
                  this.setState({
                    final_user_checkout_email: user_email,
                    final_user_checkout_token: user_token
                  });

            const url6 =
               `${config.api_base}/enterprised/countries?access_token=${user_token}&pageSize=250&status=ACTIVE`;
            fetch(url6, {
              method: "GET"
            })
              .then(response => response.json())
              .then(responseData => {
                console.log("search results", responseData);

                this.setState({
                  country_info: responseData.data[0]
                });
                const url7 =
              `${config.api_base}/enterprised/countries/states?access_token=${user_token}&country_id=254&pageSize=250&status=ACTIVE`;
            fetch(url7, {
              method: "GET"
            })
              .then(response => response.json())
              .then(responseData => {
                console.log("search results", responseData);

                this.setState({
                  state_info: responseData.data
                });
              })
              })
              .catch(error =>
                this.setState({
                  message: "Something bad happened " + error
                })
              );
              const var_value = Math.floor(Math.random() * 90 + 10);
              const restId = config.resid;
              const url_stripe =
              `${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${user_token}`;
            fetch(url_stripe, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            }).then(response => response.json())
                  .then(stripe => {
                    this.setState({
                      stripe_info: stripe.object,
                      is_shop_open: stripe.object.IS_SHOP_OPEN,
                      static_resource_endpoint : stripe.object.STATIC_RESOURCE_ENDPOINT,
                    static_resource_sufix : stripe.object.STATIC_RESOURCE_SUFFIX
                    });
                  }).then(() =>{
                    const restaurant_info_url = `${this.state.static_resource_endpoint}${restId}${this.state.static_resource_sufix}?var=${var_value}`;
                    console.log("restaurant-info", restaurant_info_url);
                    fetch(restaurant_info_url, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                      .then(response => response.json())
                      .then(responseData => {
                        console.log("single res results", responseData);
                        this.setState({
                          banner_info: responseData.object,
                          logo : responseData.object.LOGO,
                          business_data :responseData.object,
                          stripe_key : responseData.object.STRIPE_PUBLISH_KEY
                        });
                      })
                      .catch(error =>
                        this.setState({
                          message: "Something bad happened " + error
                        })
                      );
                  })
            .catch(error =>
              this.setState({
                message: "Something bad happened " + error
              })
            );


              if(localStorage.getItem("user") != null && localStorage.getItem("access_token") != null){
                const get_address =
                `${config.api_base}/users/addresses?access_token=${user_token}&user_id=${user_email}&pageSize=10&pageNumber=0`;
              fetch(get_address, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "key" : config.key_value,
                  "secret" : config.secret_value
                }
              }).then(response => response.json())
                    .then(address => {
                      this.setState({
                        checkout_address_user: address.data
                      });
                    }).then(() =>{
                      if(this.state.checkout_address_user.length > 0){
                        this.setState({
                          selected_address : "Saved Address"
                        })
                      }
                      else{
                        this.setState({
                          selected_address : "New Address"
                        })
                      }
                    })
                .catch(error =>
                  this.setState({
                    message: "Something bad happened " + error
                  })
                );
              }

            })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );

        // const url_coupon_remove =
        //   `${config.api_base}/users/business/bucket/remove_coupon?access_token=${user_token}&user_id=${user_email}`;
        // fetch(url_coupon_remove, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     fields: {
        //       bucketId: this.state.Unique_bucket_Id,
        //       //bucketId: "9f027dc54d6096d5dff07b44e9eb7fcd",
        //       rule: "10% Discount."                                              //"10% Discount."
        //     },
        //     form_id: "",
        //     user_id: user_email
        //   }),
        //   headers: {
        //     "Content-Type": "application/json"
        //   }
        // }).then(response => response.json())
        //       .then(coupon => {
        //         this.setState({
        //           apply_coupon_info: coupon.object
        //         });
        //       })
        //   .catch(error =>
        //     this.setState({
        //       message: "Something bad happened " + error
        //     })
        //   );

        try {
            setInterval(async () => {
              console.log("this.state.merchant_info--",this.state.merchant_info);
             if(this.state.merchant_info != null){
               const url_stripe =
               `${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${this.state.final_user_checkout_token}`;
                 const res = await fetch(url_stripe, {
                   method: "GET",
                   headers: {
                     "Content-Type": "application/json"
                   }
                 });
                 const result = await res.json();
                  const is_shop_open = result && result.object && result.object.IS_SHOP_OPEN ? result.object.IS_SHOP_OPEN : null;

                 this.setState({
                   is_shop_open: is_shop_open
                 })
             }

           }, 150000000);
            console.log("is_shop_open...........",this.state.is_shop_open);
          } catch(e) {
            console.log(e);
          }

      }
      handleFieldaddress = event =>{
        this.setState({
          selected_address : event.target.value
        })
      }
      Tiphandlerchange = event =>{
        this.state.cart_item_tip.map(tip =>{
          const tip_url =
            `${config.api_base}/users/business/bucket/custom_taxrate?access_token=${this.state.final_user_checkout_token}`;
          fetch(tip_url, {
            method: "POST",
            body: JSON.stringify({
              form_id: "",
              user_id: this.state.final_user_checkout_email,
              fields: {
                bucketId: this.state.Unique_bucket_Id,
                taxId: tip.fee_id,
                taxRate: event.target.value
              }
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(response => response.json())
                .then(tip_res => {
                  this.setState({
                    Tip_info: tip_res
                  });
                }).then(()=>{
                  const show_cart= `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_checkout_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_checkout_email}`;

                  fetch(show_cart, {
                    method: "GET",
                    headers: {
                      //Authorization: bearer,
                      "Content-Type": "application/json"
                    }
                  })
                    .then(response => response.json())
                    .then(cartData => {
                      console.log("Second search results", cartData);
                      this.setState({
                        cartdetails_checkout: cartData,
                        cartdetails_item_checkout: cartData.object.items,
                        cart_item_tip : cartData.object.fees,
                        checkout_Delivery_method : cartData.object.available_delivery_methods,
                        checkout_pickup_restaurant : cartData.object.available_pickup_methods,
                        Detailed_cart_checkout_method: cartData.object.available_checkout_methods,
                        loadingData: null
                      });
                    });
                })
            .catch(error =>
              this.setState({
                message: "Something bad happened " + error
              })
            );
        })
      }
      handleSubmit = (ev) => {
  // We don't want to let default form submission happen here, which would refresh the page.
  ev.preventDefault();
  this.setState({
    order_now_click : true
  })
  if (this.props.stripe) {
        this.props.stripe
          .createToken()
          .then((payload) => {
            console.log('[token]', payload)
            if(payload && payload.token && payload.token.id){
          this.setState({payment_complete :true, payment_token: payload.token.id });
        }
        else if(payload && payload.error){
          this.setState({
            stripe_error : payload.error.message,
            order_now_click : false
          })
        }
        });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
};
    render() {
      // if (this.state.checkout_header_info.length == 0) {
      //   return <Redirect to="/" />;
      // }
      const stripe_amount = this.state.cartdetails_checkout.object &&  this.state.cartdetails_checkout.object.total_amount ? ((this.state.cartdetails_checkout.object.total_amount + this.state.checkout_Delivery_cost + this.state.apply_coupon_amount)*100) : 0 ;
      if (this.state.cart_above_data_checkout.length == 0) {
        return <Redirect to="/" />;
      }

      if (Object.keys(this.state.order_info).length>0 && this.state.order_info.request_status == true) {
        return <Redirect to="/thankyou" />;
      }

      if (this.state.payment_complete == true) {
        console.log("submitt..................................................");
        if(this.state.user_address_id != null){
          this.checkoutinfo();
          this.setState({payment_complete: false });
        }
        else if(this.state.user_address_id == null && localStorage.getItem("user") != null && localStorage.getItem("access_token") != null) {
          this.Getinformation();
        this.setState({payment_complete: false });
        }
        else if (localStorage.getItem("user") === null && localStorage.getItem("access_token") === null && this.state.user_address_id === null) {
          this.guestcheckoutinfo();
          this.setState({payment_complete: false });
        }

      }
      console.log("this.state.business_data.MERCHANT_ADD_FEAT_DELIVERY_TIME",this.props.location.checkout_business_data.MERCHANT_ADD_FEAT_DELIVERY_TIME);
     console.log("country",this.state.country_info);
       console.log("state_info",this.state.state_info);
       console.log("checkout_address_user",this.state.checkout_address_user);
       console.log("address id get",this.state.address_info);
       console.log("user_address_id",this.state.user_address_id);
    //   console.log("address_info",this.state.address_info.address_id);
      console.log("cartdetails_checkout_method",this.props.location.cartdetails_checkout_method[0].id);
       console.log(" stripe_info",this.state.stripe_info);
       console.log(" merchant_info",this.state.merchant_info);

       console.log(" order_info",this.state.order_info);
       console.log("apply_coupon_info",this.state.apply_coupon_info);
       console.log(" apply_coupon_state",this.state. apply_coupon_state);
       console.log("apply_coupon_amount",this.state.apply_coupon_amount);
      console.log("stripe key checkout" , this.props.location.stripe_key);
       console.log("Delivery_info",this.state.Delivery_info);
        //console.log("this.state.cartdetails_checkout.object.applied_coupons.length",Object.keys(this.state.cartdetails_checkout.object.applied_coupons).length);
    //   console.log("cart_above_data",this.state.cart_above_data_checkout);
    //   console.log("state",this.state);
       console.log("payment_token",this.state.payment_token);
      const cart_details = this.state.cartdetails_item_checkout && this.state.cartdetails_item_checkout.length > 0   && this.state.is_shop_open == "true" ?
      this.state.cartdetails_item_checkout.map((item,index) =>{
        let totalprice = 0;
            totalprice = item.unit_price * item.qty;
            return(
              <div className="pamout checkout" id="pamut-number" key={index}>
                  <p>{item.itemName}</p>
                    <span>${Number(totalprice, 2).toFixed(2)}</span>
                  <div className="count" id="countted">
                      <div className="handle-counter" id="handleCounter14">
                      {item.addons && item.addons.length > 0 ? (<>
                        <button className="counter-minus" onClick={this.decrementwithAddon.bind(
                          this,
                          item.item_id,
                          item.qty,
                          item.product_id
                        )}>-</button>
                          {item.qty}
                          <button className="counter-plus" onClick={this.incrementwithAddon.bind(
                          this,
                          item.item_id,
                          item.qty,
                          item.product_id
                        )}>+</button></>):(
                          <><button className="counter-minus" onClick={this.decrementNew.bind(
                          this,
                          item.item_id,
                          item.qty,
                          this.state.Unique_bucket_Id
                        )}>-</button>
                          {item.qty}
                          <button className="counter-plus" onClick={this.incrementNew.bind(
                          this,
                          item.item_id,
                          item.qty,
                          this.state.Unique_bucket_Id
                        )}>+</button></>)}
                        </div>
                    </div>
              </div>
            )
      })
      :(
        <div className="Empty-cart pamout checkout text-center" id="pamut-number">
          <h4>Empty cart</h4>
        </div>
      )

      const delivery_content = <Form className="delivery-form" >
      <Form.Label>Delivery</Form.Label>
      <Form.Group controlId="formBasicPickup">

        <Form.Check
            type="radio"
            label="Pickup at Restaurant"
            name="formHorizontalRadios"
            id="Pickup at Restaurant"
            value = {this.state.checkout_pickup_restaurant}
            defaultChecked = {this.state.checkout_Delivery_cost == "0.0" ? true : false}
            onClick={event => this.deliveryhandler(event)}
            //onChange={(evt) => this.changeTitle(evt)}
          />
          <Form.Text className="text-muted cart-text">
              $0
          </Form.Text>
      </Form.Group>
      {this.state.checkout_Delivery_method && this.state.checkout_Delivery_method.length > 0 ? this.state.checkout_Delivery_method.map((checkout_delivery,index) =>{
        return(
          <Form.Group controlId="formBasicPickup">

            <Form.Check
                type="radio"
                label={checkout_delivery.name}
                name="formHorizontalRadios"
                id={checkout_delivery.name}
                value = {checkout_delivery.id}
                defaultChecked = {this.state.checkout_Delivery_cost == checkout_delivery.cost ? true : false}
                onClick={event => this.deliveryhandler(event)}
                //onChange={(evt) => this.changeTitle(evt)}
              />
              <Form.Text className="text-muted checkout-text">
                  ${checkout_delivery.cost}
              </Form.Text>
          </Form.Group>
        );
      }):null}
  </Form>

        return (
            <>
            <CheckoutDataHeader infoheader = {this.state.checkout_header_info} />
            <HeaderTwo  banner_info={this.state.cart_above_data_checkout}
              business_stripe={ this.state.stripe_key}
            Detailed_cart_item= {this.state.cartdetails_item_checkout}
            Detailed_cart= {this.state.cartdetails_checkout}
            Detailed_cart_checkout_method={this.props.location.cartdetails_checkout_method}
            Delivery_method={this.state
              .checkout_Delivery_method}
            pickup_restaurant={this.state
              .checkout_pickup_restaurant}
              Unique_bucket_Id={this.state.Unique_bucket_Id}
              business_data={this.state.business_data}
              Delivery_cost={this.state.checkout_Delivery_cost}/>
            {!this.state.order_loader ? (
            <div className="main1">
                 <div className="container">
                   <div className="main1-wrapper">
                     <div className="row">
                       <div className="col-lg-4 col-md-4 left-panel checkout-main-left-sidebar">
                           <div className="row checkout-cart-banner">
                           <div className="col-md-3">
                             <div className="top-right-logo">
                               <img src={this.state.cart_above_data_checkout.BANNER} />
                             </div>
                           </div>
                           <div className="col-md-9">
                             <h5>{this.state.cart_above_data_checkout.name}</h5>
                             <p>{this.state.cart_above_data_checkout.city}</p>
                           </div>
                         </div>


                         <div className="row main-checkout-row">
                           {cart_details}
                           <div className ="row cart-below-form">
                            {delivery_content}
                          </div>
                         </div>
                         <div className="row Apply-Coupon">
                           <div className="Apply-Coupon-field">
                             <div className="Apply-Coupon-icon">
                               <img src="img/sales-coupon.png" />
                             </div>
                             <div className="Apply-Coupon-input">
                               {this.state.cartdetails_checkout ? this.state.cartdetails_checkout.object && this.state.cartdetails_checkout.object.applied_coupons ? Object.keys(this.state.cartdetails_checkout.object.applied_coupons).length === 0 ?
                                 (<><input type="text" name="ApplyCoupon" placeholder="Apply Coupon" value = {this.state.apply_coupoon} onChange = {e => this.handlerApplyCouponState(e)}/><button type="button" class="btn btn-secondary" onClick = {this.handlerApplyCoupon}>Apply</button></>)
                                 :
                                 (<><span className = "Applied-coupon">Applied Coupon - {Object.keys(this.state.cartdetails_checkout.object.applied_coupons)[0]}</span><input type="hidden" name="ApplyCoupon" placeholder="Apply Coupon" value = {Object.keys(this.state.cartdetails_checkout.object.applied_coupons)[0]} onChange = {e => this.handlerApplyCouponState(e)}/><button type="button" class="btn btn-secondary remove-btun" onClick = {this.handlerRemoveCoupon}>Remove</button></>)
                                 :null:null
                               }

                             </div>

                              {this.state.apply_coupon_state == false || this.state.remove_coupon_status == true ? null
                                 : (<div>
                                   <span className = "Coupon-Applied">Coupon Applied Successfully</span>
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
                           {this.state.cartdetails_checkout.object  ?
                                (
                           <div className="col-md-12">
                             <ul>
                                <li>
                                 Item total
                                 <span>{this.state.cartdetails_checkout.object.sub_total ? (<>${Number(
                                  this.state.cartdetails_checkout.object.sub_total,
                                  2
                                ).toFixed(2)}</>) : "$0"}</span>
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
                             {this.state.cartdetails_checkout && this.state.cartdetails_checkout.object && this.state.cartdetails_checkout.object.taxes ? this.state.cartdetails_checkout.object.taxes.map((taxes,index) =>(
                             <li>
                               {taxes.name}
                               <span><>
                                 {" "}
                                 $
                                 {Number(
                                  taxes.amount,
                                   2
                                 ).toFixed(2)}
                               </></span>
                             </li>
                           )

                         ) :null }
                               <li>
                                 Tip
                                 <span><select onChange={this.Tiphandlerchange}  className="form-control" id="tip-select-checkout">
                                 {this.state.cart_item_tip && this.state.cart_item_tip.length > 0 ? (
                                   this.state.checkout_tip_rate_fees.map((item, index) => {
                                     const fee_id = this.state.cart_item_tip[0].fee_id;
                                     const fee_rate = this.state.cart_item_tip[0].rate;
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

                                   })
                                 ) : (
                                   <option value="0">0%</option>
                                 )}
                                 </select></span>
                               </li>
                               <hr />
                               <li>
                                  Tip Amount
                                  <span>${this.state.cart_item_tip && this.state.cart_item_tip[0] ? this.state.cart_item_tip[0].amount: "0"}</span>
                               </li>
                               <hr />
                               {this.state.cartdetails_checkout && this.state.cartdetails_checkout.object && this.state.cartdetails_checkout.object.additional_fees ? this.state.cartdetails_checkout.object.additional_fees.map((additional_fee,index) =>(
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

                             ) :null }
                               {this.state.cartdetails_checkout.object.applied_coupons && Object.keys(this.state.cartdetails_checkout.object.applied_coupons).length > 0 ? (
                                <>
                                 <li>
                                    Applied Coupon
                                    <span>{Object.keys(this.state.cartdetails_checkout.object.applied_coupons)[0]}</span>
                                 </li>
                                 <hr />
                                 <li>
                                    Coupon Discount
                                    <span>${Object.values(this.state.cartdetails_checkout.object.applied_coupons)[0]}</span>
                                 </li>
                                 <hr />
                                 </>
                               ) : null}
                               <li>
                                 Delivery Fee
                                 <span>${this.state.checkout_Delivery_method && this.state.checkout_Delivery_method.length > 0 ? this.state.checkout_Delivery_cost : 0}</span>
                               </li>
                               <hr />
                               <li>
                                 TO PAY
                                  <span>{this.state.cartdetails_checkout.object.total_amount ? (<>${Number(this.state.cartdetails_checkout.object.total_amount + this.state.checkout_Delivery_cost + this.state.apply_coupon_amount,2).toFixed(2)}</>) : "$0"}</span>
                               </li>
                             </ul>

                           </div>
                           ):null
                          }
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
                               <h2 className = "inner">Your Order Details</h2>

                               {this.state.selected_address != '' && this.state.selected_address == "Saved Address" || this.state.selected_address == "New Address" ? (
                                 <Form.Row>
                                 <Form.Group as={Col} controlId="formBasicTelephone">
                                 <Form.Check
                                      type="radio"
                                      label="New Address"
                                      name="formHorizontalRadios"
                                      id="formHorizontalRadios1"
                                      defaultChecked ={this.state.selected_address == "New Address" ? true : false}
                                      Value = "New Address"
                                      onChange = {e => this.handleFieldaddress(e)}
                                    />
                                 </Form.Group>
                                 <Form.Group as={Col} controlId="formBasicEmail">
                                 <Form.Check
                                      type="radio"
                                      label="Saved Address"
                                      name="formHorizontalRadios"
                                      id="formHorizontalRadios1"
                                      defaultChecked ={this.state.selected_address == "Saved Address" ? true : false}
                                      value = "Saved Address"
                                      onChange = {e => this.handleFieldaddress(e)}
                                    />
                                 </Form.Group>
                                 </Form.Row>
                               ):null}

                               {this.state.selected_address == '' ||  this.state.selected_address == "New Address" ?(<>
                                 <Form className="Loc-form"  id="AddressForm" >
                                 <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicfname">
                                      <Form.Label>First Name</Form.Label>
                                      <Form.Control type="text" placeholder="First Name" value = {this.state.first_name} onChange = {e => this.handleFieldChange('first_name', e)} onBlur = {e => this.handleFirstNameChange('first_name', e)} required/>
                                        {this.state.firstname_error ? (<span className ="phone-error">*Please enter alphabet characters only.</span>) : null}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasiclname">
                                      <Form.Label>Last Name</Form.Label>
                                      <Form.Control type="text" placeholder="Last Name" value = {this.state.last_name} onChange = {e => this.handleFieldChange('last_name', e)} onBlur = {e => this.handleLastNameChange('last_name', e)} required/>
                                        {this.state.lastname_error ? (<span className ="phone-error">*Please enter alphabet characters only.</span>) : null}
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicTelephone">

                                      <Form.Label>Telephone/mobile</Form.Label>
                                        <Form.Control type="number" pattern="[0-9]*"  placeholder="Telephone/mobile"   value = {this.state.telephone} onChange = {e => this.handleFieldChange('telephone', e)} onBlur = {e => this.handlePhoneChange('telephone', e)} required/>
                                        {this.state.phone_error ? (<span className ="phone-error">Phone Number must be 10 digits</span>) : null}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                      <Form.Label>Email address</Form.Label>
                                      <Form.Control type="email" placeholder="Enter email" value = {this.state.email} onChange = {e => this.handleFieldChange('email', e)} onBlur = {e => this.handleEmailChange('email', e)} required/>
                                      {this.state.email_error ? (<span className ="phone-error">Please enter valid email</span>) : null}
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="formBasicaddress">
                                      <Form.Label>Your full address</Form.Label>
                                      <Form.Control type="text" placeholder="Your full address" value = {this.state.address} onChange = {e => this.handleFieldChange('address', e)} required/>
                                    </Form.Group>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicCity">
                                      <Form.Label>City</Form.Label>
                                      <Form.Control type="text" placeholder="City" value = {this.state.city} onChange = {e => this.handleFieldChange('city', e)} required/>
                                    </Form.Group>
                                    <Form.Group  as={Col} controlId="formBasicPostalcode">
                                      <Form.Label>Postal code</Form.Label>
                                      <Form.Control type="text" pattern="[0-9]*" placeholder="Postal code"  value = {this.state.postal_code} onChange = {e => this.handleFieldChange('postal_code', e)} onBlur = {e => this.handlePostalCodeChange('postal_code', e)} required/>
                                      {this.state.postal_code_error ? (<span className ="phone-error">Postal code must be in between 5 digits to 10 digits</span>) : null}
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="State">
                                      <Form.Label>State</Form.Label>
                                      <Form.Control as="select"  onChange = {e => this.handleFieldChange('state', e)} required>
                                        {this.state.state_info && this.state.state_info.length > 0 ? this.state.state_info.map((statedata,index) =>
                                         (
                                          <option value = {statedata.id } key = {index}>{statedata.name}</option>
                                        )
                                        ):null}

                                      </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="Country">
                                      <Form.Label>Country</Form.Label>
                                      <Form.Control as="select"  onChange = {e => this.handleFieldChange('country', e)} required>
                                        <option value ={this.state.country_info.id}>{this.state.country_info.name}</option>

                                      </Form.Control>
                                    </Form.Group>
                                    </Form.Row>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Notes for the restaurant</Form.Label>
                                        <Form.Control as="textarea" rows="3" value = {this.state.notes_restaurant} onChange = {e => this.handleFieldChange('notes_restaurant', e)}/>
                                    </Form.Group>
                                    {/* <Form.Row className="radio-checkout-form-row">
                                    <Form.Group as={Col} controlId="formBasicCity" className="radio-checkout-form-btn">
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        id="formHorizontalRadios1"

                                      />
                                      <span className="checkmark"><span><img src="img/home-icon.png" /></span>Home</span>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasicCity" className="radio-checkout-form-btn">
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        id="formHorizontalRadios1"

                                      />
                                      <span className="checkmark"><span><img src="img/work-icon.png" /></span>Work</span>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasicCity" className="radio-checkout-form-btn">
                                    <Form.Check
                                        type="radio"
                                        name="radio"
                                        id="formHorizontalRadios1"

                                      />
                                       <span className="checkmark"><span><img src="img/other-icon.png" /></span>Other</span>
                                    </Form.Group>
                                    </Form.Row> */}

                                  </Form>
                                   {/* <form className="Loc-form">
                                     <input type="text" name="address" placeholder="Address" />
                                     <input type="text" name="address" placeholder="Address" />
                                     <input type="text" name="address" placeholder="Address" />
                                     <div className="row radio-checkout-form-row">
                                       <div className="col-md-4">
                                         <label className="radio-checkout-form-btn">
                                           <input type="radio" name="radio" />
                                           <span className="checkmark"><span><img src="img/home-icon.png" /></span>Home</span>
                                         </label>
                                       </div>
                                       <div className="col-md-4">
                                         <label className="radio-checkout-form-btn">
                                           <input type="radio" name="radio" />
                                           <span className="checkmark"><span><img src="img/work-icon.png" /></span>Work</span>
                                         </label>
                                       </div>
                                       <div className="col-md-4">
                                         <label className="radio-checkout-form-btn">
                                           <input type="radio" name="radio" />
                                           <span className="checkmark"><span><img src="img/other-icon.png" /></span>Other</span>
                                         </label>
                                       </div>
                                     </div>
                                     <StripeCheckout
                                        amount="500"
                                        //billingAddress
                                        description="Awesome Product"
                                        locale="auto"
                                        name="YourDomain.tld"
                                        stripeKey="pk_test_iCB3R1msXLGshPKxWjL6wIu5007ezXC0PW"
                                        token={this.onToken}
                                        zipCode
                                        label="SAVE ADDRESS &amp; PROCEED"
                                        className="Loc-form-btn"
                                    />  */}
                                     {/* <button className="Loc-form-btn" type="submit">SAVE ADDRESS &amp; PROCEED</button> */}
                                    {/* </form> */}
                                    {this.state.is_shop_open === "true" || this.state.is_shop_open === "True" ?  stripe_amount != 0 ?  this.state.first_name != "" &&
                                  this.state.last_name != "" &&
                                  this.state.telephone != "" &&
                                  this.state.telephone.length == 10 &&
                                  this.state.email_error === false &&
                                  this.state.firstname_error === false &&
                                  this.state.lastname_error === false &&
                                  this.state.address != "" &&
                                  this.state.city != "" &&
                                  this.state.postal_code !="" &&
                                  this.state.postal_code.length >= 5 &&
                                  this.state.postal_code.length <= 10 &&
                                  this.state.state != "" &&
                                  this.state.country != ""  ?
                                  (
                                    <>
                                <div>
                                {this.state.stripe_error != null ? (<span className="stripe-error">{this.state.stripe_error}</span>) : null}
                               {this.state.checkout_error != null ? (<span className="stripe-error">{this.state.checkout_error}</span>) : null}
                                  <CardSection />
                                </div>
                                <button
                                    disabled = {this.state.order_now_click ? true : false}
                                    className="Loc-form-btn"
                                    onClick = {this.handleSubmit}
                                  ><span>ORDER NOW</span></button>
                                </>):(<button
                                      type="submit"
                                      form="AddressForm"
                                      className="StripeCheckout Loc-form-btn"
                                      value="submit"
                                      disabled = {this.state.phone_error || this.state.postal_code_error || this.state.email_error  || this.state.firstname_error || this.state.lastname_error ? true : false}
                                    >  <span>ORDER NOW</span>
                                    </button>) : (<button
                                      disabled = {!this.state.cart_empty_click}
                                      className="StripeCheckout Loc-form-btn"
                                      onClick={this.cartemptyhandler}
                                    >  <span>ORDER NOW</span>
                                    </button>):(<button
                                      className="StripeCheckout Loc-form-btn"
                                      onClick={this.shopclosedhandler}
                                    >  <span>ORDER NOW</span>
                                    </button>)}
                                 </>):this.state.selected_address != '' && this.state.selected_address == "Saved Address" ? ( <>
                                   {this.state.checkout_address_user && this.state.checkout_address_user.length > 0 ? this.state.checkout_address_user.map(address =>{
                                   return (<div className="address-box">
                                   <input type="radio" name="gender" onClick = {e => this.selectedaddress(e)} value={address.address_id}/>
                                      <ul className ="saved-address-data">
                                        <li>{address.firstName}{address.lastName}<i class="fas fa-address-book"></i></li>
                                        <li>address1</li>
                                        <li>{address.address1}</li>
                                        <li>{address.postalCode}</li>
                                        <li>{address.mobileNumber}</li>
                                      </ul>

                                   </div>
                                 )
                                      }):null
                                      }
                                      {this.state.is_shop_open === "true" || this.state.is_shop_open === "True" ? stripe_amount != 0 ? (
                                        <>
                                  <div>
                                  {this.state.stripe_error != null ? (<span className="stripe-error">{this.state.stripe_error}</span>) : null}
                                 {this.state.checkout_error != null ? (<span className="stripe-error">{this.state.checkout_error}</span>) : null}
                                    <CardSection />
                                  </div>
                                  <button
                                      disabled = {this.state.order_now_click ? true : false}
                                      className="Loc-form-btn"
                                      onClick = {this.handleSubmit}
                                    ><span>ORDER NOW</span></button>
                                  </>
                                    ) : (
                                      <button
                                        disabled = {!this.state.cart_empty_click}
                                        className="StripeCheckout Loc-form-btn"
                                        onClick={this.cartemptyhandler}
                                      >  <span>ORDER NOW</span>
                                      </button>
                                    ):(<button
                                        className="StripeCheckout Loc-form-btn"
                                        onClick={this.shopclosedhandler}
                                      >  <span>ORDER NOW</span>
                                      </button>)}
                                   </>) : null }
                                   <div className="back-to-menu text-center">
                                    <Link
                                      to={{
                                        pathname: "/",
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
                                 <p><span>Delivery :</span> Order will be delivered within {this.state.business_data.MERCHANT_ADD_FEAT_DELIVERY_TIME}.</p>

                               <p><span>Pickup :</span> Order will be ready within {this.state.business_data.MERCHANT_ADD_FEAT_PICKUP_TIME} to pickup.</p>
                               <hr></hr>
                               <div className="row">
                                <div className="col-md-9 secure-payment">
                                  <h6>Secure payment</h6>
                                </div>
                                <div className="col-md-2 credit-icon">
                                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                                </div>
                                <div className="col-md-3"></div>
                               </div>


                               <img src="img/ssl.png" /><p className="secure-content">All payments is 256 bits encrypted.</p>

                                </div>
                                <div className="Help-box">
                                <a href="/contact-us"><i className="fa fa-life-ring" aria-hidden="true"></i></a>
                                <a href="/contact-us"><h4>Need Help?</h4></a>
                                {
                                  // <p>+13034422500</p>
                                }
                                </div>
                             </div>
                             <div className="col-md-6">

                             </div>

                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
     </div>):(
       <div className="main1">
         <div className="main-contant load">
          <img className = "loader" src="/img/menu-loader.gif" />
         </div>
         </div>
     )}


            <Footer banner_info={this.state.banner_info} />
            <Modal show={this.state.showmodal_cart_empty} id="modal3" size="sm">
              <Modal.Body>Cart is empty.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleclosecartempty}>
                  ok
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.coupon_error_modal} id="modal3" size="sm">
              <Modal.Body>{this.state.coupon_error === "INVALID COUPON" || this.state.coupon_error === "INVALID RULE"  ? (<>INVALID COUPON</>) : null}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleclosecoupon}>
                  ok
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.showmodal_shop_closed} id="modal3" size="sm">
            <Modal.Body>Shop is Closed.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handlecloseShopClosed}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
            </>
        )
    }
}

export default injectStripe(Checkout);
