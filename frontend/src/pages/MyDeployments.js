import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function MyDeployments() {
  const navigate = useNavigate();
  const phone = Cookies.get("softwarephone");

  const [deployment, setDeployment] = useState(null);

  const getDaysLeft = (endDate) => {
    if (!endDate) return 0;

    const today = new Date();
    const end = new Date(endDate);

    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    const fetchDeployments = async () => {
      if (!phone) {
        navigate("/login");
        return;
      }

      try {
        const token = Cookies.get("softwaretoken");

        const response = await axios.get(
          `${API_BASE_URL}/mydeployments?phone=${phone}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          setDeployment(response.data.data.deployment);
        } else {
          toast.error(response.data.error || "Failed to fetch deployment");
        }
      } catch (err) {
        toast.error("Server error while fetching deployment");
      }
    };

    fetchDeployments();
  }, [phone, navigate]);

  return (
    <section className="py-5 poppins-regular">
      <div className="container">
        {/* Title */}
        <div className="row mb-3">
          <div className="col">
            <h4 className="fw-bold">My Deployment</h4>
          </div>
        </div>

        {deployment ? (
          <div className="p-3 rounded bg-body border-start border-5 border-primary border-opacity-50">
            <div className="row g-3">
              <div className="col-md-3 col-6">
                <small className="text-muted">Plan Name</small>
                <h6 className="fw-semibold">{deployment.name}</h6>
              </div>

              {/* <div className="col-md-6 col-6">
                <small className="text-muted">Status</small>
                <h6 className="fw-semibold text-success">{deployment.status}</h6>
              </div> */}

              <div className="col-md-3 col-6">
                <small className="text-muted">Start Date</small>
                <h6 className="fw-semibold">
                  {deployment.startDate
                    ? dayjs(deployment.startDate).format("DD MMM YYYY")
                    : "-"}
                </h6>
              </div>

              <div className="col-md-3 col-6">
                <small className="text-muted">End Date</small>
                <h6 className="fw-semibold">
                  {deployment.endDate
                    ? dayjs(deployment.endDate).format("DD MMM YYYY")
                    : "-"}
                </h6>
              </div>

              <div className="col-md-3 col-6">
                <small className="text-muted">Days Left</small>
                <h5 className="fw-semibold text-primary">
                  {getDaysLeft(deployment.endDate)} days
                </h5>
              </div>

            </div>
          </div>
        ) : (
          <div className="alert alert-warning">No active deployment found.</div>
        )}
      </div>
    </section>
  );
}

export default MyDeployments;
