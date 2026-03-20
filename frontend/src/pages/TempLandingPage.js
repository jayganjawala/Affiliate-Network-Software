import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const schedualFree = useRef(null)

  const scrollSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const schedualFreeSection = () =>{
            schedualFree.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
  useEffect(() => {
    AOS.init({ duration: 1000 }); //once:true
  }, []);
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <img className="me-1 mb-1" alt="star" src="/star.svg" />
                Trusted by 50,000+ Inventors
              </div>
              <h1 className="display-3 fw-semibold mt-4">
                Expert Financial Advisory for{" "}
                <span
                  className="display-3 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #0068EF 0%, #00A15A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Smarter Investments
                </span>
              </h1>
              <p className="fs-5 mt-4 mb-0 text-muted">
                Navigate the markets with confidence. EquityPandit delivers
                professional insights, data-driven strategies, and personalized
                <br className="d-none d-md-inline" />
                guidance across equity, mutual funds, ETFs, and options
                <br className="d-none d-md-inline" /> trading.
              </p>
              <div className="d-flex mt-4 gap-3">
                <button
                  className="bg-dark text-light px-4 py-2 rounded-3"
                  onClick={() => navigate("/startfree")}
                >
                  <i className="fa-solid fa-arrow-right-long me-2"></i>
                  Get Started Free
                </button>
                <button className="bg-dark text-light px-4 py-2 rounded-3"
                onClick={schedualFreeSection}
                >
                  <i className="fa-solid fa-phone me-2"></i>Schedual A Call
                </button>
              </div>
              <div className="row mt-4 text-start">
                <div className="col-md-4 col-4 border-end border-2">
                  <h3>20+</h3>
                  <p className="mt-3 mb-0">
                    Years of Market <br />
                    Experience
                  </p>
                </div>
                <div className="col-md-4 col-4 border-end border-2">
                  <h3>1M+</h3>
                  <p className="mt-3 mb-0">
                    Registered
                    <br /> Users
                  </p>
                </div>
                <div className="col-md-4 col-4">
                  <h3>11+</h3>
                  <p className="mt-3 mb-0">
                    National <br className="d-none d-md-block" />& Industry
                    Awards
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 d-md-block rounded-4 mt-md-0 mt-4 p-3"
              style={{
                background:
                  "linear-gradient(135deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <img
                alt="star"
                className="img-fluid rounded-4"
                src="/1.png"
                data-aos="fade-up-left"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-aos="fade-up" ref={sectionRef}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <i className="fa-solid fa-gears me-2"></i>
                Our Service
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
                className="card p-3 h-100 border rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid rounded-3 fa-cloud fa-2x text-primary"></i>
                <h5 className="mt-3">Cloud SaaS</h5>
                <p className="mt-1 mb-0 small">
                  Our Cloud SaaS solution provides a fully managed platform
                  hosted on secure cloud infrastructure, allowing businesses to
                  launch quickly without worrying about maintenance or server
                  management.
                </p>

                <div className="mt-3 d-flex flex-column">
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

                <div className="d-flex">
                  <button
                    className="btn btn-outline-dark mt-3"
                    onClick={() => navigate("/services")}
                  >
                    Get Started
                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Local Platform */}
            <div className="col-md-4 mt-md-0 mt-3">
              <div
                className="card p-3 h-100 border rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid rounded-3 fa-server fa-2x text-danger"></i>
                <h5 className="mt-3">Local Platform</h5>
                <p className="mt-1 mb-3 small">
                  The Local Platform solution allows businesses to host and
                  operate the system on their own infrastructure, providing full
                  control over data, security, and internal integrations.
                </p>

                <div className="mt-4 d-flex flex-column">
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

                <div className="d-flex">
                  <button
                    className="btn btn-outline-dark mt-3"
                    onClick={() => navigate("/services")}
                  >
                    Get Started
                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Hybrid Platform */}
            <div className="col-md-4 mt-md-0 mt-3">
              <div
                className="card p-3 h-100 border rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid rounded-3 fa-cloud-arrow-up fa-2x text-success"></i>
                <h5 className="mt-3">Hybrid Platform</h5>
                <p className="mt-1 mb-3 small">
                  Our Hybrid Platform combines the flexibility of cloud services
                  with the security of local infrastructure, giving businesses
                  the best of both environments.
                </p>

                <div className="mt-4 d-flex flex-column">
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

                <div className="d-flex">
                  <button
                    className="btn btn-outline-dark mt-3"
                    onClick={() => navigate("/services")}
                  >
                    Get Started
                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5"
        data-aos="fade-up"
        style={{ backgroundColor: "#F0F6FF" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <i className="fa-solid fa-award me-2"></i>
                Why Choose Us
              </div>
              <h1 className="display-6 fw-semibold mt-3">
                Platform Features That Set Us Apart
              </h1>
              <p className="mb-0 mt-1 text-muted">
                Experience the difference with our cutting-edge tools and expert
                guidance
              </p>
            </div>
          </div>
          <div className="row g-3 mt-4">
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-regular fa-handshake fa-2x text-primary"></i>
                <h5 className="mt-3">Trusted & Secure</h5>
                <p className="mt-1 mb-0 small">
                  Verified B2B Marketplace that connects only genuine brokers,
                  IBs, affiliates, signal providers, fintech companies, and
                  agencies in a fully secure ecosystem.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid fa-award fa-2x text-danger"></i>
                <h5 className="mt-3">Expert Team</h5>
                <p className="mt-1 mb-0 small">
                  Seasoned brokerage professionals with deep industry experience
                  who help you launch partnerships, manage campaigns, and scale
                  globally.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid fa-chart-line fa-2x text-success"></i>
                <h5 className="mt-3">Data-Driven Insights</h5>
                <p className="mt-1 mb-0 small">
                  Advanced geo-targeted lead generation delivering high-quality,
                  conversion-ready trader leads, verified contacts, demo
                  registrations & First-Time Deposit (FTD) clients.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid fa-trophy fa-2x text-warning "></i>
                <h5 className="mt-3">Proven Results</h5>
                <p className="mt-1 mb-0 small">
                  Consistent success with verified affiliate partnerships,
                  multi-country distribution networks, and measurable growth for
                  hundreds of brokers and fintech partners.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid fa-bolt fa-2x text-info"></i>
                <h5 className="mt-3">Real-Time Updates</h5>
                <p className="mt-1 mb-0 small">
                  Instant alerts and live dashboard for new leads, partnership
                  opportunities, broker comparison updates, and market-ready
                  campaigns.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card p-3 h-100 border-0 rounded-3"
                style={{ border: "#0000001A" }}
              >
                <i className="fa-solid fa-user-gear fa-2x"></i>
                <h5 className="mt-3">Personalized Strategy</h5>
                <p className="mt-1 mb-0 small">
                  Independent Broker Comparison Service + tailored B2B solutions
                  designed around your specific goals — spreads, commissions,
                  deposits, support quality, and user reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-aos="fade-up">
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
              <div className="d-flex gap-2 flex-column mt-3">
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
                  onClick={scrollSection}
                >
                  Get Started
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div>
            </div>
            <div
              className="col-md-6 d-md-block rounded-4 mt-4 p-3"
              style={{
                background:
                  "linear-gradient(135deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <img
                alt="star"
                className="img-fluid rounded-4"
                src="/1.png"
                data-aos="fade-up-left"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <i className="fa-solid fa-list-check me-2"></i>
                Simple Process
              </div>
              <h1 className="display-6 fw-semibold mt-3">How We Works</h1>
              <p className="mb-0 mt-1 text-muted">
                Get started with professional financial advisory in four simple
                steps
              </p>
            </div>
          </div>
          <div className="row g-3 mt-4">
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work1.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Choose Your Service</h6>
                  <p className="mt-2 mb-0 small">
                    Choose from B2B Marketplace, Lead Generation Broker,
                    Comparison Service, or Opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work2.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Get Expert Recommendations</h6>
                  <p className="mt-2 mb-0 small">
                    We provide expert guidance and real-time tracking from start
                    to finish.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work3.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Track Everything Live</h6>
                  <p className="mt-2 mb-0 small">
                    Select. Get Guidance. Track Live. Act Confidently.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work4.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Act with Confidence</h6>
                  <p className="mt-2 mb-0 small">
                    Follow structured advice—no emotional decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-6 fw-semibold mt-3">
                Frequently Asked Questions
              </h1>
              <p className="mb-0 mt-1 text-muted">
                Visit our FAQ section for answers to common queries.
              </p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <div
                className="accordion accordion-flush bg-white rounded-3"
                id="faqAccordion"
              >
                <style>
                  {`
              .accordion-button:not(.collapsed) {
                background-color: #ffffff !important;
                box-shadow: none !important;
                color: inherit !important;
              }
              .accordion-button:focus {
                box-shadow: none !important;
                border-color: transparent !important;
              }
            `}
                </style>

                {/* FAQ 1 */}
                <div className="accordion-item border-bottom border-top-0">
                  <h2 className="accordion-header" id="faq1">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1"
                      aria-expanded="false"
                      aria-controls="collapse1"
                    >
                      What is the B2B Marketplace?
                    </button>
                  </h2>
                  <div
                    id="collapse1"
                    className="accordion-collapse collapse"
                    aria-labelledby="faq1"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      The B2B Marketplace is a platform that connects brokers,
                      introducing brokers (IBs), affiliates, signal providers,
                      fintech companies, and agencies in a single ecosystem. It
                      allows businesses to find verified partners, launch
                      partnership campaigns, manage multi-country distribution
                      networks, and expand into new markets efficiently.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="accordion-item border-bottom">
                  <h2 className="accordion-header" id="faq2">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2"
                      aria-expanded="false"
                      aria-controls="collapse2"
                    >
                      How does the Lead Generation Platform help brokers?
                    </button>
                  </h2>
                  <div
                    id="collapse2"
                    className="accordion-collapse collapse"
                    aria-labelledby="faq2"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      The Lead Generation Platform delivers high-quality,
                      conversion-ready trader leads. Using data-driven marketing
                      strategies, it provides geo-targeted leads, verified email
                      and phone contacts, demo account registrations, and
                      first-time deposit (FTD) clients to help brokers grow
                      their client base effectively.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="accordion-item border-bottom">
                  <h2 className="accordion-header" id="faq3">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="false"
                      aria-controls="collapse3"
                    >
                      What is the Broker Comparison Service?
                    </button>
                  </h2>
                  <div
                    id="collapse3"
                    className="accordion-collapse collapse"
                    aria-labelledby="faq3"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      The Broker Comparison Service is an independent evaluation
                      and ranking platform for traders. It provides objective
                      insights into broker offerings, covering spreads,
                      commissions, deposit/withdrawal methods, customer support,
                      and user reviews. This helps traders select the most
                      suitable broker for their needs.
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="accordion-item border-bottom">
                  <h2 className="accordion-header" id="faq4">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse4"
                      aria-expanded="false"
                      aria-controls="collapse4"
                    >
                      Who can benefit from your services?
                    </button>
                  </h2>
                  <div
                    id="collapse4"
                    className="accordion-collapse collapse"
                    aria-labelledby="faq4"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      Our services are designed for brokers, affiliates, fintech
                      companies, agencies, and other financial service providers
                      who are looking to expand partnerships, generate quality
                      leads, and provide clients with reliable broker
                      information.
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq5">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse5"
                      aria-expanded="false"
                      aria-controls="collapse5"
                    >
                      How can I get started?
                    </button>
                  </h2>
                  <div
                    id="collapse5"
                    className="accordion-collapse collapse"
                    aria-labelledby="faq5"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      You can start by clicking the “Get Started” button on the
                      service card of your choice. Each service provides a
                      streamlined onboarding process tailored to meet your
                      business objectives.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5"
        data-aos="fade-up"
        ref={schedualFree}
        style={{
          background:
            "linear-gradient(210deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-6 d-flex flex-column">
              <h1 className="display-4 fw-semibold text-light mb-0">
                Ready to Transform Your Financial Future?
              </h1>
              <p className="fs-5 mt-3 text-light">
                Join thousands of successful investors who trust EquityPandit
                for expert guidance and proven results. Start your journey to
                financial freedom today.
              </p>
              <div className="d-flex flex-wrap d-none mt-auto">
                <button className="btn-outline-dark px-4 py-2 rounded-3 border-0">
                  <i className="fa-solid fa-phone me-2"></i>Schedual A Call
                </button>
              </div>
            </div>

            <div className="col-md-5 mt-md-0 mt-4">
              <div className="rounded-3 bg-body p-4 shadow-lg form-box">
                <h4 className="text-dark mb-3">Know more about</h4>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter Your Name*"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter Your Email*"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter Your Mobile*"
                      required
                    />
                  </div>

                  <p className="mb-3">
                    By submitting, you agree to our Terms &amp; Conditions
                  </p>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 rounded-3 py-3 fw-medium"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
