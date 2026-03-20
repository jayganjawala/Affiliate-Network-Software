import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="py-5 poppins-regular"
        // data-aos="fade-up"
        style={{
          backgroundImage: isMobile
            ? "none"
            : "linear-gradient(to right, white 40%, rgba(255,255,255,0) 60%), url('/bg.jpg')",
          backgroundSize: "cover",
          // backgroundPosition: "right center",
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
          minHeight: isMobile ? "" : "91vh",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block">
                <img className="me-1 mb-1" alt="star" src="/star.svg" />
                Flexible for every business
                {/* Flexible Deployment Options for Every Business */}
              </div>

              <h1 className="display-4 fw-semibold mt-4">
                Choose the Perfect Platform{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #0068EF 0%, #00A15A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  for Your Needs
                </span>
              </h1>

              <p className="fs-6 mt-3 text-muted">
                Whether you prefer the agility of the cloud, the control of an
                on-premise system, or a flexible hybrid approach, our platforms
                deliver secure, scalable, and easy-to-deploy solutions for your
                business.
              </p>

              <div className="d-flex gap-3 mt-4">
                <button
                  onClick={() => navigate("/services")}
                  className="btn bg-dark px-3 text-light me-2"
                >
                  Get Started
                </button>

                {/* <button
                  className="btn btn-outline-dark px-3"
                  onClick={() => navigate("/brokers")}
                >
                  Compare Brokers
                </button> */}
              </div>
            </div>

            <div
              className="col-md-6 mt-4 mt-md-0 rounded-4"
              // style={{
              //   background:
              //     "linear-gradient(210deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
              // }}
            >
              {/* <img
                src="1.png"
                alt="dashboard"
                data-aos="fade-up-left"
                className="img-fluid rounded-4"
              /> */}
              {/* Mobile Image */}
              {isMobile && (
                <img
                  src="/bg.jpg"
                  alt="dashboard"
                  className="img-fluid rounded-3"
                  // style={{ maxWidth: "320px" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Deployment / Features Section */}
      <section
        className="py-5 poppins-regular"
        data-aos="fade-up"
        style={{ background: "#F0F6FF" }}
      >
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-md-12">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
                <i className="fa-solid fa-layer-group me-2"></i>
                Platform Advantages
              </div>

              <h1 className="fw-semibold mt-3">
                Flexible, Secure, and Scalable Solutions for Your Business
              </h1>
              <p className="mb-0 mt-1 text-muted">
                Choose the deployment model that fits your business—Cloud SaaS,
                Local Platform, or Hybrid—while ensuring performance, security,
                and growth.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="row g-3 mt-4">
            {/* Item 1: Flexible Deployment */}
            <div className="col-md-4">
              <div className="card p-3 border-0 h-100 shadow-sm">
                <div className="d-flex gap-3">
                  <i className="fa-solid fa-cloud text-primary fa-2x"></i>
                  <div>
                    <h4 className="fw-semibold">Flexible Deployment</h4>
                    <p className="mb-0 text-muted small">
                      Choose between Cloud SaaS, Hybrid, or Local deployments
                      designed to fit different business infrastructures and
                      scaling needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: Secure Infrastructure */}
            <div className="col-md-4">
              <div className="card p-3 border-0 h-100 shadow-sm">
                <div className="d-flex gap-3">
                  <i className="fa-solid fa-shield-halved text-danger fa-2x"></i>
                  <div>
                    <h4 className="fw-semibold">Secure Infrastructure</h4>
                    <p className="mb-0 text-muted small">
                      Protect your data with enterprise-grade security across
                      cloud and on-premise deployments, giving you full control
                      over system integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Scalable Performance */}
            <div className="col-md-4">
              <div className="card p-3 border-0 h-100 shadow-sm">
                <div className="d-flex gap-3">
                  <i className="fa-solid fa-chart-line text-info fa-2x"></i>
                  <div>
                    <h4 className="fw-semibold">Scalable Performance</h4>
                    <p className="mb-0 text-muted small">
                      Built for growing businesses, our platform adapts to your
                      operational needs while maintaining high performance and
                      reliability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5 poppins-regular"
        data-aos="fade-up"
        style={{
          background: "linear-gradient(90deg, #0182C3, #00A15A)",
        }}
      >
        <div className="container">
          <h1 className="fw-semibold text-light">
            Personalized Solutions For Your Business Success
          </h1>

          <div className="row mt-3 g-3">
            {/* Card 1 */}
            <div className="col-md-5">
              <div className="card border-0 rounded-3 p-3 h-100">
                <h5 className="fw-semibold">
                  <i className="fa-solid fa-chart-line text-success py-1 rounded-3 bg-success bg-opacity-10 me-2"></i>
                  Cloud & Hybrid Deployment
                </h5>
                <hr />

                <p className="text-muted">
                  A flexible cloud-powered deployment model that enables
                  businesses to launch quickly while maintaining scalability and
                  performance. The platform combines fully managed cloud
                  infrastructure with hybrid capabilities, allowing
                  organizations to integrate on-premise systems when needed.
                </p>

                <div className="mt-5">
                  <button
                    className="btn btn-dark px-3 rounded-3"
                    onClick={() => navigate("/services")}
                  >
                    View Details
                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-5">
              <div className="card border-0 rounded-3 p-3 h-100">
                <h5 className="fw-semibold">
                  <i className="fa-solid fa-building-columns text-success py-1 rounded-3 bg-success bg-opacity-10 me-2"></i>
                  Local Infrastructure Platform
                </h5>
                <hr />

                <p className="text-muted">
                  A self-hosted deployment solution that allows businesses to
                  run the platform on their own infrastructure. This model
                  provides complete control over data security, internal
                  integrations, and system management while supporting
                  enterprise-grade reliability.
                </p>

                <div className="mt-5">
                  <button
                    className="btn btn-dark px-3 rounded-3"
                    onClick={() => navigate("/services")}
                  >
                    View Details
                    <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-5 poppins-regular"
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
                <p className="mt-1 mb-0 small text-muted">
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
                <p className="mt-1 mb-0 small text-muted">
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
                <p className="mt-1 mb-0 small text-muted">
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
                <p className="mt-1 mb-0 small text-muted">
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
                <p className="mt-1 mb-0 small text-muted">
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
                <p className="mt-1 mb-0 small text-muted">
                  Independent Broker Comparison Service + tailored B2B solutions
                  designed around your specific goals — spreads, commissions,
                  deposits, support quality, and user reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="py-5 poppins-regular" data-aos="fade-up">
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
                  <h6 className="mt-2">Choose Your Platform</h6>
                  <p className="mt-2 mb-0 small text-muted">
                    Choose from Cloud SaaS for flexible access, Local Platform
                    for on-premise control, or an additional Hybrid Platform for
                    multi-site management.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work2.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Get Expert Deployment Support</h6>
                  <p className="mt-2 mb-0 small text-muted">
                    Receive professional guidance to select, install, and
                    optimize your Cloud SaaS, Local Platform or Hybrid Platform
                    deployment.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work3.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Monitor Your Deployment Live</h6>
                  <p className="mt-2 mb-0 small text-muted">
                    Track the setup and performance of your Cloud SaaS, Local
                    Platform or Hybrid Platform in real time, ensuring
                    everything runs smoothly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-3 d-md-block">
                <img alt="work1" src="/work4.svg" />
                <div className="flex-column">
                  <h6 className="mt-2">Deploy with Confidence</h6>
                  <p className="mt-2 mb-0 small text-muted">
                    Execute your Cloud SaaS, Local Platform or Hybrid Platform
                    deployment smoothly, following best practices for optimal
                    results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-5 poppins-regular bg-secondary bg-opacity-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
                <i className="fa-solid fa-bolt me-2"></i>
                Instant Insights
              </div>
              <h1 className="fw-semibold">
                Real-Time Recommendations at Your Finger Tips
              </h1>
              <p className="mb-4 mt-2">
                Stay ahead with live updates, smart alerts, and personalized
                suggestions across Cloud, Local, and Hybrid platforms — all at
                your fingertips.
              </p>
            </div>
            <div className="col-md-6" data-aos="fade-up">
              <div className="row g-1">
                <div className="col-md-4 col-4">
                  <img src="mob2.svg" className="img-fluid" alt="logo" />
                </div>
                <div className="col-md-4 col-4">
                  <img src="mob1.svg" className="img-fluid" alt="logo" />
                </div>
                <div className="col-md-4 col-4">
                  <img src="mob3.svg" className="img-fluid" alt="logo" />
                </div>
              </div>
            </div>
            {/* <div className="col-12 d-block d-md-none" data-aos="fade-up">
              <div
                id="mobileCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner text-center">
                  <div className="carousel-item active">
                    <img src="mob2.svg" className="img-fluid" alt="logo" />
                  </div>

                  <div className="carousel-item">
                    <img src="mob1.svg" className="img-fluid" alt="logo" />
                  </div>

                  <div className="carousel-item">
                    <img src="mob3.svg" className="img-fluid" alt="logo" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="py-5 poppins-regular" data-aos="fade-up">
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

      {/* Contact Us */}
      <section className="py-5 poppins-regular d-none" data-aos="fade-up">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="fw-semibold">
                Need any help? Contact To Our Support Team!
              </h2>
              <p className="mb-3 text-muted">
                We are always there for you every time and will guide you at
                every step.
              </p>
              <p className="mb-0 text-success fw-semibold">
                <i className="fa-solid fa-phone-volume me-1"></i>90164 19325 |{" "}
                <i className="fa-solid fa-envelope me-1"></i>
                support@affilatenetwork.com
              </p>
              <button
                className="btn btn-dark px-3 mt-3"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-5 text-center text-light poppins-regular"
        data-aos="fade-up"
        style={{
          background:
            "linear-gradient(210deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <h2 className="fw-semibold">
                Ready To Start Your Investing Journey?
              </h2>
              <p className="mt-2 mb-0">
                We are always there for you every time and will guide you at
                every step.
              </p>

              <p className="mb-0 text-dark fw-semibold mt-3">
                <i className="fa-solid fa-phone-volume me-1"></i>90164 19325
                <br />
                <i className="fa-solid fa-envelope me-1"></i>
                support@affilatenetwork.com
              </p>

              <button
                className="btn btn-dark px-3 mt-3 me-2"
                onClick={() => navigate("/startfree")}
              >
                Start Free
              </button>
              <button
                className="btn btn-dark px-3 mt-3"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
