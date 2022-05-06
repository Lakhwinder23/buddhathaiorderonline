import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch, useStore } from 'react-redux';
import {config} from '../config';
import { Link } from "react-router-dom";
import { fetchRestaurantInformation } from '../Redux/RestaurantInformation/RestaurantInformationActions';

function Header(props){

  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)

  const restId = config.resid
  const menu_content =
        <ul>
          <li><a href="/#menu">Menu</a></li>
          <li><a href={"https://dinereserve.com/booktable/" + restId} rel="noopener noreferrer" target="_blank">Reservation</a></li>


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
              <nav className="navbar navbar2 navbar-expand-lg navbar-light">
              <a className="navbar-brand navbar-brand2" href="/">
                  <img src={restaurantInformation_data && restaurantInformation_data.restaurant_info && restaurantInformation_data.restaurant_info.object && restaurantInformation_data.restaurant_info.object.LOGO ? restaurantInformation_data.restaurant_info.object.LOGO : '/img/logo-loader.gif'} alt="logo" />
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
