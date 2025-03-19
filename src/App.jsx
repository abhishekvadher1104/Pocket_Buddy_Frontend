import UserSidebar from "./components/layouts/UserSidebar";
import { OfferSidebar } from "./components/layouts/OfferSidebar";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/user/UserProfile";
import Login from "../src/components/common/Login";
import Signup from "../src/components/common/Signup";
import axios from "axios";
import PrivateRouter from "./components/hooks/PrivateRoutes";
import HomePage from "./components/home/HomePage";
import AddOffer from "./components/restroOwner/AddOffer";
import Restro from "./components/restroOwner/Restro";
import SeeAddedOffers from "./components/layouts/SeeAddedOffers";
import About from "./components/common/About";
import SeeOffers from "./components/user/SeeOffers";
import RestroFullDetails from "./components/user/RestroFullDetails";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  return (
    <>
      <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route path="" element={<PrivateRouter />}>
              <Route path="/user" element={<UserSidebar />}>
                <Route path="profile" element={<UserProfile />}></Route>
                <Route path="seeoffers" element={<SeeOffers/>}></Route>
                <Route path="restaurantdetails/:id" element={<RestroFullDetails />} />
              </Route>
              <Route path="/restro_owner" element={<OfferSidebar />}>
                <Route path="restro" element={<Restro />} />
                <Route path="addoffer" element={<AddOffer />} />
                <Route path="viewoffers" element={<SeeAddedOffers />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
