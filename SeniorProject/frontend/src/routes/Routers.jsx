import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashborad/Doctor-account/Dashborad";
import MyAccount from "../Dashborad/User-account/MyAccount";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Services from "../pages/Services";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            {" "}
            <MyAccount />{" "}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default Routers;
