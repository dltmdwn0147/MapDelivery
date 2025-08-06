import './App.css';
import { useState } from 'react';
import KakaoMap from './pages/KakaoMap';
import Sidebar from './pages/Sidebar';
import SidebarDetailStore from './pages/SidebarDetailStore';
import SidebarButtons from './pages/SidebarButtons';
import LoginScreen from './pages/LoginScreen';
import OrderPage from './pages/OrderPage';
import LoginModal from './modals/LoginModal';
import SignUpModal from './modals/SignUpModal';

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null); // Sidebar에 표시될 가게 정보
  const [showDetailStore, setShowDetailStore] = useState(false); // SidebarDetailStore에 표시될 가게 정보
  const [showOrderPage, setShowOrderPage] = useState(false); // 주문 페이지에 접근할 때 사용되는 유무 판단
  const [activeFilter, setActiveFilter] = useState('전체'); // 가게 정보 중 분류에 대한 정보
  const [searchTerm, setSearchTerm] = useState(''); // 검색창에 입력한 글자
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인이 되었는지에 대한 유무, true일 경우 회원으로 접속, false일 경우 비회원으로 접속
  const [userType, setUserType] = useState(''); // 'login', 'signup', 'guest'
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 상태
  const [showSignUpModal, setShowSignUpModal] = useState(false); // 회원가입 모달 상태

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    setShowDetailStore(true);
  };

  const handleBack = () => {
    setShowDetailStore(false);
    setSelectedStore(null);
    setSearchTerm('');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedStore(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedStore(null);
  };

  // 로그인 화면 핸들러들
  const handleLogin = () => {
    setUserType('login');
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setUserType('signup');
    setIsLoggedIn(true);
  };

  const handleGuest = () => {
    setUserType('guest');
    setIsLoggedIn(true);
  };

  // 주문 페이지 핸들러들
  const handleOrderClick = (store) => {
    setShowOrderPage(true);
  };

  const handleOrderBack = () => {
    setShowOrderPage(false);
  };

  const handleOrderComplete = (orderItems, totalAmount) => {
    console.log('주문 완료:', { orderItems, totalAmount });
    setShowOrderPage(false);
    setShowDetailStore(false);
    setSelectedStore(null);
    // 여기에 주문 완료 후 처리 로직을 추가할 수 있습니다
  };

  // 로그인 모달 열기 핸들러
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };
  // 로그인 모달 닫기 핸들러
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  
  // // 회원가입 모달 열기 핸들러
  // const handleOpenSignUpModal = () => {
  //   setShowSignUpModal(true);
  // };

  // 회원가입 모달 닫기 핸들러
  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  };
  // 회원가입 성공 시 로그인 모달 다시 띄우기
  const handleSignUpSuccess = () => {
    setShowSignUpModal(false);
    setShowLoginModal(true);
  };
  // 로그인 성공 시
  const handleLoginSuccess = () => {
    setUserType('login');
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // 로그인 화면이 표시되어야 하는 경우
  if (!isLoggedIn) { // 기본값이 false임
    return (
      <LoginScreen 
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onGuest={handleGuest}
      />
    );
  }

  // 주문 페이지가 표시되어야 하는 경우
  if (showOrderPage) {
    return (
      <OrderPage
        selectedStore={selectedStore}
        onBack={handleOrderBack}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  // 메인 앱 화면
  return (
    <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
      {/* 지도에 대한 컴포넌트 */}
      <KakaoMap 
        onStoreSelect={handleStoreSelect} 
        selectedStore={selectedStore} 
        showStoreMarkers={!showDetailStore}
        activeFilter={activeFilter}
        searchTerm={searchTerm}
        userType={userType}
      />

      {/* Sidebar에 대한 컴포넌트 */}
      {!showDetailStore && (
        <Sidebar 
          onStoreSelect={handleStoreSelect} 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
          searchTerm={searchTerm} 
          onSearch={handleSearch}
          userType={userType}
          onLoginClick={handleOpenLoginModal} // 로그인 버튼 클릭 시 모달 오픈
        />
      )}

      {/* SidebarButtons에 대한 컴포넌트 */}
      {!showDetailStore && userType !== 'guest' && <SidebarButtons />}
      {showDetailStore && (
        <SidebarDetailStore 
          selectedStore={selectedStore} 
          onBack={handleBack}
          userType={userType}
          onOrderClick={handleOrderClick}
        />
      )}
      {/* 로그인 모달 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        onLogin={handleLoginSuccess}
        onSwitchToSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
      />
      {/* 회원가입 모달 */}
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={handleCloseSignUpModal}
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToLogin={() => {
          setShowSignUpModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}

export default App;