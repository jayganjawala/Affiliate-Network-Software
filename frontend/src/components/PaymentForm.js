import Cookies from "js-cookie";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function PaymentForm({ price, plan, duration, deploymentId }) {
  const handlePayment = async () => {
    try {
      const phone = Cookies.get("softwarephone");

      const res = await axios.post(`${API_BASE_URL}/create-checkout-session`, {
        price,
        plan,
        duration,
        deploymentId,
        phone,
      });

      const data = res.data;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment error", error);
    }
  };

  return (
    <button className="btn btn-dark w-100 mt-4" onClick={handlePayment}>
      Pay ₹{price}
    </button>
  );
}

export default PaymentForm;
