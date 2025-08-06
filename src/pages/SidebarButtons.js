import React, { useState } from 'react';

const SidebarButtons = () => {
    const [activeButton, setActiveButton] = useState('기본');

    const buttons = [
        { id: '기본', label: '기본' },
        { id: '주문내역', label: '주문내역' },
        { id: '즐겨찾기', label: '즐겨찾기' },
        { id: '친구', label: '친구' }
    ];

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '320px', // 사이드바 left(20px) + 너비(250px) + 간격(20px)
            display: 'flex',
            gap: '8px',
            zIndex: 20
        }}>
            {buttons.map((button) => (
                <button
                    key={button.id}
                    onClick={() => handleButtonClick(button.id)}
                    style={{
                        backgroundColor: activeButton === button.id ? '#007bff' : 'white',
                        color: activeButton === button.id ? 'white' : '#333',
                        border: '1px solid #ddd',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        minWidth: '60px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        if (activeButton !== button.id) {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.transform = 'translateY(-1px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (activeButton !== button.id) {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default SidebarButtons; 