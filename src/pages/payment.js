import './payment.css'
import images from "../images";
import { useGetUserDetailsQuery } from '../api/modules/login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const { data } = useGetUserDetailsQuery();
  const navigate = useNavigate();

  const handleContactUs = () => {
    const recipientEmail = "pscgreen.learning@gmail.com";
    const subject = "PSC GREEN Inquiry";
    const body = "Hello PSC GREEN team,\n\nI have a question about your services. Can you please provide more information?\n\nThank you!";
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  useEffect(() => {
    if (data?.isPaid) {
      navigate('/Profile');
    }
  }, [data, navigate]);
  return (
    <div>
      <div className="main-payment">
        <div style={{ marginTop: "-30px" }} className="lefttext">
          <div className="textwrap">
            <h1>PSC GREEN</h1>
            <p>Subscribe to PSC GREEN and  get access to our resources. Take part in mock tests designed to enhance your learning experience and open up opportunities for a career in the Public Service Commission (PSC) jobs.</p>
            <div style={{ margin: "20px" }} className="subscription-options">
              <label>
                Standard -Rs 250 (6 Months)
                <p>Refer a friend for Standard plan and get Rs 100 cashback!</p>
              </label>
              <label>
                Premium -Rs 450 (1 year)
                <p>Refer a friend for Premium plan and get Rs 200 cashback!</p>
              </label>
              <label>
                pscgreenlearning@ybl
              </label>
            </div>
            <p style={{ marginTop: '10px' }}>
                If payment is done, please send a message to +91 9846243060, and your account will be active in a day.
              </p>
            <button onClick={handleContactUs}>Contact Us</button>
          </div>
        </div>
        <div style={{ marginTop: "50px" }} className="rightimage">
          <img style={{ marginTop: "50px" }} src={images.qr} />
        </div>
      </div>
    </div>



  );
}

export default Payment;