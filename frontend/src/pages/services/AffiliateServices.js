import React from "react";

function AffiliateServices() {
  const industries = [
    { name: "E-commerce", icon: "fa-cart-shopping", color: "text-primary" },
    { name: "Finance", icon: "fa-coins", color: "text-warning" },
    { name: "SaaS Platforms", icon: "fa-cloud", color: "text-info" },
    { name: "Education", icon: "fa-graduation-cap", color: "text-success" },
    { name: "Travel", icon: "fa-plane", color: "text-danger" },
    { name: "Mobile Apps", icon: "fa-mobile-screen", color: "text-dark" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-5 poppins-regular">
        <div className="container">
          <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
            <i className="fa-solid fa-network-wired me-2"></i>
            Affiliate Platform
          </div>

          <h1 className="fw-semibold mt-3">
            Grow Revenue with a Powerful Affiliate Network
          </h1>

          <p className="text-muted">
            Manage affiliate partners, track conversions, and scale campaigns
            across multiple industries using one powerful dashboard.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="pb-5 poppins-regular">
        <div className="container">
          <h3 className="fw-semibold mb-4">
            Industries Using Affiliate Marketing
          </h3>

          <div className="row g-3">
            {industries.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-4 border-0 shadow-sm h-100">
                  <i
                    className={`fa-solid ${item.icon} ${item.color} fa-3x mb-3`}
                  ></i>

                  <h5 className="fw-semibold">{item.name}</h5>

                  <p className="small text-muted mb-0">
                    Run affiliate campaigns for {item.name.toLowerCase()} and
                    track performance, conversions, and commissions easily.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-5 bg-light poppins-regular">
        <div className="container">
          <h3 className="fw-semibold mb-4">Platform Features</h3>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-bullseye text-primary fa-2x mb-3"></i>
                <h5 className="fw-semibold">Campaign Tracking</h5>
                <p className="small text-muted mb-0">
                  Track clicks, leads, and conversions across all affiliate
                  campaigns.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-users text-success fa-2x mb-3"></i>
                <h5 className="fw-semibold">Affiliate Management</h5>
                <p className="small text-muted mb-0">
                  Manage affiliates, partners, and referral links from one
                  dashboard.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-chart-line text-info fa-2x mb-3"></i>
                <h5 className="fw-semibold">Performance Analytics</h5>
                <p className="small text-muted mb-0">
                  Analyze campaign performance and optimize your marketing
                  strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AffiliateServices;
