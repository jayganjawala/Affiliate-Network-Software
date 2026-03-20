import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Service() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000 }); //once:true
  }, []);

  return (
    <>
      {/* Section 1 */}
      <section className="py-5 poppins-regular d-none">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-4 fw-semibold">
                Smart Dashboard Experience
              </h1>
              <p className="mb-0 mt-3">
                Everything you need to make informed investment decisions,
                <br className="d-none d-md-inline" /> all in one place.
              </p>
              <div className="d-flex gap-2 flex-column mt-3 text-muted">
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    Leads Overview Section
                  </span>
                </div>
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    Payments Section
                  </span>
                </div>
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    User Support Section
                  </span>
                </div>
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    Leads Chart
                  </span>
                </div>
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    Payment Overview Chart
                  </span>
                </div>
                <div>
                  <span>
                    <i className="fa-solid fa-circle-check text-success me-2"></i>
                    Relation Manager Contact Card
                  </span>
                </div>
              </div>
              <div className="d-flex mt-4 gap-3">
                <button
                  className="bg-dark text-light px-4 py-2 rounded-3"
                  onClick={() => {
                    navigate("/services");
                  }}
                >
                  Get Started
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div>
            </div>
            <div
              className="col-md-6 d-md-block rounded-3 mt-4 p-3"
              style={{
                background:
                  "linear-gradient(135deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <img
                alt="star"
                className="img-fluid rounded-3"
                src="/1.png"
                data-aos="fade-up-left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Page: Sectors Section */}
      <section
        className="py-5 poppins-regular"
        // data-aos="fade-up"
        style={{ background: "#F0F6FF" }}
      >
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
                <i className="fa-solid fa-building-columns me-2"></i>
                Platform for Every Sector
              </div>

              <h1 className="fw-semibold mt-3">
                Empowering Businesses Across Multiple Industries
              </h1>
              <p className="mb-0 mt-1 text-muted">
                Our dashboard is designed for partners in various sectors,
                helping them manage leads, partnerships, and insights
                seamlessly.
              </p>
            </div>
          </div>

          {/* Sector Cards */}
          <div className="row g-3 mt-4">
            {/* Sector 1: Financial Services */}
            <div className="col-md-4 d-none">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-piggy-bank text-primary fa-3x mb-3"></i>
                <h4 className="fw-semibold">Financial Services</h4>
                <p className="text-muted small mb-0">
                  Banks, brokers, and fintech firms can track leads, monitor
                  campaign performance, and optimize partnerships in one unified
                  platform.
                </p>
                <button
                  className="btn btn-dark mt-3 px-4 rounded-3"
                  onClick={() => navigate("/services/financial")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Sector 2: Affiliate Networks */}
            <div className="col-md-4">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-network-wired text-success fa-3x mb-3"></i>
                <h4 className="fw-semibold">Affiliate Networks</h4>
                <p className="text-muted small mb-0">
                  Affiliates and IBs can manage campaigns, track conversions,
                  and get real-time insights to grow revenue efficiently.
                </p>
                {/* Price Box */}
                <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted small">Starting Price</span>
                  <span className="fw-semibold text-dark">₹7,300</span>
                </div>
                <button
                  className="btn btn-dark mt-3 px-3 rounded-3"
                  onClick={() => navigate("/service/affiliate")}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Sector 3: Fintech & Trading Platforms */}
            <div className="col-md-4">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-chart-simple text-info fa-3x mb-3"></i>
                <h4 className="fw-semibold">Fintech & Trading Platforms</h4>
                <p className="text-muted small mb-0">
                  Trading platforms and fintech solutions can leverage
                  dashboards for lead generation, client onboarding, and broker
                  comparison services.
                </p>
                {/* Price Box */}
                <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted small">Starting Price</span>
                  <span className="fw-semibold text-dark">₹5,200</span>
                </div>
                <button
                  className="btn btn-dark mt-3 px-3 rounded-3"
                  onClick={() => navigate("/service/fintech")}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Sector 4: E-Commerce Websites */}
            <div className="col-md-4">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-cart-shopping text-primary fa-3x mb-3"></i>
                <h4 className="fw-semibold">E-Commerce Websites</h4>
                <p className="text-muted small mb-0">
                  Online retail businesses can use the dashboard to track sales,
                  manage campaigns, and optimize customer engagement across
                  multiple platforms.
                </p>
                {/* Price Box */}
                <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted small">Starting Price</span>
                  <span className="fw-semibold text-dark">₹9,300</span>
                </div>
                <button
                  className="btn btn-dark mt-3 px-3 rounded-3"
                  onClick={() => navigate("/service/ecommerce")}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Sector 5: Customizable Websites */}
            <div className="col-md-4 d-none">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-laptop-code text-warning fa-3x mb-3"></i>
                <h4 className="fw-semibold">Customizable Dashboard</h4>
                <p className="text-muted small mb-0">
                  Businesses can build fully customizable websites tailored to
                  their brand, with integrated dashboards, lead management, and
                  analytics to streamline operations and growth.
                </p>

                {/* Price Box */}
                <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted small">Starting Price</span>
                  <span className="fw-semibold text-dark">₹10,500</span>
                </div>

                <button
                  className="btn btn-dark mt-3 px-3 rounded-3"
                  onClick={() => navigate("/service/website")}
                >
                  Learn More
                </button>
              </div>
            </div>
            {/* Sector 6: Marketplace Seller Platform */}
            <div className="col-md-4 d-none">
              <div className="card p-4 border-0 h-100 shadow-sm">
                <i className="fa-solid fa-store text-danger fa-3x mb-3"></i>
                <h4 className="fw-semibold">Marketplace Seller Platform</h4>
                <p className="text-muted small mb-0">
                  Businesses can register as sellers, list products, manage
                  inventory, track orders, and receive payments through an
                  integrated marketplace dashboard similar to Flipkart seller
                  systems.
                </p>

                <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted small">Starting Price</span>
                  <span className="fw-semibold text-dark">₹12,000</span>
                </div>

                <button
                  className="btn btn-dark mt-3 px-3 rounded-3"
                  onClick={() => navigate("/service/marketplace")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex mt-4">
            <button
              className="btn bg-dark text-light px-3 rounded-3"
              onClick={() => {
                navigate("/services");
              }}
            >
              Get Started
              <i className="fa-solid fa-arrow-right-long ms-2"></i>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;
