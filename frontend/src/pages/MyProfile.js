import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function MyProfile() {
  const navigate = useNavigate();
  const phone = Cookies.get("softwarephone");

  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!phone) {
        navigate("/login");
        return;
      }

      try {
        const token = Cookies.get("softwaretoken");

        const response = await axios.get(
          `${API_BASE_URL}/myprofile?phone=${phone}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          const data = response.data.profile;

          setProfile({
            userName: data.userName || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        } else {
          toast.error(response.data.error || "Failed to fetch profile");
        }
      } catch (err) {
        toast.error("Failed to fetch profile from server");
      }
    };

    fetchProfile();
  }, [phone, navigate]);

  return (
    <section className="py-5 poppins-regular">
      <div className="container">
        {/* Title */}
        <div className="row mb-3">
          <div className="col">
            <h4 className="fw-bold">My Profile</h4>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-3 rounded bg-body border-start border-5 border-success border-opacity-50 mb-3">
          <div className="row mb-3">
            <div className="col">
              <h5 className="fw-semibold">
                <i className="fa-solid fa-circle-user"></i> Personal Information
              </h5>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <small className="text-muted">
                <i className="fa-solid fa-user text-secondary"></i> Name
              </small>
              <h6 className="fw-semibold">{profile.userName}</h6>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                <i className="fa-solid fa-envelope text-warning"></i> Email
              </small>
              <h6 className="fw-semibold">{profile.email}</h6>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                <i className="fa-solid fa-phone text-success"></i> Phone
              </small>
              <h6 className="fw-semibold">{profile.phone}</h6>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="alert alert-info">
          <strong>Note:</strong> Profile details are managed by system admin.
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
