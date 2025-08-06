import Stores from '../Stores';
import MyPageButton from '../components/MyPageButton';

const SidebarDetailStore = ({ selectedStore, onBack, userType, onOrderClick, onLoginClick }) => {
    const store = selectedStore || Stores[0]; // 선택된 가게가 있으면 사용, 없으면 첫 번째 가게
    
    // 메뉴를 2개씩 그룹화하는 함수
    const chunkArray = (array, size) => {
        const chunked = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
        }
        return chunked;
    };

    // 메뉴를 2개씩 그룹화
    const menuGroups = chunkArray(store.storeMenu, 2);

    const handleOrderClick = () => {
        if (onOrderClick) {
            onOrderClick(store);
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '250px',
                height: '90%',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                zIndex: 10,
                overflowY: 'scroll',
                    }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <button 
                    onClick={onBack}
                    style={{
                        background: "white",
                        padding: ".375rem .75rem",
                        border: "1px solid #000",
                        borderRadius: ".25rem",
                        fontSize: "1rem",
                        lineHeight: 1.5,
                        width: "3vw",
                        height: "3vh",
                        cursor: 'pointer',
                        color: '#000',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <span style={{ fontSize: "0.8rem", textAlign: "center", lineHeight: 1.5}}>
                        ←
                    </span>
                </button>
                <MyPageButton userType={userType} onLoginClick={onLoginClick} />
            </div>
            {/* 가게 사진 */}
            <div
                style={{
                    width: '100%',
                    aspectRatio: '1', // 정사각형 비율 설정
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#666',
                    overflow: 'hidden' // 이미지가 영역을 벗어나지 않도록
                }}
            >
                {store.storePhoto && store.storePhoto.length > 0 ? (
                    (() => {
                        const photoCount = Math.min(store.storePhoto.length, 4); // 최대 4장까지만 표시
                        
                        if (photoCount === 1) {
                            // 1장: 전체 영역
                            return (
                                <img 
                                    src={store.storePhoto[0]} 
                                    alt="가게 사진" 
                                    style={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'cover', 
                                        borderRadius: '8px' 
                                    }}
                                />
                            );
                        } else if (photoCount === 2) {
                            // 2장: 절반씩 (좌우)
                            return (
                                <div style={{ 
                                    display: 'flex', 
                                    width: '100%', 
                                    height: '100%' 
                                }}>
                                    <img 
                                        src={store.storePhoto[0]} 
                                        alt="가게 사진 1" 
                                        style={{ 
                                            width: '50%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }}
                                    />
                                    <img 
                                        src={store.storePhoto[1]} 
                                        alt="가게 사진 2" 
                                        style={{ 
                                            width: '50%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }}
                                    />
                                </div>
                            );
                        } else if (photoCount === 3) {
                            // 3장: 좌측 1/2 + 우측 1/4씩 2장
                            return (
                                <div style={{ 
                                    display: 'flex', 
                                    width: '100%', 
                                    height: '100%' 
                                }}>
                                    <img 
                                        src={store.storePhoto[0]} 
                                        alt="가게 사진 1" 
                                        style={{ 
                                            width: '50%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                        }}
                                    />
                                    <div style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        width: '50%', 
                                        height: '100%' 
                                    }}>
                                        <img 
                                            src={store.storePhoto[1]} 
                                            alt="가게 사진 2" 
                                            style={{ 
                                                width: '100%', 
                                                height: '50%', 
                                                objectFit: 'cover' 
                                            }}
                                        />
                                        <img 
                                            src={store.storePhoto[2]} 
                                            alt="가게 사진 3" 
                                            style={{ 
                                                width: '100%', 
                                                height: '50%', 
                                                objectFit: 'cover' 
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        } else {
                            // 4장 이상: 1/4씩 4장 (2x2 그리드)
                            return (
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: '1fr 1fr',
                                    gridTemplateRows: '1fr 1fr',
                                    width: '100%', 
                                    height: '100%' 
                                }}>
                                    {store.storePhoto.slice(0, 4).map((photo, index) => (
                                        <img 
                                            key={index}
                                            src={photo} 
                                            alt={`가게 사진 ${index + 1}`} 
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover' 
                                            }}
                                        />
                                    ))}
                                </div>
                            );
                        }
                    })()
                ) : (
                    '가게 사진'
                )}
            </div>
            
            {/* 가게 이름 */}
            <div
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    color: '#333'
            }}>
                {store.storeName}
            </div>
            
            {/* 가게 주소 */}
            <div
                style={{
                    marginBottom: '15px',
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.4'
            }}>
                {store.storeAddress}
            </div>
            
            {/* 주문 버튼 - 회원만 표시 */}
            {userType !== 'guest' && (
                <div
                    style={{
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <button
                        onClick={handleOrderClick}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            padding: '12px 30px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            maxWidth: '200px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0, 123, 255, 0.3)';
                        }}
                    >
                        주문하기
                    </button>
                </div>
            )}
            
            {/* 메뉴 섹션 */}
            <div style={{ marginBottom: '15px' }}>
                <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    marginBottom: '10px',
                    color: '#333'
                }}>
                    메뉴
                </h3>
                
                {/* 메뉴를 2열로 표시 */}
                {menuGroups.map((menuGroup, groupIndex) => (
                    <div 
                        key={groupIndex}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        {menuGroup.map((menu, menuIndex) => {
                            return (
                                <div 
                                    key={menuIndex}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '5px', // 10px에서 5px로 줄임
                                        borderRadius: '6px',
                                        border: '1px solid #e9ecef',
                                        textAlign: 'center',
                                        fontSize: '12px',
                                        color: '#495057',
                                        height: '120px', // 고정 높이 설정
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {/* 메뉴 사진이 있다면 표시 */}
                                    {menu.menuPhoto ? (
                                    <div style={{ 
                                        width: '100%', 
                                        aspectRatio: '1', // 정사각형 비율
                                        marginBottom: '3px' // 5px에서 3px로 줄임
                                    }}>
                                            <img 
                                                src={menu.menuPhoto} 
                                                alt={menu.menuName}
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div 
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1', // 정사각형 비율
                                                backgroundColor: '#e9ecef',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '3px', // 5px에서 3px로 줄임
                                                fontSize: '10px',
                                                color: '#6c757d'
                                            }}
                                        >
                                            메뉴 사진
                                        </div>
                                    )}
                                    <div style={{ 
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        lineHeight: '1.2',
                                        wordBreak: 'keep-all',
                                        marginTop: '2px'
                                    }}>
                                        {menu.menuName}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {/* CSS Grid가 자동으로 처리하므로 빈 공간 제거 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidebarDetailStore;