import React, { useState } from 'react';
import './OrderPage.css';

const OrderPage = ({ selectedStore, onBack, onOrderComplete }) => {
    const [orderItems, setOrderItems] = useState([]);
    // const [showQuantityModal, setShowQuantityModal] = useState(false);
    // const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [activeQuantityDropdown, setActiveQuantityDropdown] = useState(null);

    // Stores.js에서 메뉴 데이터 가져오기
    const getMenuItems = () => {
        if (!selectedStore || !selectedStore.storeMenu) {
        return [];
        }

        return selectedStore.storeMenu.map((menuItem, index) => ({
        id: index + 1,
        name: menuItem.menuName,
        price: menuItem.menuPrice,
        image: menuItem.menuPhoto
        }));
    };

    const menuItems = getMenuItems();

    // 메뉴를 주문 내역에 추가
    const addToOrder = (menuItem) => {
        const existingItem = orderItems.find(item => item.id === menuItem.id);
        
        if (existingItem) {
            // 이미 있는 메뉴면 수량 증가
            setOrderItems(prev => 
                prev.map(item => 
                item.id === menuItem.id 
                    ? { ...item, quantity: Math.min(10, item.quantity + 1) }
                    : item
                )
            );
        } else {
            // 새로운 메뉴면 추가
            setOrderItems(prev => [...prev, { ...menuItem, quantity: 1 }]);
        }
    };

    // 수량 증가
    const increaseQuantity = (itemId) => {
        setOrderItems(prev => 
            prev.map(item => 
                item.id === itemId 
                ? { ...item, quantity: Math.min(10, item.quantity + 1) }
                : item
            )
        );
    };

    // 수량 감소
    const decreaseQuantity = (itemId) => {
        setOrderItems(prev => 
            prev.map(item => 
                item.id === itemId 
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            ).filter(item => item.quantity > 0) // 수량이 0이면 제거
        );
    };

    // 수량 직접 설정
    const setQuantity = (itemId, quantity) => {
        const newQuantity = Math.max(0, Math.min(10, parseInt(quantity) || 0));
        if (newQuantity === 0) {
            setOrderItems(prev => prev.filter(item => item.id !== itemId));
        } else {
            setOrderItems(prev => 
                prev.map(item => 
                item.id === itemId 
                    ? { ...item, quantity: newQuantity }
                    : item
                )
            );
        }
        setActiveQuantityDropdown(null); // 드롭다운 닫기
    };

    // 드롭다운 토글
    const toggleQuantityDropdown = (itemId) => {
        setActiveQuantityDropdown(activeQuantityDropdown === itemId ? null : itemId);
    };

    // 드롭다운 외부 클릭 시 닫기
    const handleClickOutside = (e) => {
        if (!e.target.closest('.quantity-dropdown-container')) {
            setActiveQuantityDropdown(null);
        }
    };

    // 수량 옵션 생성 (1~10개)
    const generateQuantityOptions = () => {
        const options = [];
        for (let i = 1; i <= 10; i++) {
            options.push(i);
        }
        return options;
    };

    // 총 결제 금액 계산
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 주문 완료
    const handleOrderComplete = () => {
        if (orderItems.length === 0) {
            alert('주문할 메뉴를 선택해주세요.');
            return;
        }
        
        alert('주문이 완료되었습니다!');
        onOrderComplete && onOrderComplete(orderItems, totalAmount);
    };

    return (
        <div className="order-page" onClick={handleClickOutside}>
            <div className="order-container">
                {/* 헤더 */}
                <div className="order-header">
                    <h1>주문 - {selectedStore?.storeName || '가게'}</h1>
                    <button className="order-complete-btn" onClick={handleOrderComplete}>
                        주문하기
                    </button>
                </div>

                <div className="order-content">
                {/* 왼쪽: 메뉴 목록 */}
                <div className="menu-section">
                    <h2>메뉴</h2>
                    <div className="menu-list">
                    {menuItems.length === 0 ? (
                        <div className="no-menu">
                        메뉴 정보가 없습니다.
                        </div>
                    ) : (
                        menuItems.map((menuItem) => (
                        <div key={menuItem.id} className="menu-item">
                            <div className="menu-image">
                            {menuItem.image ? (
                                <img src={menuItem.image} alt={menuItem.name} />
                            ) : (
                                <div className="menu-image-placeholder">
                                메뉴 사진
                                </div>
                            )}
                            </div>
                            <div className="menu-info">
                            <div className="menu-name">{menuItem.name}</div>
                            <div className="menu-price">{menuItem.price.toLocaleString()}원</div>
                            </div>
                            <button 
                            className="add-to-order-btn"
                            onClick={() => addToOrder(menuItem)}
                            >
                            +
                            </button>
                        </div>
                        ))
                    )}
                    </div>
                </div>

                {/* 오른쪽: 주문 내역 */}
                <div className="order-details-section">
                    <h2>주문내역</h2>
                    <div className="order-items">
                    {orderItems.length === 0 ? (
                        <div className="empty-order">
                        선택된 메뉴가 없습니다.
                        </div>
                    ) : (
                        orderItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <div className="order-item-info">
                            <div className="order-item-name">{item.name}</div>
                            <div className="order-item-price">
                                {(item.price * item.quantity).toLocaleString()}원
                            </div>
                            </div>
                            <div className="order-item-controls">
                            <button 
                                className="quantity-btn minus"
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                            <div className="quantity-dropdown-container">
                                <button
                                className="quantity-display-btn"
                                onClick={() => toggleQuantityDropdown(item.id)}
                                >
                                {item.quantity}
                                </button>
                                {activeQuantityDropdown === item.id && (
                                <div className="quantity-dropdown">
                                    {generateQuantityOptions().map((quantity) => (
                                    <button
                                        key={quantity}
                                        className={`quantity-option ${quantity === item.quantity ? 'active' : ''}`}
                                        onClick={() => setQuantity(item.id, quantity)}
                                    >
                                        {quantity}
                                    </button>
                                    ))}
                                </div>
                                )}
                            </div>
                            <button 
                                className="quantity-btn plus"
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </button>
                            </div>
                        </div>
                        ))
                    )}
                    </div>
                    <div className="total-amount">
                    총 결제 금액: {totalAmount.toLocaleString()}원
                    </div>
                </div>
                </div>

                {/* 뒤로가기 버튼 */}
                <button className="back-btn" onClick={onBack}>
                ← 뒤로가기
                </button>
            </div>
        </div>
    );
};

export default OrderPage; 