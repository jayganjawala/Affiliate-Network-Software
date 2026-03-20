import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function Services() {
  const navigate = useNavigate();

  const [cloudPlan, setCloudPlan] = useState({
    duration: "",
    price: 0,
    description: "",
  });
  const [localPlan, setLocalPlan] = useState({
    duration: "",
    price: 0,
    description: "",
  });
  const [hybridPlan, setHybridPlan] = useState({
    duration: "",
    price: 0,
    description: "",
  });

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDeployments = async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/software-deployments`,
        );
        if (data.success) {
          const cloud = data.deployments.find((d) => d.name === "Cloud SaaS");
          const local = data.deployments.find(
            (d) => d.name === "Local Platform",
          );
          const hybrid = data.deployments.find(
            (d) => d.name === "Hybrid Platform",
          );

          if (cloud)
            setCloudPlan({
              id: cloud.id,
              name: cloud.name,
              duration: cloud.duration,
              price: parseFloat(cloud.price),
              description: cloud.description,
            });
          if (local)
            setLocalPlan({
              id: local.id,
              name: local.name,
              duration: local.duration,
              price: parseFloat(local.price),
              description: local.description,
            });
          if (hybrid)
            setHybridPlan({
              id: hybrid.id,
              name: hybrid.name,
              duration: hybrid.duration,
              price: parseFloat(hybrid.price),
              description: hybrid.description,
            });
        } else {
          toast.error(data.message || "Failed to load deployment plans");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Error fetching deployment plans",
        );
      } finally {
        // setLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  const handleSubscribe = (platform, plan) => {
    const token = Cookies.get("softwaretoken");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!plan.duration || !plan.price) {
      toast.error("Please select a plan first");
      return;
    }
    // toast.success(`${platform} plan selected`);
    navigate("/checkout", {
      state: {
        plan: platform,
        duration: plan.duration,
        price: plan.price,
        deploymentId: plan.id,
      },
    });
  };

  // if (loading)
  //   return (
  //     <div className="text-center py-5">
  //       <div className="spinner-border text-primary" role="status" />
  //       <p>Loading deployment plans...</p>
  //     </div>
  //   );

  return (
    <>
      <section className="py-5 poppins-regular">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <i className="fa-solid fa-gears me-2"></i>
                Our Deployment
              </div>
              <h1 className="display-6 fw-semibold mt-3">
                Flexible Platform Deployment Solutions
              </h1>
              <p className="mb-0 mt-1 text-muted">
                Choose the deployment model that best fits your business,
                security, and scalability needs
              </p>
            </div>
          </div>

          <div className="row mt-4">
            {/* Cloud SaaS */}
            <div className="col-md-4">
              <div
                className="card h-100 border rounded-3 d-flex flex-column"
                style={{ border: "#0000001A" }}
              >
                <div className="p-3 bg-success-subtle rounded-top-3">
                  <i className="fa-solid rounded-3 fa-cloud fa-2x text-primary"></i>
                  <h5 className="mt-3">{cloudPlan.name}</h5>
                  {/* Pricing with radio buttons */}
                  <div className="mt-3">
                    <div className="form-check d-flex justify-content-between align-items-center">
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        name="cloudPlan"
                        id="cloud6Month"
                        checked={cloudPlan.duration === "6 Months"}
                        onChange={() =>
                          setCloudPlan((prev) => ({
                            ...prev,
                            duration: "6 Months",
                            price: 5999,
                          }))
                        }
                        // defaultChecked
                      />
                      <label
                        className="form-check-label flex-grow-1 ms-2"
                        htmlFor="cloud6Month"
                      >
                        {cloudPlan.duration}
                      </label>
                      <strong className="text-dark">
                        ₹{cloudPlan.price.toLocaleString()}
                      </strong>
                    </div>

                    {/* <div className="form-check d-flex justify-content-between align-items-center mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cloudPlan"
                      id="cloud12Month"
                      checked={cloudPlan.duration === "Auto Subscription"}
                      onChange={() =>
                        setCloudPlan({
                          duration: "Auto Subscription",
                          price: 5999,
                        })
                      }
                      // defaultChecked
                    />
                    <label
                      className="form-check-label flex-grow-1 ms-2"
                      htmlFor="cloud12Month"
                    >
                      Auto Subscription
                    </label>
                    <strong className="text-dark">
                      ₹5,999<span className="text-muted small">/6 Month</span>
                    </strong>
                  </div> */}
                  </div>
                  <button
                    className="btn btn-dark mt-3 w-100"
                    onClick={() => handleSubscribe(cloudPlan.name, cloudPlan)}
                  >
                    Subscribe Now
                    {/* <i className="fa-solid fa-arrow-right-long ms-2"></i> */}
                  </button>
                </div>
                <div className="p-3 flex-grow-1">
                  <p className="mb-0 small text-muted">
                    {cloudPlan.description}
                  </p>

                  <div className="mt-4 d-flex flex-column text-muted">
                    <div>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Lead upload up to 15</small>
                    </div>
                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Instant platform deployment</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Automatic updates & maintenance</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Scalable cloud infrastructure</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Global accessibility</small>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary bg-opacity-25 text-white text-center py-2 rounded-bottom-3">
                  <small className="text-dark">
                    For any query contact{" "}
                    <i className="fa-solid fa-phone text-success"></i> +91 90164
                    19325
                  </small>
                </div>
                {/* <div className="d-flex">
                <button className="btn btn-outline-dark mt-3">
                  Get Started
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div> */}
              </div>
            </div>

            {/* Local Platform */}
            <div className="col-md-4 mt-md-0 mt-3">
              <div
                className="card h-100 border rounded-3 d-flex flex-column"
                style={{ border: "#0000001A" }}
              >
                <div className="p-3 bg-primary-subtle rounded-top-3">
                  <i className="fa-solid rounded-3 fa-server fa-2x text-danger"></i>
                  <h5 className="mt-3">{localPlan.name}</h5>
                  {/* Pricing with radio buttons */}
                  <div className="mt-3">
                    <div className="form-check d-flex justify-content-between align-items-center">
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        name="localPlan"
                        id="local6Month"
                        checked={localPlan.duration === "6 Months"}
                        onChange={() =>
                          setLocalPlan((prev) => ({
                            ...prev,
                            duration: "6 Months",
                            price: 11999,
                          }))
                        }
                        // defaultChecked
                      />
                      <label
                        className="form-check-label flex-grow-1 ms-2"
                        htmlFor="local6Month"
                      >
                        {localPlan.duration}
                      </label>
                      <strong className="text-dark">
                        ₹{localPlan.price.toLocaleString()}
                      </strong>
                    </div>

                    {/* <div className="form-check d-flex justify-content-between align-items-center mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="localPlan"
                      id="local12Month"
                      checked={localPlan.duration === "Auto Subscription"}
                      onChange={() =>
                        setLocalPlan({
                          duration: "Auto Subscription",
                          price: 11999,
                        })
                      }
                      // defaultChecked
                    />
                    <label
                      className="form-check-label flex-grow-1 ms-2"
                      htmlFor="local12Month"
                    >
                      Auto Subscription
                    </label>
                    <strong className="text-dark">
                      ₹11,999<span className="text-muted small">/6 Month</span>
                    </strong>
                  </div> */}
                  </div>

                  <button
                    className="btn btn-dark mt-3 w-100"
                    onClick={() => handleSubscribe(localPlan.name, localPlan)}
                  >
                    Subscribe Now
                    {/* <i className="fa-solid fa-arrow-right-long ms-2"></i> */}
                  </button>
                </div>
                <div className="p-3 flex-grow-1">
                  <p className="mb-0 small text-muted">
                    {localPlan.description}
                  </p>

                  <div className="mt-4 d-flex flex-column text-muted">
                    <div>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Lead upload up to 25</small>
                    </div>
                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Complete data ownership</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>On-premise deployment</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Custom integrations</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Enhanced security control</small>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary bg-opacity-25 text-white text-center py-2 rounded-bottom-3">
                  <small className="text-dark">
                    For any query contact{" "}
                    <i className="fa-solid fa-phone text-success"></i> +91 90164
                    19325
                  </small>
                </div>
              </div>
            </div>

            {/* Hybrid Platform */}
            <div className="col-md-4 mt-md-0 mt-3">
              <div
                className="card h-100 border rounded-3  d-flex flex-column"
                style={{ border: "#0000001A" }}
              >
                <div className="p-3 bg-danger-subtle rounded-top-3">
                  <i className="fa-solid rounded-3 fa-cloud-arrow-up fa-2x text-success"></i>
                  <h5 className="mt-3">{hybridPlan.name}</h5>
                  {/* Pricing with radio buttons */}
                  <div className="mt-3">
                    <div className="form-check d-flex justify-content-between align-items-center">
                      <input
                        className="form-check-input mb-1"
                        type="radio"
                        name="hybridPlan"
                        id="hybrid6Month"
                        checked={hybridPlan.duration === "6 Months"}
                        onChange={() =>
                          setHybridPlan((prev) => ({
                            ...prev,
                            duration: "6 Months",
                            price: 15999,
                          }))
                        }
                        // defaultChecked
                      />
                      <label
                        className="form-check-label flex-grow-1 ms-2"
                        htmlFor="hybrid6Month"
                      >
                        {hybridPlan.duration}
                      </label>
                      <strong className="text-dark">
                        ₹{hybridPlan.price.toLocaleString()}
                      </strong>
                    </div>

                    {/* <div className="form-check d-flex justify-content-between align-items-center mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="hybridPlan"
                      id="hybrid12Month"
                      checked={hybridPlan.duration === "Auto Subscription"}
                      onChange={() =>
                        setHybridPlan({
                          duration: "Auto Subscription",
                          price: 15999,
                        })
                      }
                      // defaultChecked
                    />
                    <label
                      className="form-check-label flex-grow-1 ms-2"
                      htmlFor="hybrid12Month"
                    >
                      Auto Subscription
                    </label>
                    <strong className="text-dark">
                      ₹15,999<span className="text-muted small">/6 Month</span>
                    </strong>
                  </div> */}
                  </div>
                  <button
                    className="btn btn-dark mt-3 w-100"
                    onClick={() =>
                      handleSubscribe("Hybrid Platform", hybridPlan)
                    }
                  >
                    Subscribe Now
                    {/* <i className="fa-solid fa-arrow-right-long ms-2"></i> */}
                  </button>
                </div>
                <div className="p-3  flex-grow-1">
                  <p className="mb-0 small text-muted">
                    {hybridPlan.description}
                  </p>

                  <div className="mt-5 d-flex flex-column text-muted">
                    <div>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Unlimited lead uploads</small>
                    </div>
                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Cloud + on-premise integration</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Flexible data management</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Improved performance and control</small>
                    </div>

                    <div className="mt-2">
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      <small>Scalable architecture</small>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary bg-opacity-25 text-white text-center py-2 rounded-bottom-3">
                  <small className="text-dark">
                    For any query contact{" "}
                    <i className="fa-solid fa-phone text-success"></i> +91 90164
                    19325
                  </small>
                </div>
                {/* <div className="d-flex">
                <button className="btn btn-outline-dark mt-3">
                  Get Started
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div> */}
              </div>
            </div>
          </div>
          <div className="card mt-5 p-3 h-100 border-0 shadow-sm d-none">
            <div className="row">
              <div className="col-md-6 px-md-5 px-0 d-flex flex-column justify-content-center">
                <h1 className="fw-semibold">
                  Real-Time Delivery: Your Exclusive View of Website Activity
                </h1>
                <p className="mt-2">
                  Our Subscribers gets all updates in real-time.
                </p>
                <div className="d-flex gap-2 flex-column text-muted">
                  <div>
                    <span>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      User-Friendly
                    </span>
                  </div>
                  <div>
                    <span>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      Login & Logout
                    </span>
                  </div>
                  <div>
                    <span>
                      <i className="fa-solid fa-circle-check text-success me-2"></i>
                      Secure & Private Access
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 mt-4 d-flex justify-content-center"
                data-aos="fade-up"
              >
                <img src="mob1.svg" className="img-fluid" alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-5 poppins-regular d-none"
        style={{ background: "#F0F6FF" }}
      >
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
    </>
  );
}

export default Services;
