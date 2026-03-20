import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const formSchema = Yup.object({
  prefix: Yup.string().required("Select prefix"),
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Enter valid 10 digit mobile number")
    .required("Mobile number is required"),
});

function Service() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [groupedServices, setGroupedServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // const [formData, setFormData] = useState({
  //   prefix: "Mr",
  //   fullName: "",
  //   email: "",
  //   phone: "",
  // });

  // Initialize AOS & fetch services
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/software-product-services`,
        );

        if (response.data.success) {
          const grouped = response.data.services.reduce((acc, service) => {
            const category = service.category || "Other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(service);
            return acc;
          }, {});

          setGroupedServices(grouped);
        } else {
          toast.error("Failed to load services");
        }
      } catch (err) {
        console.error("API Error:", err);
        toast.error("Server error while fetching services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      const checkRes = await axios.get(
        `${API_BASE_URL}/users/check/${values.phone}`,
      );

      let userData;

      if (!checkRes.data.available) {
        userData = checkRes.data.user;
      } else {
        const createRes = await axios.post(`${API_BASE_URL}/users`, values);
        if (createRes.data.success) {
          userData = createRes.data.user;
        }
      }

      if (userData) {
        toast.success("Proceeding to checkout.");

        navigate("/service-checkout", {
          state: {
            service: selectedService,
            user: {
              name: userData.fullName,
              email: userData.email,
              phone: userData.phone,
            },
          },
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <section
        className="py-5 poppins-regular"
        style={{ background: "#F0F6FF" }}
      >
        <div className="container">
          {/* Heading */}
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

          {/* Services */}
          {loading ? (
            <div className="text-center mt-4">
              <p>Loading services...</p>
            </div>
          ) : Object.keys(groupedServices).length === 0 ? (
            <div className="text-center mt-4">
              <p>No services available</p>
            </div>
          ) : (
            Object.keys(groupedServices).map((category, index) => (
              <div key={index} className="mt-5">
                <h3 className="fw-medium mb-3 text-primary">{category}</h3>

                <div className="row g-3">
                  {groupedServices[category].map((service) => (
                    <div className="col-md-4" key={service.id}>
                      <div className="card p-4 border-0 h-100 shadow-sm">
                        <h4 className="fw-semibold">{service.name}</h4>
                        <p className="text-muted small mb-0">
                          {service.description}
                        </p>

                        <div className="bg-light rounded-3 px-3 py-2 d-flex justify-content-between align-items-center mt-3">
                          <span className="text-muted small">
                            Starting Price
                          </span>
                          <span className="fw-semibold text-dark">
                            ₹{service.price}
                          </span>
                        </div>

                        <button
                          className="btn btn-dark mt-3 px-3 rounded-3"
                          onClick={() => {
                            setSelectedService(service);
                            setShowModal(true);
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          <div className="d-flex mt-5">
            <button
              className="btn bg-dark text-light px-3 rounded-3"
              onClick={() => navigate("/services")}
            >
              Get Started
              <i className="fa-solid fa-arrow-right-long ms-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <div className="d-flex justify-content-between">
                  <h5>Buy {selectedService?.name}</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <p className="mb-3">Price: ₹{selectedService?.price}</p>

                <Formik
                  initialValues={{
                    prefix: "Mr",
                    fullName: "",
                    email: "",
                    phone: "",
                  }}
                  validationSchema={formSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      {/* Prefix */}
                      <div className="form-floating">
                        <Field
                          as="select"
                          name="prefix"
                          className="form-select"
                        >
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                        </Field>
                        <label>Prefix*</label>
                      </div>

                      <ErrorMessage
                        name="prefix"
                        component="div"
                        className="text-danger small mt-1"
                      />

                      {/* Full Name */}
                      <div className="form-floating mt-3">
                        <Field
                          type="text"
                          name="fullName"
                          className="form-control"
                          placeholder="Full Name"
                        />
                        <label>Full Name*</label>
                      </div>

                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-danger small mt-1"
                      />

                      {/* Email */}
                      <div className="form-floating mt-3">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <label>Email*</label>
                      </div>

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger small mt-1"
                      />

                      {/* Phone */}
                      <div className="form-floating mt-3">
                        <Field name="phone">
                          {({ field }) => (
                            <input
                              {...field}
                              type="tel"
                              className="form-control"
                              placeholder="Mobile Number"
                              maxLength={10}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 10) {
                                  setFieldValue("phone", value);
                                }
                              }}
                            />
                          )}
                        </Field>
                        <label>Mobile Number*</label>
                      </div>

                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger small mt-1"
                      />

                      {/* Submit */}
                      <button
                        className="btn btn-success w-100 mt-3"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </>
  );
}

export default Service;
