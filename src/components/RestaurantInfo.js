import React, { Component } from 'react';

class RestaurantInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurants_data: []
        }
    }
    
    componentDidMount(){
        if(this.props.location.data){
            
        const url= `https://developers.zomato.com/api/v2.1/geocode?lat=${this.props.location.data.latitude}&lon=${this.props.location.data.longitude}`;
        const request = new Request(url, {
            headers: new Headers({
              'Content-Type': 'application/json',
              'user-key':'56456945cb0f4fb7b2c546b5571131af'
            })
          })
    fetch(request).then(response => response.json())
  .then(body => this.setState({
      restaurants : body.nearby_restaurants
  }))
    }
}
    render() {
        console.log('data',this.props.location.restaurantinfo);
        return (
            <div>
                <p>{this.props.location.restaurantinfo.name}</p>
                <p>{this.props.location.restaurantinfo.id}</p>
                <p>{this.props.location.restaurantinfo.cuisines} </p>
            </div>
        );
    }
}

export default RestaurantInfo;