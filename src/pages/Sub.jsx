import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./Home";

export default function Results() {
  const location = useLocation();
  const { products, insert } = location.state || {};

  return (
    <div>
   <Home></Home>
    <div className="container-fluid bg-dark"style={{color:"white",width:"100%",minHeight:"100vh",padding:"30px 20px",textAlign:"center"}}>
    
      <h2 style={{fontSize:"2.5rem",fontSynthesisWeight:"bold",color:"aqua", textShadow: "0px 0px 10px aqua",
          marginBottom: "40px",}}>All Products</h2>
      <div className="row">
       
     
      {insert.map((item, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex justify-content-center">
          <div className="card card1"style={{height:"auto",width:"42vh",padding:"15px",marginBottom:"30px", background: "linear-gradient(135deg, #222, #000)",
                borderRadius: "15px",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",}}>
            <div className="card-body"style={{padding:"15px",textAlign:"center"}}>
            <img
                src={`
${process.env.REACT_APP_BACKEND_URL}${item.image1[0]}`}
                className="img-fluid"
                style={{
                  height: "190px",
                 
                  width: "100%",
                  borderRadius: "10px",
                  border: "3px solid aqua",
                }}
              />
              {/* <h5 className="card-title">{item.subcategory}</h5> */}
              <h5 className="card-title"style={{color:"white",marginTop: "15px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    letterSpacing: "1px",}}>{item.product}</h5>
              <h5 className="card-title"style={{color: "aqua",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    margin: "5px 0",}}>RS.{item.price}</h5>
              <h5 className="card-title"style={{color: "#0f0",
                    fontSize: "1rem",
                   
                    opacity: 0.8,}}>{item.discountPrice}</h5>
              <Link to="/see"state={{detail:insert.filter((p)=>p.product===item.product)}}><button style={{ padding: "12px 18px",
                      border: "2px solid aqua",
                      borderRadius: "8px",
                      background: "green",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginTop: "10px",
                      transition: "all 0.3s ease-in-out",}}>see more</button></Link>
              
            </div>
          </div>
        </div>
      ))}
       </div>
    
    </div>
    </div>
  );
}
