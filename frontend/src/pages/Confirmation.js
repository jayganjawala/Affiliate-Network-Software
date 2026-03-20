import { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");

  const cardRef = useRef();

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const verifyPayment = async () => {
      // if (!sessionId) return;
      if (!sessionId) {
        toast.error("User not logged in");
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(
          `${API_BASE_URL}/verify-payment/${sessionId}`,
        );

        setPaymentData(response.data);

        if (response.data.payment_status === "paid") {
          toast.success("Payment successful!");
        } else {
          toast.error("Payment not completed.");
        }
      } catch (err) {
        setError("Failed to verify payment. Please try again.");
        toast.error("Failed to verify payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, navigate]);

  const downloadPDF = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 5,
      ignoreElements: (element) => element.classList.contains("no-print"),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`payment_${dayjs().format("YYYYMMDD_HHmmss")}.pdf`);
  };

  if (loading) {
    return <p className="text-center py-5">Verifying your payment...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <p>{error}</p>
        <Link to="/" className="btn btn-dark mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  // Extracting dynamic data safely
  const plan = paymentData?.metadata?.plan || "N/A";
  const duration = paymentData?.metadata?.duration || "N/A";
  const price = paymentData?.amount_total ? paymentData.amount_total / 100 : 0;
  const user = {
    name: paymentData?.metadata?.userName || "User",
    email: paymentData?.metadata?.userEmail || "user@example.com",
  };

  return (
    <section className="py-5 poppins-regular">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-3" ref={cardRef}>
              <h3 className="fw-semibold text-success text-center mb-3">
                ✅ Payment Successful
              </h3>

              <p className="text-muted text-center small mb-0">
                Thank you <strong>{user?.name}</strong> for purchasing the plan.
              </p>

              <hr />

              <div className="text-start">
                <p>
                  <b>Plan:</b> {plan}
                </p>
                <p>
                  <b>Duration:</b> {duration}
                </p>
                <p>
                  <b>Total Paid:</b> ₹{price}
                </p>
                <p>
                  <b>Payment Date:</b>{" "}
                  {dayjs(new Date()).format("DD MMM YYYY , hh:mm A")}
                </p>
                <p>
                  <b>Transaction ID:</b> {paymentData?.payment_intent || "N/A"}
                </p>
              </div>

              <hr />

              <p className="small mb-0 text-muted">
                A confirmation has been sent to <b>{user?.email}</b>
              </p>

              <Link to="/" className="btn btn-dark px-3 mt-3 no-print">
                Back to Home
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

export default Confirmation;
