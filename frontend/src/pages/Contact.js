import React from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10 digit mobile number")
    .required("Mobile number is required"),

  message: Yup.string().required("Message is required"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await axios.post(`${API_BASE_URL}/contactus`, values);

      toast.success("Thank you for reaching out");
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="py-5 poppins-regular"
        style={{ background: "#f3f3f3" }}
      >
        <div className="container">
          <div className="row text-start">
            <div className="col-md-4">
              <h5 className="fw-bold">Location</h5>
              <p className="text-muted small">
                101 - The XYZ,
                <br />
                Pal, Surat, Gujarat - 395009
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold">Call Us</h5>
              <p className="text-muted">
                <i className="fa fa-phone me-2"></i>90164 19325
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold">Email Us</h5>
              <p className="text-muted">
                <i className="fa fa-envelope me-2"></i>
                support@affilatenetwork.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 poppins-regular">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card border-0 bg-body shadow-sm rounded-3 p-5">
                <h2 className="text-center fw-semibold">
                  We Always Here{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg,#0182C3,#00A15A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    To Help You
                  </span>
                </h2>

                <Formik
                  initialValues={initialValues}
                  validationSchema={ContactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="row mt-3">
                        {/* Name */}
                        <div className="col-md-4 mb-3">
                          <div className="form-floating">
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Name"
                            />
                            <label>Name*</label>
                          </div>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger small mt-1"
                          />
                        </div>

                        {/* Email */}
                        <div className="col-md-4 mb-3">
                          <div className="form-floating">
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
                        </div>

                        {/* Phone */}
                        <div className="col-md-4 mb-3">
                          <div className="form-floating">
                            <Field
                              name="phone"
                              className="form-control"
                              placeholder="Mobile"
                              maxLength="10"
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                if (value.length <= 10) {
                                  setFieldValue("phone", value);
                                }
                              }}
                            />
                            <label>Mobile*</label>
                          </div>
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-danger small mt-1"
                          />
                        </div>

                        {/* Message */}
                        <div className="col-md-12 mb-3">
                          <div className="form-floating">
                            <Field
                              as="textarea"
                              name="message"
                              className="form-control"
                              placeholder="Your Message"
                              style={{ height: "120px" }}
                            />
                            <label>Your Message*</label>
                          </div>
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-danger small mt-1"
                          />
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn px-3 rounded-3 bg-success text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
