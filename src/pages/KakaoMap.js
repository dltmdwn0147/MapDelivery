import React, { useEffect, useRef, useCallback } from 'react';
import Stores from '../Stores';

const KakaoMap = ({ onStoreSelect, selectedStore, showStoreMarkers = true, activeFilter = '전체', searchTerm = '' }) => {
    const mapRef = useRef(null);      // 지도 컨테이너 ref
    const markerRef = useRef(null);   // 마커 객체 저장용 ref
    const mapInstanceRef = useRef(null); // 지도 인스턴스 ref
    const storeMarkersRef = useRef([]); // 가게 마커들 저장용 ref

    // 두 지점 간의 거리를 계산하는 함수 (미터 단위)
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371000; // 지구의 반지름 (미터)
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // 클릭한 위치에서 일정 반경 내의 가게들을 찾는 함수
    const findNearbyStores = useCallback((clickLat, clickLng, radius = 5) => {
        const nearbyStores = [];
        
        // 필터링된 가게들만 고려
        const filteredStores = Stores.filter(store => {
            // 타입 필터링
            const typeMatch = activeFilter === '전체' || store.storeType === activeFilter;
            
            // 검색어 필터링
            const searchMatch = !searchTerm || 
                store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                store.storeMenu.some(menu => menu.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return typeMatch && searchMatch;
        });
        
        filteredStores.forEach(store => {
            const distance = calculateDistance(clickLat, clickLng, store.lat, store.lng);
            if (distance <= radius) {
                nearbyStores.push({
                    ...store,
                    distance: Math.round(distance) // 거리를 미터 단위로 반올림
                });
            }
        });

        return nearbyStores.sort((a, b) => a.distance - b.distance); // 거리순으로 정렬
    }, [activeFilter, searchTerm]);

    useEffect(() => {
        const script = document.createElement('script');
        const REACT_APP_API_KEY = process.env.REACT_APP_KAKAOMAP_KEY;
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${REACT_APP_API_KEY}&autoload=false`;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = mapRef.current;

                // 기본 좌표: 서울 시청
                const defaultLatLng = new window.kakao.maps.LatLng(37.5665, 126.9780);

                // 지도를 먼저 생성 (중심은 임시로 기본 좌표 사용)
                const map = new window.kakao.maps.Map(container, {
                    center: defaultLatLng,
                    level: 3,
                });
                
                mapInstanceRef.current = map; // 지도 인스턴스 저장

                // 필터링된 가게들에만 작은 동그라미 마커 표시
                const filteredStores = Stores.filter(store => {
                    // 타입 필터링
                    const typeMatch = activeFilter === '전체' || store.storeType === activeFilter;
                    
                    // 검색어 필터링
                    const searchMatch = !searchTerm || 
                        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        store.storeMenu.some(menu => menu.toLowerCase().includes(searchTerm.toLowerCase()));
                    
                    return typeMatch && searchMatch;
                });

                filteredStores.forEach(store => {
                    const storeLatLng = new window.kakao.maps.LatLng(store.lat, store.lng);
                    
                    // 작은 동그라미 마커 생성
                    const circleMarker = new window.kakao.maps.Circle({
                        center: storeLatLng,
                        radius: 6, // 반지름 8미터 (더 작게)
                        strokeWeight: 1, // 선의 두께
                        strokeColor: '#fe3939', // 선 색깔
                        strokeStyle: 'solid', // 선의 스타일
                        fillColor: '#fe3939', // 채우기 색깔
                        fillOpacity: 0.8, // 채우기 불투명도
                        map: showStoreMarkers ? map : null
                    });
                    
                    // 마커 배열에 저장
                    storeMarkersRef.current.push(circleMarker);
                });

                // 사용자의 위치로 중심 이동
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userLat = position.coords.latitude;
                            const userLng = position.coords.longitude;

                            // 임시 좌표
                            // const userLat = 35.17806578194225;
                            // const userLng = 128.09494704630018;

                            // 중심 좌표 출력
                            // console.log(userLat, userLng);

                            const userLatLng = new window.kakao.maps.LatLng(userLat, userLng);
                            map.setCenter(userLatLng); // 지도의 중심을 사용자 위치로 변경

                            // // 현재 위치에 마커 표시
                            // const userMarker = new window.kakao.maps.Marker({
                            //     position: userLatLng,
                            //     map: map,
                            //     title: "현재 위치",
                            // });

                            // markerRef.current = userMarker;

                        },
                        (error) => {
                            console.warn("위치 정보 접근 실패, 기본 위치로 지도 표시");
                        }
                    );
                } else {
                    console.warn("브라우저에서 Geolocation을 지원 X");
                }

                // 지도 클릭 시 마커 표시
                window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                    const latlng = mouseEvent.latLng;
                    const clickLat = latlng.getLat();
                    const clickLng = latlng.getLng();
                    
                    console.log("클릭한 위치 - 위도:", clickLat);
                    console.log("클릭한 위치 - 경도:", clickLng);

                    // 기존 마커 제거
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }

                    // 클릭한 위치에서 10m 반경 내의 가게들 찾기
                    const nearbyStores = findNearbyStores(clickLat, clickLng, 10);
                    
                    if (nearbyStores.length > 0) {
                        console.log("=== 클릭한 위치 10m 반경 내의 가게들 ===");
                        nearbyStores.forEach(store => {
                            console.log(`${store.storeName}`);
                            console.log(`   주소: ${store.storeAddress}`);
                            console.log(`   메뉴: ${store.storeMenu.join(', ')}`);
                            console.log(`   거리: ${store.distance}m`);
                            console.log(`   좌표: (${store.lat}, ${store.lng})`);
                            console.log("-----------------------------");
                        });
                        console.log(`총 ${nearbyStores.length}개의 가게가 반경 내에 있습니다.`);

                        // 가장 가까운 가게에 마커 표시
                        const closestStore = nearbyStores[0]; // 이미 거리순으로 정렬되어 있음
                        const storeLatLng = new window.kakao.maps.LatLng(closestStore.lat, closestStore.lng);
                        
                        const marker = new window.kakao.maps.Marker({
                            position: storeLatLng,
                            map: map,
                        });

                        markerRef.current = marker;

                        console.log(`가장 가까운 가게 "${closestStore.storeName}"에 마커를 표시했습니다. (거리: ${closestStore.distance}m)`);
                        
                        // 부모 컴포넌트로 가게 정보 전달
                        if (onStoreSelect) {
                            onStoreSelect(closestStore);
                        }
                    } else {
                        console.log("클릭한 위치 10m 반경 내에 가게가 없습니다.");
                        
                        // 가게가 없으면 클릭한 위치에 마커 표시
                        const marker = new window.kakao.maps.Marker({
                            position: latlng,
                            map: map,
                        });

                        markerRef.current = marker;
                    }
                });
            });
        };

        document.head.appendChild(script);
    }, [activeFilter, searchTerm, onStoreSelect, showStoreMarkers, findNearbyStores]);

    // selectedStore가 변경될 때 지도 이동 및 마커 표시
    useEffect(() => {
        if (mapInstanceRef.current) {
            const map = mapInstanceRef.current;
            
            // 기존 마커 제거
            if (markerRef.current) {
                markerRef.current.setMap(null);
                markerRef.current = null;
            }
            
            if (selectedStore) {
                // 선택된 가게의 위치로 지도 이동
                const storeLatLng = new window.kakao.maps.LatLng(selectedStore.lat, selectedStore.lng);
                map.setCenter(storeLatLng);
                
                // 해당 위치에 마커 표시
                const marker = new window.kakao.maps.Marker({
                    position: storeLatLng,
                    map: map,
                });
                
                markerRef.current = marker;
                
                console.log(`지도가 "${selectedStore.storeName}" 위치로 이동했습니다.`);
            } else {
                // selectedStore가 null이면 마커만 제거 (지도 위치는 유지)
                console.log("마커가 제거되었습니다.");
            }
        }
    }, [selectedStore]);

    // showStoreMarkers가 변경될 때 마커 표시/숨김
    useEffect(() => {
        if (mapInstanceRef.current && storeMarkersRef.current.length > 0) {
            storeMarkersRef.current.forEach(circle => {
                if (showStoreMarkers) {
                    circle.setMap(mapInstanceRef.current);
                } else {
                    circle.setMap(null);
                }
            });
        }
    }, [showStoreMarkers]);

    // activeFilter나 searchTerm이 변경될 때 마커 업데이트
    useEffect(() => {
        if (mapInstanceRef.current) {
            // 기존 마커들 제거
            storeMarkersRef.current.forEach(circle => {
                circle.setMap(null);
            });
            storeMarkersRef.current = [];

            // 새로운 필터링된 가게들에 마커 생성
            const filteredStores = Stores.filter(store => {
                // 타입 필터링
                const typeMatch = activeFilter === '전체' || store.storeType === activeFilter;
                
                // 검색어 필터링
                const searchMatch = !searchTerm || 
                    store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    store.storeMenu.some(menu => menu.toLowerCase().includes(searchTerm.toLowerCase()));
                
                return typeMatch && searchMatch;
            });

            filteredStores.forEach(store => {
                const storeLatLng = new window.kakao.maps.LatLng(store.lat, store.lng);
                
                const circleMarker = new window.kakao.maps.Circle({
                    center: storeLatLng,
                    radius: 6,
                    strokeWeight: 1,
                    strokeColor: '#fe3939',
                    strokeStyle: 'solid',
                    fillColor: '#fe3939',
                    fillOpacity: 0.8,
                    map: showStoreMarkers ? mapInstanceRef.current : null
                });
                
                storeMarkersRef.current.push(circleMarker);
            });
        }
    }, [activeFilter, searchTerm, showStoreMarkers]);

    return (
        <div>
            <div
                // id="map"
                ref={mapRef}
                style={{ width: '100%', height: '100vh' }}
            ></div>
        </div>
    );
};

export default KakaoMap;