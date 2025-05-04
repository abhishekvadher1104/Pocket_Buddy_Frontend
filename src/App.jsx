import UserSidebar from "./components/layouts/UserSidebar";
import { OfferSidebar } from "./components/layouts/OfferSidebar";
import { Route, Routes } from "react-router-dom";
import Login from "../src/components/common/Login";
import Signup from "../src/components/common/Signup";
import axios from "axios";
import PrivateRouter from "./components/hooks/PrivateRoutes";
import HomePage from "./components/home/HomePage";
import AddOffer from "./components/restroOwner/AddOffer";
import About from "./components/common/About";
import SeeOffers from "./components/user/SeeOffers";
import RestroFullDetails from "./components/user/RestroFullDetails";
import SeeAddedOffers from "./components/restroOwner/SeeAddedOffers";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import { ToastContainer } from "react-toastify";
import Profile from "./components/user/Profile";
import Owner_Profile from "./components/restroOwner/Owner_Profile";
import Ratings from "./components/user/Ratings";
import RestroRatings from "./components/restroOwner/RestroRatings";
import Expired from "./components/restroOwner/Expired";
import WishList from "./components/user/Wishlist";
import UpdateOffer from "./components/restroOwner/UpdateOffer";

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
                <Route path="wishlist" element={<WishList />} />
                <Route path="ratings" element={<Ratings/>}/>
                <Route
                  path="restaurantdetails/:id"
                  element={<RestroFullDetails />}
                />
              </Route>

              <Route path="/restro_owner" element={<OfferSidebar />}>
                <Route path="addoffer" element={<AddOffer />} />
                <Route path="seeoffers" element={<SeeAddedOffers />} />
                <Route path="profile" element={<Owner_Profile />} />
                <Route path="update-offer/:offerId" element={<UpdateOffer />} />

                <Route path="ratings/:offerId" element={<RestroRatings/>}/>
                <Route path='expired' element={<Expired/>}/>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
