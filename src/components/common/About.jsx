import styles from "../../styles/about.module.css";
import React from "react";
import Navbar from "../home/Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.main}>
        <ul>
          <li>
            <h2> Introduction </h2>
          </li>
          <p className={styles.intro} >
          Welcome to Pocket Buddy, your go-to app for finding the best restaurants nearby. We make dining decisions easy with user-friendly navigation, real reviews, and personalized recommendations. Whether you're craving street food or fine dining, we've got you covered. Enjoy a seamless experience and discover great places to eat in just a few taps!
          </p>
          <br />
          <li>
            <h2>What We Offer </h2>
          </li>
          <div>
            <p>
              ⭐Top-Rated Picks – Browse highly-rated restaurants based on real
              customer reviews.
            </p>
            <p>
              🔍 Smart Search & Filters – Narrow down your options based on
              cuisine, budget, and ambiance.
            </p>
            <p>
              🍽 Discover Amazing Restaurants – Explore a wide range of dining
              options near you.
            </p>
          </div>
          <br />
          <li>
            <h2>Why Choose Us?</h2>
          </li>
          <div>
            <p>
            📢Exclusive Insider Deals – Unlock special discounts and offers from
              our partner restaurants.
            </p>
            <p>
            🖥️Seamless Experience – User-friendly interface for a hassle-free
              restaurant search.
            </p>
            <p>
            ⭐Community-Based Ratings – See honest reviews and ratings from real
              users, not just algorithms.
            </p>
          </div>
          <li>
            <h2>Our Mission </h2>
          </li>
          <div>
         <p> At Pocket Buddy, our mission is to connect food lovers with the best dining experiences while empowering restaurant owners to grow their businesses.
         </p>
         <ul>

        <li>For Food Lovers 🍽️ – We aim to make restaurant discovery seamless, providing honest reviews, personalized recommendations, and a smooth dining experience.</li>
        <li>For Restaurant Owners 🏢 – We help restaurants gain visibility, manage customer engagement, and grow their business through our platform.</li>
         </ul>
          </div>
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
