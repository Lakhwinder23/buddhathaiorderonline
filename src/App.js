import React,{ Component } from 'react';
import HeaderTwo from './components/HeaderTwo';
import BelowHeader from './components/BelowHeader';
import Service from './components/Service';
import FavoriteRestaurant from './components/FavoriteRestaurant';
import Book_table from "./components/Book_table";
import NewRestaurant from './components/NewRestaurant';
import PopularRestaurant from './components/PopularRestaurant';
import Footer from './components/Footer';
import RestaurantData2 from './components/RestaurantData2';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        user_email : "",
        access_token : ""
    }
  }
  callbackFunction = (value1,value2) => {
    this.setState({
      user_email: value1,
      access_token : value2
    },()=>{
      this.sendDataApp(this.state.user_email,this.state.access_token);
    })
}

sendDataApp = (value_email,value_accesstoken) => {
  this.props.parentCallbackRoot(value_email,value_accesstoken);
}
  render() {
    console.log("email",this.state.user_email);
    console.log("access_token",this.state.access_token);
    return (
          <div className="App">
          {
            // <HeaderTwo/>
            // <BelowHeader />
            // <Service />
            // <FavoriteRestaurant />
            // <NewRestaurant />
            // <PopularRestaurant />
            // <Book_table />
            // <Footer />
          }
          <RestaurantData2 />
          </div>
        );
  }
}


export default App;
