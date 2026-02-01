import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth-shared.css';
import gsap from 'gsap';

const UserRegister = () => {
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

    const fullName = e.target.fullName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
          phone
        },
        { withCredentials: true }
      );

      console.log("REGISTER SUCCESS:", response.data);
      
      // Success animation
      gsap.to('.auth-card', {
        duration: 0.3,
        scale: 0.95,
        opacity: 0,
        onComplete: () => navigate("/home")
      });
    } catch (error) {
      console.error(
        "REGISTER FAILED:",
        error.response?.data || error.message
      );
      // Shake animation on error
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
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Join to explore and enjoy delicious meals.
          </p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName" 
              name="fullName" 
              placeholder="Jane Doe"
              required 
            />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone</label>
            <input 
              id="phone" 
              name="phone" 
              placeholder="+1 (555) 123-4567"
              required 
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="you@example.com"
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
              required 
            />
          </div>

          <button className="auth-submit" type="submit">
            Sign Up
          </button>
        </form>

        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
