import React,{useMemo,useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './Redux/store';
import { Provider } from 'react-redux';
import App from './App';
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import ThankYou from './components/ThankYou'
import PrivacyPolicy from './components/privacypolicy'
import TermsOfUse from './components/termsofuse'
import {StripeProvider} from 'react-stripe-elements';
import {Elements} from 'react-stripe-elements';
import StripeScriptLoader from "react-stripe-script-loader";
import { fetchMerchantToken } from './Redux/MerchantToken/MerchantTokenActions';
import { fetchConfig } from './Redux/Config/ConfigActions';


function Root(){
  const [merchantToken,setMerchantToken] = useState('')
  const [stripe_info,setStripe_info] = useState([])
  const [stripe_publish_key,setStripe_publish_key] = useState(null)
  const [stripe_account_id,setStripe_account_id] =useState(null)
  console.log("storeData",stripe_account_id)
  store.subscribe(() => {
    if(store.getState() &&
    store.getState().MerchantToken &&
    store.getState().MerchantToken.merchant_token &&
    store.getState().MerchantToken.merchant_token.request_status === true &&
    store.getState().MerchantToken.merchant_token.object &&
    store.getState().MerchantToken.merchant_token.object.access_token
  ){
    setMerchantToken(store.getState().MerchantToken.merchant_token.object.access_token)
  }
  console.log('[Subscribe]', store.getState());
});

store.subscribe(() => {
  if(store.getState() &&
  store.getState().Config &&
  store.getState().Config.config &&
  store.getState().Config.config.request_status === true &&
  store.getState().Config.config.object
){
  if(store.getState().Config.config.object.STRIPE_PUBLISHABLE_KEY){
    setStripe_publish_key(store.getState().Config.config.object.STRIPE_PUBLISHABLE_KEY)
  }
  if(store.getState().Config.config.object.STRIPE_ACCOUNT_ID){
    setStripe_account_id(store.getState().Config.config.object.STRIPE_ACCOUNT_ID)
  }
}
console.log('[Subscribe]', store.getState());
});
  useEffect(() => store.dispatch(fetchMerchantToken()), []);
  useMemo(() =>{
    if(merchantToken !=''){
      console.log("neha")
      store.dispatch(fetchConfig(merchantToken))
    }
  },[merchantToken])

  // useMemo(() =>{
  //   if(stripe_info && Object.keys(stripe_info).length > 0){
  //     setStripe_publish_key(stripe_info.STRIPE_PUBLISHABLE_KEY)
  //     if(stripe_info.STRIPE_ACCOUNT_ID){
  //       setStripe_account_id(stripe_info.STRIPE_ACCOUNT_ID)
  //     }
  //   }
  // },[stripe_info])
  //
  const stripe_info_callbackFunction = (childdata) =>{
    setStripe_info(childdata)
  }
        return (
          <Provider store={store}>
            <Router>
            <Switch>
                <Route exact path="/"  component={App}/>
                <Route path="/cart" component={Cart} />
                <Route path="/thankyou" component={ThankYou} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-of-use" component={TermsOfUse} />
                <StripeScriptLoader
                  uniqueId="myUniqueId"
                  script="https://js.stripe.com/v3/"
                  loader="Loading..."
                >

                <StripeProvider  apiKey={stripe_publish_key != null  ? stripe_publish_key : 'pk_test_sn4v71GtpdSuGyF3oVJLSj7I'} stripeAccount={stripe_account_id != null ?  stripe_account_id : undefined}>
                <Elements>
                <Route path="/checkout"  render={(props) => <Checkout {...props} stripe_info_parentCallback={stripe_info_callbackFunction} />}/>
                </Elements>
                 </StripeProvider>
                 </StripeScriptLoader>
            </Switch>
        </Router>
        </Provider>
        );
}

export default Root;
