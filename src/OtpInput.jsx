import React, { useState, useRef, useEffect } from 'react';
import './OtpInput.css'; 

const OTP_LENGTH = 6;

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^\d$/)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1 && value) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('text').slice(0, OTP_LENGTH);
    const newOtp = pastedValue.padEnd(OTP_LENGTH, '').split('');
    setOtp(newOtp);

    const lastIndex = newOtp.findIndex((digit) => digit === '');
    if (lastIndex === -1) {
      inputRefs.current[OTP_LENGTH - 1].focus();
    } else if (lastIndex >= 0) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const isSubmitDisabled = otp.includes('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitDisabled) {
      alert(`Entered OTP: ${otp.join('')}`);
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            onPaste={handlePaste}
            className="otp-input"
          />
        ))}
        <button type="submit" disabled={isSubmitDisabled} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OtpInput;
