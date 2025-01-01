import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Utility function to format dates
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function InstructorsList() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for View Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(null);

  // Fetch instructors on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  // Function to fetch instructors from the API
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/user/users/2', {
        withCredentials: true, // Include credentials if needed
      });
      if (response.status === 200) {
        setInstructors(response.data);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
      toast.error('Failed to fetch instructors.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting an instructor
  const handleDeleteInstructor = async (instructorId) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this instructor?'
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/user/users/${instructorId}`,
        { withCredentials: true } // Include credentials if needed
      );
      if (response.status === 200 || response.status === 204) {
        toast.success('Instructor deleted successfully!', {
          position: 'top-right',
          autoClose: 5000,
        });
        // Remove the deleted instructor from the state
        setInstructors(
          instructors.filter(
            (instructor) => instructor.instructor_id !== instructorId
          )
        );
      }
    } catch (error) {
      console.error('Error deleting instructor:', error);
      toast.error('Failed to delete instructor.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  // Function to open view modal with selected instructor
  const openViewModal = (instructor) => {
    setCurrentInstructor(instructor);
    setIsViewModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Instructors</h1>

      {/* Instructors Table */}
      {loading ? (
        <p>Loading instructors...</p>
      ) : instructors.length === 0 ? (
        <p>No instructors available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone Number</th>
                <th className="py-2 px-4 border-b">Major</th>
                {/* <th className="py-2 px-4 border-b">Skills</th> */}
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.instructor_id} className="text-center">
                  <td className="py-2 px-4 border-b">{instructor.instructor_id}</td>
                  <td className="py-2 px-4 border-b">
                    {instructor.user.user_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {instructor.user.user_email}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {instructor.user.phone_number || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {instructor.major || 'N/A'}
                  </td>
                  {/* <td className="py-2 px-4 border-b">
                    {instructor.skills || 'N/A'}
                  </td> */}
                  <td className="py-2 px-4 border-b">
                    {formatDate(instructor.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openViewModal(instructor)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteInstructor(instructor.instructor_id)
                      }
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

      {/* View Instructor Modal */}
      {isViewModalOpen && currentInstructor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Instructor Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {currentInstructor.instructor_id}
              </p>
              <p>
                <strong>Name:</strong> {currentInstructor.user.user_name}
              </p>
              <p>
                <strong>Email:</strong> {currentInstructor.user.user_email}
              </p>
              <p>
                <strong>Phone Number:</strong>{' '}
                {currentInstructor.user.phone_number || 'N/A'}
              </p>
              <p>
                <strong>Major:</strong> {currentInstructor.major || 'N/A'}
              </p>
              <p>
                <strong>Skills:</strong> {currentInstructor.skills || 'N/A'}
              </p>
              <p>
                <strong>About Me:</strong>{' '}
                {currentInstructor.about_me || 'N/A'}
              </p>
              <p>
                <strong>Links:</strong>{' '}
                {currentInstructor.links || 'N/A'}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {formatDate(currentInstructor.createdAt)}
              </p>
              <p>
                <strong>Updated At:</strong>{' '}
                {formatDate(currentInstructor.updatedAt)}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorsList;