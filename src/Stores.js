import PrahaCoffeeAmericano from './photos/prahacoffeeAmericano.png'

const Stores = [
    {
        storeName: '프라하커피',
        storeType: '카페',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano],
        storeMenu: [
            {'menuName': '아메리카노', 'menuPrice': 4500, 'menuPhoto': PrahaCoffeeAmericano},
            {'menuName': '카페라떼', 'menuPrice': 5000, 'menuPhoto': PrahaCoffeeAmericano},
            {'menuName': '바닐라라떼', 'menuPrice': 5500, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 동진로20번길 29 2층',
        lat: 35.17806578194225,
        lng: 128.09494704630018
    },
    {
        storeName: 'BBQ진주칠암점', 
        storeType: '음식점',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano],
        storeMenu: [
            {'menuName': '양념치킨', 'menuPrice': 18000, 'menuPhoto': PrahaCoffeeAmericano},
            {'menuName': '후라이드치킨', 'menuPrice': 18000, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 동진로20번길 25',
        lat: 35.177914096436105,
        lng: 128.09452786863426
    },
    {
        storeName: '써브웨이', 
        storeType: '음식점',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano],
        storeMenu: [
            {'menuName': '비엘티', 'menuPrice': 7000, 'menuPhoto': PrahaCoffeeAmericano},
            {'menuName': '비엠티', 'menuPrice': 8000, 'menuPhoto': PrahaCoffeeAmericano}],
            storeAddress: '경남 진주시 동진로 30',
            lat: 35.17870177507711,
            lng: 128.09438474259235
    },
    {
        storeName: '집밥', 
        storeType: '음식점',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano],
        storeMenu: [
            {'menuName': '한식 뷔페', 'menuPrice': 10000, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 강남로167번길 22',
        lat: 35.18263949792766,
        lng: 128.09349341551817
    },
    {
        storeName: '림메이크',
        storeType: '카페',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano],
        storeMenu: [
            {'menuName': '아메리카노', 'menuPrice': 4500, 'menuPhoto': PrahaCoffeeAmericano},
            {'menuName': '카페라떼', 'menuPrice': 5000, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 강남로167번길 22 1층',
        lat: 35.182669406085694,
        lng: 128.0934252030426
    },
    {
        storeName: '날마다 짬뽕', 
        storeType: '음식점',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano], 
        storeMenu: [
            {'menuName': '짬뽕', 'menuPrice': 10000, 'menuPhoto': PrahaCoffeeAmericano}, 
            {'menuName': '짜장면', 'menuPrice': 10000, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 강남로167번길 30-2', 
        lat: 35.18237005960091, 
        lng: 128.0926390066582
    },
    {
        storeName: '라프',  
        storeType: '카페',
        storePhoto: [PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano, PrahaCoffeeAmericano], 
        storeMenu: [
            {'menuName': '아메리카노', 'menuPrice': 4500, 'menuPhoto': PrahaCoffeeAmericano}, 
            {'menuName': '카페라떼', 'menuPrice': 5000, 'menuPhoto': PrahaCoffeeAmericano}, 
            {'menuName': '바닐라라떼', 'menuPrice': 5500, 'menuPhoto': PrahaCoffeeAmericano}, 
            {'menuName': '헤이즐넛라떼', 'menuPrice': 5500, 'menuPhoto': PrahaCoffeeAmericano}],
        storeAddress: '경남 진주시 강남로167번길 30 1층', 
        lat: 35.18241596084189, 
        lng: 128.09279605848562
    }
];

export default Stores;