import React, { useState } from 'react';
import './SignUpModal.css';
import { Users, addUser } from '../Users';

const SignUpModal = ({ isOpen, onClose, onSignUpSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        address: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e, field) => {
        setFormData(prev => ({
        ...prev,
        [field]: e.target.value
        }));
        // 입력 시 에러/성공 메시지 초기화
        if (errorMessage) setErrorMessage('');
        if (successMessage) setSuccessMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // 이메일 중복 확인
        const existingUser = Users.find(user => user.email === formData.email);
        if (existingUser) {
            setErrorMessage('이미 존재하는 이메일입니다.');
            return;
        }

        // 필수 필드 검증
        if (!formData.email || !formData.password || !formData.name || !formData.address) {
            setErrorMessage('모든 필드를 입력해주세요.');
            return;
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorMessage('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        // 비밀번호 길이 검증
        if (formData.password.length < 4) {
        setErrorMessage('비밀번호는 4자 이상 입력해주세요.');
        return;
        }

        // 새 사용자 데이터 생성
        const newUser = {
            user_id: Users.length + 1,
            email: formData.email,
            password: formData.password,
            name: formData.name,
            address: formData.address
        };

        // addUser 함수를 사용하여 로컬 스토리지에 저장
        addUser(newUser);
        
        setSuccessMessage('회원가입이 완료되었습니다!');
        
        // 2초 후 모달 닫기
        setTimeout(() => {
            onSignUpSuccess();
            onClose();
        }, 2000);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
        onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2>회원가입</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                    type="email"
                    id="email"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={(e) => handleInputChange(e, 'password')}
                    placeholder="비밀번호를 입력하세요 (4자 이상)"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="이름을 입력하세요"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">배달주소</label>
                    <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange(e, 'address')}
                    placeholder="배달받을 주소를 입력하세요"
                    required
                    />
                </div>

                {errorMessage && (
                    <div className="error-message">
                    {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="success-message">
                    {successMessage}
                    </div>
                )}
                
                <button type="submit" className="login-submit-btn">
                    회원가입
                </button>
                </form>
                
                <div className="modal-footer">
                    <p>
                        이미 계정이 있으신가요?{' '}
                        <button className="link-btn" onClick={onSwitchToLogin}>
                        로그인
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal; 