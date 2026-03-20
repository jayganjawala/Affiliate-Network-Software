import React from "react";

function FintechServices() {
  const fintechCategories = [
    { name: "Trading Platforms", icon: "fa-chart-line", color: "text-primary" },
    { name: "Payment Gateways", icon: "fa-credit-card", color: "text-success" },
    {
      name: "Crypto Exchanges",
      icon: "fa-bitcoin-sign",
      color: "text-warning",
    },
    { name: "Investment Platforms", icon: "fa-coins", color: "text-info" },
    {
      name: "Lending Platforms",
      icon: "fa-hand-holding-dollar",
      color: "text-danger",
    },
    {
      name: "Digital Banking",
      icon: "fa-building-columns",
      color: "text-dark",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-5 poppins-regular">
        <div className="container">
          <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
            <i className="fa-solid fa-chart-simple me-2"></i>
            Fintech Platform
          </div>

          <h1 className="fw-semibold mt-3">
            Advanced Technology for Modern Financial Platforms
          </h1>

          <p className="text-muted">
            Build and manage fintech platforms including trading systems,
            payment gateways, crypto services, and digital banking solutions
            from a single dashboard.
          </p>
        </div>
      </section>

      {/* Fintech Categories */}
      <section className="pb-5 poppins-regular">
        <div className="container">
          <h3 className="fw-semibold mb-4">Fintech Solutions We Support</h3>

          <div className="row g-3">
            {fintechCategories.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-4 border-0 shadow-sm h-100">
                  <i
                    className={`fa-solid ${item.icon} ${item.color} fa-3x mb-3`}
                  ></i>

                  <h5 className="fw-semibold">{item.name}</h5>

                  <p className="small text-muted mb-0">
                    Launch and manage {item.name.toLowerCase()} with advanced
                    dashboards, analytics, and operational tools.
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
                <i className="fa-solid fa-user-plus text-primary fa-2x mb-3"></i>
                <h5 className="fw-semibold">Client Onboarding</h5>
                <p className="small text-muted mb-0">
                  Register users, verify identities, and manage client accounts.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-money-bill-transfer text-success fa-2x mb-3"></i>
                <h5 className="fw-semibold">Transaction Tracking</h5>
                <p className="small text-muted mb-0">
                  Monitor deposits, withdrawals, and financial transactions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-chart-pie text-info fa-2x mb-3"></i>
                <h5 className="fw-semibold">Analytics Dashboard</h5>
                <p className="small text-muted mb-0">
                  Analyze user activity, trading performance, and revenue
                  insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FintechServices;
