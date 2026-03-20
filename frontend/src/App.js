import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";

import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import Service from "./pages/Service";
import StartFree from "./pages/StartedFree";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

import Toast from "./components/Toast";
import MyProfile from "./pages/MyProfile";

import AffiliateServices from "./pages/services/AffiliateServices";
import EcommerceServices from "./pages/services/EcommerceServices";
import FintechServices from "./pages/services/FintechServices";

import ServiceCheckout from "./pages/ServiceCheckout";
import ServiceConfirmation from "./pages/ServiceConfirmation";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Toast />
        <ScrollToTop />

        <Routes>
          {/* Protected Routes */}
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service" element={<Service />} />
            <Route path="/startfree" element={<StartFree />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/service/affiliate" element={<AffiliateServices />} />
            <Route path="/service/ecommerce" element={<EcommerceServices />} />
            <Route path="/service/fintech" element={<FintechServices />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/service-checkout" element={<ServiceCheckout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/service-confirmation" element={<ServiceConfirmation />} />
          {/* 404 */}
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
