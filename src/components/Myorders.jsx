import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import Home from "../pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  padding: 3rem 1.5rem;
  background: #f4f6f8;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const OrderCard = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: 0.3s;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const Details = styled.div`
  p {
    margin: 0.4rem 0;
    font-size: 1rem;
  }
`;

const Status = styled.span`
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  display: inline-block;
  margin-top: 1rem;
  background: ${({ status }) =>
    status === "delivered"
      ? "#d4edda"
      : status === "shipped"
      ? "#cce5ff"
      : status === "cancelled"
      ? "#f8d7da"
      : "#fff3cd"};
  color: ${({ status }) =>
    status === "delivered"
      ? "#155724"
      : status === "shipped"
      ? "#004085"
      : status === "cancelled"
      ? "#721c24"
      : "#856404"};
`;

const CancelButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;

export default function Myorders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`
${process.env.BACKEND_URL}/admin/myorders`, {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (err) {
        toast.error("Error fetching orders.");
        console.error("Error fetching orders:", err.message);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.put(
        `
${process.env.BACKEND_URL}/admin/cancelorder/${orderId}`,
        {},
        { withCredentials: true }
      );

      toast.success(response.data.message);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong while cancelling the order.");
      }
      console.error("Cancel error:", err.message);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div>
      <Home />
      <ToastContainer />
      <Container>
        <Title>My Orders</Title>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            You haven’t placed any orders yet.
          </p>
        ) : (
          orders.map((order, i) => (
            <OrderCard
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Header>
                <span>Order Date: {formatDate(order.createdAt)}</span>
                <span>Order ID: #{order._id?.slice(-6).toUpperCase()}</span>
              </Header>
              <Details>
                <p>
                  <strong>Product(s):</strong> {order.productname?.join(", ")}
                </p>
                <p>
                  <strong>Total Items:</strong> {order.totalitem1}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{order.totalamounts}
                </p>
                <p>
                  <strong>Shipping:</strong> {order.address}, {order.city},{" "}
                  {order.state} - {order.pincode}
                </p>

                <Status status={order.status}>
                  {order.status === "delivered"
                    ? "✅ DELIVERED"
                    : order.status === "shipped"
                    ? "📦 SHIPPED"
                    : order.status === "cancelled"
                    ? "❌ CANCELLED"
                    : "🕐 PLACED"}
                </Status>

                {order.shippedAt && (
                  <p>
                    📦 <strong>Shipped:</strong> {formatDate(order.shippedAt)}
                  </p>
                )}
                {order.deliveredAt && (
                  <p>
                    ✅ <strong>Delivered:</strong>{" "}
                    {formatDate(order.deliveredAt)}
                  </p>
                )}

              {(order.status === "place order" || order.status === "shipped") && (
  <CancelButton onClick={() => handleCancel(order._id)}>
    Cancel Order
  </CancelButton>
)}

              </Details>
            </OrderCard>
          ))
        )}
      </Container>
    </div>
  );
}
