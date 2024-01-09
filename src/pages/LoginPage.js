import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLoginMutation, useResendOtpMutation, useSignUpMutation } from '../api/modules/login';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(60);
  const navigate = useNavigate();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();

  useEffect(() => {
    let timer;
    if (isResendDisabled && resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else if (isResendDisabled && resendCountdown === 0) {
      setIsResendDisabled(false);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isResendDisabled, resendCountdown]);

  const handleEmailSubmit = async () => {
    try {
      const response = await login({ email });
      if (response.data.message) {
        toast.success(response.data.message);
        setIsOtpSent(true);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };



  const handleOtpSubmit = async () => {
    try {
      const otpValue = otp.join('');
      const res = await signUp({ email, otp: otpValue });

      if (res?.data) {
        toast.success(res.data.message);

        if (res?.data?.user?.isCreated) {
          if (res?.data?.user?.isPaid) {
            navigate('/home');
          } else {
            navigate('/payment');
          }
        } else {
          navigate('/createprofile');
        }
      } else {
        console.error('Invalid response format:', res);
        toast.error('Something went wrong please check the otp');
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (index < otp.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleArrowKeys = (index, keyCode) => {
    if (keyCode === 37 && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    } else if (keyCode === 39 && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length === 4) {
      setOtp(pastedText.split(''));
    }
  };

  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();

  const handleResend = async (e) => {
    try {
      e.preventDefault();
      const response = await resendOtp({ email });
      if (response.data.message) {
        toast.success(response.data.message);
        setIsResendDisabled(true);
        setResendCountdown(60);
      }
    } catch (error) {
      toast.error('Something went wrong while resending OTP');
    }
  };

  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  style={{
                    backgroundImage: 'url("../assets/img/create kerala t 0.png")',
                    backgroundSize: "cover"
                  }}
                ></div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header">
                    <h4 className="font-weight-bolder">Sign Up</h4>
                    <p className="mb-0">
                      {!isOtpSent ? 'Enter your email and details to register' : 'Enter the OTP'}
                    </p>
                  </div>
                  <div className="card-body">
                    {!isOtpSent ? (
                      <form role="form">
                        <div className="input-group input-group-outline mb-3 focused">
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Mail Id'
                            type="email" className="form-control " />
                        </div>
                        <div className="form-check form-check-info text-start ps-0">
                          <input
                            className="form-check-input success"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefault"
                            defaultChecked=""
                          />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            I agree the{' '}
                            <a href="javascript:;" className="text-dark font-weight-bolder">
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"
                            onClick={handleEmailSubmit}
                            disabled={isLoginLoading}
                          >
                            {isLoginLoading ? 'Logging In...' : 'Send OTP'}

                          </button>
                        </div>
                      </form>
                    ) : (
                      <form role="form" className="otp-div">
                        <div className="otp-field">
                          {otp.map((digit, index) => (
                            <input
                              type="text"
                              className="otp-digit"
                              id={`otp-input-${index}`}
                              key={index}
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleArrowKeys(index, e.keyCode)}
                              onPaste={handlePaste}
                            />
                          ))}
                        </div>

                        <div className="text-center">

                          <button
                            className="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"

                            onClick={handleOtpSubmit}
                            disabled={isSignUpLoading}
                          >
                            {isSignUpLoading ? 'Verifying OTP...' : 'Verify OTP'}
                          </button>
                          <button className="button-as-text" style={{ textDecoration: "none", color: "blue", border: "none", background: "none", cursor: "pointer", fontSize: "15px", marginTop: "30px" }} onClick={handleResend}>Resend Otp</button>

                        </div>
                      </form>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
