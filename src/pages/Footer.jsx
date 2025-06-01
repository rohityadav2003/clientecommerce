import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Styling ka import

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 footer-column">
              <h4>Know About Us</h4>
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="">About Us</Link>
                </li>
                <li>
                  <Link to="">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 footer-column">
              <h4>Categories</h4>
              <ul>
                <li>
                  <Link to="">Electronics</Link>
                </li>
                <li>
                  <Link to="">Fashion</Link>
                </li>
                <li>
                  <Link to="">Home & Appliances</Link>
                </li>
                <li>
                  <Link to="">Furniture</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 footer-column">
              <h4>Contact</h4>
              <p>Address: XYZ, New Delhi, India, Pin-Code: 110084</p>
              <p>Phone: +91 1212121212</p>
              <p>Email: ecommerce@gmail.com</p>
              <div className="social-icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 footer-column">
              <h4>Registered Office Address</h4>
              <p>
                Ecommerce Private Limited, Building Alysa, Begonia & Clove,
                Embassy Tech Village, Outer Ring Road, New Delhi 110084, India
              </p>
              <p>Phone: +91 3434343434</p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "10vh",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "14px",
          gap:"30px"
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} Ecommerce Pvt. Ltd. All rights
          reserved.
        </div>
        <div style={{ marginTop: "5px",gap:"20px" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/120px-Visa.svg.png"
          alt="Visa"
          style={{ height: "20px", marginRight: "20px",cursor:"pointer" }}
        />
       <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" style={{ height: "20px",marginRight: "20px",cursor:"pointer" }} />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/120px-PayPal.svg.png"
          alt="PayPal"
          style={{ height: "20px",cursor:"pointer" }}
        />
      </div>
      </div>
     
    </div>
  );
}
