import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from "react-router-dom";
import {config} from '../config';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import { Button ,
    Container,
      Row,
      Col,
    Form,
    } from 'react-bootstrap';
class Header extends Component {
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

            //c_password : null

        }
        this.Registerinformation = this.Registerinformation.bind(this);
        this.Logininformation = this.Logininformation.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.Thankulogin = this.Thankulogin.bind(this);

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
   //    sendData = (value1,value2) => {
   //      this.props.parentCallback(value1,value2);
   // }

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
      let local_user = localStorage.getItem('user');
      let local_token = localStorage.getItem('access_token');


            console.log("register_info",this.state.register_info);
            console.log("otp_info",this.state.otp_info);

            console.log("login_info",this.state.login_info);
            console.log("local_user",local_user);
            console.log("local_user",local_token);
        const header_content = local_user === null && local_token === null ?
          (<ul>
         <li><button  className="login" onClick = {this.handleShow}>Login</button></li>
         <li><button  className="signup" onClick = {this.handleShowmodal2}>Sign up</button></li>
         </ul>) : (<ul>
         <li><button  className="login" onClick = {this.handleShowlogout}>Logout</button></li>
         </ul>);

        return (
            <>
            <header className="header-area">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-sm-6 col-4">
                    <div className="header-left">
                        <a href="/"><img src="/img/Masa-Website-Logo-1.png" alt="logo" /></a>
                    </div>
                    </div>
                    <div className="col-sm-6 col-8">
                    <div className="header-right">

                          {header_content}

                    </div>
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
                <img src = "/img/Masa-Website-Logo-1.png" />
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
                        <img src = "/img/Masa-Website-Logo-1.png" />
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
        )
    }
}

export default Header;
