import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #f6f9fc, #e9eff5);
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #35ac75;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;

  &:hover {
    background-color: #2c965f;
  }
`;

// Component
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`
${process.env.REACT_APP_BACKEND_URLL}/user/forgotPassword`, {
        email,
        newPassword
      });

      toast.clearWaitingQueue(); // Clear previous toasts
      toast.success(res.data.message || 'Password reset successful');

      setEmail('');
      setNewPassword('');

      // Wait for toast to complete before navigating
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Match toast duration

    } catch (err) {
      toast.clearWaitingQueue();
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Title>Reset Password</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit">Reset Password</Button>
          </form>
        </Card>
      </Container>

      {/* Improved Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}
