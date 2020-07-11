import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from "react-router-dom";
class NewRestaurant extends Component {
    constructor(props){
        super(props);
        this.state ={
            restaurant_data :[]
        }
    }
    componentDidMount(){
        const  url = "https://rules.restaurantbite.com/api/v1/merchants/shop/search?distance_min=0.0&distance_max=50000000&page=0&size=50&search=REGIONAL&lt=39.6579328&ln=-105.0799494&serviceType=NO&opened_only=false";
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
        console.log("new restaurant" ,this.state.restaurant_data);
        const new_restaurant = this.state.restaurant_data.slice(0,4).map((item,index) =>{

            const restaurant_link = `/restaurant/${item.merchant_id}`;
            return(
                <div className="col-lg-3 col-md-6" key={index}>
                <div className="res-list">
                <Link
                        to={{
                            pathname: `/restaurant/${item.merchant_id}`,
                           menuinfo: item.business.menu, restaurantinfo: item// your data array of objects
                        }}
                        ><img src={item.business.LOGO} alt="images not found" className="img-fluid" />
                    </Link>
                    <div className="res-details">
                    <Link
                        to={{
                            pathname: `/restaurant/${item.merchant_id}`,
                            restaurantinfo: item,menuinfo: item.business.menu// your data array of objects
                        }}
                        >
                        <h5>{item.name}</h5>
                        </Link>
                        <div className="price">
                            <span>35-40 mints</span>
                            <span>$15 min... </span>
                        </div>
                        <div className="rating">
                        <StarRatingComponent
                                    name="rate2"
                                    editing={false}
                                    starCount={5}
                                    value={item.business.rating}
                                />
                            <span>{item.business.rating} ratings</span>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
        return (
            <div className="n-restaurants-area">
                <div className="container">
                    <h4>Check out these new restaurants!</h4>
                    <div className="row">
                        {new_restaurant}
                    </div>
                    <h5><a href="/restaurants" className="view-allres">View All Restaurants</a></h5>
                </div>
    </div>
        );
    }
}

export default NewRestaurant;
