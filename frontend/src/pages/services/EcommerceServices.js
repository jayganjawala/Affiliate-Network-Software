import React from "react";

function EcommerceServices() {
  const categories = [
    { name: "Grocery", icon: "fa-basket-shopping", color: "text-success" },
    { name: "Shoes", icon: "fa-shoe-prints", color: "text-dark" },
    { name: "Clothing", icon: "fa-shirt", color: "text-primary" },
    { name: "Electronics", icon: "fa-mobile-screen", color: "text-info" },
    { name: "Beauty", icon: "fa-spa", color: "text-danger" },
    { name: "Home & Kitchen", icon: "fa-house", color: "text-warning" },
  ];

  return (
    <>
      <section className="py-5 poppins-regular">
        <div className="container">
          <div className="fw-semibold card border-0 shadow-sm py-2 px-4 rounded-5 d-inline-block mb-3">
            <i className="fa-solid fa-cart-shopping me-2"></i>
            E-Commerce Platform
          </div>

          <h1 className="fw-semibold mt-3">
            Sell Anything Online with One Powerful Platform
          </h1>

          <p className="text-muted mt-2">
            Build your online marketplace and sell products across multiple
            categories including grocery, clothing, electronics, shoes, beauty
            products and more.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-5 poppins-regular">
        <div className="container">
          <h3 className="fw-semibold mb-4">Supported Product Categories</h3>

          <div className="row g-3">
            {categories.map((cat, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-4 border-0 shadow-sm h-100">
                  <i
                    className={`fa-solid ${cat.icon} ${cat.color} fa-3x mb-3`}
                  ></i>

                  <h5 className="fw-semibold">{cat.name}</h5>

                  <p className="small text-muted mb-0">
                    Sell {cat.name.toLowerCase()} products with full inventory,
                    order management and analytics support.
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
                <i className="fa-solid fa-box text-primary fa-2x mb-3"></i>
                <h5 className="fw-semibold">Product Management</h5>
                <p className="small text-muted mb-0">
                  Add, edit and manage thousands of products easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-truck text-success fa-2x mb-3"></i>
                <h5 className="fw-semibold">Order Management</h5>
                <p className="small text-muted mb-0">
                  Track orders, deliveries and returns from one dashboard.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 border-0 shadow-sm h-100">
                <i className="fa-solid fa-chart-line text-info fa-2x mb-3"></i>
                <h5 className="fw-semibold">Sales Analytics</h5>
                <p className="small text-muted mb-0">
                  Monitor revenue, customer activity and product performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EcommerceServices;
