import React from 'react';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px',
            justifyContent: 'center',
            marginTop: '10px'
        }}>
            <button
                onClick={() => onFilterChange('전체')}
                style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    backgroundColor: activeFilter === '전체' ? '#007bff' : 'white',
                    color: activeFilter === '전체' ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                }}
            >
                전체
            </button>
            <button
                onClick={() => onFilterChange('카페')}
                style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    backgroundColor: activeFilter === '카페' ? '#007bff' : 'white',
                    color: activeFilter === '카페' ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                }}
            >
                카페
            </button>
            <button
                onClick={() => onFilterChange('음식점')}
                style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    backgroundColor: activeFilter === '음식점' ? '#007bff' : 'white',
                    color: activeFilter === '음식점' ? 'white' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                }}
            >
                음식점
            </button>
        </div>
    );
};

export default FilterButtons; 