import React from "react";
import { Link } from "react-router-dom";

export default function Thanks() {
  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="success"
          style={{ width: "80px", marginBottom: "20px" }}
        />
        <h2 style={{ color: "#35ac75", marginBottom: "10px" }}>Thank You for Your Order!</h2>
        <p style={{ color: "#555", fontSize: "16px", marginBottom: "25px" }}>
          Your order has been placed successfully. We’ll send you a confirmation email shortly.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#35ac75",
            color: "#fff",
            padding: "12px 25px",
            textDecoration: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "inline-block",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
