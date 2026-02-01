import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth-shared.css';
import '../../styles/choose-register.css';

const ChooseRegister = () => {
  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card choose-card"
        role="region"
        aria-labelledby="choose-register-title"
      >
        <header className="choose-header">
          <h1 id="choose-register-title" className="auth-title">
            Join Instamato
          </h1>
          <p className="auth-subtitle">
            Choose how you want to get started
          </p>
        </header>

        <div className="choose-options">
          <Link to="/user/register" className="choose-option">
            <div className="choose-icon">🍽️</div>
            <div>
              <h3>Food Lover</h3>
              <p>Discover & save amazing food</p>
            </div>
          </Link>

          <Link to="/food-partner/register" className="choose-option secondary">
            <div className="choose-icon">🏪</div>
            <div>
              <h3>Food Partner</h3>
              <p>Upload items & grow your business</p>
            </div>
          </Link>
        </div>

        <div className="auth-alt-action choose-footer">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
