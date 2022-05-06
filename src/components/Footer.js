import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {config} from '../config';
import { fetchRestaurantTiming } from '../Redux/RestaurantTiming/RestaurantTimingActions';
function Footer(props){
  // store data access start
const restaurantTiming_data = useSelector(state =>state.RestaurantTiming)
  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
// store data access End
  const dispatch = useDispatch()  // for accessing the redux function

  // component all states define start
  const [restaurantTimingInfo,setRestaurantTimingInfo] = useState([])
  // component all states define End

   //hooks start
   useEffect(() =>{
     if(props && props.merchantInfo && props.merchantInfo.access_token){
       const user_token = props.merchantInfo.access_token
       dispatch(fetchRestaurantTiming(user_token))
     }
   },[dispatch && props && props.merchantInfo])

   useMemo(()=>{
    if(restaurantTiming_data && restaurantTiming_data.restaurant_timing && restaurantTiming_data.restaurant_timing.data){
      setRestaurantTimingInfo(restaurantTiming_data.restaurant_timing.data)
    }
  },[restaurantTiming_data])
   //hooks end
  return(
    <>
      <footer className="footer">
            <div className="container">
                <div className="row">
                <div className="col-md-4 mb-3 border-right">
                {
                  //<div className="footer-logo"><img src={config.logo_img_root} alt="" /></div>
                }
                <div className="schedule">
                <a className="navbar-brand navbar-brand2" href="/">
                    <img src={restaurantInformation_data && restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.LOGO ? restaurantInformation_data.restaurant_info.object.LOGO : '/img/logo-loader.gif'} alt="logo" />
                  </a>
                </div>
                </div>
                <div className="col-md-4 mb-3 border-right">
                <div className="footer-address">
                    <h5>Address</h5>
                    <span className="time-ico"><img src="/img/home-icon.png" alt="" /></span>
                    <span className="time-text">{props && props.banner_info ? (<>{props.banner_info.address_address},  {props.banner_info.address_city},{props.banner_info.address_state} {props.banner_info.name_point}  </>) : null}<br></br>
                    {
                    //   <span className="time-ico"><img src="/img/phone-icon.png" alt="" /></span>
                    // <span className="time-text">{this.props && this.props.banner_info ? this.props.banner_info.MERCHANT_CONTACT : null}<br></br></span>
                  }
                    {/* <span className="time-ico"><img src="img/mail-icon.png" alt="" /></span> */}
                    {/* <span className="time-text"><a href="mailto:info@gaiamasalasindiacafe.com">info@gaiamasalasindiacafe.com</a></span></span> */}

                    </span>
                    {props && props.configInfo && Object.keys(props.configInfo).length > 0 && props.configInfo.qr_code_100  ? (
                      <div className="qr-code-information"><span className = "qr-code"><img src={props.configInfo.qr_code_100} alt="" /></span>
                        <span className = "qr-code-text">Download the {props && props.banner_info ? props.banner_info.name : null} Order App</span>
                      </div>) : null}
                </div>
                </div>
                <div className="col-md-4 mb-3">
                <div className="google-map">
                  <h5>Location</h5>
                    <iframe src={config.iframe_root} title="myFrame" width="100%" height="225" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>

                  {
                  //<iframe src={`https://maps.google.com/maps/place?q=${latitude},${longitude}&z=15&output=embed`} width="100%" height="880" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
                }

                    </div>
                </div>
                <div className="clear"></div>
            </div>
            </div>

            {/* <!-- /.container --> */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 copyright-text">
                            © 2022  |  <a href="/privacy-policy">Privacy Policy</a> |  <a href="/terms-of-use">Terms of Use</a>
                        </div>
                        <div className="col-md-6 footer-social">
                        {
                            // <a href="#" target="_blank"><img src="/img/google.jpg" alt="" /></a>
                            // <a href="#" target="_blank"><img src="/img/insta.jpg" alt="" /></a>
                            // <a href="#" target="_blank"><img src="/img/twitter.jpg" alt="" /></a>
                          }
                            {
                              //<a href={config.facebook_link} target="_blank" rel="noopener noreferrer"><img src="/img/fb.jpg" alt="" /></a>
                            }
                        </div>
                    </div>
                </div>
            </div>

      </footer>
    </>
  )
}

export default Footer
