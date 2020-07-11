import React, { Component } from 'react';

class Service extends Component {
    render() {
        return (
            <section className="services-area">
                <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                    <div className="service-item">
                        <div className="service-item-inner">                        
                        <img src="img/search-by-address.png" alt="images not found" className="img-fluid" />
                        <div className="service-details">
                        <h5>Search by Address</h5>
                        <p>Find all restaurants available in your zone.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                    <div className="service-item">
                    <div className="service-item-inner">
                        <img src="img/choose-a-restaurant.png" alt="images not found" className="img-fluid" />
                        <div className="service-details">
                        <h5>Choose a Restaurant</h5>
                        <p>We have many restaurants to choose from</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                    <div className="service-item">
                    <div className="service-item-inner">
                        <img src="img/Delivery-or-pickup.png" alt="images not found" className="img-fluid" />
                        <div className="service-details">
                        <h5>Delivery or Pickup</h5>
                        <p>Whatever you choose, your food is ready right away!</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
      </section>
        );
    }
}

export default Service;