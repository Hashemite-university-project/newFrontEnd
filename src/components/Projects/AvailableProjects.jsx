import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboadLayouts/DashbordLayout';
import Breadcrumb from '../Breadcrump';

function AvailableProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/project/allProjects/${'a'}`, { withCredentials: true });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <main className="p-4 md:ml-64 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Breadcrumb pageTitle="Available Projects" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.project_id}
                className="bg-white shadow-md flex flex-col h-full transform transition-transform duration-500"
                style={{
                  perspective: '1000px',
                  animation: `cardEntry 0.8s ease-out ${index * 0.2}s both`,
                }}
              >
                <Link to={`/theProjectDetails/${project.project_id}`} className="relative group">
                  <img
                    className="w-full h-48 object-cover"
                    src={project.project_img}
                    alt={project.project_name}
                  />
                  <div className="absolute inset-0 bg-gray-900 opacity-25 group-hover:opacity-40 transition"></div>
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-4 py-2">
                    {project.category.category_name}
                  </span>
                </Link>
                <div className="p-4 flex-1">
                  <Link
                    to={`/theProjectDetails/${project.project_id}`}
                    className="block text-lg font-semibold text-gray-800 hover:text-indigo-600 transition"
                  >
                    {project.project_name}
                  </Link>
                  <p className="text-gray-500 text-sm mt-2">
                    {project.project_description.length > 150
                      ? `${project.project_description.slice(0, 150)}...`
                      : project.project_description}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    #participants: {project.participants.length}
                  </span>
                  <Link
                    to={`/theProjectDetails/${project.project_id}`}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default AvailableProjects;