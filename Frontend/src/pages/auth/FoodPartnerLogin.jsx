import React, { useEffect } from 'react';
import '../../styles/auth-shared.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

   useEffect(() => {
    // GSAP animations
   gsap.fromTo(
    '.auth-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }
  )

  gsap.fromTo(
    '.field-group',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }
  )
}, [])

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      { email, password },
      { withCredentials: true }
    );

    console.log("LOGIN RESPONSE 👉", response.data);
    console.log("FOOD PARTNER OBJECT 👉", response.data.foodPartner);

    const partner =
      response.data.foodPartner?.foodPartner ||
      response.data.foodPartner?._doc ||
      response.data.foodPartner;

    const partnerId = partner?._id || partner?.id;

    if (!partnerId) {
      console.error("Partner ID missing", response.data);
      return;
    }

    gsap.to('.auth-card', {
      duration: 0.3,
      scale: 0.95,
      opacity: 0,
      onComplete: () => navigate(`/food-partner/${partnerId}`)
    });

  } catch (error) {
    console.error(error);
    gsap.to('.auth-card', {
      duration: 0.1,
      x: -10,
      repeat: 5,
      yoyo: true,
      onComplete: () => gsap.set('.auth-card', { x: 0 })
    });
  }
};



  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="business@example.com" 
              autoComplete="email"
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              autoComplete="current-password"
              required
            />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <Link to="/food-partner/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;