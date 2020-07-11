// CardSection.js
import React from 'react';
import {CardElement,
  CardNumberElement,
    CardExpiryElement,
    CardCVCElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (

      <label className="card-section">
        Card details
        <label>
         Card number
         <CardNumberElement
         />
       </label>
       <label>
         Expiration date
         <CardExpiryElement

         />
       </label>
       <label>
         CVC
         <CardCVCElement
         />
       </label>
      </label>
    );
  }
}

export default CardSection;
