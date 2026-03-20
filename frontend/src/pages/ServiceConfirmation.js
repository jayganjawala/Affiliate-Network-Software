import { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function ServiceConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  const cardRef = useRef();
  const ranOnce = useRef(false);

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Invalid session");
        navigate("/services");
        return;
      }

      try {
        const res = await axios.get(
          `${API_BASE_URL}/service/verify-payment/${sessionId}`,
        );

        const session = res.data.session;

        setPaymentData(session);

        if (session.payment_status === "paid") {
          toast.success("Payment successful!");
        } else {
          toast.error("Payment not completed.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to verify payment.");
        toast.error("Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  const downloadPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 4,
      ignoreElements: (el) => el.classList.contains("no-print"),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pageWidth / imgWidth;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`service_payment_${dayjs().format("YYYYMMDD_HHmmss")}.pdf`);
  };

  if (loading) {
    return <p className="text-center py-5">Verifying your payment...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error}</p>
        <Link to="/service" className="btn btn-dark mt-3">
          Back to Services
        </Link>
      </div>
    );
  }

  // Extract service name safely
  const serviceName =
    paymentData?.line_items?.data?.[0]?.description || // Stripe line item description
    paymentData?.line_items?.data?.[0]?.price?.product?.name || // if product object
    "Service";

  const price = paymentData?.amount_total ? paymentData.amount_total / 100 : 0;

  const user = {
    email: paymentData?.customer_email || "N/A",
    name: paymentData?.customer_details?.name || "Customer",
  };

  return (
    <section className="py-5 poppins-regular">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-3" ref={cardRef}>
              <h3 className="fw-semibold text-success text-center mb-3">
                ✅ Service Payment Successful
              </h3>

              <p className="text-muted text-center small mb-0">
                Thank you <strong>{user?.name}</strong> for purchasing the service.
              </p>

              <hr />

              <div className="text-start">
                <p>
                  <b>Service:</b> {serviceName}
                </p>

                <p>
                  <b>Total Paid:</b> ₹{price}
                </p>

                <p>
                  <b>Payment Date:</b> {dayjs().format("DD MMM YYYY, hh:mm A")}
                </p>

                <p>
                  <b>Transaction ID:</b> {paymentData?.payment_intent || "N/A"}
                </p>
              </div>

              <hr />

              <p className="small mb-0 text-muted">
                Receipt sent to <b>{user.email}</b>
              </p>

              <Link to="/service" className="btn btn-dark px-3 mt-3 no-print">
                Back to Services
              </Link>

              <button
                onClick={downloadPDF}
                className="btn btn-primary px-3 mt-2 no-print"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceConfirmation;
