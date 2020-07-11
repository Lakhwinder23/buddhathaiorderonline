import React,{Component} from 'react';
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import StripeScriptLoader from "react-stripe-script-loader";
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Restaurant from './components/Restaurant';
import RestaurantInfo from './components/RestaurantInfo';
import RestaurantInfo2 from './components/RestaurantInfo2';
import RestaurantData from './components/RestaurantData';
import RestaurantData2 from './components/RestaurantData2';
import Checkout from './components/Checkout';
import Contactus from './components/Contactus';
import Cart from './components/Cart';
import Book_table from "./components/Book_table";

import ThankYou from './components/ThankYou';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';


class Root extends Component {
    constructor(props){
        super(props);{
            this.state = {
                user_root_email : "",
                user_root_access_token : "",
                id : "951b86ebef0c3ef40d3f38f76da17242",
                stripe_info : null,
                stripe_publish_key : null,
                stripe_account_id : null
            }
        }
    }
    callbackFunctionRoot = (value1,value2) => {
        this.setState({
            user_root_email: value1,
            user_root_access_token : value2
        })
    }

    callbackFunction = (stripe_info) => {
    this.setState({
      stripe_info: stripe_info
    },() =>{
      this.setState({
        stripe_publish_key : this.state.stripe_info.STRIPE_PUBLISHABLE_KEY
      })
      console.log("neha###################################################################################################################################################################");
      if(this.state.stripe_info.STRIPE_ACCOUNT_ID){
        this.setState({
          stripe_account_id :this.state.stripe_info.STRIPE_ACCOUNT_ID
        })
      }
    })

}
    render() {
        console.log("email_root",this.state.user_root_email);
        console.log("access_root",this.state.user_root_access_token);

        return (
        <Router>
            <Switch>

                 <Route path="/restaurants" component={Restaurant}/>
                 <Route path="/restaurantinfo" component={RestaurantInfo} />
                 <Route path="/restaurantinfo2" component={RestaurantInfo2} />
                 <Route exact path="/" render={(props) => <RestaurantData2 {...props} parentCallback={this.callbackFunction} />}/>
                 <Route path="/restaurant2" component={RestaurantData}  />
                <Route path="/booktable" component={Book_table}  />
                <Route path="/cart" component={Cart}  />
                 <Route path="/thankyou" component={ThankYou} />
                 <Route path="/contact-us" component={Contactus} />
                 <StripeScriptLoader
                  uniqueId="myUniqueId"
                  script="https://js.stripe.com/v3/"
                  loader="Loading..."
                >

                <StripeProvider  apiKey={this.state.stripe_publish_key != null  ? this.state.stripe_publish_key : 'pk_test_sn4v71GtpdSuGyF3oVJLSj7I'} stripeAccount={this.state.stripe_account_id != null &&  this.state.stripe_account_id ?  this.state.stripe_account_id : undefined}>
                <Elements>
                <Route path="/checkout" component={Checkout} />
                </Elements>
                 </StripeProvider>
                 </StripeScriptLoader>
            </Switch>
        </Router>
        );
    }
}

export default Root;
