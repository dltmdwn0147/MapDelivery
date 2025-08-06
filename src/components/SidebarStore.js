import Stores from '../Stores'
import './SearchBar.css'
import { useState, useEffect } from 'react'

const SidebarStore = ({ onStoreSelect, activeFilter, searchTerm }) => {
    const [sortedStores, setSortedStores] = useState([])
    const [userLocation, setUserLocation] = useState(null)

    // 현재 위치 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.log('위치 정보를 가져올 수 없습니다:', error)
                    // 위치 정보를 가져올 수 없으면 원래 순서로 정렬
                    setSortedStores([...Stores])
                }
            )
        } else {
            console.log('이 브라우저는 위치 정보를 지원하지 않습니다')
            setSortedStores([...Stores])
        }
    }, [])

    // 거리 계산 함수
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371 // 지구의 반지름 (km)
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLng = (lng2 - lng1) * Math.PI / 180
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
    }

    // 위치 정보가 있으면 가까운 순으로 정렬
    useEffect(() => {
        if (userLocation) {
            const storesWithDistance = Stores.map(store => ({
                ...store,
                distance: calculateDistance(
                    userLocation.lat, 
                    userLocation.lng, 
                    store.lat, 
                    store.lng
                )
            }))
            
            const sorted = storesWithDistance.sort((a, b) => a.distance - b.distance)
            setSortedStores(sorted)
        }
    }, [userLocation])

    // 필터링된 가게들 계산 (타입 필터 + 검색어 필터)
    const filteredStores = sortedStores.filter(store => {
        // 타입 필터링
        const typeMatch = activeFilter === '전체' || store.storeType === activeFilter;
        
        // 검색어 필터링
        const searchMatch = !searchTerm || 
            store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.storeMenu.some(menu => menu.menuName.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return typeMatch && searchMatch;
    });

    return (
        <div>
            {filteredStores.map((Store, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '94%',
                        height: 'auto',
                        minHeight: '60px',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #000',
                        marginTop: '10px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onClick={() => onStoreSelect && onStoreSelect(Store)}
                    className="store-item"
                >
                <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    padding: '5px',
                    backgroundColor: 'transparent'
                }}>
                    {Store.storeName}
                </div>
                <div style={{ 
                    fontSize: '0.8rem', 
                    padding: '5px',
                    backgroundColor: 'transparent',
                    wordBreak: 'break-word',
                    lineHeight: '1.2'
                }}>
                    {Store.storeMenu.slice(0, 3).map(menu => menu.menuName).join(', ')}
                    {Store.storeMenu.length > 3 && '...'}
                </div>
                {Store.distance && (
                    <div style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 5px',
                        backgroundColor: 'transparent',
                        color: '#666'
                    }}>
                        거리: {Store.distance.toFixed(1)}km
                    </div>
                )}
                </div>
            ))}
        </div>
    );
};

export default SidebarStore;