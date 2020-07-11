import React, { Component } from 'react';

class AboveHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboveheader_current_address : this.props.info && this.props.info.length > 0 ? this.props.info.current_address : null
        }
    }
    render() {
        console.log("above Header data",this.props.info);
        return (
            <div className="therader">
                <div className="container">
                <div className="theader-wrapper text-right">
                    <p>{this.state.aboveheader_current_address} <span><i className="fas fa-chevron-down" /></span></p>
                </div>
                </div>
            </div>
        );
    }
}

export default AboveHeader;
