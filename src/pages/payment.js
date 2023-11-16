import './payment.css'
import images from "../images";

function Payment() {

  const handleContactUs = () => {
    const recipientEmail = "pscgreen.learning@gmail.com";
    const subject = "PSC GREEN Inquiry";
    const body = "Hello PSC GREEN team,\n\nI have a question about your services. Can you please provide more information?\n\nThank you!";
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  
  return (
    <div>
      <div className="main-payment">
        <div style={{ marginTop: "-30px" }} className="lefttext">
          <div className="textwrap">
            <h1>PSC GREEN</h1>
            <p>Subscribe to PSC GREEN and  get access to our resources. Take part in mock tests designed to enhance your learning experience and open up opportunities for a career in the Public Service Commission (PSC) jobs.</p>
            <div style={{ margin: "20px" }} className="subscription-options">
              <label>
                Standard -Rs 250 (1 year)
                <p>Refer a friend for Standard plan and get Rs 100 cashback!</p>
              </label>
              <label>
                Premium -Rs 450 (2 year)
                <p>Refer a friend for Premium plan and get Rs 200 cashback!</p>
              </label>
              <label>
                Our UPI
                pscgreenlearning@ybl
              </label>
            </div>
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