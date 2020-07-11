import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";
import HeaderTwo from './HeaderTwo';
import Search from './Search';
import AboveHeader from './AboveHeader';
import Pagination from "react-js-pagination";
// import { connect } from "react-redux";
// import { createContact } from "../share_data/actions";

import Footer from './Footer';
import { Redirect } from "react-router-dom";
class Restaurant extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants: [],
            restaurant_data:[],
            activePage: 1,
            message:'',
            restaurant_location:this.props.location && this.props.location.location_data ? this.props.location.location_data : []
        }
    }
    handlePageChange(pageNumber) {
       console.log(`active page is ${pageNumber}`);
       this.setState({activePage: pageNumber});
     }
    componentDidMount(){



    //const  url = "https://rules.restaurantbite.com/api/v1/merchants/shop/search?distance_min=0.0&distance_max=100&page=0&size=50&search=REGIONAL&lt=40.016870&ln=-105.0799494&serviceType=NO&opened_only=false";
    const  url = `https://rules.restaurantbite.com/api/v1/merchants/shop/search?distance_min=0.0&distance_max=100&page=0&size=100&search=REGIONAL&lt=${this.state.restaurant_location.latitude}&ln=${this.state.restaurant_location.longitude}&serviceType=NO&opened_only=false`;
    const bearer = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3NfdG9rZW4iOiIxNGY5ZDYzZS0xZDVkLTRhYjYtYWMyNi0zNDdlYjhkMWE3Y2EiLCJzdWIiOiJvcmcuc3ByaW5nZnJhbWV3b3JrLnNlY3VyaXR5LmNvcmUudXNlcmRldGFpbHMuVXNlckBjYmU5YjVkYTogVXNlcm5hbWU6IHRpZmZpbjsgUGFzc3dvcmQ6IFtQUk9URUNURURdOyBFbmFibGVkOiB0cnVlOyBBY2NvdW50Tm9uRXhwaXJlZDogdHJ1ZTsgY3JlZGVudGlhbHNOb25FeHBpcmVkOiB0cnVlOyBBY2NvdW50Tm9uTG9ja2VkOiB0cnVlOyBOb3QgZ3JhbnRlZCBhbnkgYXV0aG9yaXRpZXMiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE1MjY1NDExMzUyNjUsImV4cCI6Nzc2NjI4MTE1Nzk5MzM3Nn0.iBYnE8GECEHDNjm7rXPV72VaYSOBkAyBg_woOBn3DeDOV7p-RU-KjnECFUnntZHW6qBYYyZGZnrMMIrESoKM5g';
    fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
          .then((responseData) => {
              console.log("search results", responseData);
            this.setState({
              restaurant_data: responseData.data,
            });
          })
        .catch(error => this.setState({
            message: 'Something bad happened ' + error
        }));

    }


    render() {

      if (
        this.state.restaurant_location.length  == 0
      ) {
        return <Redirect to="/" />;
      }

      console.log("restaurant_email", this.props.email);
      console.log("restaurant_access_token", this.props.access_token);
        console.log("api data",this.state.restaurant_data);



        //console.log("json data",this.renderrestaurant_data);
        console.log("restaurant_locationnew", this.state);
        const itemlist = this.state.restaurant_data.map((item,index) =>{
          console.log("menuinfo" , item.business.url_point);
          const restaurant_link = `/restaurant`;
            return(

                    <div className="col-lg-3 col-md-6" key={index}>
                  <div className="restaurant-item">
                  <Link
                        to={{
                            pathname: `/restaurant/${item.merchant_id}`
                        }}
                        ><img className="restaurant-image" src={item.business.LOGO} alt="images not found" />
                </Link>

                    <div className="restaurant-bdr">
                      <div className="restaurant-content">
                      <Link
                        to={{
                            pathname: `/restaurant/${item.merchant_id}`
                        }}
                        ><h4>{item.name}</h4>
                </Link>

                      
                        <div className="ratings-part">
                          <div className="row">
                            <div className="col-6">
                              <span>35-40 mints</span>
                              <span>$15 min...</span>
                            </div>
                            <div className="col-6">

                                <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    value={item.business.rating}
                                />

                              <span className="rating-last">{item.business.rating} ratings</span>
                            </div>
                          </div>
                        </div>
                      </div>
                     {//<div className="coupon-part">
                        //<a href="#">
                        //  <img src="img/res-icon.png" alt="images not found" />
                        //  40% off | Use coupon Dining8005
                        //</a>
                      //</div>
                    }
                    </div>
                  </div>
                </div>



            )
        });
        return (
            <>
            <AboveHeader info = {this.state.restaurant_location}/>
            <HeaderTwo />
            <Search />
            <div>
        {/* Restaurants-area start */}
        <div className="restaurants-part">
          <div className="container">
            <div className="restaurants-bdr">
              <div className="res-part-top">
                <h2>Restaurants</h2>
              </div>
              <div className="row">
              {this.state.restaurant_data.length > 0 ?
                itemlist : (
                  <div className="loader">
                  <img src="/img/loc-loader.gif"/>
                  </div>
                ) }
              </div>
            </div>
          </div>
        </div>
        {/* Restaurants-area end */}
      </div>
  {
  //   <Pagination
  //   prevPageText='prev'
  //   nextPageText='next'
  //   firstPageText='first'
  //   lastPageText='last'
  //   activePage={this.state.activePage}
  //   itemsCountPerPage={10}
  //   totalItemsCount={450}
  //   pageRangeDisplayed={5}
  //   onChange={e =>this.handlePageChange(e)}
  // />
}

      <Footer />
            </>
        );
    }
}


// const mapStateToProps = state => ({
//   contact: state.contact
// });

// const mapDispatchToProps = dispatch => ({
//   createContact: data => dispatch(createContact(data))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Restaurant);

export default Restaurant;
