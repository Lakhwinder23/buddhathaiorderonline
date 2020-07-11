import React, { Component } from 'react';
import {config} from '../config';

class Footer extends Component {
  constructor(props){
    super(props);
    this.state = {
      timing_token : null,
  timing:[],
  config_info : []
    }
  }
  componentDidMount(){
  const url_token = `${config.api_root}/security/session/merchants?Key=${config.key_value}&Secret=${config.secret_value}&device_id=21212121121212wqwqw`;
  fetch(url_token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Key" : config.key_value,
      "Secret" : config.secret_value
    }
  })
    .then(response => response.json())
    .then(cartData => {
      this.setState({
        timing_token: cartData.object.access_token
      },() =>{
        const url_info =
        `${config.api_base}/merchants/config?device_id=21212121121212wqwqw&Key=${config.key_value}&Secret=${config.secret_value}&access_token=${this.state.timing_token}`;
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

        const bearer = "Bearer " + this.state.timing_token;
        const url_timing = `${config.api_base}/merchants/timing_v2`;
        fetch(url_timing, {
          method: "GET",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(timing => {
            this.setState({
              timing: timing.data
            });
          }).catch(error =>
            this.setState({
              message: "Something bad happened " + error
            })
          );
      });
    }).catch(error =>
      this.setState({
        message: "Something bad happened " + error
      })
    );
}
    render() {
      const current_url = window.location.href;
      const ischeckoutpage = current_url.search("checkout");
      console.log('current_url',current_url.search("checkout"));
      console.log("timing_token",this.state.timing_token);
      console.log("timing",this.state.timing);
        return (
          <>
          <footer className="footer">
                <div className="container">
                    <div className="row">
                    <div className="col-md-4 mb-3 border-right">
                        <div className="footer-logo"><img src={config.logo_img_root} alt="" /></div>
                    </div>
                    <div className="col-md-4 mb-3 border-right">
                        <div className="schedule">
                        {this.state.timing && this.state.timing.length > 0 ? this.state.timing.map((time,index) =>{
                      return(
                          <>
                          <span className="time-ico"><img src="/img/time-icon.png" alt="" /></span>
                        <span className="time-text"><span class="Day">{time.openingDay + " - " + time.closingDay}</span></span><br/>
                        <span class="opening-hours">Opening Hours : {time.openingTime} - {time.closingTime}</span><br></br><br></br>
                          </>
                        )

                      }) :null}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="footer-address">

                            <span className="time-ico"><img src="/img/home-icon.png" alt="" /></span>
                            <span className="time-text">{this.props && this.props.banner_info ? (<>{this.props.banner_info.address_address},  {this.props.banner_info.address_city},CO {this.props.banner_info.name_point}  </>) : null}<br></br>
                            {
                            //   <span className="time-ico"><img src="/img/phone-icon.png" alt="" /></span>
                            // <span className="time-text">{this.props && this.props.banner_info ? this.props.banner_info.MERCHANT_CONTACT : null}<br></br></span>
                          }
                            {/* <span className="time-ico"><img src="img/mail-icon.png" alt="" /></span> */}
                            {/* <span className="time-text"><a href="mailto:info@gaiamasalasindiacafe.com">info@gaiamasalasindiacafe.com</a></span></span> */}

                            </span>
                            {this.state.config_info && Object.keys(this.state.config_info).length > 0 && this.state.config_info.qr_code_100  ? (
                              <div className="qr-code-information"><span className = "qr-code"><img src={this.state.config_info.qr_code_100} alt="" /></span>
                                <span className = "qr-code-text">Download the {this.props && this.props.banner_info ? this.props.banner_info.name : null} Order App</span>
                              </div>) : null}
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                </div>

                {/* <!-- /.container --> */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 copyright-text">
                                © 2020  |  Privacy Policy
                            </div>
                            <div className="col-md-6 footer-social">
                            {
                                // <a href="#" target="_blank"><img src="/img/google.jpg" alt="" /></a>
                                // <a href="#" target="_blank"><img src="/img/insta.jpg" alt="" /></a>
                                // <a href="#" target="_blank"><img src="/img/twitter.jpg" alt="" /></a>
                              //  <a href="https://www.facebook.com/pages/Thai-Kitchen/117770488250191" target="_blank"><img src="/img/fb.jpg" alt="" /></a>
                              }

                            </div>
                        </div>
                    </div>
                </div>

          </footer>
        </>
        );
    }
}

export default Footer;
