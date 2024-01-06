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
<div className="how-section1">
<div className="row">
  <div className="col-md-6 how-img">
    <img
      src={images.qrTwofity}
      className=" img-fluid"
      alt=""
    />
  </div>
  <div className="col-md-6">
    <h4>Standard Plan - Rs 250 (6 Months)</h4>
    <h4 className="subheading">
      Subscribe to PSC GREEN and get access to our resources.
    </h4>
    <p>Refer a friend for the Standard plan and get Rs 100 cashback!</p>
    <p>If payment is done, please send a message to +91 9846243068, and your account will be active within a day.</p>
  </div>
</div>

<div className="row">
  <div className="col-md-6">
    <h4>Premium Plan - Rs 450 (1 Year)</h4>
    <h4 className="subheading">
      Subscribe to PSC GREEN and get access to our premium resources.
    </h4>
    <p>Refer a friend for the Premium plan and get Rs 200 cashback!</p>
    <p>If payment is done, please send a message to +91 9846243068, and your account will be active within a day.</p>
  </div>
  <div className="col-md-6 how-img">
    <img
          src={images.qrFour}
      className=" img-fluid"
      alt=""
    />
  </div>
</div>

</div>




  );
}

export default Payment;