import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // Track the project being edited
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get('http://localhost:8000/category', { withCredentials: true }) // Replace with your API endpoint
      .then((response) => {
        if (response.status === 200) {
          setCategories(response.data); // Assuming response.data is an array of category objects
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [search]);

  const fetchProjects = () => {
    axios.get(`http://localhost:8000/project/instructorProjects?project_name=${search}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setProjects(response.data);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the projects!', error);
        toast.error('Failed to fetch projects.', {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios.put(`http://localhost:8000/project/deleteProject/${projectId}`, {}, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            setProjects((prevProjects) => prevProjects.filter(project => project.project_id !== projectId));
            toast.success('Project deleted successfully!', {
              position: "top-right",
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          console.error('There was an error deleting the project!', error);
          toast.error('Failed to delete project.', {
            position: "top-right",
            autoClose: 5000,
          });
        });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const handleUpdateProject = () => {
    if (selectedProject) {
      axios.put(`http://localhost:8000/project/updateProject/${selectedProject.project_id}`, selectedProject, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            toast.success('Project updated successfully!', {
              position: "top-right",
              autoClose: 3000,
            });
            fetchProjects(); // Refresh project list
            closeEditModal();
          }
        })
        .catch((error) => {
          console.error('There was an error updating the project!', error);
          toast.error('Failed to update project.', {
            position: "top-right",
            autoClose: 5000,
          });
        });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        {/* Search Input */}
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
          <input
            type="text"
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#0d3656] transition duration-200"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* Add Project Button */}
        <NavLink to='/instructor/create/project' className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#152c5a] to-[#1e4d8b] text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:bg-white/20  focus:outline-none focus:ring-2 focus:ring-[#051941] transition duration-200">
          Add Project
        </NavLink>
      </div>

      {/* Projects Table */}
      <div className="overflow-x-auto shadow-lg sm:rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-[#152c5a] to-[#1e4d8b] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Thumbnail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden sm:table-cell">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden sm:table-cell">End Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.project_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  {/* Thumbnail */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={project.project_img}
                      alt={project.project_name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                    />
                  </td>

                  {/* Project Name */}
                  <th className="text-start px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-sm sm:text-base">
                    {project.project_name}
                  </th>

                  {/* Category */}
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300 hidden sm:table-cell text-sm sm:text-base">
                    {project.category.category_name}
                  </td>

                  <td className="px-6 py-4 text-gray-500 dark:text-gray-300 hidden sm:table-cell text-sm sm:text-base">
                    {new Date(project.start_date).toLocaleDateString('en-CA')}
                </td>

                <td className="px-6 py-4 text-gray-500 dark:text-gray-300 hidden sm:table-cell text-sm sm:text-base">
                    {new Date(project.end_date).toLocaleDateString('en-CA')}
                </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="text-blue-600 dark:text-[#152c5a] hover:underline text-sm sm:text-base"
                      onClick={() => openEditModal(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 dark:text-red-500 hover:underline text-sm sm:text-base"
                      onClick={() => handleDeleteProject(project.project_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Project Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedProject.project_name}
                onChange={(e) => setSelectedProject({ ...selectedProject, project_name: e.target.value })}
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedProject.category?.category_name || ''}
                onChange={(e) =>
                setSelectedProject({
                    ...selectedProject,
                    category: {
                    ...selectedProject.category,
                    category_name: e.target.value,
                    },
                })
                }
            >
                <option value="" disabled>
                Select a category
                </option>
                {categories.length > 0 ? (
                categories.map((category) => (
                    <option key={category.id} value={category.category_name}>
                    {category.category_name}
                    </option>
                ))
                ) : (
                <option value="" disabled>
                    Loading categories...
                </option>
                )}
            </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Project Image</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => setSelectedProject({ 
                  ...selectedProject, 
                  category: { ...selectedProject.category.category_name, project_img: e.target.value } 
                })}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleUpdateProject}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsList;
