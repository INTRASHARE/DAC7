import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllUsers } from '@/utils/ApiRoutes';

const AdminContainer = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const {
        data: { users },
      } = await axios.get(getAllUsers);

      setUsers(users);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdate = async (eId) => {
    try {
      // Implement update functionality here
      console.log(`Update user with ID ${eId}`);
  
      // Call the update user API endpoint
      await axios.put(`/updateUser/:id${eId}`, {
        name: 'Satyam Nandanwar',
        email: 'nandanwar.satyam24@gmail.com'
      });
  
      // After successful update, fetch users again to update the UI
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  const handleDelete = async (eId) => {
    try {
      // Implement delete functionality here
      console.log(`Delete user with ID ${eId}`);
  
      // Call the delete user API endpoint
      await axios.delete(`deleteUser/${eId}`);
  
      // After successful deletion, fetch users again to update the UI
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <table className="min-w-full">
        <thead>
          <tr >
            <th>ID</th>
            <th className="text-left px-2">Name</th>
            <th className="text-left px-2">Email</th>
            <th className="text-center px-2">Actions</th>
          </tr>
        </thead>
        <tbody>

          {users.map(user => (
            <tr key={user.eId} className="border-b py-2">
              <td className="text-left px-2">{user.eId}</td>
              <td className="text-left px-2">{user.name}</td>
              <td className="text-left px-2">{user.email}</td>
              <td className="text-center">
                <button
                  onClick={() => handleUpdate(user.eId)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user.eId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContainer;
