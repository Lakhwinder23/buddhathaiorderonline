import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import { useSelector,useDispatch } from 'react-redux';
function ThankYou(props){
  //const paymentCheckout_data = useSelector(state =>state.PaymentCheckout)
  console.log("props.location",props.location.order_info)
  if(props.location.order_info === undefined){
    window.location.href = '/'
  }
  return(
    <>
                <Header />
                <div className = "row">
                    <div className ="container">
                        <div className ="Booking-confirmation">
                        <h2>Thank You!</h2>
                        <h2>Order Successful</h2>
                        </div>

                        <div className="row">
                          <div className="col-md-4"></div>
                          {props.location &&
                            props.location.order_info &&
                            props.location.order_info.object &&
                            props.location.order_info.object.order_detail ?(
                          <div className="col-md-4  jumbotron">

                          {/* order detail start */}

                              <div className="order-detail">
                                <h2 className="inner text-center">ORDER DETAIL</h2>
                                <div className="order-info">
                                <div className="row">
                                  <div className="col-5">
                                    <p><span className="font-weight-bold">Order: </span>{props.location.order_info.object.order_detail.orderId ? props.location.order_info.object.order_detail.orderId :null}</p>
                                  </div>
                                  <div className="col-7">
                                    <p><span className="font-weight-bold placed-at">Placed at: </span>
                                    <span class="order-time">{props.location.order_info.object.order_detail.orderedDate ? props.location.order_info.object.order_detail.orderedDate :null}</span></p>
                                  </div>
                                </div>
                                {/*item start */}
                                {props.location.order_info.object.order_detail.items &&
                                  props.location.order_info.object.order_detail.items.length > 0 ?
                                props.location.order_info.object.order_detail.items.map((item,index) =>(
                                  <div className="items">
                                    <div className="row">
                                      <div className="col-5">
                                        <p className="font-weight-bold">{item.itemName}</p>
                                      </div>
                                      <div className="col-4">
                                        <p>{item.qty} X $ {item.unit_price}</p>
                                      </div>
                                      <div className="col-3">
                                        <p>$ {item.qty * item.unit_price}</p>
                                      </div>
                                    </div>
                                    {item.addons && item.addons.length > 0 ? (
                                      <div className="row">
                                      {item.addons.map((addon,index) =>(
                                        <div className="col-12">
                                          <p>{addon.addon_full_name}: ${addon.unit_price}</p>
                                        </div>
                                      ))}
                                      </div>
                                    ):null}
                                  </div>
                                )):null}
                                {/*item end */}

                                {/* Bill-Details start */}
                                <div className="row Bill-Details">
                                  <div className="col-12">
                                  <ul>
                                  {props.location.order_info.object.order_detail.itemsFees &&
                                     props.location.order_info.object.order_detail.itemsFees.length > 0 ?
                                     props.location.order_info.object.order_detail.itemsFees.map((itemfess,index)=>(
                                       <li>
                                        {itemfess.name}
                                        <span>$ {itemfess.amount}</span>
                                      </li>
                                     )):null
                                   }
                                 <hr />
                                 {props.location.order_info.object.order_detail.taxes &&
                                    props.location.order_info.object.order_detail.taxes.length > 0 ?
                                    props.location.order_info.object.order_detail.taxes.map((taxes,index)=>(
                                      <>
                                      <li>
                                       {taxes.name}
                                       <span>$ {taxes.amount}</span>
                                     </li>
                                     <hr />
                                     </>
                                    )):null
                                  }
                                 <li>
                                    Order Total
                                    <span>$ {props.location.order_info.object.order_detail.orderTotal ?props.location.order_info.object.order_detail.orderTotal :null}</span>
                                 </li>
                                 <hr />
                               </ul>
                                  </div>
                                </div>
                                {/* Bill-Details end */}

                                <div className="row Address">
                                {props.location.order_info.object.order_detail.pickupAddress ?(
                                  <div className="col-6 pickup-address">
                                    <p className="font-weight-bold">Pickup Address</p>
                                    <p>{props.location.order_info.object.order_detail.pickupAddress.firstName}</p>
                                    <p>{props.location.order_info.object.order_detail.pickupAddress.address1}</p>
                                    <p>{props.location.order_info.object.order_detail.pickupAddress.city},{props.location.order_info.object.order_detail.pickupAddress.stateName}</p>
                                    <p>{props.location.order_info.object.order_detail.pickupAddress.mobileNumber}</p>
                                  </div>
                                ):null}
                                {props.location.order_info.object.order_detail.billingAddress ? (
                                  <div className="col-6">
                                    <p className="font-weight-bold">Billing Address</p>
                                    <p>{props.location.order_info.object.order_detail.billingAddress.firstName} {props.location.order_info.object.order_detail.billingAddress.lastName}</p>
                                    <p>{props.location.order_info.object.order_detail.billingAddress.address1}</p>
                                    <p>{props.location.order_info.object.order_detail.billingAddress.city},{props.location.order_info.object.order_detail.billingAddress.stateName},{props.location.order_info.object.order_detail.billingAddress.postalCode}</p>
                                    <p>{props.location.order_info.object.order_detail.billingAddress.mobileNumber}</p>
                                    <p>{props.location.order_info.object.order_detail.billingAddress.email}</p>
                                  </div>
                                ):null}
                                </div>
                                <hr/>

                                <div className="row">
                                  <div className="col-6">payment</div>
                                  <div className="col-6 text-right">{props.location.order_info.object.order_detail.orderStatus[3].status}</div>
                                </div>

                              </div>
                            </div>

                            {/* order detail end */}
                          </div>
                          ):null}
                          <div className="col-md-4"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
  )
}

export default ThankYou
