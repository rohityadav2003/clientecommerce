import React, { useEffect, useContext, useState } from "react";
import UserContext from "../pages/Context";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import styled, { keyframes } from "styled-components";
const gradientAnimation = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const PageContainer = styled.div`
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  background-size: 300% 300%;
  animation: ${gradientAnimation} 20s ease infinite;
  min-height: 100vh;
  padding: 40px 20px;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;
const Box = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 24px;
  backdrop-filter: blur(15px);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(180deg, #6dd5ed, #2193b0, #cc2b5e);
    background-size: 300% 300%;
    animation: ${gradientAnimation} 1s ease infinite;
    z-index: -1;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;


const OrderSummaryBox = styled(Box)`
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(135deg, #43e97b, #38f9d7);
  color: #000;
  box-shadow: 0 0 15px rgba(67, 233, 123, 0.6);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 0 25px rgba(67, 233, 123, 0.9);
  }
`;

const LinkStyled = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  color: #00e6e6;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;


export default function Payment() {
  const { totalamounts, totalitem1 } = useContext(UserContext);
  const [payments, setPayment] = useState([]);
  const [paymentsmeth, setPaymentmeth] = useState("");
  const location = useLocation();
  const { productname, select } = location.state || {};
  const [itemTotal, setItemTotal] = useState(() => {
    return localStorage.getItem("orderItemTotal") || 0;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (select) {
      localStorage.setItem("orderItemTotal", select);
      setItemTotal(select);
    }
  }, [select]);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`
${process.env.BACKEND_URL}/user/payment`, {
          withCredentials: true,
        });
        setPayment(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPayment();
  }, []);

  const razorpay = async () => {
    try {
      const response = await axios.post(
        `
${process.env.BACKEND_URL}/user/create-order`,
        { totalamounts },
        { withCredentials: true }
      );
      const order = response.data;
      const options = {
        key: "rzp_test_WfJWPDv4Q8k2mb",
        amount: order.amount,
        currency: "INR",
        name: "My Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        theme: {
          color: "#35ac75",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Razorpay error:", err.message);
    }
  };

  const senddata = async () => {
    try {
      const response = await axios.post(
        `
${process.env.BACKEND_URL}/admin/order-detail`,
        {
          username: payments[0]?.username,
          address: payments[0]?.address,
          city: payments[0]?.city,
          state: payments[0]?.state,
          pincode: payments[0]?.pincode,
          productname,
          totalamounts,
          totalitem1,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
      navigate("/thank");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Home />
      <PageContainer className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-8 mx-auto">
            <Box>
              {payments.length > 0 ? (
                <>
                  {payments.map((item, index) => (
                    <div key={index}>
                      <h4>Delivering to: {item.username}</h4>
                      <p>
                        {item.address}, {item.city}, {item.state}, {item.pincode}
                      </p>
                    </div>
                  ))}
                  <LinkStyled to="/address">Change</LinkStyled>
                </>
              ) : (
                <LinkStyled to="/address">Add Address</LinkStyled>
              )}
            </Box>

            <Box>
              <h2>Payment Method</h2>
              {payments.length > 0 ? (
                <>
                  <label style={{ color: "white", fontWeight: "bolder" }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentsmeth === "cod"}
                      onChange={(e) => setPaymentmeth(e.target.value)}
                   style={{color:"white",fontWeight:"bolder"}} />
                    Cash on Delivery
                  </label>
                  <br />
                  <label style={{ color: "white", fontWeight: "bolder" }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentsmeth === "online"}
                      onChange={(e) => setPaymentmeth(e.target.value)}
                    />
                    Pay Online
                  </label>

                  {paymentsmeth === "online" && (
                    <PaymentButton onClick={razorpay}>Pay Online</PaymentButton>
                  )}

                 {paymentsmeth === "cod" && (
  <PaymentButton onClick={senddata}>
    Place Your Order (COD)
  </PaymentButton>
)}
                </>
              ) : (
                <p>Please add a delivery address first.</p>
              )}
            </Box>
          </div>

          <div className="col-12 col-md-4">
            <OrderSummaryBox>
              <h3>Order Summary</h3>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Items Total</span>
                  <span>{itemTotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                  <span>Delivery</span>
                  <span style={{ color: "#35ac75",fontWeight:"bolder" }}>Free</span>
                </div>
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px" }}>
                <span>Total Amount</span>
                <span>₹{totalamounts}</span>
              </div>
            </OrderSummaryBox>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}