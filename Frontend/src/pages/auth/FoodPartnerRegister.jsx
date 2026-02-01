import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
import axios from "axios";
import gsap from "gsap";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      ".auth-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
    );
    gsap.fromTo(
      ".field-group",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    axios
      .post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          name: businessName,
          contactName,
          phone,
          email,
          password,
          address,
        },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        // Success animation
        gsap.to(".auth-card", {
          duration: 0.3,
          scale: 0.95,
          opacity: 0,
          onComplete: () => navigate("/food-partner/:id"),
        });
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
        // Shake animation on error
        gsap.to(".auth-card", {
          duration: 0.1,
          x: -10,
          repeat: 5,
          yoyo: true,
          onComplete: () => gsap.set(".auth-card", { x: 0 }),
        });
      });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {" "}
          <div className="field-group">
            {" "}
            <label htmlFor="businessName">Business Name</label>{" "}
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              autoComplete="organization"
              required
            />{" "}
          </div>{" "}
          <div className="two-col">
            {" "}
            <div className="field-group">
              {" "}
              <label htmlFor="contactName">Contact Name</label>{" "}
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />{" "}
            </div>{" "}
            <div className="field-group">
              {" "}
              <label htmlFor="phone">Phone</label>{" "}
              <input
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                required
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="field-group">
            {" "}
            <label htmlFor="email">Email</label>{" "}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
              autoComplete="email"
              required
            />{" "}
          </div>{" "}
          <div className="field-group">
            {" "}
            <label htmlFor="password">Password</label>{" "}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              required
            />{" "}
          </div>{" "}
          <div className="field-group">
            {" "}
            <label htmlFor="address">Address</label>{" "}
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              required
            />{" "}
            <p className="small-note">
              Full address helps customers find you faster.
            </p>{" "}
          </div>{" "}
          <button className="auth-submit" type="submit">
            Create Partner Account
          </button>{" "}
        </form>{" "}
        <div className="auth-alt-action">
          {" "}
          Already a partner? <Link to="/food-partner/login">Sign in</Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default FoodPartnerRegister;
