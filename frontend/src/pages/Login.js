import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const phoneSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Enter valid 10 digit mobile number")
    .required("Mobile number is required"),
});

const otpSchema = Yup.object({
  otp: Yup.string().required("Enter OTP"),
});

function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // SEND OTP
  const handleSendOtp = async (values) => {
    setError("");

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/sendOtp`, {
        phone: values.phone,
      });
      setPhoneNumber(values.phone);
      setStep("otp");
      toast.success("Send OTP Successfully");
    } catch (err) {
      setError(
        err.response?.data?.error || "Your mobile number is not registered",
      );
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (values) => {
    setError("");
    try {
      setLoading(true);

      const { data } = await axios.post(`${API_BASE_URL}/verifyOtp`, {
        phone: phoneNumber,
        otp: values.otp,
      });

      Cookies.set("softwaretoken", data.token, { expires: 1, sameSite: "Strict" });
      Cookies.set("softwarephone", phoneNumber, { expires: 1, sameSite: "Strict" });
      Cookies.set("softwarename", data.name || "User", {
        expires: 1,
        sameSite: "Strict",
      });

      window.dispatchEvent(new Event("userLoggedIn"));

      // toast.success("Login Successful");
      toast.success(`Hello, ${data.name}`);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 poppins-regular">
      <div className="container">
        <h1 className="display-5 fw-semibold">
          Welcome Back{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#0068EF,#00A15A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Smart Investor
          </span>
        </h1>

        <p className="text-muted mt-3 mb-0">
          Login to your account and continue your journey towards smarter
          investments
        </p>
        <div className="row justify-content-between mt-3 mt-md-0">
          {/* LEFT CONTENT */}
          <div className="col-md-6 mt-4 order-md-1 order-2">
            <div className="d-flex mb-4">
              <div className="me-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded p-3">
                  <i className="fa-solid fa-briefcase"></i>
                </div>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">B2B Marketplace</h6>
                <p className="text-muted small mb-0">
                  Connect brokers, IBs, affiliates, and fintech companies
                </p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="me-3">
                <div className="bg-success bg-opacity-10 text-success rounded p-3">
                  <i className="fa-solid fa-laptop"></i>
                </div>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Lead Generation</h6>
                <p className="text-muted small mb-0">
                  High quality trader leads delivered to brokers
                </p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="me-3">
                <div className="bg-info bg-opacity-10 text-info rounded p-3">
                  <i className="fa-solid fa-chart-bar"></i>
                </div>
              </div>
              <div>
                <h6 className="fw-semibold mb-1">Broker Comparison</h6>
                <p className="text-muted small mb-0">
                  Compare and choose the best broker
                </p>
              </div>
            </div>
            {/* TRUST SECTION */}
            <div className="bg-success bg-opacity-10 rounded p-4 mt-4">
              <div className="d-flex align-items-center">
                <div className="me-3 d-flex">
                  <img
                    src="https://i.pravatar.cc/40?u=1"
                    alt=""
                    className="rounded-circle border border-2 border-white"
                    width="36"
                    height="36"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=2"
                    alt=""
                    className="rounded-circle border border-2 border-white ms-n2"
                    width="36"
                    height="36"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=3"
                    alt=""
                    className="rounded-circle border border-2 border-white ms-n2"
                    width="36"
                    height="36"
                  />
                  <img
                    src="https://i.pravatar.cc/40?u=4"
                    alt=""
                    className="rounded-circle border border-2 border-white ms-n2"
                    width="36"
                    height="36"
                  />
                </div>

                <div>
                  <div className="fw-semibold fs-5">
                    Join 5000+ Smart Partners
                  </div>

                  <small className="text-muted">
                    Trusted by brokers & fintech companies across India for
                    disciplined growth
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="col-md-5 order-md-2 order-1">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-1">Login to Your Account</h4>

                <p className="text-muted small mb-4">
                  Enter your phone number to receive OTP
                </p>

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                {step === "phone" && (
                  <Formik
                    initialValues={{ phone: "" }}
                    validationSchema={phoneSchema}
                    onSubmit={handleSendOtp}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <div className="form-floating">
                          <Field name="phone">
                            {({ field }) => (
                              <input
                                {...field}
                                type="tel"
                                className="form-control"
                                placeholder="Mobile Number"
                                maxLength={10}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  );
                                  if (value.length <= 10)
                                    setFieldValue("phone", value);
                                }}
                              />
                            )}
                          </Field>
                          <label>Enter Your Mobile*</label>
                        </div>

                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger small mt-1"
                        />

                        <button
                          type="submit"
                          className="btn btn-success w-100 btn-lg fw-semibold mt-3"
                          disabled={loading}
                        >
                          {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}

                {/* STEP 2 : OTP */}
                {step === "otp" && (
                  <Formik
                    initialValues={{ otp: "" }}
                    validationSchema={otpSchema}
                    onSubmit={handleVerifyOtp}
                  >
                    <Form>
                      <div className="form-floating">
                        <Field
                          type="text"
                          name="otp"
                          className="form-control"
                          placeholder="Enter OTP"
                          maxLength={6}
                        />
                        <label>Enter OTP*</label>
                      </div>

                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-danger small mt-1"
                      />

                      <button
                        type="submit"
                        className="btn btn-success w-100 btn-lg fw-semibold mt-3"
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Verify OTP & Login"}
                      </button>

                      <div className="text-center mt-3">
                        <button
                          type="button"
                          className="btn btn-link text-success"
                          onClick={() => setStep("phone")}
                        >
                          Change Phone Number
                        </button>
                      </div>
                    </Form>
                  </Formik>
                )}

                <div className="text-center mt-3 small">
                  Don't have an account?{" "}
                  <a
                    href="/startfree"
                    className="text-success fw-semibold text-decoration-none"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
