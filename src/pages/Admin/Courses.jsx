import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboadLayouts/DashbordLayout';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrump';

function Courses() {
  const [Courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);  // State to store selected project for update
  const [openPopup, setOpenPopup] = useState(false);  // State to control popup visibility
  const [updatedProjectData, setUpdatedProjectData] = useState({}); // State to hold updated project data
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/category',{ withCredentials: true }); // Adjust URL to your API endpoint
        setCategories(response.data); // Assuming the response contains the list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/course/allCourses', {
        params: {
          search: search,
          page: currentPage,
        },
        withCredentials: true,
      });
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.put(`http://localhost:8000/project/deleteProject/${id}`, { withCredentials: true });
      setCourses(Courses.filter((course) => course.course_id !== id));
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const updateProject = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/project/instructor/update/${selectedProject.course_id}`, updatedProjectData, {
        withCredentials: true,
      });
      setCourses(
        Courses.map((course) =>
          course.course_id === selectedProject.course_id ? response.data : course
        )
      );
      fetchProjects();
      setOpenPopup(false); // Close the popup after updating
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenPopup = (course) => {
    setSelectedProject(course);
    setUpdatedProjectData({ ...course }); // Pre-fill the popup form with the current project data
    setOpenPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Rating</th>
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
                    <td className="py-4 px-6 border-b border-gray-200 break-words">
                      {course.course_name?.length > 25 ? `${course.course_name.slice(0, 25)}...` : course.course_name}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {course.instructor ? course.instructor.user.user_name : 'N/A'}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 truncate">
                      {course.rating ? course.rating : 0}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">{course.category && course.category.category_name}</td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      {new Date(course.is_deleted) ? (
                        <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">Active</span>
                      ) : (
                        <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">Inactive</span>
                      )}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200">
                      <button
                        className="text-blue-500"
                        onClick={() => handleOpenPopup(course)}
                      >
                        Update
                      </button>
                      <button
                        className={`ml-4 ${course.is_deleted ? 'text-green-500' : 'text-red-500'}`}
                        onClick={() => deleteProject(course.project_id)}
                        >
                        {course.is_deleted ? 'Restore' : 'Delete'}
                    </button>
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

      {/* Popup for Update */}
      {openPopup && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Course</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateProject();
            }}>
              <div className="mb-4">
                <label htmlFor="project_name" className="block text-gray-700">Project Name</label>
                <input
                  type="text"
                  id="project_name"
                  name="project_name"
                  value={updatedProjectData.project_name || ''}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="project_description" className="block text-gray-700">project description</label>
                <input
                  type="text"
                  id="project_description"
                  name="project_description"
                  value={updatedProjectData.project_description || ''}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="project_category" className="block text-gray-700">Category</label>
                <select
                    id="project_category"
                    name="project_category"
                    value={updatedProjectData.project_category || ''}
                    onChange={handleInputChange}
                    className="px-4 py-2 w-full border rounded-md"
                >
                <option value="">Select a Category</option>
                {loading ? (
                    <option>Loading...</option>
                ) : (
                    categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                    </option>
                    ))
                )}
                </select>
            </div>
              <div className="mb-4">
                <label htmlFor="start_date" className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={updatedProjectData.start_date || ''}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="end_date" className="block text-gray-700">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={updatedProjectData.end_date || ''}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setOpenPopup(false)}
                className="ml-4 text-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Courses;
