import React, { useState } from 'react';
import './LoginModal.css';
import { refreshUsers } from '../Users';

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // 에러 메시지 초기화

        // 로컬 스토리지에서 최신 사용자 데이터 가져오기
        const currentUsers = refreshUsers();

        // Users 배열에서 입력된 이메일과 일치하는 사용자 찾기
        const user = currentUsers.find(user => user.email === email);

        if (!user) {
            // 이메일이 존재하지 않는 경우
            setErrorMessage('존재하지 않는 계정입니다.');
            return;
        }

        if (user.password !== password) {
            // 비밀번호가 틀린 경우
            setErrorMessage('비밀번호가 올바르지 않습니다.');
            return;
        }

        // 로그인 성공
        console.log('로그인 성공:', user.name);
        onLogin();
        onClose(); // 모달 닫기
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    };

    const handleInputChange = (e, field) => {
        if (field === 'email') {
        setEmail(e.target.value);
        } else if (field === 'password') {
        setPassword(e.target.value);
        }
        // 입력 시 에러 메시지 초기화
        if (errorMessage) {
        setErrorMessage('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2>로그인</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        placeholder="이메일을 입력하세요"
                        required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => handleInputChange(e, 'password')}
                        placeholder="비밀번호를 입력하세요"
                        required
                        />
                    </div>

                    {errorMessage && (
                        <div className="error-message">
                        {errorMessage}
                        </div>
                    )}
                    
                    <button type="submit" className="login-submit-btn">
                        로그인
                    </button>
                </form>
                
                <div className="modal-footer">
                    <p>
                        계정이 없으신가요?{' '}
                        <button className="link-btn" onClick={onSwitchToSignUp}>
                            회원가입
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal; 