import React, { useState } from 'react';
import './LoginScreen.css';
import LoginModal from '../modals/LoginModal';
import SignUpModal from '../modals/SignUpModal';

const LoginScreen = ({ onLogin, onSignUp, onGuest }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = () => {
    // 로그인 성공 시 메인 앱으로 이동
    onLogin();
    setIsLoginModalOpen(false);
  };

  const handleSwitchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true);
  };

  const handleSignUpModalClose = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignUpSuccess = () => {
    // 회원가입 성공 시 로그인 모달로 이동
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="login-screen">
        <div className="login-container">
          <div className="logo-section">
            <div className="logo">로고</div>
          </div>
          
          <div className="button-section">
            <button className="login-btn" onClick={handleLoginClick}>
              로그인
            </button>
            <button className="signup-btn" onClick={handleSignUpClick}>
              회원가입
            </button>
            <button className="guest-btn" onClick={onGuest}>
              비회원
            </button>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onLogin={handleLoginSubmit}
        onSwitchToSignUp={handleSwitchToSignUp}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleSignUpModalClose}
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default LoginScreen; 