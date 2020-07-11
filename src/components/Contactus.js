import React, { Component } from 'react';
import HeaderTwo from "./HeaderTwo";
import Footer from "./Footer";
export default class Contactus extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname : "",
      lastname : "",
      email: "",
      phone : "",
      msg : "",
      formEmailSent : "false"
    }
  }
  OnHandleFieldChange = (field, event) => {
      const new_state = {};
      new_state[field] = event.target.value;
      this.setState(new_state);
  };
  handlesubmit = (event) =>{
    event.preventDefault();
    const templateId = 'template_OiKEDLqG';
    const template_params = {
   "from_firstname": this.state.firstname,
   "from_lastname": this.state.lastname,
   "sender_email": this.state.email,
   "reply_to": this.state.email,
   "message_html": this.state.msg,
   "phone_number": this.state.phone
}

	this.sendFeedback(templateId,template_params)

  // const {
  //         REACT_APP_EMAILJS_RECEIVER: this.state.email,
  //         REACT_APP_EMAILJS_TEMPLATEID: "template_Du8yKcLa",
  //         REACT_APP_EMAILJS_USERID: "user_6DahRZGBxPlQJldLh0kDr"
  //       } = this.props.env
  //
  //       this.sendFeedback(
  //         template,
  //         this.props.senderEmail,
  //         receiverEmail,
  //         this.state.feedback,
  //         user
  //       )
  }

  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'gmail', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
      this.setState({ formEmailSent: true })
  	})
  	// Handle errors here however you like, or use a React error boundary
    // window.emailjs.send(
    //       'gmail', // default email provider in your EmailJS account
    //       templateId,
    //       {
    //         senderEmail,
    //         receiverEmail,
    //         feedback
    //       },
    //       user
    //     )
    //       .then(res => {
    //         this.setState({ formEmailSent: true })
    //       })
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
    render() {
      console.log("new state",this.state);
        return (
            <>
            <HeaderTwo />
            {this.state.formEmailSent == "false" ? (
              <div className="con-get">
                  <div className="container">
                    <div className="con-get-heading text-center">
                      <h3>Questions? Contact Us!</h3>
                      <h5>If you have any questions, please contact us below. <br />
                        We will respond to all inquiries within 2 business days.</h5><br /><br />
                    </div>
                    <div className="row">
                      <div className="col-lg-8 offset-lg-2 col-md-12">
                        <div className="con-form">

                          <form>
                            <label>Please enter your full name:</label>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="fname">
                                  <input type="text" name="firstName" className="form-control" placeholder="First Name" value = {this.state.firstname} onChange = {e => this.OnHandleFieldChange('firstname', e)}/>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="fname">
                                  <input type="text" name="lastName" className="form-control" placeholder="Last Name" value = {this.state.lastname} onChange = {e => this.OnHandleFieldChange('lastname', e)}/>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="fname">
                                  <label>Enter your email address:</label>
                                  <input type="email" className="form-control" name="email" placeholder="Your Email Address" value = {this.state.email} onChange = {e => this.OnHandleFieldChange('email', e)}/>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="fname">
                                  <label>Enter your phone no:</label>
                                  <input type="text" className="form-control" name="phone_no" placeholder="Your Phone No " value = {this.state.phone} onChange = {e => this.OnHandleFieldChange('phone', e)}/>
                                </div>
                              </div>
                            </div>
                            <label>Please type your message:</label>
                            <textarea className="form-control" rows={4} name="message" defaultValue={"Hi......."} value = {this.state.msg} onChange = {e => this.OnHandleFieldChange('msg', e)}/>
                            <div className="con-submit text-center">
                              <button type="submit" onClick = {this.handlesubmit}>Send</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ) :(
              <div className = "row">
                  <div className ="container">
                      <div className ="Thanku-contacting">
                      <h2>Thank You For Contacting Us!</h2>
                      <h4>We will get back to you shortly.</h4>
                      </div>
                  </div>
              </div>
            )}


            <Footer />
            </>
        )
    }
}
