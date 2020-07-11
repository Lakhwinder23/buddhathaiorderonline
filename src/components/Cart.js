import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import HeaderTwo from "./HeaderTwo";
import Footer from "./Footer";
import Modal from "react-bootstrap/Modal";
import {config} from '../config';
import { Button, Container, Row, Col } from "react-bootstrap";
export default class Cart extends Component {
  constructor(props){
    super(props);
    this.state ={
      restaurantDataHeaderinfo : this.props.location && this.props.location.cartinfodata
      ? this.props.location.cartinfodata
      : [],
      banner_info : this.props.location && this.props.location.cart_cart_above_data ?
      this.props.location.cart_cart_above_data : [],
      business_stripe:this.props.location && this.props.location.cart_stripe_key ? this.props.location.cart_stripe_key : null,
       Detailed_cart : this.props.location && this.props.location.cartdetails && this.props.location.cartdetails.length > 0 ? this.props.location.cartdetails : [],
       Detailed_cart_item : this.props.location && this.props.location.cartdetails_item && this.props.location.cartdetails_item.length > 0 ? this.props.location.cartdetails_item: [],
       Detailed_cart_checkout_method : this.props.location && this.props.location.cartdetails_checkout_method && this.props.location.cartdetails_checkout_method.length > 0 ? this.props.location.cartdetails_checkout_method: [],
       Delivery_method : this.props.location && this.props.location.cart_Delivery_method && this.props.location.cart_Delivery_method.length > 0 ? this.props.location.cart_Delivery_method: [],
       pickup_restaurant : this.props.location && this.props.location.cart_pickup_restaurant && this.props.location.cart_pickup_restaurant.length > 0 ? this.props.location.cart_pickup_restaurant: [],
       Unique_bucket_Id : this.props.location && this.props.location.bucket_id && this.props.location.cart_pickup_restaurant.length > 0 ? this.props.location.bucket_id: null,
       final_user_email : '',
       final_user_token : '',
       delivery_choose : false,
       delivery_click : true,
       showmodaldelivery: false,
       cart_merchant_token : null,
       tip_fees: "",
       business_data: this.props.location && this.props.location.cart_business_data ? this.props.location.cart_business_data: [],
       Delivery_cost: this.props.location && this.props.location.cart_Delivery_cost ? this.props.location.cart_Delivery_cost: 0

    }
    this.decrementwithAddon = this.decrementwithAddon.bind(this);
    this.incrementwithAddon = this.incrementwithAddon.bind(this);
    this.incrementNew = this.incrementNew.bind(this);
    this.decrementNew = this.decrementNew.bind(this);
  }
  componentDidMount(){
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
            cart_merchant_token: merchant.object.access_token
          });
        }).then(() =>{
          const user_email =
            localStorage.getItem("user") === null
              ? "guest@onlinebites.com"
              : localStorage.getItem("user");
          const user_token =
            localStorage.getItem("access_token") === null
              ? this.state.cart_merchant_token
              : localStorage.getItem("access_token");

              const user_local_bucket_id = localStorage.getItem("user_local_bucket_id") === null
                ? null
                : localStorage.getItem("user_local_bucket_id");
              this.setState({
                final_user_email: user_email,
                final_user_token: user_token
              });
              const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${user_token}&bucket_id=${user_local_bucket_id}&user_id=${user_email}`;
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
                    Detailed_cart: cartData,
                    Detailed_cart_item: cartData.object.items,
                    cart_item_tip: cartData.object.fees,
                    Detailed_cart_checkout_method:
                      cartData.object.available_checkout_methods,
                    Delivery_method: cartData.object.available_delivery_methods,
                    pickup_restaurant: cartData.object.available_pickup_methods,
                    Unique_bucket_Id :user_local_bucket_id
                  });
                })
                .catch(error =>
                  this.setState({
                    message: "Something bad happened " + error
                  })
                );
                const bearer = "Bearer " + user_token;
                const url_info =
                `${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${user_token}`;
              fetch(url_info, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(response => response.json())
                    .then(stripe => {
                      this.setState({
                        tip_fees:stripe.object.FEES
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

      }
  incrementwithAddon(value1, value2, value3) {
    this.setState({
      loadingData: value3
    });
    console.log("repeat_last_value3", value2);
    this.setState({
      show: false,
      selected_product_modal: [],
      showmodal2: false
    });
    const bearer = "Bearer" + this.state.final_user_token;
    const url4 = `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: this.state.Unique_bucket_Id,
          bucketItemId: value1,
          quantity: value2 + 1
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("search results", responseData);
        const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
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
              Detailed_cart: cartData,
              Detailed_cart_item: cartData.object.items,
              cart_item_tip: cartData.object.fees,
              Detailed_cart_checkout_method:
                cartData.object.available_checkout_methods,
              Delivery_method: cartData.object.available_delivery_methods,
              pickup_restaurant: cartData.object.available_pickup_methods,
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
    this.setState({
      show: false,
      selected_product_modal: [],
      showmodal2: false
    });
    const bearer = "Bearer" + this.state.final_user_token;
    const url4 = `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: this.state.Unique_bucket_Id,
          bucketItemId: value1,
          quantity: value2 - 1
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
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
        console.log("search results", responseData);
        const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
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
              Detailed_cart: cartData,
              Detailed_cart_item: cartData.object.items,
              cart_item_tip: cartData.object.fees,
              Detailed_cart_checkout_method:
                cartData.object.available_checkout_methods,
              Delivery_method: cartData.object.available_delivery_methods,
              pickup_restaurant: cartData.object.available_pickup_methods,
              loadingData: null
            });
          })
          .then(() => {
            if (this.state.Detailed_cart.object.error == "Invalid Bucket") {
              this.setState({
                Unique_bucket_Id: ""
              });
            }
          });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
  }

  decrementNew(value1, value2, value3, value4) {
    this.setState({
      loadingData: value4
    });
    console.log("increment id", this.state.bucket_id);
    const bearer = "Bearer" + this.state.final_user_token;
    const url4 = `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_token}&bucket_id=${value3}&user_id=${this.state.final_user_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: value3,
          bucketItemId: value1,
          quantity: value2 - 1
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
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
        const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
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
              Detailed_cart: cartData,
              Detailed_cart_item: cartData.object.items,
              cart_item_tip: cartData.object.fees,
              Detailed_cart_checkout_method:
                cartData.object.available_checkout_methods,
              Delivery_method: cartData.object.available_delivery_methods,
              pickup_restaurant: cartData.object.available_pickup_methods,
              loadingData: null
            });
          })
          .then(() => {
            if (this.state.Detailed_cart.object.error == "Invalid Bucket") {
              this.setState({
                Unique_bucket_Id: ""
              });
            }
          });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
  }


  incrementNew(value1, value2, value3, value4) {
    this.setState({
      loadingData: value4
    });
    console.log("increment id", this.state.bucket_id);
    const bearer = "Bearer" + this.state.final_user_token;
    const url4 = `${config.api_base}/users/business/bucket/update/item/qty?access_token=${this.state.final_user_token}&bucket_id=${value3}&user_id=${this.state.final_user_email}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: value3,
          bucketItemId: value1,
          quantity: value2 + 1
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
        //console.log("search results", responseData);
        this.setState({
          test_cart: responseData,
          quantity: responseData.object.quantity
        });
        fetch(url5, {
          method: "GET",
          headers: {
            // Authorization: bearer,
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(cartData => {
            console.log("Second search results", cartData);
            this.setState({
              Detailed_cart: cartData,
              Detailed_cart_item: cartData.object.items,
              cart_item_tip: cartData.object.fees,
              Detailed_cart_checkout_method:
                cartData.object.available_checkout_methods,
              Delivery_method: cartData.object.available_delivery_methods,
              pickup_restaurant: cartData.object.available_pickup_methods,
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

  Tiphandlerchange = event => {
    this.state.cart_item_tip
      .map(tip => {
        const tip_url = `${config.api_base}/users/business/bucket/custom_taxrate?access_token=${this.state.final_user_token}`;
        fetch(tip_url, {
          method: "POST",
          body: JSON.stringify({
            form_id: "",
            user_id: this.state.final_user_email,
            fields: {
              bucketId: this.state.Unique_bucket_Id,
              taxId: tip.fee_id,
              taxRate: event.target.value
            }
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(tip_res => {
            this.setState({
              Tip_info: tip_res
            });
          })
          .then(() => {
            const cart_show = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
            fetch(cart_show, {
              method: "GET",
              headers: {
                //Authorization: bearer,
                "Content-Type": "application/json"
              }
            })
              .then(response => response.json())
              .then(cartData => {
                this.setState({
                  Detailed_cart: cartData,
                  Detailed_cart_item: cartData.object.items,
                  cart_item_tip: cartData.object.fees,
                  Detailed_cart_checkout_method:
                    cartData.object.available_checkout_methods,
                  Delivery_method: cartData.object.available_delivery_methods,
                  pickup_restaurant: cartData.object.available_pickup_methods
                });
              });
          })
          .catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      });
  };

  deliveryhandler = event => {
    this.setState({
      delivery_click: false
    });
    const url4 = `${config.api_base}/users/business/bucket/update_shipping_method?access_token=${this.state.final_user_token}`;
    fetch(url4, {
      method: "POST",
      body: JSON.stringify({
        form_id: "",
        user_id: this.state.final_user_email,
        fields: {
          bucketId: this.state.Unique_bucket_Id,
          shippingId: event.target.value
        }
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(delivery => {
        this.setState({
          Delivery_info: delivery.object
        });
      })
      .then(() => {
        this.setState({
          Delivery_cost: this.state.Delivery_info.cost,
          delivery_choose: true,
          delivery_click: true
        });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
  };

  deliverChooseHandle = () => {
    this.setState({
      showmodaldelivery: true
    });
  };
  handleclosedelivery = () => {
    this.setState({
      showmodaldelivery: false
    });
  };
    render() {
        console.log("cart_business_data",this.props.location.cart_business_data);
      const loaderDiv = (
        <div className="cartLoader">
          <img src="/img/spinner.gif" />
        </div>
      );
      //const tip_rate_fees = this.state.business_data.split("|");
      const tip_rate_fees = this.state.tip_fees != '' ? this.state.tip_fees.split("|") : null;
      const delivery_content = (
        <Form className="delivery-form">
          <Form.Label>Delivery</Form.Label>
          <Form.Group controlId="formBasicPickup">
            <Form.Check
              type="radio"
              label="Pickup at Restaurant"
              name="formHorizontalRadios"
              id="Pickup at Restaurant"
              value={this.state.pickup_restaurant}
              onClick={event => this.deliveryhandler(event)}
              //onChange={(evt) => this.changeTitle(evt)}
            />
            <Form.Text className="text-muted cart-text">$0</Form.Text>
          </Form.Group>
          {this.state.Delivery_method && this.state.Delivery_method.length > 0
            ? this.state.Delivery_method.map((delivery, index) => {
                return (
                  <Form.Group controlId="formBasicPickup">
                    <Form.Check
                      type="radio"
                      label={delivery.name}
                      name="formHorizontalRadios"
                      id={delivery.name}
                      value={delivery.id}
                      onClick={event => this.deliveryhandler(event)}
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
      const cart =
        this.state.Detailed_cart_item && this.state.Detailed_cart_item.length > 0
          ? this.state.Detailed_cart_item.map((item, index) => {
              let totalprice = 0;
              let addons = [];
              totalprice = item.unit_price * item.qty;
              const showLoader =
                this.state.loadingData &&
                this.state.loadingData == item.product_id
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
                              onClick={this.decrementwithAddon.bind(
                                this,
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
                              onClick={this.incrementwithAddon.bind(
                                this,
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
                              onClick={this.decrementNew.bind(
                                this,
                                item.item_id,
                                item.qty,
                                this.state.Unique_bucket_Id,
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
                              onClick={this.incrementNew.bind(
                                this,
                                item.item_id,
                                item.qty,
                                this.state.Unique_bucket_Id,
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
        return (
          <>
          <HeaderTwo  banner_info={this.state.banner_info}
            business_stripe={ this.state.business_stripe}
          Detailed_cart_item= {this.state.Detailed_cart_item}
          Detailed_cart= {this.state.Detailed_cart}
          Detailed_cart_checkout_method={this.state.Detailed_cart_checkout_method}
          Delivery_method={this.state
            .Delivery_method}
          pickup_restaurant={this.state
            .pickup_restaurant}
            Unique_bucket_Id={this.state.Unique_bucket_Id}
            business_data={this.state.business_data}
            Delivery_cost={this.state.Delivery_cost}/>
          <div className="row">
          <div className="col-lg-4 col-md-4">
          </div>
          <div className="col-lg-3 col-md-4 mobile-cart">
            {this.state.Detailed_cart &&
            this.state.Detailed_cart.object ? (
              <div className="cart">
                <h2>Cart</h2>
                {this.state.Detailed_cart.object.total_amount ? (
                  <>
                    <div className="corn">{cart}</div>
                    <div className="row cart-below">
                      <div className="col-md-6">
                        <h6>Subtotal</h6>
                        {this.state.Detailed_cart && this.state.Detailed_cart.object && this.state.Detailed_cart.object.taxes ? this.state.Detailed_cart.object.taxes.map((taxes_name,index) =>(
                                <h6>{taxes_name.name}</h6>
                              )

                            ) :null }
                        <h6>Tip</h6>
                        <h6 className = "Tip-Amount-text">Tip Amount</h6>
                        {this.state.Detailed_cart && this.state.Detailed_cart.object && this.state.Detailed_cart.object.additional_fees ? this.state.Detailed_cart.object.additional_fees.map((additional_fee_name,index) =>(
                              <h6>{additional_fee_name.name}</h6>
                            )

                          ) :null }
                        <h6>Delivery Fees</h6>
                        <h6>Total</h6>
                      </div>
                      <div className="col-md-6">
                        <h6>
                          $
                          {Number(
                            this.state.Detailed_cart.object.sub_total,
                            2
                          ).toFixed(2)}
                        </h6>
                        {this.state.Detailed_cart && this.state.Detailed_cart.object && this.state.Detailed_cart.object.taxes ? this.state.Detailed_cart.object.taxes.map((taxes_amount,index) =>(
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
                            onChange={this.Tiphandlerchange}
                            className="form-control"
                            id="tip-select"
                          >
                            {this.state.cart_item_tip.length > 0 ? (

                              tip_rate_fees != null && tip_rate_fees.length > 0 ? tip_rate_fees.map((item, index) => {
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

                              }): null
                            ) : (
                              <option value="0">0%</option>
                            )}
                          </select>

                        </h6>
                        <h6>
                        ${this.state.cart_item_tip[0] ? this.state.cart_item_tip[0].amount: "0" }
                      </h6>
                      {this.state.Detailed_cart && this.state.Detailed_cart.object && this.state.Detailed_cart.object.additional_fees ? this.state.Detailed_cart.object.additional_fees.map((additional_fee_amount,index) =>(
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
                          {this.state.Delivery_cost == 0
                            ? "0"
                            : this.state.Delivery_cost}
                        </h6>
                        <h6>
                          $
                          {this.state.Delivery_cost == 0
                            ? Number(
                                this.state.Detailed_cart.object
                                  .total_amount,
                                2
                              ).toFixed(2)
                            : Number(
                                this.state.Detailed_cart.object
                                  .total_amount +
                                  this.state.Delivery_cost,
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
                      {this.state.delivery_choose == true ? (
                        <div className="checkout text-center">
                          <Link
                            to={{
                              pathname: "/checkout",
                              checkoutinfodata: this.state
                                .restaurantDataHeaderinfo,
                              checkout_cart_item_tip: this.state
                                .cart_item_tip,
                                tip_rate_fees : tip_rate_fees,
                              cartdetails_checkout_method: this.state
                                .Detailed_cart_checkout_method,
                              cartdetails_item: this.state
                                .Detailed_cart_item,
                              cartdetails: this.state.Detailed_cart,
                              cart_above_data: this.state.banner_info,
                              Delivery_method: this.state
                                .Delivery_method,
                              pickup_restaurant: this.state
                                .pickup_restaurant,
                              bucket_id: this.state.Unique_bucket_Id,
                              final_user_email: this.state
                                .final_user_email,
                              Delivery_cost: this.state.Delivery_cost,
                              final_user_token: this.state
                                .final_user_token,
                              stripe_key: this.state.business_stripe,
                              checkout_business_data:this.state.business_data,
                              tip_rate: this.state.tip_rate
                            }}
                          >
                            Checkout
                          </Link>
                        </div>
                      ) : (
                        <div className="checkout text-center">
                          <button
                            onClick={this.deliverChooseHandle}
                            disabled = {!this.state.delivery_click}
                            className="deliverymsg"
                          >
                            Checkout
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
          <Footer banner_info={this.state.banner_info}/>
          <Modal show={this.state.showmodaldelivery} id="modal3" size="sm">
            <Modal.Body>Please select a delivery method.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleclosedelivery}>
                ok
              </Button>
            </Modal.Footer>
          </Modal>
          </>

        )
    }
}
