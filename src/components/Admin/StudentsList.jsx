import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Utility function to format dates
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for View Modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // State for Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Function to fetch students from the API
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/user/users/1', {
        withCredentials: true, // Include credentials if needed
      });
      if (response.status === 200) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch students.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a student
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8000/user/users/${studentToDelete.user_id}`,
        { withCredentials: true } // Include credentials if needed
      );
      if (response.status === 200 || response.status === 204) {
        toast.success('Student deleted successfully!', {
          position: 'top-right',
          autoClose: 5000,
        });
        // Remove the deleted student from the state
        setStudents(
          students.filter(
            (student) => student.user_id !== studentToDelete.user_id
          )
        );
        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to delete student.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
      });
      setIsDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Function to open view modal with selected student
  const openViewModal = (student) => {
    setCurrentStudent(student);
    setIsViewModalOpen(true);
  };

  // Function to open delete confirmation modal
  const openDeleteModal = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      {/* Students Table */}
      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students available.</p>
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
                <th className="py-2 px-4 border-b">Skills</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.user_id} className="text-center">
                  <td className="py-2 px-4 border-b">{student.user_id}</td>
                  <td className="py-2 px-4 border-b">
                    {student.user.user_name}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.user.user_email}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.user.phone_number || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.major || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.skills || 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(student.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openViewModal(student)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
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

      {/* View Student Modal */}
      {isViewModalOpen && currentStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6 overflow-y-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {currentStudent.user_id}
              </p>
              <p>
                <strong>Name:</strong> {currentStudent.user.user_name}
              </p>
              <p>
                <strong>Email:</strong> {currentStudent.user.user_email}
              </p>
              <p>
                <strong>Phone Number:</strong>{' '}
                {currentStudent.user.phone_number || 'N/A'}
              </p>
              <p>
                <strong>Major:</strong> {currentStudent.major || 'N/A'}
              </p>
              <p>
                <strong>Skills:</strong> {currentStudent.skills || 'N/A'}
              </p>
              <p>
                <strong>University Name:</strong>{' '}
                {currentStudent.university_name || 'N/A'}
              </p>
              <p>
                <strong>Enrolled Courses:</strong>{' '}
                {currentStudent.enrolled_courses || 'N/A'}
              </p>
              <p>
                <strong>Joined Projects:</strong>{' '}
                {currentStudent.joined_projects || 'N/A'}
              </p>
              <p>
                <strong>About Me:</strong>{' '}
                {currentStudent.about_me || 'N/A'}
              </p>
              <p>
                <strong>User CV:</strong>{' '}
                {currentStudent.user_cv ? (
                  <a
                    href={currentStudent.user_cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View CV
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
              <p>
                <strong>Created At:</strong>{' '}
                {formatDate(currentStudent.createdAt)}
              </p>
              <p>
                <strong>Updated At:</strong>{' '}
                {formatDate(currentStudent.updatedAt)}
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && studentToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete{' '}
              <strong>{studentToDelete.user.user_name}</strong>?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsList;