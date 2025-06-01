import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./Context";
import styled, { keyframes } from "styled-components";
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CategoryDropdown = styled.div`
  width: 250px;
  background-color: white;
  border: 1px solid #ccc;
  position: absolute;
  top: 100%;
  left: 2px;
  z-index: 1000;
  border-radius: 8px;
  padding: 10px;
  animation: ${slideDown} 0.3s ease-in-out;
`;

const CategoryButton = styled.button`
  background-color: #35ac75;
  color: white;
  padding: 0.4rem 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 7px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2d9564;
    transform: scale(1.05);
  }

  i {
    margin-right: 8px;
  }
`;

const CategoryItem = styled.li`
  padding: 5px 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #35ac75;
    font-weight: 600;
  }
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 9px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;

export default function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { userId, setUserId, totalitem1 } = useContext(UserContext);
  const [cate, setcate] = useState(false);
  const [category, setCategories] = useState([]);
  const [inproduct, insetproduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  // const [filteredProducts, setFilteredProducts] = useState([]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`
${process.env.BACKEND_URL}/user/logoutapi`, {
        withCredentials: true,
      });
      setUserId(null);
      localStorage.removeItem("userId");
      setShow(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await axios.get(
          `
${process.env.BACKEND_URL}/user/fetchlogin`,
          {
            withCredentials: true, // for session cookie
          }
        );
        setUserId(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
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

    //subcate//
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
    apiproduct();
    fetchCategories();
    fetchapi();
  }, []);
  // useEffect(() => {
  //   if (searchKeyword === "") {
  //     setFilteredProducts([]);
  //   }
  // }, [searchKeyword]);
  const handleSearch = () => {
    const result = inproduct.filter((product) =>
      product.product.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    // setFilteredProducts(result);
    navigate("/search", { state: { filteredProducts: result } });
  };
  const show1 = () => {
    setShow(!show);
  };

  const clickcate = () => {
    setcate(!cate);
  };

  const openMap = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const destination = "sagar ratna new delhi";
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(
          destination
        )}`;
        window.open(googleMapsUrl, "_blank");
      },
      (error) => {
        alert("Location access denied! Manually enter your home address.");
      }
    );
  };

  return (
    <div>
      <div className="container-fluid con">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <p className="ecommerce-heading">E-commerce</p>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 inp d-flex flex-wrap align-items-center">
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              type="text"
              placeholder="search for products"
              className="search-input"
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                outline: "none",
              }}
            />
            <div
              className="icon"
              style={{ background: "#35ac75" }}
              onClick={handleSearch}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-flex justify-content-end">
            <div className="cart-section">
              <span
                className="cart"
                onClick={openMap}
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-location-dot loc"></i>
              </span>
              {userId ? (
                <Link to="/carts" style={{ textDecoration: "none" }}>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    {/* Cart Icon */}
                    <i
                      className="fa-solid fa-cart-shopping"
                      style={{
                        fontSize: "1.3rem",
                        color: "white",
                        WebkitTextStroke: "1px black",
                      }}
                    ></i>

                    {/* Badge */}
                    {totalitem1 > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-15px",
                          right: "-3px",
                          backgroundColor: "#35ac75",
                          color: "#fff",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                          lineHeight: "1",
                          minWidth: "18px",
                          height: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid white",
                        }}
                      >
                        {totalitem1}
                      </span>
                    )}
                  </div>
                  <small
                    style={{ textTransform: "capitalize", marginLeft: "5px" }}
                  >
                    Cart
                  </small>
                </Link>
              ) : (
                <span
                  className="carts"
                  style={{ cursor: "pointer" }}
                  onClick={() => alert("Please login to view your cart")}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <small style={{ textTransform: "capitalize" }}>Cart</small>
                </span>
              )}

              <div className="profile-circle">
                {userId && (
                  <p
                    style={{ color:"black ",
                      display: "inline",
                      marginLeft: "10px",
                      marginRight: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    Hi, {userId.name}
                  </p>
                )}
                <i
                  className="fa-solid fa-circle-user"
                  style={{
                    color: "#35ac75",
                    fontSize: "1.7rem",
                    cursor: "pointer",
                  }}
                  onClick={show1}
                ></i>
                {show && (
                  <div
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      top: "60px",
                      right: "0",
                      background: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      padding: "10px",
                      zIndex: 1000,
                    }}
                  >
                    {userId ? (
                      <>
                        <Link
                          to="/myorder"
                          className="dropdown-item"
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            color: "#333",
                            textDecoration: "none",
                          }}
                        >
                          My Orders
                        </Link>
                        <div
                          className="dropdown-item"
                          style={{
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: "#dc3545",
                          }}
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="dropdown-item"
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            color: "#007bff",
                            textDecoration: "none",
                          }}
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="dropdown-item"
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            color: "#333",
                            textDecoration: "none",
                          }}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" id="hide">
        <div className="container-fluid">
          <button
            onClick={clickcate}
            style={{
              backgroundColor: "#35ac75",
              color: "white",
              padding: "0.4rem 0.5rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "7px",
            }}
          >
            <span>
              <i className="fa-solid fa-border-all me-2"></i>
              Browse All Categories
            </span>
          </button>
           {cate && (
            <CategoryDropdown>
              {category.map((item, index) => (
                <CategoryList key={index}>
                  <CategoryImage
                    src={`
${process.env.BACKEND_URL}${item.image[1]}`}
                    alt="category"
                  />
                  <Link
                    to="/results"
                    state={{
                      insert: inproduct.filter((p1) => p1.category === item.category),
                    }}
                    style={{ color: "#222831", textDecoration: "none" }}
                  >
                    <CategoryItem>{item.category}</CategoryItem>
                  </Link>
                </CategoryList>
              ))}
            </CategoryDropdown>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav"
              style={{ paddingLeft: "90px", gap: "30px" }}
            >
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  style={{
                    color: "#212529",
                    textTransform: "capitalize",
                    fontFamily: "lato",
                    fontSize: "1.3rem",
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  style={{
                    color: "#212529",
                    textTransform: "capitalize",
                    fontFamily: "lato",
                    fontSize: "1.3rem",
                  }}
                >
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link"
                  style={{
                    color: "#212529",
                    textTransform: "capitalize",
                    fontFamily: "lato",
                    fontSize: "1.3rem",
                  }}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </nav>
    </div>
  );
}
