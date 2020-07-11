import React ,{Component} from 'react';
import {config} from '../config';
class Book_table extends Component {
    render()
    {
      const latitude = this.props && this.props.map_info ? this.props.map_info.location_latitude : null;
      const longitude = this.props && this.props.map_info ? this.props.map_info.location_longitude : null;
      console.log("this.props.map_info.location_latitude",latitude);
      console.log("this.props.map_info.location_latitude",longitude);
        return(
            <>
            <section className="contact-box" id="location">
                <div className="contact-form">
                    <h3>Get in touch with us</h3>
                    <form>
                    <div className="form-row">
                        <div className="col-md-6 mb-3 md-form">
                        <label>Please enter your full name:</label>
                        <input type="text" className="form-control" placeholder="Zane Smith"/>
                        </div>
                        <div className="col-md-6 mb-3 md-form">
                        <label>Enter your email address:</label>
                        <input type="email" className="form-control" placeholder="zane.smith@gmail.com"/>
                        </div>
                        <div className="col-md-12 mb-3 md-form">
                        <label>Subject:</label>
                        <input type="text" className="form-control" placeholder="subject"/>
                        </div>
                        <div className="col-md-12 mb-3 md-form">
                        <label>Please type your message:</label>
                        <textarea placeholder="Hi......."></textarea>
                        </div>
                    </div>
                    <button className="btn btn-submit btn-primary btn-sm btn-rounded" type="submit">Submit</button>
                    </form>
                </div>
                <div className="google-map">
                    {
                      // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.7488009326566!2d-105.26488818511866!3d40.01405828795517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bedd26590a0a5%3A0xc2371f43f2620d39!2s2416%20Arapahoe%20Ave%2C%20Boulder%2C%20CO%2080302%2C%20USA!5e0!3m2!1sen!2sin!4v1571115007062!5m2!1sen!2sin" width="100%" height="880" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
                    }


                    <iframe src={config.iframe_root} width="100%" height="440" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>

                  {
                  //<iframe src={`https://maps.google.com/maps/place?q=${latitude},${longitude}&z=15&output=embed`} width="100%" height="880" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
                }

                    </div>
            </section>

            </>
        );
    }
}
export default Book_table;
