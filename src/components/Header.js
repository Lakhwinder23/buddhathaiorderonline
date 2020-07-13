import React from 'react'
import {config} from '../config';
import { Link } from "react-router-dom";

function Header(props){
  const restId = config.resid
  const menu_content =
        <ul>
          <li><a href="/#menu">Menu</a></li>
          <li><a href={"https://dinereserve.com/booktable/" + restId} rel="noopener noreferrer" target="_blank">Reservation</a></li>
          <li><a href="/#location">Location</a></li>
          <li className="phone-header"><a href="/"><span className="phone-ic"><img src="/img/phone-icon-new.png" alt="" /></span>{props && props.banner_info ? props.banner_info.MERCHANT_CONTACT : null}</a></li>
          <li className="cart-numbers"><Link
            to={{
              pathname: "/cart"
            }}
          ><span className="cart-image"><img src="/img/cart-image-new.png" alt="" /></span></Link><span className='badge badge-warning' id='lblCartCount'> {props && props.Detailed_cart_item ? props.Detailed_cart_item.length : 0} </span></li>
          {
            // <li><button  className="headertwo_login" onClick = {this.handleShow}>Login</button></li>
            // <li><button  className="headertwo_signup" onClick = {this.handleShowmodal2}>Sign up</button></li>
          }

          {props && props.configInfo && Object.keys(props.configInfo).length > 0 && props.configInfo.app_store_link  ? (
          <li className ="app-store"><a href={props.configInfo.app_store_link} target="_blank" rel="noopener noreferrer"><span className="app-store-image"><img src="/img/app-store-img.png" alt="" /></span></a></li>
        ) : null}
        {props && props.configInfo && Object.keys(props.configInfo).length > 0 && props.configInfo.play_store_link  ? (
          <li className ="play-store"><a href={props.configInfo.play_store_link} target="_blank" rel="noopener noreferrer"><span className="app-store-image"><img src="/img/playstore-logo.png" alt="" /></span></a></li>
            ) : null}

        </ul>

  return(
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
  )
}

export default Header
