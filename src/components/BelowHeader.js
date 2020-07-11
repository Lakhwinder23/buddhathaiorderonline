import React, { Component } from 'react';
// import { geolocated } from "react-geolocated";
//import '../css/bootstrap-3.3.4-dist/css/bootstrap.min.css';
import {config} from '../config';
import { Link } from "react-router-dom";
class BelowHeader extends Component {


    render() {
        return (

          <>
              <header className="bg-image-full cafe-header" style={{backgroundImage: `url(${config.banner_img_root})`}}>
                <div className="header-caption">
                    <div className="header-caption-inner">
                    Authentic<br></br><span>American, Mediterranean, and Indian cuisine</span>
                    </div>
                </div>
            </header>
            </>


        )
    }
}
// export default geolocated({
//   positionOptions: {
//       enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(BelowHeader);

export default BelowHeader;
