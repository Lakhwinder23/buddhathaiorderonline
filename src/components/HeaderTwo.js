import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import {config} from '../config';
import { Link } from "react-router-dom";
import { Button ,
  Container,
    Row,
    Col,
  Form,
  } from 'react-bootstrap';
class HeaderTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
        show : false,
        showmodal2 : false,
        firstname : null,
        lastname : null,
        email : null,
        city : null,
        password : null,
        register_info : [],
        otp_info:[],
        register_Process :false,
        merchant_token : null,
        config_info : [],
        header_banner_info : this.props.banner_info,
        header_business_stripe :this.props && this.props.business_stripe ? this.props.business_stripe : null,
        header_Detailed_cart_item:this.props && this.props.Detailed_cart_item && this.props.Detailed_cart_item.length > 0  ? this.props.Detailed_cart_item : [],
        header_Detailed_cart:this.props && this.props.Detailed_cart && this.props.Detailed_cart.length > 0 ? this.props.Detailed_cart : [],
        header_Detailed_cart_checkout_method:this.props && this.props.Detailed_cart_checkout_method && this.props.Detailed_cart_checkout_method.length > 0 ? this.props.Detailed_cart_checkout_method : [],
        header_Delivery_method:this.props && this.props.Delivery_method && this.props.Delivery_method.length > 0 ? this.props.Delivery_method : [],
        header_pickup_restaurant:this.props && this.props.pickup_restaurant && this.props.pickup_restaurant.length > 0 ? this.props.pickup_restaurant : [],
        header_Unique_bucket_Id:this.props && this.props.Unique_bucket_Id ? this.props.Unique_bucket_Id : null,
        header_business_data:this.props && this.props.business_data && this.props.business_data.length > 0 ? this.props.business_data : [],
        header_Delivery_cost:this.props && this.props.Delivery_cost ? this.props.Delivery_cost : 0

    }
    this.Registerinformation = this.Registerinformation.bind(this);
    this.Logininformation = this.Logininformation.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.Thankulogin = this.Thankulogin.bind(this);
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
          merchant_token: merchant.object.access_token
        },() =>{
          const url_info =
          `${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${this.state.merchant_token}`;
        fetch(url_info, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json())
              .then(stripe => {
                this.setState({
                  config_info: stripe.object
                });
              })
              .catch(error =>
                this.setState({
                  message: "Something bad happened " + error
                })
              );
        });
      })

}

handleShow = () =>{
  this.setState({
    show : true
  });
}
handleShowlogout = () =>{
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  // localStorage.removeItem('access_token').then(() => {
  //   return <Redirect to="/" />
  // })
  if (localStorage.getItem('user') === null && localStorage.getItem('access_token') === null){
    window.location.reload();

  }

}
handleShowmodal2 = () =>{
  this.setState({
      showmodal2 : true
  });
}
handleClose(event){
  this.setState({
    show : false
  });
}
handleClosemodal2 = () => {
  this.setState({
      showmodal2 : false
  });
}

OnHandleFieldChange = (field, event) => {
  const new_state = {};
  new_state[field] = event.target.value;
  this.setState(new_state);
};

Registerinformation(event){
    const data = {
      "first_name" : this.state.firstname,
      "last_name" : this.state.lastname,
      "city" : this.state.city,
      "email" : this.state.email,
      "password" :this.state.password
    }
    console.log("data first name",data.first_name);
    const url1 =
    `${config.api_base}/users/register?access_token=eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g`;
    fetch(url1, {
      method: "POST",
      body: JSON.stringify({
            fields: {
              registrationEmail: data.email,
              registrationFirstName: data.first_name,
              registrationLastName: data.last_name,
              registrationPassword: data.password
            },
            form_id: ""
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
    .then(register => {
      // localStorage.setItem('access_token', 'eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g');
      // localStorage.setItem('user', this.state.email);
      this.setState({
        register_info: register.object.state,
        register_Process :true
      },() =>{
        console.log("submit-------------");
        const otp_url =
          `${config.api_root}/security/session/users/verify/otp`;
        fetch(otp_url, {
          method: "POST",
          body: JSON.stringify({
            otp: 111111,
          state: this.state.register_info,
            user: this.state.email
          }),
          headers: {
            "Content-Type": "application/json",
            "device_id" : "21212121121212wqwqw",                //device id should be unique every time
            "key" : config.key_value,
            "secret" : config.secret_value
          }
        }).then(response => response.json())
              .then(otp => {
                console.log("not submit-------------");
                this.setState({
                  otp_info: otp
                });
              })

      });
    })
      .catch(error =>
        this.setState({
          message: "Something bad happened " + error
        })
      );

  }
  Thankulogin(){
    this.setState({
          show : true,
          showmodal2 : false,
          register_Process :false
        });
  }

Logininformation(event){
  // this.setState({
  //     show : true,
  //     showmodal2 : false,
  //     register_Process :false
  //   });
  const logindata = {
    "email" : this.state.email,
    "password" :this.state.password
  }
  console.log("data first name",logindata.first_name);
  const url2 =
  `${config.api_root}/security/session/users/login`;
  fetch(url2, {
    method: "POST",
    body: JSON.stringify({
      user: logindata.email,                      //hjjcjcjcj@gmail.com
      password: logindata.password,                                 //1111
      bucket_id:""
    }),
    headers: {
      "Content-Type": "application/json",
      "device_id" : "21212121121212wqwqw",                //device id should be unique every time
      "key" : config.key_value,
      "secret" : config.secret_value
    }
  }).then(response => response.json())
        .then(login => {
          if(login.request_status) {
            console.log('correct login');
            localStorage.setItem('access_token', login.object.access_token);
            localStorage.setItem('user', this.state.email);
            this.setState({
              login_info: login.object,
              show : false
            })
            if (localStorage.getItem('user') != null && localStorage.getItem('access_token') != null){
              window.location.reload();
            }

            // .then(() =>{
            //   console.log('Yes this is sending data');
            //   localStorage.setItem('access_token', this.state.login_info.access_token);
            //   localStorage.setItem('user', this.state.email);
            //   this.sendData(this.state.email,this.state.login_info.access_token);
            // })
          }
          else {
            console.log('Inccorect login');
          }
        })
    .catch(error =>
      this.setState({
        message: "Something bad happened " + error
      })
    );
}
    render() {
      const restId = config.resid;
      console.log("banner_info",this.props.banner_info);

      let local_user = localStorage.getItem('user');
      let local_token = localStorage.getItem('access_token');

      const menu_content = local_user === null && local_token === null ?
        (<ul>
          <li><a href="/#menu">Menu</a></li>
          <li><a href={"https://dinereserve.com/booktable/" + restId} target="_blank">Reservation</a></li>
          <li><a href="/#location">Location</a></li>
          <li className="phone-header"><a href="/"><span className="phone-ic"><img src="/img/phone-icon-new.png" alt="" /></span>{this.props && this.props.banner_info ? this.props.banner_info.MERCHANT_CONTACT : null}</a></li>
          <li className="cart-numbers"><Link
            to={{
              pathname: "/cart",
              // cartinfodata: this.state
              //   .restaurantDataHeaderinfo,
                cart_cart_above_data: this.props.banner_info,
                cart_stripe_key: this.state.header_business_stripe,
            //  business_data : this.state.business_data.business.FEES,
              cartdetails_item: this.state.header_Detailed_cart_item,
              cartdetails: this.state.header_Detailed_cart,
              cartdetails_checkout_method: this.state.header_Detailed_cart_checkout_method,
              cart_Delivery_method: this.state
                .header_Delivery_method,
              cart_pickup_restaurant: this.state
                .header_pickup_restaurant,
                bucket_id: this.state.header_Unique_bucket_Id,
                cart_business_data:this.state.header_business_data,
                cart_Delivery_cost: this.state.header_Delivery_cost
            }}
          ><span className="cart-image"><img src="/img/cart-image-new.png" alt="" /></span></Link><span class='badge badge-warning' id='lblCartCount'> {this.props && this.props.Detailed_cart_item ? this.props.Detailed_cart_item.length : 0} </span></li>
          {
            // <li><button  className="headertwo_login" onClick = {this.handleShow}>Login</button></li>
            // <li><button  className="headertwo_signup" onClick = {this.handleShowmodal2}>Sign up</button></li>
          }

          {this.state.config_info && Object.keys(this.state.config_info).length > 0 && this.state.config_info.app_store_link  ? (
          <li className ="app-store"><a href={this.state.config_info.app_store_link} target="_blank"><span className="app-store-image"><img src="/img/app-store-img.png" alt="" /></span></a></li>
        ) : null}
        {this.state.config_info && Object.keys(this.state.config_info).length > 0 && this.state.config_info.play_store_link  ? (
          <li className ="play-store"><a href={this.state.config_info.play_store_link} target="_blank"><span className="app-store-image"><img src="/img/playstore-logo.png" alt="" /></span></a></li>
            ) : null}

        </ul>
      ) : (
        <ul>
        <li><a href="/#menu">Menu</a></li>
        <li><a href={"https://dinereserve.com/booktable/" + restId} target="_blank">Reservation</a></li>
        <li><a href="/#location">Location</a></li>
        <li className="phone-header"><a href="/"><span className="phone-ic"><img src="/img/phone-icon-new.png" alt="" /></span>(303) 442-2500</a></li>
        <li className="cart-numbers"><Link
          to={{
            pathname: "/cart",
            // cartinfodata: this.state
            //   .restaurantDataHeaderinfo,
              cart_cart_above_data: this.props.banner_info,
              cart_stripe_key: this.state.header_business_stripe,
          //  business_data : this.state.business_data.business.FEES,
            cartdetails_item: this.state.header_Detailed_cart_item,
            cartdetails: this.state.header_Detailed_cart,
            cartdetails_checkout_method: this.state.header_Detailed_cart_checkout_method,
            cart_Delivery_method: this.state
              .header_Delivery_method,
            cart_pickup_restaurant: this.state
              .header_pickup_restaurant,
              bucket_id: this.state.header_Unique_bucket_Id,
              cart_business_data:this.state.header_business_data,
              cart_Delivery_cost: this.state.header_Delivery_cost
          }}
        ><span className="cart-image"><img src="/img/cart-image-new.png" alt="" /></span></Link><span class='badge badge-warning' id='lblCartCount'> {this.props && this.props.Detailed_cart_item ? this.props.Detailed_cart_item.length : 0} </span></li>
        //<li><button  className="headertwo_login" onClick = {this.handleShowlogout}>Logout</button></li>
        {this.state.config_info && Object.keys(this.state.config_info).length > 0 && this.state.config_info.app_store_link  ? (
          <li className ="app-store"><a href={this.state.config_info.app_store_link} target="_blank"><span className="app-store-image"><img src="/img/app-store-img.png" alt="" /></span></a></li>
        ) : null}
        {this.state.config_info && Object.keys(this.state.config_info).length > 0 && this.state.config_info.play_store_link  ? (
          <li className ="play-store"><a href={this.state.config_info.play_store_link} target="_blank"><span className="app-store-image"><img src="/img/playstore-logo.png" alt="" /></span></a></li>
            ) : null}
        </ul>
        );

        return (
          <>
            <header className="header-area2 fixed-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar2 navbar-expand-lg navbar-light sticky-top">
              <a className="navbar-brand navbar-brand2" href="/">
                  <img src={config.logo_img_root} alt="logo" />
                </a>
                <button className="hamburger hamburger--squeeze navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="hamburger-box">
                    <span className="hamburger-inner" />
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                  </ul>
                  <div className="main-menu-part2">
                  {menu_content}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Modal show={this.state.show} onHide={this.handleClose} className="login">
      <Modal.Header>
            <Button  className="close" aria-label="Close"  onClick = {this.handleClose}>
                <span aria-hidden="true">&times;</span>
        </Button>
        </Modal.Header>
        <Modal.Body>

          <Container>
              <div className = "login_icon">
                <img src ={config.logo_img_root} />
              </div>
          <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email" value = {this.state.email} onChange = {e => this.OnHandleFieldChange('email', e)} required/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value = {this.state.password} onChange = {e => this.OnHandleFieldChange('password', e)} required/>
                </Form.Group>
                <Form.Group controlId="formBasicChecbox">
                    <Form.Text   >Forgot password</Form.Text>
                </Form.Group>

        </Form>


         </Container>
        </Modal.Body>
        <Modal.Footer className="login-form-button">
        <Button variant="success" type="submit" size="lg" block onClick = {this.Logininformation}>
                    Login
                </Button>
         </Modal.Footer>

      </Modal>

      <Modal show={this.state.showmodal2} onHide={this.handleClosemodal2} className="login">
        <Modal.Header>
        <Button  className="close" aria-label="Close"  onClick = {this.handleClosemodal2}>
                <span aria-hidden="true">&times;</span>
        </Button>
        </Modal.Header>
        <Modal.Body>
        <Container>
                    <div className = "login_icon">
                        <img src = {config.logo_img_root} />
                    </div>
                    {this.state.register_Process == false ? (
                        <Form>
                        <Form.Group controlId="formBasicName">
                                <Form.Control type="text" placeholder="First Name" value = {this.state.firstname} onChange = {e => this.OnHandleFieldChange('first_name', e)} required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLname">
                                <Form.Control type="text" placeholder="Last Name" value = {this.state.lastname} onChange = {e => this.OnHandleFieldChange('last_name', e)} required />
                            </Form.Group>
                            <Form.Group controlId="formBasicCity">
                                <Form.Control type="text" placeholder="Enter City" value = {this.state.city} onChange = {e => this.OnHandleFieldChange('city', e)} required/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" value = {this.state.email} onChange = {e => this.OnHandleFieldChange('email', e)} required/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" value = {this.state.password} onChange = {e => this.OnHandleFieldChange('password', e)} required />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicCpassword">
                                <Form.Control type="password" placeholder="Confirm Password" value = {this.state.c_password} onChange = {e => this.OnHandleFieldChange('c_password', e)} required/>
                            </Form.Group> */}
                            <Form.Group controlId="formBasicChecbox">
                                <Form.Check type="checkbox" label="I Agree to the Terms & Conditions" />
                            </Form.Group>

                    </Form>
                    ): <div className ="thanku_registration"><h4>Thank You For Registration !!</h4>
                        <h6>Now You can logIn</h6>
                    </div>}



         </Container>

        </Modal.Body>
        <Modal.Footer className="login-form-button">
            {this.state.register_Process == false ? (
                <Button variant="success" type="submit" size="lg" block  onClick = {this.Registerinformation}>
                Register
            </Button>
            ) :(<Button variant="success" type="submit" size="lg" block  onClick = {this.Thankulogin}>
            Login
        </Button>)}

         </Modal.Footer>
      </Modal>
</>
        );
    }
}

export default HeaderTwo;
