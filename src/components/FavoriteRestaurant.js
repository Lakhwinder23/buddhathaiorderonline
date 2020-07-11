import React, { Component } from 'react';

class FavoriteRestaurant extends Component {
    render() {
        return (
            <section className="apps-area">
                    <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                        <div className="apps-content">
                            <h4>Find Favorite<br></br>Restaurants</h4>
                            <p>No matter your fancy, we have great food for you from locally owned restaurants who are serving up the best dishes around.</p>
                            <p>See full menus, check out reviews, save your favorites so you can easily reorder with the click of a button. Get your food for pickup or deivery with just a few clicks!</p>
                            <div className="app-links">
                            <div className="google-link">
                                <a href="#">
                                <img src="img/google-play.png" alt="images not found" className="img-fluid" />
                                </a>
                            </div>
                            <div className="iphone-link">
                                <a href="#">
                                <img src="img/iphone.png" alt="images not found" className="img-fluid" />
                                </a>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                        <div className="app-img">
                            <img src="img/app-img-2.png" alt="images not found" className="img-fluid" />
                        </div>
                        </div>
                    </div>
                    </div>
      </section>
        );
    }
}

export default FavoriteRestaurant;
