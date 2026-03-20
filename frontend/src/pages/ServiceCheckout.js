import { useLocation, Link } from "react-router-dom";
import ServicePaymentForm from "../components/ServicePaymentForm";

function ServiceCheckout() {
  const location = useLocation();
  const { service, user } = location.state || {};
  const duration = "6 Month";

  if (!service || !user) {
    return (
      <p className="text-center mt-5">No service or user data available.</p>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row text-center justify-content-center">
          <div className="col-md-4">
            <Link className="nav-link p-0" to="/">
              <img src="JD.svg" className="img-fluid" alt="logo" />
            </Link>
          </div>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="text-center p-3 bg-success bg-opacity-10">
                <h5 className="fw-semibold mb-3">
                  Service: <span className="text-danger">{service.name}</span>
                </h5>

                <img
                  src="/Aggressive.png"
                  alt="service"
                  className="img-fluid"
                  style={{ maxWidth: "250px" }}
                />

                <p className="mt-2 text-success small mb-0">
                  {service.name} is suitable for your profile.
                </p>
              </div>

              <div className="p-3">
                <h6 className="fw-semibold mb-3">Your Details</h6>

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
                  <span>{user.phone}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mt-3">
                  <span>{duration} Plan</span>
                  <span>₹{service.price}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>₹{service.price}</span>
                </div>

                {/* Use new PaymentForm */}
                <ServicePaymentForm
                  service={service}
                  user={user}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceCheckout;
