import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";
import axios from "axios";
import UserContext from "./Context";
import ReactImageMagnify from 'react-image-magnify';
import './detailp.css'; // 👈 Make sure to import the CSS here


export default function Detailp() {
  const location = useLocation();
  const { detail } = location.state || {};
  const item = detail[0];
  const [select, setselect] = useState(item.image1[0]);
  const navigate = useNavigate();
  const { userId, settotalamount, settotalitem } = useContext(UserContext);
const [isZoomed, setIsZoomed] = useState(false);
const [animationKey, setAnimationKey] = useState(0);

const handleThumbnailClick = (imgsrc) => {
  setselect(imgsrc);
  setAnimationKey(prev => prev + 1); // Trigger re-animation
};

  const handlebtn = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const response = await axios.post(
        `
${process.env.BACKEND_URL}/user/cart`,
        {
          product: item.product,
          price: item.price,
          discountPrice: item.discountPrice,
          stockStatus: item.stockStatus,
          image1: select,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/cart");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handbuy = async () => {
    if (!userId) {
      alert("Please log in to proceed with the purchase.");
      return;
    }
    navigate('/buy', { state: { productname: item.product } });
    settotalamount(item.price);
    settotalitem(1);
  };

  return (
    <div>
      <Home />
      <div className="detail-container">
        <div className="detail-wrapper">
          <div className="thumbnail-column">
            {item.image1.map((imgsrc, index) => (
             <img
  key={index}
  src={`
${process.env.BACKEND_URL}${imgsrc}`}
  onClick={() => handleThumbnailClick(imgsrc)}
  alt="thumbnail"
/>

            ))}
          </div>

      {/* <div
  className={`zoom-image image-animate-in`}
  key={animationKey}
  onMouseEnter={() => setIsZoomed(true)}
  onMouseLeave={() => setIsZoomed(false)}
>
  <ReactImageMagnify
    {...{
      smallImage: {
        alt: item.product,
        isFluidWidth: true,
        src: `
${process.env.BACKEND_URL}${select}`,
      },
      largeImage: {
        src: `
${process.env.BACKEND_URL}${select}`,
        width: 1200,
        height: 1800,
      },
      enlargedImageContainerDimensions: {
        width: '200%',
        height: '100%',
      },
      enlargedImagePosition: 'beside',
      lensStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
      isHintEnabled: true,
      shouldUsePositiveSpaceLens: true,
    }}
  />
</div> */}

<div
  
  key={animationKey}
  onMouseEnter={() => setIsZoomed(true)}
  onMouseLeave={() => setIsZoomed(false)}
  style={{ overflow: 'hidden', cursor: 'zoom-in', width: '400px', height: '600px' }} // adjust size as needed
>
  <img
    src={`${process.env.BACKEND_URL}${select}`}
    alt={item.product}
    className={isZoomed ? 'zoomed' : ''}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
      transformOrigin: 'center center',
      transform: isZoomed ? 'scale(1.8)' : 'scale(1)',
    }}
  />
</div>


<div
  className="product-info"
  style={{
   
    opacity: isZoomed ? 0.3 : 1,
    pointerEvents: isZoomed ? 'none' : 'auto',
    transition: 'opacity 0.3s ease',
    visibility:isZoomed?"hidden":"visible"
  }}
>
            <h2>{item.product}</h2>
            <p className="price">Price: ₹{item.price}</p>
            <p className="discount">Discount Price: ₹{item.discountPrice}</p>
            <p>{item.description}</p>
            <p className={`stock ${item.stockStatus === 'in-stock' ? 'in' : 'out'}`}>
              {item.stockStatus === "in-stock" ? "✔ In Stock" : "❌ Out of Stock"}
            </p>

            <div className="buttons">
              <button
                className="buy-now"
                onClick={handbuy}
                disabled={item.stockStatus !== "in-stock"}
              >
                Buy Now
              </button>

              <button
                className="add-cart"
                onClick={handlebtn}
                disabled={item.stockStatus !== "in-stock"}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
