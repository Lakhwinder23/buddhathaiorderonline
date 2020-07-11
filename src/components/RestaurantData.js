import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Container, Row, Col } from "react-bootstrap";
import HeaderTwo from "./HeaderTwo";
import Banner from "./Banner";
import Footer from "./Footer";
import RestaurantDataHeader from "./RestaurantDataHeader";
import {config} from '../config';
import { Redirect } from "react-router-dom";
import ScrollableAnchor from "react-scrollable-anchor";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
class RestaurantData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantsdata: [],
      cartitems: [],
      cartquantity: [],
      show: false,
      addshow: false,
      delivery_choose: false,
      selected_product_modal: [],
      modal_price: [],
      checkboxstate: false,
      current_addon_total: 0,
      current_product_id: null,
      current_addons_id: null,
      addon_cart_item_id: 0,
      user_email: null,
      user_token: null,
      final_user_email: "",
      final_user_token: "",
      showmodal2: false,
      random: null,
      current_product_token: null,
      current_addonsitem: [],
      current_addongroups: [],
      current_selected_addons_array: [],
      current_tokens_group: [],
      restaurantDataHeaderinfo:
        this.props.location && this.props.location.infodata
          ? this.props.location.infodata
          : [],
      banner_info:
        this.props.location && this.props.location.restaurantinfo
          ? this.props.location.restaurantinfo
          : [],
      business_data:
        this.props.location && this.props.location.restaurantinfo
          ? this.props.location.restaurantinfo
          : null,
      business_stripe:
        this.props.location &&
        this.props.location.restaurantinfo &&
        this.props.location.restaurantinfo.business
          ? this.props.location.restaurantinfo.business.STRIPE_PUBLISHABLE_KEY
          : null,
      tip_rate:
        this.props.location &&
        this.props.location.restaurantinfo &&
        this.props.location.restaurantinfo.business
          ? this.props.location.restaurantinfo.business.FEES
          : null,
      menu_url:
        this.props.location && this.props.location.menuinfo
          ? this.props.location.menuinfo
          : null,
      menu_products: [],
      test_cart: [],
      test_cart_object: [],
      final_addon_array: [],
      radio_final_addon_array: null,
      select_final_addon_array: null,
      bucket_id: "",
      quantity: "",
      Detailed_cart: [],
      cart_item_tip: [],
      Tip_info: [],
      Detailed_cart_item: [],
      Detailed_cart_addons: [],
      Detailed_cart_checkout_method: [],
      Delivery_info: [],
      Delivery_method: [],
      pickup_restaurant: "",
      Delivery_cost: 0,
      cart_subtotal: "",
      cart_taxes: [],
      cart_total: "",
      loadingData: null,
      Unique_bucket_Id: "",
      showmodaldelivery: false,
      current_modal_qty: null,
      current_modal_cart_item_id: null
    };
    this.incrementwithAddon = this.incrementwithAddon.bind(this);
    this.handleShowmodal2 = this.handleShowmodal2.bind(this);
    this.incrementNew = this.incrementNew.bind(this);
    this.decrementNew = this.decrementNew.bind(this);
    this.repeat_last = this.repeat_last.bind(this);
    this.decrementwithAddon = this.decrementwithAddon.bind(this);
  }

  // finalUserDetails = (value_email, value_token) => {
  //   if (value_email != null && value_token != null) {
  //     this.setState(
  //       {
  //         final_user_email: value_email,
  //         final_user_token: value_token
  //       },
  //       () => {}
  //     );
  //   } else {
  //     this.setState(
  //       {
  //         final_user_email: "guest@onlinebites.com",
  //         final_user_token:
  //           "eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiI3NDc4YWQzNy0wZDhkLTQwYWEtYTg2Ni1kNzBkOWU3NTUzOWQiLCJzdWIiOiJOT19WRVJJJGhqamNqY2pjakBnbWFpbC5jb20kMjEyMTIxMjExMjEyMTJ3cXdxdyIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTU2OTM5OTUzMTMyMywiZXhwIjo3NzY2MjgxMjAwODUxNzcyfQ.ab9NER0nh_8Yzwjh3rHPu_8NTkCN31LcTEPEjfRNfVfzB-BDUczsLcBRp7tr0vhGvmJgawWtAw9rgO3ws2aBLQ"
  //       },
  //       () => {
  //         const url2 = `${config.api_base}/users/business/bucket?access_token=${this.state.final_user_token}&user_id=${this.state.final_user_email}`;
  //         const bearer = "Bearer" + this.state.final_user_token;
  //
  //         fetch(url2, {
  //           method: "GET",
  //           headers: {
  //             Authorization: bearer,
  //             "Content-Type": "application/json"
  //           }
  //         })
  //           .then(response => response.json())
  //           .then(responseData => {
  //             if (
  //               responseData.object.bucketId != null ||
  //               responseData.object.bucketId != undefined
  //             ) {
  //               console.log("Unique bucket Id", responseData.object.bucketId);
  //               this.setState({
  //                 Unique_bucket_Id: responseData.object.bucketId
  //               });
  //               const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${this.state.Unique_bucket_Id}&user_id=${this.state.final_user_email}`;
  //               this.setState({
  //                 test_cart: responseData,
  //                 quantity: responseData.object.quantity
  //               });
  //               fetch(url5, {
  //                 method: "GET",
  //                 headers: {
  //                   //Authorization: bearer,
  //                   "Content-Type": "application/json"
  //                 }
  //               })
  //                 .then(response => response.json())
  //                 .then(cartData => {
  //                   this.setState({
  //                     Detailed_cart: cartData,
  //                     Detailed_cart_item: cartData.object.items,
  //                     Detailed_cart_checkout_method:
  //                       cartData.object.available_checkout_methods
  //                   });
  //                 });
  //             }
  //           })
  //           .catch(error =>
  //             this.setState({
  //               message: "Something bad happened " + error
  //             })
  //           );
  //       }
  //     );
  //   }
  // };

  componentDidMount() {
    const user_email =
      localStorage.getItem("user") === null
        ? "guest@onlinebites.com"
        : localStorage.getItem("user");
    const user_token =
      localStorage.getItem("access_token") === null
        ? "eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiI3NDc4YWQzNy0wZDhkLTQwYWEtYTg2Ni1kNzBkOWU3NTUzOWQiLCJzdWIiOiJOT19WRVJJJGhqamNqY2pjakBnbWFpbC5jb20kMjEyMTIxMjExMjEyMTJ3cXdxdyIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTU2OTM5OTUzMTMyMywiZXhwIjo3NzY2MjgxMjAwODUxNzcyfQ.ab9NER0nh_8Yzwjh3rHPu_8NTkCN31LcTEPEjfRNfVfzB-BDUczsLcBRp7tr0vhGvmJgawWtAw9rgO3ws2aBLQ"
        : localStorage.getItem("access_token");
    this.setState({
      final_user_email: user_email,
      final_user_token: user_token
      // restaurant_id: this.props.match.params.id
      //   ? this.props.match.params.id
      //   : null
    });
    console.log("hitting here");

    //this.finalUserDetails(this.state.user_email, this.state.user_token);
    const url = this.state.menu_url;
    console.log("menu url test", this.state.menu_url);
    const bearer = "Bearer " + user_token;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("single res results", responseData);
        this.setState({
          restaurantsdata: responseData.data
        });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
    const url2 = `${config.api_base}/users/business/bucket?access_token=${user_token}&user_id=${user_email}`;

    fetch(url2, {
      method: "GET",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (
          responseData.object.bucketId != null ||
          responseData.object.bucketId != undefined
        ) {
          console.log("Unique bucket Id", responseData.object.bucketId);
          this.setState({
            Unique_bucket_Id: responseData.object.bucketId
          });
          const url5 = `${config.api_base}/users/business/bucket/dci?access_token=${user_token}&bucket_id=${responseData.object.bucketId}&user_id=${user_email}`;
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
                pickup_restaurant: cartData.object.available_pickup_methods
              });
            });

          // const url4 =
          //   `${config.api_base}/users/business/bucket/update_shipping_method?access_token=${user_token}`;
          // fetch(url4, {
          //   method: "POST",
          //   body: JSON.stringify({
          //     form_id: "",
          //     user_id: user_email,
          //     fields: {
          //       bucketId: responseData.object.bucketId,
          //       shippingId : "3b1fb5aabdbb1b2e4d8dfaae14a903ba"
          //     }
          //   }),
          //   headers: {
          //     "Content-Type": "application/json"
          //   }
          // }).then(response => response.json())
          //       .then(delivery => {
          //         this.setState({
          //           Delivery_info: delivery.object
          //         });
          //       }).then(() =>{
          //         this.setState({
          //           Delivery_cost: this.state.Delivery_info.cost
          //         });
          //       })
          //   .catch(error =>
          //     this.setState({
          //       message: "Something bad happened " + error
          //     })
          //   );
        }
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
  }

  handleSelect = event => {
    this.setState({
      loadingData: event.target.value
    });
    console.log("product id", event.target.value);
    //console.log("data",data);
    this.state.restaurantsdata.map(items => {
      items.products
        .filter(productdata => productdata.productId == event.target.value)
        .map(item => {
          this.setState({
            current_product_id: item.productId
          });
        });
    });

    const url2 =
      `${config.api_base}/users/business/bucket/item`;
    const bearer = "Bearer" + this.state.final_user_token;
    fetch(url2, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          bucketId: this.state.Unique_bucket_Id,
          productId: event.target.value,
          quantity: "1"
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),
      headers: {
        "Content-Type": "application/json",
        //"user_id" : "hjjcjcjcj@gmail.com",
        Authorization: bearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        const url3 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${responseData.object.bucket}&user_id=${this.state.final_user_email}`;
        this.setState({
          test_cart: responseData,
          Unique_bucket_Id: responseData.object.bucket,
          quantity: responseData.object.quantity
        });
        fetch(url3, {
          method: "GET",
          // body : JSON.stringify({
          //   "form_id" : "",
          //   "user_id" : "guest@onlinebites.com",
          //    "fields" : {
          //     "bucketId" : this.state.bucket_id,
          //     "productId" : event.target.value,
          //     //"productVariationId" : "7cc970cec8311343c788a2fd9a97cb95",
          //      "quantity" : "1"
          //    }
          //   }),
          headers: {
            //Authorization: bearer,
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(cartData => {
            console.log("first search results", cartData);
            this.setState({
              Detailed_cart: cartData,
              Detailed_cart_item: cartData.object.items,
              cart_item_tip: cartData.object.fees,
              Delivery_method: cartData.object.available_delivery_methods,
              Detailed_cart_checkout_method:
                cartData.object.available_checkout_methods,
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
    console.log("new bucket id", this.state.bucket_id);
  };

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

  saveAddon = () => {
    this.setState({
      showmodal2: false
    });
    this.setState(
      {
        current_tokens_group: this.state.current_tokens_group.concat(
          this.state.selected_product_modal[0].addons_unique_id
        )
      },
      () => {
        this.handleClose();
      }
    );
    console.log("current_tokens_group", this.state.current_tokens_group);
    const groupaddon = this.state.final_addon_array;
    const url3 =
      `${config.api_base}/users/business/bucket/item`;
    const bearer = "Bearer" + this.state.final_user_token;
    fetch(url3, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          addOns: this.state.final_addon_array,
          bucketId: this.state.Unique_bucket_Id,
          productId: this.state.current_product_id,
          quantity: "1"
        },
        form_id: "",
        user_id: this.state.final_user_email
      }),

      headers: {
        "Content-Type": "application/json",
        // "user_id" : "hjjcjcjcj@gmail.com",
        Authorization: bearer
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log("search results", responseData);

        const url4 = `${config.api_base}/users/business/bucket/dci?access_token=${this.state.final_user_token}&bucket_id=${responseData.object.bucket}&user_id=${this.state.final_user_email}`;
        this.setState({
          test_cart: responseData,
          Unique_bucket_Id: responseData.object.bucket,
          quantity: responseData.object.quantity
        });
        fetch(url4, {
          method: "GET",
          // body : JSON.stringify({
          //   "form_id" : "",
          //   "user_id" : "guest@onlinebites.com",
          //    "fields" : {
          //     "bucketId" : this.state.bucket_id,
          //     "productId" : event.target.value,
          //     //"productVariationId" : "7cc970cec8311343c788a2fd9a97cb95",
          //      "quantity" : "1"
          //    }
          //   }),
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
              loadingData: false
            });
          });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );

    this.setState({
      bucket_id: this.state.test_cart_object.bucket
    });
  };

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

  handleShow = event => {
    console.log("handle show cart itmes", this.state.cartitems);
    this.setState({
      showmodal2: false,
      final_addon_array: [],
      radio_final_addon_array: null,
      select_final_addon_array: null
    });
    this.state.restaurantsdata.map(items => {
      items.products
        .filter(productdata => productdata.productId == event.target.value)
        .map(item => {
          this.setState({
            current_product_id: item.productId,
            current_addongroups: item.addonsGroups,
            selected_product_modal: this.state.selected_product_modal.concat(
              item
            ),
            show: true
          });
        });
    });
  };

  handleShowmodal2(value1, value2, value3) {
    this.setState(
      {
        current_product_id: value1,
        current_modal_cart_item_id: value2,
        current_modal_qty: value3
      },
      () =>
        this.setState({
          showmodal2: true
        })
    );
  }

  repeat_last(value1, value2) {
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
              pickup_restaurant: cartData.object.available_pickup_methods
            });
          });
      })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );
  }

  handleClose = () => {
    this.setState({
      show: false,
      selected_product_modal: []
    });
  };

  handleClosemodal2 = () => {
    this.setState({
      showmodal2: false
    });
  };

  toggle = event => {
    console.log("toggle event", event.target.value);
    this.state.current_addongroups.map(addongroup => {
      addongroup.addons
        .filter(addon => addon.addOnId == event.target.value)
        .map(addonstate => {
          if (addonstate.value) {
            const remaining_final_addons = this.state.final_addon_array.filter(
              addon => addon.group == event.target.value
            );
            const remaining_selected_addons = this.state.current_selected_addons_array.filter(
              addon => addon.addOnId == addonstate.addOnId
            );
            this.setState({
              current_addon_total:
                this.state.current_addon_total - addonstate.unitPrice,
              current_selected_addons_array: remaining_selected_addons,
              final_addon_array: remaining_final_addons
            });
            addonstate.value = false;
          } else {
            const new_Addon = { addOnId: event.target.value, quantity: 1 };
            this.setState({
              current_addon_total:
                this.state.current_addon_total + addonstate.unitPrice,
              current_selected_addons_array: this.state.current_selected_addons_array.concat(
                addonstate
              ),
              final_addon_array: this.state.final_addon_array.concat(new_Addon)
            });
            addonstate.value = true;
          }
        });
    });
  };

  radiohandlechange = event => {
    const new_radio_addon = { addOnId: event.target.value, quantity: 1 };
    this.setState(
      {
        radio_final_addon_array: new_radio_addon
      },
      () => {
        this.setState({
          final_addon_array: this.state.final_addon_array.concat(
            this.state.radio_final_addon_array
          )
        });
      }
    );
  };

  selecthandlechange = event => {
    if (event.target.value != "") {
      const new_select_addon = { addOnId: event.target.value, quantity: 1 };
      this.setState(
        {
          select_final_addon_array: new_select_addon
        },
        () => {
          this.setState({
            final_addon_array: this.state.final_addon_array.concat(
              this.state.select_final_addon_array
            )
          });
        }
      );
    }
  };
  Tiphandlerchange = event => {
    this.state.cart_item_tip
      .filter(item => item.fee_id === event.target.value)
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
              taxRate: tip.rate
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
  // Radiotoggle = event =>{
  //   this.state.current_addongroups.map(addongroup => {
  //     addongroup.addons
  //       .filter(addon => addon.addOnId == event.target.value)
  //       .map(addonstate => {
  //
  //         if (addonstate.value == false) {
  //           const remaining_final_addons = this.state.final_addon_array.filter(
  //             addon => addon.group == event.target.value
  //           );
  //           const remaining_selected_addons = this.state.current_selected_addons_array.filter(
  //             addon => addon.addOnId == addonstate.addOnId
  //           );
  //           this.setState({
  //             current_addon_total:
  //               this.state.current_addon_total - addonstate.unitPrice,
  //             current_selected_addons_array: remaining_selected_addons,
  //             final_addon_array: remaining_final_addons
  //           });
  //           addonstate.value = true;
  //         }
  //         else if(addonstate.value.length != 0){
  //           const new_Addon = { addOnId: event.target.value, quantity: 1 };
  //           this.setState({
  //             current_addon_total:
  //               this.state.current_addon_total + addonstate.unitPrice,
  //             current_selected_addons_array: this.state.current_selected_addons_array.concat(
  //               addonstate
  //             ),
  //             final_addon_array: this.state.final_addon_array.concat(new_Addon)
  //           });
  //           addonstate.value = true;
  //         }
  //
  //         else {
  //           const new_Addon = { addOnId: event.target.value, quantity: 1 };
  //           this.setState({
  //             current_addon_total:
  //               this.state.current_addon_total + addonstate.unitPrice,
  //             current_selected_addons_array: this.state.current_selected_addons_array.concat(
  //               addonstate
  //             ),
  //             final_addon_array: this.state.final_addon_array.concat(new_Addon)
  //           });
  //           addonstate.value = false;
  //         }
  //       });
  //   });
  // }
  deliveryhandler = event => {
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
          delivery_choose: true
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
    // if (this.state.restaurantDataHeaderinfo.length == 0) {
    //   return <Redirect to="/" />;
    // }
    if (this.state.banner_info.length == 0) {
      return <Redirect to="/restaurants" />;
    }
    const loaderDiv = (
      <div className="cartLoader">
        <img src="/img/spinner.gif" />
      </div>
    );
    let Current_Qnty = "";
    let Current_cart_item_id = "";
    let Fees_number = this.state.business_data.business.FEES;
    let Matches = Fees_number.match(/(\d+)/);
    console.log("restaurant data email ", this.state.final_user_email);
    console.log("restaurant data access token ", this.state.final_user_token);
    console.log("Current_cart_item_id ", this.state.Current_cart_item_id);
    console.log("Current_Qnty ", this.state.Current_Qnty);
    console.log("Detailed_cart_item ", this.state.Detailed_cart_item);
    console.log("Detailed_cart_addons ", this.state.Detailed_cart_addons);
    console.log("Delivery_cost", this.state.Delivery_cost);
    console.log("Matches", Matches);

    console.log(
      "detailed cart checkout method",
      this.state.Detailed_cart_checkout_method
    );
    console.log("Detailed_cart ", this.state.Detailed_cart);
    console.log("cart_item_tip ", this.state.cart_item_tip);
    console.log("Tip_info ", this.state.Tip_info);
    console.log("Delivery_info", this.state.Delivery_info);
    console.log("final_addon_array ", this.state.final_addon_array);
    console.log("select addon array", this.state.select_final_addon_array);
    console.log("radio addon array", this.state.radio_final_addon_array);
    console.log("current_addongroups ", this.state.current_addongroups);
    console.log(
      "current_addonsitem ",
      this.state.current_selected_addons_array
    );
    console.log("current_product_token", this.state.current_product_token);
    console.log("test_cart", this.state.test_cart);
    console.log("test_cart_object", this.state.test_cart_object);
    console.log("Unique_bucket_Id", this.state.Unique_bucket_Id);
    console.log("current_product_id", this.state.current_product_id);
    console.log("selected items", this.state.selected_product_modal);
    console.log("restaurantsdata", this.state.restaurantsdata);
    //console.log("stripe key restaurantdata" , this.state.business.STRIPE_PUBLISHABLE_KEY);
    console.log("bussiness data restaurantdata", this.state.business_data);
    console.log(
      "bussiness data restaurantdata business",
      this.state.business_data.business
    );
    console.log("business", this.state.business_stripe);

    console.log("Delivery_method", this.state.Delivery_method);
    console.log("banner_info", this.state.banner_info);

    const tip_rate_fees = this.state.business_data.business.FEES.split("|");

    console.log(tip_rate_fees);

    //menu category start
    const category = this.state.restaurantsdata.map((cat, index) => {
      const hashlink = `#${cat.category.categoryName}`;

      return (
        <li key={index}>
          <a href={hashlink}>{cat.category.categoryName}</a>
        </li>
      );
    });
    //menu category end

    // menu data of particular restaurant start

    const menuList = this.state.restaurantsdata.map((cat, index) => {
      const product = cat.products;
      return (
        <ScrollableAnchor id={cat.category.categoryName} key={index}>
          <div className="pizza1">
            <h2>{cat.category.categoryName}</h2>
            <div className="pizza1-contant">
              <div className="row">
                {product.map((item, index) => {
                  const Add_Button =
                    item.addonsGroups.length > 0 ? (
                      <>
                        <button
                          className="addbutton"
                          value={item.productId}
                          onClick={this.handleShow}
                        >
                          ADD
                        </button>
                      </>
                    ) : (
                      <button
                        className="addbutton"
                        value={item.productId}
                        onClick={this.handleSelect}
                      >
                        ADD
                      </button>
                    );

                  const Current_Qnty_array =
                    this.state.Detailed_cart_item &&
                    this.state.Detailed_cart_item.length > 0 &&
                    this.state.Detailed_cart_item.filter(
                      qty => qty.product_id == item.productId
                    );

                  Current_Qnty =
                    Current_Qnty_array &&
                    Current_Qnty_array[0] &&
                    Current_Qnty_array[0].qty
                      ? Current_Qnty_array[0].qty
                      : 0;

                  Current_cart_item_id =
                    Current_Qnty_array &&
                    Current_Qnty_array[0] &&
                    Current_Qnty_array[0].item_id
                      ? Current_Qnty_array[0].item_id
                      : 0;

                  const ConditionalIncreamentButton =
                    item.addonsGroups.length > 0 ? (
                      <button
                        className="counter-plus"
                        onClick={this.handleShowmodal2.bind(
                          this,
                          item.productId,
                          Current_cart_item_id,
                          Current_Qnty
                        )}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="counter-plus"
                        value={item.productId}
                        //onClick={this.increment}
                        onClick={this.incrementNew.bind(
                          this,
                          Current_cart_item_id,
                          Current_Qnty,
                          this.state.Unique_bucket_Id,
                          item.productId
                        )}
                      >
                        +
                      </button>
                    );

                  const showLoader =
                    this.state.loadingData &&
                    this.state.loadingData == item.productId
                      ? "pamout show_loader"
                      : "pamout show_button";

                  const PlusMinusButton =
                    this.state.Detailed_cart_item &&
                    this.state.Detailed_cart_item.filter(
                      qty => qty.product_id == item.productId
                    ).length > 0 ? (
                      <div className="handle-counter" id="handleCounter3">
                        <button
                          className="counter-minus"
                          value={item.productId}
                          onClick={this.decrementNew.bind(
                            this,
                            Current_cart_item_id,
                            Current_Qnty,
                            this.state.Unique_bucket_Id,
                            item.productId
                          )}
                        >
                          -
                        </button>
                        {Current_Qnty}

                        {ConditionalIncreamentButton}
                      </div>
                    ) : (
                      Add_Button
                    );
                  return (
                    <div className="col-lg-6" key={index}>
                      <div className="ppara">
                        <div className="pizza-img">
                          <div className="pizza-photo">
                            <img src={item.image} alt="images not found" />
                          </div>
                          <div className="pprise">
                            <h6>{item.name.slice(0, 22)}</h6>
                            <p>{cat.category.categoryName}</p>
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
    });
    // menu data of particular restaurant end

    // modal content start
    const modal_content =
      this.state.selected_product_modal.length > 0
        ? this.state.selected_product_modal.map((item, index) => {
            console.log("modal item", item);
            return (
              <Row className="show-grid" key={index}>
                <Col md={9}>
                  <h3 className="product-name">{item.name}</h3>
                </Col>
                <Col md={3}>
                  <p className="modal-price">${item.price}</p>
                </Col>
                {this.state.current_addongroups.map((addongroup, index) => {
                  console.log("addongroup", addongroup);
                  return (
                    <Row className="show-grid" key={index}>
                      <Col md={12}>
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
                              onClick={this.selecthandlechange}
                              class="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option value="" disabled={true}>
                                Choose a addon ...
                              </option>
                              {addongroup.addons.map((addon, index) => {
                                return (
                                  <option value={addon.addOnId} key={index}>
                                    {addon.name}
                                  </option>
                                );
                              })}
                            </select>
                          </code>
                        </Col>
                      ) : addongroup.type == "RADIO" ? (
                        <>
                          {addongroup.addons.map((addon, index) => {
                            return (
                              <Col md={6} key={index}>
                                <code>
                                  <input
                                    type="radio"
                                    name="addon"
                                    value={addon.addOnId}
                                    onChange={this.radiohandlechange}
                                  />{" "}
                                  {addon.name}
                                </code>
                              </Col>
                            );
                          })}
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
                                    onClick={this.toggle}
                                  />{" "}
                                  {addon.name}
                                </code>
                              </Col>
                            );
                          })}
                        </>
                      ) : null}
                    </Row>
                  );
                })}
              </Row>
            );
          })
        : null;
    // modal content end

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
    // cart of without addons content start
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

    // cart of without addons content end

    // cart of with addons content start

    // const cart2 = this.state.Detailed_cart_item && this.state.Detailed_cart_item.length > 0 ? this.state.Detailed_cart_item.map(item =>{
    //   let totalprice = 0;
    //          totalprice = item.unit_price * this.state.quantity;
    //   return (
    //     <div className="corn-contant">
    //           <p>{item.itemName.slice(0, 22)}</p>
    //           <div className="pamout" id="pamut-number">

    //             <span>${Number(totalprice,2).toFixed(2)}</span>
    //             <div className="count" id="countted">
    //               <div className="handle-counter" id="handleCounter14">
    //                 <button className="counter-minus"  onClick={this.decrementwithAddon.bind(this,item.productId)}>-</button>{this.state.quantity}
    //                  {/* <input type="text" defaultValue={1} />  */}
    //                 <button className="counter-plus" onClick={this.incrementwithAddon.bind(this,item.productId)}>+</button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //   )
    // }):null;
    // cart of with addons content end

    const price_modal = this.state.selected_product_modal.map(itemprice => {
      return Number(itemprice.price);
    });

    return (
      <>
        <RestaurantDataHeader
          infoheader={this.state.restaurantDataHeaderinfo}
        />
        <HeaderTwo />
        <Banner Bannerdata={this.state.banner_info} />
        <div className="main1">
          <div className="container">
            <div className="main1-wrapper">
              {this.state.restaurantsdata.length > 0 ? (
                <div className="row">
                  <div className="col-lg-3 col-md-4">
                    <div className="main-link sticky-top">
                      <ul>
                        {/* <li className="active-item"><a href="#">Pizzas</a></li> */}
                        {category}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4">
                    <div className="main-contant">{menuList}</div>
                  </div>
                  <div className="col-lg-3 col-md-4">



                    {this.state.Detailed_cart &&
                    this.state.Detailed_cart.object ? (
                      <>
                      <div className="cart Right-side-cart-view">
                        <h2 className = "sticky-top cart-heading">Cart</h2>
                        {this.state.Detailed_cart.object.total_amount ? (
                          <>
                          <div className="checkout cart-mobile-view-button text-center">
                          <Link
                            to={{
                              pathname: "/cart",
                              cartinfodata: this.state
                                .restaurantDataHeaderinfo,
                                cart_cart_above_data: this.state.banner_info,
                                cart_stripe_key: this.state.business_stripe,
                              business_data : this.state.business_data.business.FEES,
                              cartdetails_item: this.state.Detailed_cart_item,
                              cartdetails: this.state.Detailed_cart,
                              cartdetails_checkout_method: this.state.Detailed_cart_checkout_method,
                              cart_Delivery_method: this.state
                                .Delivery_method,
                              cart_pickup_restaurant: this.state
                                .pickup_restaurant,
                                bucket_id: this.state.Unique_bucket_Id,
                                cart_Delivery_cost: this.state.Delivery_cost
                            }}
                          >
                            View cart
                          </Link>
                          </div>
                            <div className="corn sticky-top">{cart}</div>
                            <div className="row cart-below sticky-top">
                              <div className="col-md-6">
                                <h6>Subtotal</h6>
                                <h6>Sales Taxes</h6>
                                <h6>Tip</h6>
                                <h6>Delivery Fees</h6>
                                <h6>Total</h6>
                              </div>
                              <div className="col-md-6 sticky-top">
                                <h6>
                                  $
                                  {Number(
                                    this.state.Detailed_cart.object.sub_total,
                                    2
                                  ).toFixed(2)}
                                </h6>
                                <h6>
                                  {this.state.Detailed_cart.object.taxes ? (
                                    <>
                                      {" "}
                                      $
                                      {Number(
                                        this.state.Detailed_cart.object.taxes[0]
                                          .amount,
                                        2
                                      ).toFixed(2)}
                                    </>
                                  ) : null}
                                </h6>
                                <h6>
                                  <select
                                    onClick={this.Tiphandlerchange}
                                    className="form-control"
                                    id="tip-select"
                                  >
                                    {this.state.cart_item_tip.length > 0 ? (
                                      tip_rate_fees.map((item, index) => {
                                        const fee_id = this.state.cart_item_tip[0].fee_id;
                                        const fee_rate = this.state.cart_item_tip[0].rate;
                                        const selected = fee_rate === item ? 'selected' : null;
                                            return (
                                              <option
                                                value={fee_id}
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

                            <div className="row cart-below-form sticky-top">
                              {delivery_content}
                            </div>
                            <div className="sub sticky-top">
                              <div className="subtotal"></div>
                              {this.state.delivery_choose == true ? (
                                <>
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
                                      onincrementWithAddon: this
                                        .incrementwithAddon,
                                      ondecrementWithAddon: this
                                        .decrementwithAddon,
                                      onincrement: this.incrementNew,
                                      ondecrement: this.decrementNew,
                                      bucket_id: this.state.Unique_bucket_Id,
                                      final_user_email: this.state
                                        .final_user_email,
                                      Delivery_cost: this.state.Delivery_cost,
                                      final_user_token: this.state
                                        .final_user_token,
                                      stripe_key: this.state.business_stripe,
                                      tip_rate: this.state.tip_rate
                                    }}
                                  >
                                    Checkout
                                  </Link>

                                </div>

                                </>
                              ) : (
                                <div className="checkout text-center">
                                  <button
                                    onClick={this.deliverChooseHandle}
                                    className="deliverymsg"
                                  >
                                    Checkout
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4>Empty cart</h4>
                          </div>
                        )}
                      </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="menuLoader">
                  <img src="/img/menu-loader.gif" />
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
        <Modal show={this.state.show} onHide={this.handleClose} id="modal1">
          <Modal.Body>
            <Container>{modal_content}</Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" className="total-butn">
              TOTAL $
              {Number(this.state.current_addon_total, 2) +
                Number(price_modal, 2)}
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              CLOSE
            </Button>
            <Button
              variant="success"
              className="add-butn"
              onClick={this.saveAddon}
            >
              ADD ITEMS
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showmodal2}
          onHide={this.handleClosemodal2}
          id="modal2"
        >
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col md={12}>
                  <h4>Repeat last used customization?</h4>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="Ichosse"
              value={this.state.current_product_id}
              onClick={this.handleShow}
            >
              I'LL CHOOSE
            </Button>
            {/* {this.state.current_product_token != null ? ( */}
            <Button
              variant="success"
              className="repeat-last"
              onClick={this.repeat_last.bind(
                this,
                this.state.current_modal_cart_item_id,
                this.state.current_modal_qty
              )}
            >
              REPEAT LAST
            </Button>
            {/* ) : null} */}
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showmodaldelivery} id="modal3" size="sm">
          <Modal.Body>Please select a delivery method.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleclosedelivery}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RestaurantData;
