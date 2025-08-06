import React from 'react';

const MyPageButton = ({ userType, onLoginClick }) => {

    const div_style = {
        display: "flex",
        justifyContent: "flex-end", // 우측 정렬
        width: "100%",              // 전체 너비 기준 정렬
        marginBottom: "10px",
    }

    const btn_style = {
        background: "white",
        padding: ".375rem .75rem",
        border: "1px solid #000",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
        width: "4vw",
        height: "3vh",
        cursor: "pointer",

        display: "flex",            // Flexbox로 중앙 정렬
        justifyContent: "center",  // 가로 중앙
        alignItems: "center",      // 세로 중앙
    };

    const font_style = {
        fontSize: "0.8rem",
        textAlign: "center",
        lineHeight: 1.5,
        whiteSpace: "nowrap"
    };

    const handleClick = () => {
        if (userType === 'guest' && onLoginClick) {
            onLoginClick();
        }
        // 회원일 때는 기존 My 페이지 기능 (추후 구현)
    };

    return (
        <div style={div_style}>
            <button style={btn_style} onClick={handleClick}>
                <span style={font_style}>
                    {userType === 'guest' ? '로그인' : 'My'}
                </span>
            </button>
        </div>
    );
}

export default MyPageButton;
