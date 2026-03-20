import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function ServicePaymentForm({ service, user, duration }) {
  //   const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user || !user.phone) {
      toast.error("User information missing");
      return;
    }

    // setLoading(true);

    try {
      const payload = {
        serviceId: service.id,
        price: service.price,
        duration,
        phone: user.phone,
      };

      const res = await axios.post(
        `${API_BASE_URL}/service/create-checkout-session`,
        payload,
      );

      if (res.data.url) {
        window.location.href = res.data.url; // redirect to Stripe checkout
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong with payment");
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <button className="btn btn-dark w-100 mt-4" onClick={handlePayment}>
      Pay ₹{service.price}
    </button>
  );
}

export default ServicePaymentForm;
