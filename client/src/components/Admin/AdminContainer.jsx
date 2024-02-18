import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllUsers, deleteUserRoute, updateUserRoute } from '@/utils/ApiRoutes';

const AdminContainer = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({ eId: '', name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(getAllUsers);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  console.log("users", users);

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleUpdate = async () => {
    try {
      // Call the update user API endpoint
      await axios.put(`${updateUserRoute}/${editedUser.eId}`, {
        name: editedUser.name,
        email: editedUser.email
      });

      // Update the user object in the state
      setUsers(prevUsers => prevUsers.map(user => {
        if (user.eId === editedUser.eId) {
          return editedUser;
        }
        return user;
      }));
      
      // Clear the editedUser state
      setEditedUser({ eId: '', name: '', email: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (eId) => {
    try {
      // Call the delete user API endpoint
      await axios.delete(`${deleteUserRoute}/${eId}`);

      // Remove the deleted user from the state
      setUsers(prevUsers => prevUsers.filter(user => user.eId !== eId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(247, 239, 224)', marginTop: '0rem' }} className="container mx-auto  pr-2 mt-8 text-gray-800 "> {/* Changed text color */}

      <table className="min-w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th className="text-left px-2">Name</th>
            <th className="text-left px-2">Email</th>
            <th className="text-center px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.eId} className="border-b py-2">
              <td className="text-center px-2">{user.eId}</td>
              <td className="text-left px-2">
                {editedUser.eId === user.eId ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      padding: '8px 12px',
                      fontSize: '16px',
                      backgroundColor: 'rgba(255, 255, 400, 0.5)', // 50% transparent white
                      color: '#000',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'border-color 0.3s ease',
                      width: '100%',
                      boxSizing: 'border-box'
                    }} // Apply the style here
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="text-left px-2">
                {editedUser.eId === user.eId ? (
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      padding: '8px 12px',
                      fontSize: '16px',
                      backgroundColor: 'rgba(255, 255, 400, 0.5)', // 50% transparent white
                      color: '#000',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'border-color 0.3s ease',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="text-center">
                {editedUser.eId === user.eId ? (
                  <button
                    onClick={() => handleUpdate()}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user.eId)}
                  style={{ backgroundColor: '#d96f32', transition: 'background-color 0.3s ease' }}
                  className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-orange-600"
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
