import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchTerm: externalSearchTerm }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // 외부에서 검색어가 초기화되면 내부 상태도 초기화
    React.useEffect(() => {
        if (externalSearchTerm === '') {
            setSearchTerm('');
        }
    }, [externalSearchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // 실시간 검색을 위해 입력할 때마다 검색 실행
    };

    return (
        <form className="search" onSubmit={handleSearch}>
            <input 
                type="text" 
                className="search__input" 
                placeholder="가게 이름을 검색하세요..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button type="submit" className="search__button">
            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                </g>
            </svg>
            </button>
        </form>
    );
}

export default SearchBar;