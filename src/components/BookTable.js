import React from 'react'
import {config} from '../config';

function BookTable(){
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
                <iframe src={config.iframe_root} title="myFrame" width="100%" height="440" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>

              {
              //<iframe src={`https://maps.google.com/maps/place?q=${latitude},${longitude}&z=15&output=embed`} width="100%" height="880" frameborder="0" style={{border:0}} allowfullscreen=""></iframe>
            }

                </div>
        </section>

        </>
  )
}

export default BookTable
