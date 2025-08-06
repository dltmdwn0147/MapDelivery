import React, { useState, useEffect } from 'react';
import { refreshUsers } from '../Users';
import './UserList.css';

const UserList = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const currentUsers = refreshUsers();
      setUsers(currentUsers);
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container user-list-container">
        <div className="modal-header">
          <h2>등록된 사용자 목록</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="user-list-content">
          {users.length === 0 ? (
            <p className="no-users">등록된 사용자가 없습니다.</p>
          ) : (
            <div className="user-list">
              {users.map((user, index) => (
                <div key={user.user_id} className="user-item">
                  <div className="user-number">#{index + 1}</div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-address">{user.address}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="user-count">
            총 {users.length}명의 사용자가 등록되어 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList; 