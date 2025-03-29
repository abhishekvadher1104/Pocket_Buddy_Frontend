import UserSidebar from "./components/layouts/UserSidebar";
import { OfferSidebar } from "./components/layouts/OfferSidebar";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "../src/components/common/Login";
import Signup from "../src/components/common/Signup";
import axios from "axios";
import PrivateRouter from "./components/hooks/PrivateRoutes";
import HomePage from "./components/home/HomePage";
import AddOffer from "./components/restroOwner/AddOffer";
import Restro from "./components/restroOwner/Restro";
import About from "./components/common/About";
import SeeOffers from "./components/user/SeeOffers";
import RestroFullDetails from "./components/user/RestroFullDetails";
import SeeAddedOffers from "./components/restroOwner/SeeAddedOffers";
import Contact from "./components/common/Contact";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import { ToastContainer } from "react-toastify";
import Profile from "./components/user/Profile";
import Owner_Profile from "./components/restroOwner/Owner_Profile";
import RestaurantOwnerRoute from "./components/hooks/RestaurantOwnerRoute";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <>
      <ToastContainer />
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route
              path="/resetpassword/:token"
              element={<ResetPassword />}
            ></Route>

            <Route path="" element={<PrivateRouter />}>
              <Route path="/user" element={<UserSidebar />}>
                <Route path="profile" element={<Profile />} />
                <Route path="seeoffers" element={<SeeOffers />} />
                <Route path="history" element={<History />} />
                <Route
                  path="restaurantdetails/:id"
                  element={<RestroFullDetails />}
                />
              </Route>

              <Route path="/profile" element={<Owner_Profile />} />

              <Route element={<RestaurantOwnerRoute />}>
                <Route path="/restro_owner/restro" element={<Restro />} />
                <Route path="/restro_owner/addoffer" element={<AddOffer />} />
                <Route
                  path="/restro_owner/seeoffers"
                  element={<SeeAddedOffers />}
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
