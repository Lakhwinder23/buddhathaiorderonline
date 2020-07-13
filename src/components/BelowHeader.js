import React,{useEffect,useMemo,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {config} from '../config';

function BelowHeader(){
  const restaurantInformation_data = useSelector(state =>state.RestaurantInformation)
  console.log("restaurantInformation_data",restaurantInformation_data)
  return(
    <>
            <header className="bg-image-full cafe-header" style={{backgroundImage: `url(${restaurantInformation_data &&
              Object.keys(restaurantInformation_data).length > 0 &&
              restaurantInformation_data.restaurant_info &&
              restaurantInformation_data.restaurant_info.object &&
              restaurantInformation_data.restaurant_info.request_status === true &&
              restaurantInformation_data.restaurant_info.object.BANNER ?
              restaurantInformation_data.restaurant_info.object.BANNER : null
            })`}}>
              <div className="header-caption">
                  <div className="header-caption-inner">
                  Authentic<br></br><span>American, Mediterranean, and Indian cuisine</span>
                  </div>
              </div>
          </header>
          </>
  )
}

export default BelowHeader
