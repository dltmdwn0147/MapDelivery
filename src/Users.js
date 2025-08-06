// 로컬 스토리지에서 사용자 데이터를 가져오는 함수
const getUsersFromStorage = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        return JSON.parse(storedUsers);
    } else {
        // 처음 실행 시 빈 배열로 시작
        localStorage.setItem('users', JSON.stringify([]));
        return [];
    }
};

// 로컬 스토리지에 사용자 데이터를 저장하는 함수
const saveUsersToStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// 사용자 배열 (로컬 스토리지에서 가져옴)
export let Users = getUsersFromStorage();

// 새 사용자를 추가하는 함수
export const addUser = (newUser) => {
    Users.push(newUser);
    saveUsersToStorage(Users);
    console.log('사용자가 추가되었습니다:', newUser);
    console.log('전체 사용자 목록:', Users);
};

// 사용자 배열을 새로고침하는 함수
export const refreshUsers = () => {
    Users = getUsersFromStorage();
    return Users;
};