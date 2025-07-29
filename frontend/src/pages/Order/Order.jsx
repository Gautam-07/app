import React, { useState } from 'react';
import './Order.css';

const Order = () => {
  const [tab, setTab] = useState('add');

  return (
    <div className="order-admin-container">
      {/* Left Panel - Purple Background */}
      <div className="order-admin-left-panel">
        <div className="order-admin-logo">
          Order Management
        </div>
        <div className="order-admin-amount">
          Dashboard
        </div>
        <div className="order-admin-details">
          <div className="detail-line"></div>
          <div className="detail-line"></div>
          <div className="detail-line"></div>
          <div className="detail-line"></div>
        </div>
      </div>

      {/* Right Panel - White Background */}
      <div className="order-admin-right-panel">
        <h2 className="order-admin-title">Select Management Option</h2>
        <div className="order-admin-tabs">
          <button className={tab === 'add' ? 'active' : ''} onClick={() => setTab('add')}>Add Items</button>
          <button className={tab === 'list' ? 'active' : ''} onClick={() => setTab('list')}>List Items</button>
          <button className={tab === 'manage' ? 'active' : ''} onClick={() => setTab('manage')}>Manage Orders</button>
        </div>
        <div className="order-admin-content">
          {tab === 'add' && <div>Add Items Content</div>}
          {tab === 'list' && <div>List Items Content</div>}
          {tab === 'manage' && <div>Manage Orders Content</div>}
        </div>
      </div>
    </div>
  );
};

export default Order; 