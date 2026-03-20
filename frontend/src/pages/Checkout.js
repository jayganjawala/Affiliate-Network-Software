import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, duration, price, deploymentId } = location.state || {};

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const phone = Cookies.get("softwarephone");
      if (!phone) {
        toast.error("User not logged in");
        navigate("/login");
        return;
      }

      try {
        const token = Cookies.get("softwaretoken");
        const response = await axios.get(
          `${API_BASE_URL}/myprofile?phone=${phone}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          const profile = response.data.profile;
          setUser({
            name: profile.userName || "",
            email: profile.email || "",
            mobile: profile.phone || "",
          });
        } else {
          toast.error(response.data.error || "Failed to fetch profile");
        }
      } catch (error) {
        toast.error("Error fetching profile");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <section className="py-5">
      <div className="container">
        <div className="row text-center justify-content-center">
          {/* LOGO */}
          <div className="col-md-4">
            <Link className="nav-link p-0" to="/">
              <img src="JD.svg" className="img-fluid" alt="logo" />
            </Link>
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              {/* Header */}
              <div className="text-center p-3 bg-success bg-opacity-10">
                <h5 className="fw-semibold mb-3">
                  Your plan is <span className="text-danger">{plan}</span>
                </h5>

                <img
                  src="/Aggressive.png"
                  alt="gauge"
                  className="img-fluid"
                  style={{ maxWidth: "250px" }}
                  // onClick={() => {
                  //   navigate("/");
                  // }}
                />

                <p className="mt-2 text-success small mb-0">
                  {plan} is suitable for your profile.
                </p>
              </div>

              {/* Personal Details */}
              <div className="p-3">
                <h6 className="fw-semibold mb-3">Personal details</h6>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Name</span>
                  <span>{user.name}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Email</span>
                  <span>{user.email}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Mobile</span>
                  <span>{user.mobile}</span>
                </div>

                <hr />

                {/* Order Summary */}
                {/* <div className="d-flex justify-content-between mb-2">
              <h6 className="fw-semibold mb-0">Order Summary</h6>
              <a href="#" className="small text-primary">
                View Breakdown
              </a>
            </div> */}

                <div className="d-flex justify-content-between mt-3">
                  <span>{duration} Plan</span>
                  <span>₹{price}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>₹{price}</span>
                </div>

                {/* <button
                  className="btn btn-dark w-100 mt-4"
                  onClick={() =>
                    navigate("/confirmation", {
                      state: { plan, duration, price, user },
                    })
                  }
                >
                  <PaymentForm
                    price={price}
                    plan={plan}
                    duration={duration}
                    user={user}
                    navigate={navigate}
                  />
                </button> */}
                {/* Proceed to Payment */}
                <PaymentForm
                  price={price}
                  plan={plan}
                  deploymentId={deploymentId}
                  duration={duration}
                  user={user}
                  navigate={navigate}
                />

                <p className="text-center small text-muted mt-2">
                  Secure Checkout Process
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
