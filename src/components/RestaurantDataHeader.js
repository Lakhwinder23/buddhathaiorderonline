import React, { Component } from 'react';

class RestaurantDataHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            current_address:this.props && this.props.infoheader && this.props.infoheader.current_address ? this.props.infoheader.current_address : null
        }
    }
    render() {
        return (
            <div className="therader">
                <div className="container">
                <div className="theader-wrapper text-right">
                    <p>{this.state.current_address} <span><i className="fas fa-chevron-down" /></span></p>
                </div>
                </div>
            </div>
        );
    }
}

export default RestaurantDataHeader;