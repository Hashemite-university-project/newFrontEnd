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
            <main className="p-4 md:ml-64 h-full bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 ">
            <div className="container mx-auto px-4">
                <div className="mb-4">
                    <Breadcrumb pageTitle="Available Projects" />
                </div>
        <div className="mx-auto my-10 grid max-w-screen-xl gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div class="w-80 rounded-lg overflow-hidden shadow-lg flex flex-col">
                <Link to={`/theProjectDetails/${project.project_id}`}></Link>
                <div class="relative"><Link to={`/theProjectDetails/${project.project_id}`}>
                        <img class="w-full h-48 object-cover"
                            src={project.project_img}
                            alt="Sunset in the mountains"/>
                        <div
                            class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>
                    </Link>
                    <a href="#!">
                        <div
                            class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                            {project.category.category_name}
                        </div>
                    </a>
                </div>
                <div class="px-6 py-4 mb-auto">
                    <Link to={`/theProjectDetails/${project.project_id}`}
                        class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{project.project_name}</Link>
                    <p className="text-gray-500 text-sm">
                    {project.project_description.length > 150 
                        ? `${project.project_description.slice(0, 150)}...` 
                        : project.project_description}
                    </p>
                </div>
                <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                    <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <g>
                                <g>
                                    <path
                                        d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                    </path>
                                </g>
                            </g>
                        <span class="ml-1">#participants: {project.participants.length}</span>
                    </span>

                    <Link
                    to={`/theProjectDetails/${project.project_id}`}
                    className="group text-base focus:text-indigo-600 hover:text-indigo-600"
                  >
                    <span className="">View Details</span>
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
