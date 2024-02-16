import React from 'react';

const AdminHeader = () => {
  
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-white font-bold text-xl">Admin Panel</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cron
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
