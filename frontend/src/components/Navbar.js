import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const token = Cookies.get("softwaretoken");
    const phone = Cookies.get("softwarephone");

    if (!token || !phone) {
      setIsLoggedIn(false);
      return navigate("/");
    }

    try {
      await axios.post(
        `${API_BASE_URL}/logout`,
        { phone: phone || "" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Remove cookies
      Cookies.remove("softwaretoken");
      Cookies.remove("softwarephone");
      Cookies.remove("softwarename");
      setIsLoggedIn(false);

      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Logout failed");
    } finally {
      setLoading(false);
      setShowLogoutModal(false);
    }
  };
  useEffect(() => {
    const updateLogin = () => setIsLoggedIn(!!Cookies.get("softwaretoken"));

    updateLogin();
    window.addEventListener("userLoggedIn", updateLogin);

    return () => window.removeEventListener("userLoggedIn", updateLogin);
  }, []);

  const userName = Cookies.get("softwarename") || "U";

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    return names
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const closeMenu = () => {
    const menu = document.getElementById("navbarContent");
    if (menu) {
      menu.classList.remove("show");
    }
  };

  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // useEffect(() => {
  //   document.body.setAttribute("data-bs-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <header className="bg-white py-3 sticky-top poppins-thin shadow-sm">
        <div className="container">
          <div className="row align-items-center">
            {/* LOGO */}
            <div className="col-6 col-md-3">
              <Link className="nav-link p-0" to="/">
                <img src="JD.svg" className="img-fluid" alt="logo" />
              </Link>
            </div>

            {/* TOGGLE BUTTON (MOBILE) */}
            <div className="col-6 d-md-none text-end">
              <button
                className="btn"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
              >
                <i className="fa-solid fa-bars fa-lg"></i>
              </button>
            </div>

            {/* COLLAPSE AREA */}
            <div className="col-md-9">
              <div className="collapse d-md-block" id="navbarContent">
                <div className="row align-items-center mt-3 mt-md-0">
                  {/* NAVIGATION */}
                  <div className="col-md-8">
                    <ul className="nav justify-content-center flex-column flex-md-row text-center gap-md-4">
                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fw-semibold"
                          to="/"
                          onClick={closeMenu}
                        >
                          <i className="fa-solid fa-house me-1"></i>Home
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fw-semibold"
                          to="/service"
                          onClick={closeMenu}
                        >
                          <i className="fa-solid fa-screwdriver-wrench me-1"></i>
                          Services
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fw-semibold"
                          to="/services"
                          onClick={closeMenu}
                        >
                          <i className="fa-solid fa-tags me-1"></i>Plans &
                          Pricing
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className="nav-link text-dark fw-semibold"
                          to="/contact"
                          onClick={closeMenu}
                        >
                          <i className="fa-solid fa-headset me-1"></i>Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* BUTTONS */}
                  <div className="col-md-4 text-center text-md-end mt-3 mt-md-0  d-flex justify-content-center justify-content-md-end align-items-center gap-2">
                    {/* Theme Toggle */}
                    {/* <button className="btn border-0" onClick={toggleTheme}>
                      {theme === "light" ? (
                        <i className="fa-solid fa-moon"></i>
                      ) : (
                        <i className="fa-solid fa-sun"></i>
                      )}
                    </button> */}

                    {isLoggedIn ? (
                      <div className="dropdown">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            // backgroundColor: "black",
                            background:
                              "linear-gradient(210deg, #0068EF 0%, #0182C3 50%, #00A15A 100%)",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                          data-bs-toggle="dropdown"
                        >
                          {getInitials(userName)}
                        </div>

                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/myprofile"
                              onClick={closeMenu}
                            >
                              <i className="fa-solid fa-user me-1"></i>My
                              Profile
                            </Link>
                          </li>

                          <li className="border-top">
                            <Link
                              className="dropdown-item"
                              to="/mydeployments"
                              onClick={closeMenu}
                            >
                              <i className="fa-solid fa-server me-1"></i>
                              My Deployment
                            </Link>
                          </li>

                          <li className="border-top">
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => setShowLogoutModal(true)}
                              disabled={loading}
                            >
                              <i className="fa-solid fa-right-from-bracket me-1"></i>
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <>
                        <button
                          className="btn btn-dark px-3"
                          onClick={() => {
                            closeMenu();
                            navigate("/startfree");
                          }}
                        >
                          Start Free
                        </button>
                        <button
                          onClick={() => navigate("/login")}
                          className="btn btn-outline-dark"
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket me-1"></i>
                          Login
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Logout Modal */}
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutModal(false)}
                />
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to logout from your account?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    closeMenu();
                    handleLogout();
                  }}
                  disabled={loading}
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
