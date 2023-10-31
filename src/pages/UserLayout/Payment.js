import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";


function Payment({setIsRefech}) {
    const userEmail = useSelector((state) => state.loginReducer?.userData?.email);
	const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 250,
	});

    const initPayment = (data, email) => {
        const options = {
          key: "rzp_test_h8IfBaZ34VQ0c6",
          amount: data.amount,
          currency: data.currency,
          name: book.name,
          description: "Test Transaction",
          image: book.img,
          order_id: data.id,
          handler: async (response) => {
            try {
              response.email = email;
              const verifyUrl = "http://localhost:3030/api/payment/verify";
              const { data } = await axios.post(verifyUrl, response);
              console.log(data);
            setIsRefech(true)

            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        setIsRefech(true)

      };
      

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:3030/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: book.price, email: userEmail });
            initPayment(data.data, userEmail);
            setIsRefech(true)
            
		} catch (error) {
			console.log(error);
		}
	};

	return (
    <main id="main">
  <div className="container">
    <div className="pricing">
      <div className="pricing-card">
        <h3 className="pricing-card-heading pricing-card-heading-free">FREE</h3>
        <ul className="pricing-card-list">
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-no">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-no">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-no">
            Lorem ipsum dolor sit amet
          </li>
        </ul>
        <p className="pricing-card-price">
          $40<span className="pricing-card-price-text">/mo</span>
        </p>
        <button className="pricing-card-btn">Buy</button>
      </div>
      <div className="pricing-card pricing-card-highlight">
        <h3 className="pricing-card-heading pricing-card-heading-lite">LITE</h3>
        <ul className="pricing-card-list">
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-no">
            Lorem ipsum dolor sit amet
          </li>
        </ul>
        <p className="pricing-card-price">
          $90<span className="pricing-card-price-text">/mo</span>
        </p>
        <button className="pricing-card-btn">Buy</button>
      </div>
      <div className="pricing-card">
        <h3 className="pricing-card-heading pricing-card-heading-pro">PRO</h3>
        <ul className="pricing-card-list">
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
          <li className="pricing-card-list-item icon-yes">
            Lorem ipsum dolor sit amet
          </li>
        </ul>
        <p className="pricing-card-price">
          $150<span className="pricing-card-price-text">/mo</span>
        </p>
        <button onClick={handlePayment}  className="pricing-card-btn">Buy</button>
      </div>
    </div>
  </div>
 
</main>

	);
}

export default Payment;