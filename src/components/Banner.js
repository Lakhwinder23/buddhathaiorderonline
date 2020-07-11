import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Geocode from "react-geocode";

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            Banner_data:this.props && this.props.Bannerdata ? this.props.Bannerdata : []
        }
    }
    // componentDidMount() {
    //     if(this.props.Bannerdata){


    //         if (this.state.Banner_data.location_latitude !== null && this.state.Banner_data.location_longitude !== null) {
    //           fetch(
    //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.Banner_data.location_latitude},${this.state.Banner_data.location_longitude}&sensor=false&key=AIzaSyAbGLWqhmWGpFt8Ppc8WSDc8mDfyv2oI84`
    //           )
    //             .then(response => response.json())
    //             .then(response => {
    //               console.log(response.results[0].formatted_address);
    //               this.setState({
    //                 address: response.results[0].formatted_address
    //               });
    //             });
    //         }
    //     }
    //   }
    render() {

         //console.log('Bannerdata',this.props.Bannerdata.location_latitude);
        // console.log('Bannerdataname',this.props.Bannerdata.location.address);
        // Geocode.setApiKey(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.Banner_data.location_latitude},${this.state.Banner_data.location_longitude}&sensor=false&key=AIzaSyAbGLWqhmWGpFt8Ppc8WSDc8mDfyv2oI84`);

          console.log('address',this.state.Banner_data);
        return (
            <div className="banar">
                <div className="container">
                <div className="bn-wrapper ">
                    <div className="row">
                    <div className="col-lg-6">
                        <div className="bn-left">
                        <div className="bnl-one">
                            <img src={this.state.Banner_data.LOGO} alt="images not found" />
                        </div>
                        <div className="bnl-two">
                            <h5>{this.state.Banner_data.name}</h5>
                            <p>{this.state.Banner_data.tagLine}</p>
                            <span></span>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6 ">
                        <div className="bn-right">
                        <div className="bnr-one text-center">
                            <div className="bnro-left">
                                <div className="star-banner">
                            <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    value={this.state.Banner_data.rating}
                                />
                                </div>
                            <span className="reating">{this.state.Banner_data.rating}</span>
                            <p>{this.state.Banner_data.rating} ratings</p>
                            </div>
                            <div className="bnro-right text-center">
                            <h6>$20</h6>
                            <p>Cost for two</p>
                            </div>
                        </div>
                        <div className="bnr-two">
                            <div className="bnrt-left text-center">
                            <h6>45 Mins</h6>
                            <p>Delivery Time</p>
                            </div>
                            <div className="bnrt-right text-center">
                            <h6>Offer</h6>
                            <p>30% off an orders above <br />
                                $10 up to $1 Use coupon USAFirst
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
      </div>
        );
    }
}

export default Banner;
