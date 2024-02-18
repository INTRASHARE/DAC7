import React from 'react';

const AdminHeader = () => {
  return (
    <header style={{ backgroundColor: 'rgb(72, 87, 120)' }} className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-white font-bold text-3xl">Admin Panel</h1>

        <button 
          style={{ 
            backgroundColor: 'rgb(47, 55, 68)',
            transition: 'background-color 0.3s ease',
          }}
          className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          // Applying hover effect inline
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgb(68, 78, 93)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgb(47, 55, 68)'}
        >
          Cron
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;