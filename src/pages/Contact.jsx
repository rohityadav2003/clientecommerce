import React, { useState } from "react";
import axios from "axios";
import Home from "./Home";
import Footer from "./Footer";

export default function Contact() {
  const [formData, setData] = useState({ name: "", rating: "", review: "" });

  const handleChange = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
       `
${process.env.REACT_APP_BACKEND_URL}/admin/review`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Home />
      <div
        className="contact"
        style={{
          backgroundImage: "url('/images/contact.png')",
          width: "100%",
          height: "70vh",
          backgroundPosition: " top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        <h1 style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.9)" }}>
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "18px",
            marginTop: "10px",
            textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
          }}
        >
          Have a question? We are here to help.
        </p>
      </div>
      <div
        style={{ width: "100%", height: "70vh", background: "black" }}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div
              style={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                padding: " 30px 100px ",
              }}
              className="cont"
            >
              <h2>Connect Us</h2>
              <div style={{ display: "flex", gap: "5px" }}>
                <p>
                  <i className="fas fa-map-marker-alt"style={{color:"green"}}></i>
                  <strong
                    className="text-center"
                    style={{ marginLeft: "10px" }}
                  >
                    Company Address:
                  </strong>
                </p>
                <p>vhsdfhvdbvhjdvdvdbvb</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <p>
                  <i className="fas fa-phone-alt"style={{color:"lightgreen"}}></i>{" "}
                  <strong
                    className="text-center"
                    style={{ marginLeft: "10px" }}
                  >
                    Call Us:
                  </strong>{" "}
                </p>
                <p> +1(21) 112 7368</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <p>
                <i className="fas fa-envelope" style={{ color: "#D14836" }}></i>

                  <strong
                    className="text-center"
                    style={{ marginLeft: "10px" }}
                  >
                    Email Us:
                  </strong>{" "}
                </p>
                <p> example@mail.com</p>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <p>
                <i className="fas fa-headset" style={{ color: "#28A745" }}></i>

                  <strong style={{ marginLeft: "10px" }}>
                    Customer Support:
                  </strong>
                </p>
                <p> info@support.com</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-12 col-md-6 col-lg-6"style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            
            <div style={{width:"100%",height:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:"50px"}}className="form1">

              <form onSubmit={handleSubmit}style={{ background: "rgba(255, 255, 255, 0.1)",height:"100%",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",  gap: "15px",
                  padding: "50px",
                  borderRadius: "10px",color:"white"}}className="review">
                <div style={{display:"flex",gap:"10px",width:"100%",justifyContent:"center"}}>
                  <label
                    
                  >
                    Name:
                  </label>
                  <input className="inp "
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                     padding:"5px",
                     width:"50%", border: "1px solid #ccc",
                     borderRadius: "8px",
                     fontSize: "15px",
                     background: "rgba(255, 255, 255, 0.15)",
                     color: "#fff",
                     outline: "none",
                    }}
                  />
                </div>
                <div style={{display:"flex",gap:"10px",width:"100%",justifyContent:"center",alignItems:"center"}}>
                  <label
                    style={{
                 
                    }}
                  >
                    Rating:
                  </label>
                  <select className="inp"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    style={{
                      padding:"5px",
                      width:"50%",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      background: "rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                      outline: "none",
                     }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                    <option value="4">⭐⭐⭐⭐ (4)</option>
                    <option value="3">⭐⭐⭐ (3)</option>
                    <option value="2">⭐⭐ (2)</option>
                    <option value="1">⭐ (1)</option>
                  </select>
                </div>
                <div style={{display:"flex",gap:"10px",width:"100%",justifyContent:"center"}}>
                  <label
                    style={{
                      
                    }}
                  >
                    Message:
                  </label>
                  <textarea className="inp"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                    style={{
                      padding:"5px",
                      width:"50%",
                      marginRight:"10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      fontSize: "15px",
                      background: "rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                      outline: "none",
                     }}
                  ></textarea>
                </div>
                <button className="but"
                  type="submit"
                  style={{
                   padding:"8px",
                   width:"30%",
                   textAlign:"center",
                   alignItems:"center",
                   marginLeft:"30px",
                   border: "none",
                   borderRadius: "8px",
                   background: "rgba(0, 255, 0, 0.6)",
                   color: "#fff",
                   fontWeight: "bold",
                   cursor: "pointer",
                   
                  }}
                >
                  Submit Review
                </button>
              </form>
           </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
