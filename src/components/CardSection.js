import React from 'react';
import {CardNumberElement,
    CardExpiryElement,
    CardCVCElement} from 'react-stripe-elements';

function CardSection(){
  return(
    <label className="card-section">
        <h2 className = "card-section-inner">Card details</h2>
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
  )
}

export default CardSection
