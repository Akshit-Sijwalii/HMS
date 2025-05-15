import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import MyAppointment from "./pages/MyAppointment";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useContext } from "react";
import { AdminAppContext } from "./context/AdminAppContext";
import AdminNavbar from "./components/AdminNavbar";
import Slidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const { aToken, setAToken } = useContext(AdminAppContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [loading, setLoading] = useState(true);

  //====================Sync context tokens from localStorage on app load=======================================================================
  useEffect(() => {
    const storedAToken = localStorage.getItem("aToken");
    const storedDToken = localStorage.getItem("dToken");
    if (storedAToken) setAToken(storedAToken);
    if (storedDToken) setDToken(storedDToken);
    setLoading(false);
  }, [setAToken, setDToken]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      {aToken ? (
        <>
          <AdminNavbar />
          <div className="bg-gray-100 rounded-md">
            <div className="flex items-start">
              <Slidebar />
              <Routes>
                {/*====================Admin Routes ====================================================================================================*/}
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/all-appointment" element={<AllApointment />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorList />} />
              </Routes>
            </div>
          </div>
        </>
      ) : dToken ? (
        <>
          <AdminNavbar />
          <div className="bg-gray-100 rounded-md">
            <div className="flex items-start">
              <Slidebar />
              <Routes>
                {/*==================Doctor Routes=======================================================================================================*/}
                <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/doctor-appointment" element={<DoctorAppointment />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            {/*====================Public Routes======================================================================================================*/}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctor" element={<Doctors />} />
            <Route path="/doctor/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointment" element={<MyAppointment />} />
            <Route path="/appointment/:docId" element={<Appointment />} />

            {/*====================Unified Admin/Doctor Login Route=================================================================================*/}
            <Route
              path="/admin/adminlogin"
              element={
                aToken ? (
                  <Navigate to="/admin-dashboard" />
                ) : dToken ? (
                  <Navigate to="/doctor-dashboard" />
                ) : (
                  <AdminLogin />
                )
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;