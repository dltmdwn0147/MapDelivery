import React from 'react';

import SidebarStore from '../components/SidebarStore';
import SearchBar from '../components/SearchBar';
import MyPageButton from '../components/MyPageButton';
import FilterButtons from '../components/FilterButtons';

const Sidebar = ({ onStoreSelect, activeFilter, onFilterChange, searchTerm, onSearch, userType, onLoginClick }) => {
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
        }}
        >
            <MyPageButton userType={userType} onLoginClick={onLoginClick} />
            <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
            {userType !== 'guest' && <FilterButtons activeFilter={activeFilter} onFilterChange={onFilterChange} />}
            <SidebarStore onStoreSelect={onStoreSelect} activeFilter={activeFilter} searchTerm={searchTerm} />
        </div>
    );
};

export default Sidebar;