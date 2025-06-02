import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import UserContext from "./Context";
import "./home.css";
import "./banner.css";

export default function Main() {
  const [categories, setCategories] = useState([]);
  const [collection, setcollection] = useState([]);
  const [product, setproduct] = useState([]);
  const [inproduct, insetproduct] = useState([]);
  const [review, setrviews] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/admin/apimanage-category`
        );
        console.log("API Response:", response.data.manage);
        setCategories(response.data.manage);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    const fetchCollection = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/admin/apicollection`
    );
    console.log("API Response:", response.data.data1);
    setcollection(response.data.data1);
  } catch (err) {
    console.error("Error fetching categories:", err.message);
  }
};

    // subproduct//
    const product = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/admin/apimanage-sub`
        );
        console.log("API Response:", response.data.managesub);
        setproduct(response.data.managesub);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };
    const apiproduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/admin/apiproduct`
        );
        console.log("API Response:", response.data.product);
        insetproduct(response.data.product);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };
    //review//
    const Reviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/admin/apireviews`
        );
        setrviews(response.data.reviews);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
   fetchCollection();

    product();
    apiproduct();
    Reviews();
  }, []);
  const cards = [
    {
      id: 1,
      image: "/images/frame.jpg",
      title: "Canyon Star Raider",
    },
    {
      id: 2,
      image: "/images/frame2.jpg",
      title: "Canyon Star Raider",
    },
    {
      id: 3,
      image: "/images/frame3.jpg",
      title: "Canyon Star Raider",
    },
  ];

  return (
    <div style={{ marginTop: "5px " }}>
      <div className="banner">
        <div className="banner-content">
          <p className="typewriter-main">you are looking good</p>
          <h1 className="typewriter-glow">final clearance up to 80% off</h1>
          <div>
            <button id="buts">discover more</button>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <div className="custom-card" key={card.id}>
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-overlay">
              <p className="card-new-in">NEW IN</p>
              <h3 className="card-title">{card.title}</h3>
              <button
                className="shop-now-btn"
                onClick={() => {
                  const section = document.getElementById(
                    "different-categories"
                  );
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="container-fluid  "
        style={{ background: "#fff", color: "black", Height: "auto" }}
      >
        <div className="row">
          <h1 className="text-center mb-4 di">Different Categories</h1>
          {categories.map((item) => (
            <div
              key={item.category}
              className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-center"
            >
              <Link
                to="/results"
                state={{
                  products: product.filter((p) => p.category === item.category),
                  insert: inproduct.filter(
                    (p1) => p1.category === item.category
                  ),
                }}
                style={{ textDecoration: "none", width: "70%" }}
              >
                <div
                  className="card card1"
                  style={{
                    height: "300px",
                    background: "#35ac75",
                    border: "1px solid #0000001a",
                    borderRadius: "10px",
                    color: "#000",
                    padding: "0px",
                    marginBottom: "30px",
                  }}
                  onMouseEnter={() => setHoveredImage(item.category)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    id="different-categories"
                    src={`${process.env.BACKEND_URL}${
                      hoveredImage === item.category
                        ? item.image[1]
                        : item.image[0]
                    }`}
                    className="img-fluid main-img"
                    alt={item.category}
                    style={{
                      width: "100%",
                      height: "250px",
                      background: "#fff",
                      borderRadius: "9px",
                      borderBottomRightRadius: "0",
                      borderBottomLeftRadius: "0",
                      transition: "transform 0.5s ease-in-out",
                    }}
                  />
                  <div className="card-body text-center">
                    <span style={{ color: "#222831", fontWeight: "bold" }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="row  g-3 px-4">
          <h5
            style={{
              textAlign: "left",
              paddingLeft: "5rem",
              textTransform: "capitalize",
              color: "black",
              fontWeight: "bold",
              textDecoration: "underline",
              textDecorationColor: "#35ac75",
              fontFamily: "lucida calligraphy",
            }}
          >
            new products
          </h5>
          {collection.map((item) => (
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex justify-content-center">
              <div
                className="card card2 text-center"
                style={{
                  width: "88%",
                  height: "auto",
                  background: "#35ac75",
                  border: "1px solid #0000001a",
                  borderRadius: "10px",
                  color: "#000",
                  padding: "0",
                  marginBottom: "30px",
                  overflow: "hidden",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ position: "relative" }}>
                  {/* Discount Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      backgroundColor: "#35ac75",
                      color: "white",
                      padding: "5px 10px",
                      borderBottomRightRadius: "50px",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      zIndex: "1",
                    }}
                  >
                    {item.discountPrice}
                  </div>

                  {/* Product Image */}
                  <img
                    src={`
${process.env.BACKEND_URL}${item.image1}`}
                    className="card-img-top"
                    alt="Product"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "contain",
                      background: "#fff",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      padding: "0px",
                    }}
                  />
                </div>

                <ul
                  className="list-group list-group-flush"
                  style={{
                    fontSize: "14px",
                    backgroundColor: "rgb(241, 241, 241)",
                  }}
                >
                  <li
                    className="list-group-item"
                    style={{
                      backgroundColor: "rgb(241, 241, 241)",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.product}
                  </li>
                  <li
                    className="list-group-item"
                    style={{
                      backgroundColor: "rgb(241, 241, 241)",
                      borderColor: "",
                      color: "black",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {item.stockStatus}
                  </li>
                  {/* <li
                    className="list-group-item"
                    style={{
                      backgroundColor: "rgb(241, 241, 241)",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    ⭐⭐⭐⭐⭐
                  </li> */}
                  <li
                    className="list-group-item"
                    style={{
                      backgroundColor: "rgb(241, 241, 241)",
                      fontWeight: "bold",
                      color: "#35ac75",
                      marginBottom: "0",
                    }}
                  >
                    RS. {item.price}
                  </li>
                  <li>
                    <Link
                      to="/see"
                      state={{
                        detail: collection.filter(
                          (p) => p.product === item.product
                        ),
                      }}
                    >
                      <button
                        disabled={item.stockStatus !== "in-stock"}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#f0c14b",
                          color: "#000",
                          borderRadius: "5px",
                          margin: "0.2rem",
                          padding: "0.5rem 1rem",
                          border: "none",
                          cursor:
                            item.stockStatus === "in-stock"
                              ? "pointer"
                              : "not-allowed",
                        }}
                      >
                        ADD TO CART
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* featured products */}
        <div className="row">
          <h5
            style={{
              textAlign: "left",
              paddingLeft: "5rem",
              textTransform: "capitalize",
              color: "black",
              fontWeight: "bold",
              textDecoration: "underline",
              textDecorationColor: "#35ac75",
              fontFamily: "lucida calligraphy",
            }}
          >
            featured products
          </h5>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            freeMode={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            speed={1000}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper px-5"
            breakpoints={{
              0: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              992: { slidesPerView: 4 },
            }}
          >
            {collection.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="card card2 text-center featured-card">
                  <img
                    src={`
${process.env.BACKEND_URL}${item.image1}`}
                    className="card-img-top featured-img"
                    alt="Product"
                  />
                  <ul className="list-group list-group-flush featured-list">
                    <li className="list-group-item">{item.product}</li>
                    <li className="list-group-item">{item.stockStatus}</li>
                    <li className="list-group-item">⭐⭐⭐⭐⭐</li>
                    <li className="list-group-item">{item.price}</li>
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="main container-fluid">
        <div className="overlay"></div>
        <div className="content">
          <div className="row">
            <div
              className="col-12 col-sm-12 col-md-4 col-lg-4"
              style={{ marginTop: "5rem" }}
            >
              <h4
                className="customer-title"
                style={{
                  color: "aqua",
                  fontFamily: "lucida calligraphy",
                  textDecoration: "underline white",
                  textAlign: "justify",
                  textUnderlineOffset: "5px",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                What Customers Say?
              </h4>
              <p
                className="customer-text"
                style={{ textAlign: "justify", color: "white" }}
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit tempora facere incidunt sunt aspernatur? Illum nam
                tenetur obcaecati velit impedit!
              </p>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
              {/* SwiperJS Slider */}
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                freeMode={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
                breakpoints={{
                  0: { slidesPerView: 1 }, // Mobile ke liye default 1
                  500: { slidesPerView: 2 }, // 500px+ pe 2 slides
                  768: { slidesPerView: 3 }, // 768px+ pe 3 slides
                }}
              >
                {review.map((item) => (
                  <SwiperSlide>
                    <div
                      className="box"
                      style={{
                        padding: "10px 40px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                        position: "relative",
                        border: "2px solid #35ac75",
                        textAlign: "center",
                        textAlign: "justify",
                      }}
                    >
                      {item.review}

                      {/* Pointer shape */}
                      <div
                        style={{
                          position: "absolute",
                          width: "12px",
                          height: "12px",
                          border: "1px solid white",
                          bottom: "-6px",
                          left: "50%",
                          transform: "translateX(-50%) rotate(45deg)",
                          borderLeft: "none",
                          borderTop: "none",
                          backgroundColor: "white",
                        }}
                      ></div>

                      {/* User Name */}
                      <div
                        className="text-start"
                        style={{
                          position: "absolute",
                          bottom: "-65px",
                          left: "50%",

                          transform: "translateX(-50%)",
                          color: "#35ac75",
                          fontWeight: "bold",
                          fontSize: "14px",
                          backgroundColor: "black",
                          padding: "4px 10px",
                          borderRadius: "4px",
                          height: "8vh",
                        }}
                      >
                        <span> {item.name}</span>

                        {Array.from({ length: item.rating }, (_, index) => (
                          <span key={index} style={{ marginLeft: "5px" }}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
