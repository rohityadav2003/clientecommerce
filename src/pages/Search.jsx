import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./Home";

export default function Search() {
  const location = useLocation();
  const { filteredProducts } = location.state || {};
  return (
    <div>
      <Home></Home>
      <div className="container-fluid"
        style={{
       
      
        //  justifyContent:"center",
         width:"100%",height:"100vh",
         maxHeight:"500px",
        //  alignItems:"center"
        }}
      >
        {filteredProducts.length > 0 ?(
          <div className="row"
          >
            {filteredProducts.map((product, index) => (
              <div className="col-12 col-sm-12 col-md-4 col-lg-4 mb-3" key={index}>
                <div className="card "style={{width:"300px",}}>
                  <img
                    src={`
${process.env.BACKEND_URL}${product.image1[0]}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "contain",width:"100%"}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.product}</h5>
                    <p className="card-text">₹{product.price}</p>
                    <Link to="/see"state={{detail:[product]}}>
                    <button className="btn btn-success">More Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ):(
          <p style={{color:"red",textTransform:"capitalize",fontSize:"3rem",fontFamily:"lucida calligraphy",paddingTop:"4rem"}}>no products found</p>
        )}
      </div>
    </div>
  );
}
