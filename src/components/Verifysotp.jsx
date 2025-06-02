import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function VerifyOtp() {
  const [form, setForm] = useState({ email: "", otp: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);
  const [canResend, setCanResend] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await axios.post(
        `
${process.env.REACT_APP_BACKEND_URL}/user/verify-otp`,
        form
      );
      setMessage(res.data.message);
      setCanResend(false);
      clearInterval(timerRef.current);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      if (
        err.response?.data?.message === "OTP expired. Please request a new OTP."
      ) {
        setCanResend(true);
        clearInterval(timerRef.current);
      }
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.post(
        `
${process.env.REACT_APP_BACKEND_URL}/user/resend-otp`,
        { email: form.email }
      );
      setMessage(res.data.message);
      setCanResend(false);
      setTimeLeft(60);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 30px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
          maxWidth: "400px",
          width: "100%",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2
          style={{
            color: "#4a2fbd",
            marginBottom: "10px",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Verify Your Email
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Enter the 6-digit OTP sent to your email
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1.5px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            value={form.otp}
            required
            maxLength={6}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1.5px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(to right, #764ba2, #667eea)",
              border: "none",
              padding: "12px",
              fontSize: "16px",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.3s ease-in-out",
            }}
          >
            Verify OTP
          </button>
        </form>

        {timeLeft > 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#764ba2",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            OTP expires in: <b>{formatTime(timeLeft)}</b>
          </p>
        )}
        {canResend && (
          <button
            onClick={handleResend}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "10px",
              border: "2px solid #764ba2",
              color: "#764ba2",
              backgroundColor: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            Resend OTP
          </button>
        )}

        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontWeight: "600",
              color: "#2ecc71",
            }}
          >
            {message}
          </p>
        )}
        {error && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontWeight: "600",
              color: "#e74c3c",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
