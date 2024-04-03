import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput'; // Import the provided OtpInput component
import Button from '@mui/material/Button';
import axios from 'axios';

const OtpInputPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const location = useLocation();

  console.log(location.state);

  const handleSubmit = async (e, otpValue) => {
    // Implement your OTP validation logic here
    // For now, simulate successful validation
    // navigate('/verification-successful');
    // const [otpData, setOtpData] = useState({
    //   verifyotp: {
    //     email: "",
    //     otp: "",
    //   },
    // });

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:9090/patient/signup",
        {user: {email: location.state.email, otp: otpValue}},
        {
          Authorization: {
            Type: "Basic Auth",
            Username: "user",
            Password: "password",
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User signed up:", response);
      navigate('/login');
      // Optionally, handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error("Error signing up:", error);
      // Optionally, handle signup error (e.g., display error message to user)
    }


  };

  return (
    <div style={{ textAlign: 'center', marginTop: '150px' }}>
      <h2>Enter OTP</h2>
      <OtpInput length={6} onOtpSubmit={handleSubmit} />
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleSubmit(e,otp)}
        style={{ marginTop: '20px' }}
      >
        Verify OTP
      </Button>
      <p style={{ marginTop: '20px' }}>
        <Link to="/signup">Resend OTP</Link>
      </p>
    </div>
  );
};

export default OtpInputPage;