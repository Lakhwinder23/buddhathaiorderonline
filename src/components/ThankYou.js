import React, { Component } from 'react';
import HeaderTwo from "./HeaderTwo";
import Footer from "./Footer";
class ThankYou extends Component {
    render() {
        return (
            <>
                <HeaderTwo />
                <div className = "row">
                    <div className ="container">
                        <div className ="Booking-confirmation">
                        <h2>Thank You!</h2>
                        <h2>Order Successfull!</h2>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default ThankYou;