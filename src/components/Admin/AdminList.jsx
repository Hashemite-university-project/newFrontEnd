import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Utility function to format dates
const formatDate = (date) => {
  if (!date) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for View Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  // State for Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // State for Create Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    user_name: '',
    user_email: '',
    phone_number: '',
    department: '',
    password: '',
  });

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Function to fetch admins from the API
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/user/users/3', {
        withCredentials: true, // Include credentials if needed
      });
      if (response.status === 200) {
        setAdmins(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch admins.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle creating a new admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    const { user_name, user_email, phone_number, department, password } = newAdmin;

    // Basic validation
    if (
      !user_name.trim() ||
      !user_email.trim() ||
      !phone_number.trim() ||
      !department.trim() ||
      !password.trim()
    ) {
      toast.error('All fields are required.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      toast.error('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 5000,
      });
      return;
    }

    // Prepare data for API
    const adminData = {
      user_name: user_name.trim(),
      user_email: user_email.trim(),
      phone_number: phone_number.trim(),
      department: department.trim(),
      password: password.trim(),
      role: 2, // Assuming role 2 is for admins
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/user/admin/createAccount',
        adminData,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Admin created successfully!', {
          position: 'top-right',
          autoClose: 5000,
        });
        setIsCreateModalOpen(false);
        setNewAdmin({
          user_name: '',
          user_email: '',
          phone_number: '',
          department: '',
          password: '',
        });
        fetchAdmins(); // Refresh admin list
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to create admin.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  // Function to handle deleting an admin
  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/user/admins/${adminToDelete.user_id}`,
        { withCredentials: true } // Include credentials if needed
      );
      if (response.status === 200 || response.status === 204) {
        toast.success('Admin deleted successfully!', {
          position: 'top-right',
          autoClose: 5000,
        });
        // Remove the deleted admin from the state
        setAdmins(
          admins.filter((admin) => admin.user_id !== adminToDelete.user_id)
        );
        setIsDeleteModalOpen(false);
        setAdminToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to delete admin.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
    }
  };

  // Function to open view modal with selected admin
  const openViewModal = (admin) => {
    setCurrentAdmin(admin);
    setIsViewModalOpen(true);
  };

  // Function to open delete confirmation modal
  const openDeleteModal = (admin) => {
    setAdminToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin</h1>

      {/* Create Admin Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-gradient-to-r from-[#152c5a] to-[#1e4d8b] text-white rounded hover:bg-[#152c4a]"
      >
        Create New Admin
      </button>

      {/* Admin Table */}
      {loading ? (
        <p>Loading admins...</p>
      ) : admins.length === 0 ? (
        <p>No admins available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.user_id} className="text-center">
                  <td className="py-2 px-4 border-b">{admin.user_id}</td>
                  <td className="py-2 px-4 border-b">{admin.user.user_name}</td>
                  <td className="py-2 px-4 border-b">{admin.user.user_email}</td>
                  <td className="py-2 px-4 border-b">
                    {admin.user.phone_number || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {admin.department || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(admin.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openViewModal(admin)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openDeleteModal(admin)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Admin Modal */}
      {isViewModalOpen && currentAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 overflow-y-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4">Admin Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {currentAdmin.user_id}
              </p>
              <p>
                <strong>Name:</strong> {currentAdmin.user.user_name}
              </p>
              <p>
                <strong>Email:</strong> {currentAdmin.user.user_email}
              </p>
              <p>
                <strong>Phone Number:</strong>{' '}
                {currentAdmin.user.phone_number || 'N/A'}
              </p>
              <p>
                <strong>Department:</strong> {currentAdmin.department || 'N/A'}
              </p>
              <p>
                <strong>Created At:</strong> {formatDate(currentAdmin.createdAt)}
              </p>
              <p>
                <strong>Updated At:</strong> {formatDate(currentAdmin.updatedAt)}
              </p>
              {/* Add more fields as necessary */}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-[#152c5a] rounded hover:bg-[#152c4a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && adminToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{' '}
              <strong>{adminToDelete.user.user_name}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAdmin}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 p-8 transition-transform transform">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create New Admin</h2>
          <form onSubmit={handleCreateAdmin}>
            <div className="mb-1">
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newAdmin.user_name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, user_name: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newAdmin.user_email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, user_email: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                value={newAdmin.phone_number}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, phone_number: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block text-lg font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={newAdmin.department}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, department: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="mb-1">
              <label className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-5 py-3 mr-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-[#152c5a] to-[#1e4d8b] text-white font-semibold rounded-lg shadow-md hover:bg-[#152c5a] focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default AdminList;