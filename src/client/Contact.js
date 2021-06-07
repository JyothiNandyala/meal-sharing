import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
function Contact() {
  return (
    <div className="contact">
      <div className="content">
        <h2>Contact Us</h2>
        <p>
          Please do not hesitate to contact with us for any other information .
        </p>
      </div>
      <div className="container">
        <div className="contact-info">
          <h3>Name</h3>
          <p>Jyothi Nandyala</p>
        </div>
        <div className="contact-info">
          <h3>Address</h3>
          <p>Hovedvejen 154 ,2,22 Glostrup.</p>
        </div>
        <div className="contact-info">
          <h3>Email</h3>
          <p>njyothi451@gmail.com</p>
        </div>
        <div className="contact-info">
          <h3>PhoneNumber</h3>
          <p>71848197</p>
        </div>
      </div>
    </div>
  );
}
export default Contact;
