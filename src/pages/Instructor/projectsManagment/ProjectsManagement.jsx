import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrump';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/project/instructorWorkSpace', { withCredentials: true });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <main className=" md:ml-64 h-full  bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="mt-[20px]">
            <Breadcrumb pageTitle="Projects WorkSpace" />
        </div>
        <div className="flex flex-wrap justify-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="mx-2 my-10 rounded-xl border bg-white px-4 shadow-md sm:mx-auto sm:max-w-xl sm:px-8"
            >
              <div className="mb-2 flex flex-col gap-y-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <img
                    className="h-14 w-14 rounded-full object-cover"
                    src={project.image || 'default_image_url'} 
                    alt={project.name}
                  />
                  <div className="ml-4 w-56">
                    <p className="text-slate-800 text-lg font-bold">
                      {project.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-2 flex justify-between border-b py-8 text-sm sm:text-base">
                <div className="flex flex-col items-center">
                  <p className="text-slate-700 mb-1 text-xl font-semibold">
                    {project.completedTasks}
                  </p>
                  <p className="text-slate-500 text-sm font-medium">
                    Completed Tasks
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-slate-700 mb-1 text-xl font-semibold">
                    {project.totalTasks}
                  </p>
                  <p className="text-slate-500 text-sm font-medium">
                    Total Tasks
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-slate-700 mb-1 text-xl font-semibold">
                    {project.participantsCount}
                  </p>
                  <p className="text-slate-500 text-sm font-medium">Students</p>
                </div>
              </div>
              <div className="flex justify-between py-8">
                <button className="text-slate-500 hover:bg-slate-100 rounded-lg border-2 px-4 py-2 font-medium focus:outline-none focus:ring text-sm">
                  Requests
                </button>
                <Link className="rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700 text-sm"
                    to={`/instructor/project/workSpace/${project.id}`}
                >
                  Work Space
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}

export default ProjectManagement;
