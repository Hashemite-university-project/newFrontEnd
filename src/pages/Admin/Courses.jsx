import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboadLayouts/DashbordLayout';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrump';

function Courses() {
  // State variables for projects, search, pagination
  const [Courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch projects with search and pagination
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/course/allCourses', {
        params: {
          search: search,
        },
        withCredentials: true,
      });
      setCourses(response.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setCourses(Courses.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Update project
  const updateProject = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, updatedData);
      const updatedProjects = Courses.map((project) =>
        project.id === id ? response.data : project
      );
      setCourses(updatedProjects);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Effect hook to fetch projects when the component is mounted or when pagination/search changes
  useEffect(() => {
    fetchProjects();
  }, [currentPage, search]);

  return (
    <DashboardLayout>
      <main className="p-4 md:ml-64 h-full bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="mb-5">
          <Breadcrumb pageTitle="Courses" />
        </div>

        {/* Search Bar */}
        <div className="my-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by project name"
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Project Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Instructor</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase"># Members</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Category</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">Loading...</td>
                </tr>
              ) : (
                Courses.map((course) => (
                  <tr key={course.course_id}>
                    <td className="py-4 px-6 border-b border-gray-200 break-words">{course.course_name}</td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {course.instructor.user.user_name ? course.instructor.user.user_name : 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {course.rating ? course.rating : 0}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">{course.category.category_name}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {course.is_deleted === false ? (
                        <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Active</span>
                      ) : (
                        <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <button className="text-blue-500">Update</button>
                      <button className="text-red-500 ml-4" onClick={() => deleteProject(course.course_id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center my-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default Courses;
