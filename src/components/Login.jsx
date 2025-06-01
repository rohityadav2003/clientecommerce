// Login.jsx

import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../pages/Context";
import "./login.css";
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#007bff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#007bff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.66 21.66 0 0 1 5.06-6.94" />
    <path d="M1 1l22 22" />
    <path d="M9.53 9.53a3.5 3.5 0 0 0 4.95 4.95" />
  </svg>
);

const LockIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18"
    width="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Custom top slide animation
const TopSlide = cssTransition({
  enter: "slide-in-top",
  exit: "slide-out-top",
  duration: [400, 300],
});
const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #555;

  input {
    margin-right: 0.5rem;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const PasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 2.5rem; /* left + right padding for icons */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const TogglePassword = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f6f9fc, #e9eff5);
  padding: 20px;
`;

const Card = styled.div`
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Heading = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #35ac75;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
const LockIcon = styled.span`
  position: absolute;
  left: 10px;
  color: #666;
  display: flex;
  align-items: center;
  pointer-events: none;
`;
export default function Login() {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner

    try {
      const response = await axios.post(
        `
${process.env.BACKEND_URL}/user/login`,
        login,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Simulate 6 seconds of spinner
        setTimeout(() => {
          setLoading(false); // Hide spinner

          // Show toast for 3s
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            closeButton: true,
            icon: "✅",
            transition: TopSlide,
            style: {
              background: "#1e1e1e",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "6px",
              boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
            },
            progressStyle: {
              background: "#00ff00",
            },
          });

          setUserId(response.data.user);

          // Navigate after toast duration (3s)
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }, 5000); // 6 seconds spinner
      }
    } catch (err) {
      setLoading(false); // Hide spinner on error
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        transition: TopSlide,
        closeButton: true,
        style: {
          backgroundColor: "#fff0f0",
          color: "#b00020",
          fontWeight: "bold",
          border: "1px solid #ffcccc",
        },
      });
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Heading>Sign In</Heading>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email or mobile number</Label>
              <Input
                type="text"
                name="email"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
             <PasswordWrapper>
  <LockIcon><LockIconSvg /></LockIcon>
  <PasswordInput
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    onChange={handleChange}
    required
  />
 <TogglePassword onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
</TogglePassword>

</PasswordWrapper>

            </FormGroup>

            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Sign In"}
            </Button>
          </Form>

          <StyledLink to="/forgotPassword">forgotPassword</StyledLink>
          <StyledLink to="/signup">Create an account</StyledLink>
          <StyledLink to="/verify-otp">verify Email</StyledLink>
        </Card>
      </Container>
      <ToastContainer transition={TopSlide} />
    </>
  );
}
