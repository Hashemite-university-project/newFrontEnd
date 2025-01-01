import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import DashboardLayout from '../DashboadLayouts/DashbordLayout';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProjectInformation = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null); 
  const [projectSkills, setProjectSkills] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/project/projectDetails/${projectId}`, 
          { withCredentials: true }
        );
        const { projectDetails, participants } = response.data;

        setProject(projectDetails);
        setTeamMembers(participants);

        let parsedSkills = projectDetails.required_skills;
        if (typeof parsedSkills === 'string') {
          parsedSkills = parsedSkills.replace(/^"(.+)"$/, '$1'); // Remove wrapping quotes
          parsedSkills = parsedSkills.replace(/'/g, '"'); // Convert to JSON-compatible string
          parsedSkills = JSON.parse(parsedSkills);
        }
        setProjectSkills(parsedSkills);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <p>Loading project details...</p>;
  }
  
  const handleSendRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/project/projectRequest/${projectId}`,{}, { withCredentials: true });
      console.log("API Response:", response.data);
      Swal.fire({
        title: 'Success!',
        text: `${response.data.message}`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send the request.");
    }
  };

  return (
    <DashboardLayout>
      <main className="md:ml-64">
        <div className="space-y-6">
        <div class="bg-gray-100 dark:bg-gray-800 py-2">
            <div class="max-w-6xl px-4 sm:px-6 lg:px-4">
                <div class="flex flex-col md:flex-row -mx-2">
                    <div class="md:flex-1 px-4">
                        <div class="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img class="w-[600px] h-[200px] object-cover" src={project.project_img} alt="ProductImage"/>
                        </div>
                    </div>
                    <div class="md:flex-1 px-4">
                        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{project.project_name}</h2>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.category.category_name}</p>
                    </div>
                </div>
            </div>
        </div>
          {/* Instructor Information */}
          <section>
            <h2 className="text-xl font-semibold dark:text-white mb-4">Instructor Information</h2>
            <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-300">Name</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.instructor.user.user_name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-300">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.instructor.user.user_email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-300">Major</h3>
                  <p className="text-gray-600 dark:text-gray-400">{project.instructor.major}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Project Description and Objectives */}
          <section>
            <h2 className="text-xl font-semibold dark:text-white mb-4">Project Description & Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-300">Project Description</h3>
                <p className="text-gray-600 dark:text-gray-400">{project.project_description}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-300 mb-2">Required Skills</h3>
                <ul className="list-disc list-inside space-y-0 text-gray-600 dark:text-gray-400">
                  {projectSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Project Timeline */}
          <section>
            <h2 className="text-xl font-semibold dark:text-white mb-4">Project Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-300">Start Date</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(project.start_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
                <h3 className="font-medium text-gray-800 dark:text-gray-300">End Date</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(project.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section>
            <h2 className="text-xl font-semibold dark:text-white mb-4">Team Members</h2>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <section class="mb-2 border bg-white p-4 rounded-lg max-w-full">
                <div class="mx-auto">
                    <div class="card md:flex max-w-lg">
                        <div class="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                            <img class="object-cover rounded-full" src="https://tailwindflex.com/public/images/user.png"/>
                        </div>
                        <div class="flex-grow text-center md:text-left">
                            <p class="font-bold">Senior Developer</p>
                            <h3 class="text-xl heading">John Doe</h3>
                            <div class="flex flex-wrap gap-2 mt-2">
                                <span class="bg-gray-200 border px-2 py-1.5 rounded-lg text-xs whitespace-nowrap">
                                    Discrete Math
                                </span>
                                <span class="bg-gray-200 border px-2 py-1.5 rounded-lg text-xs whitespace-nowrap">
                                    Topology
                                </span>
                                <span class="bg-gray-200 border px-2 py-1.5 rounded-lg text-xs whitespace-nowrap">
                                    Neural Nets
                                </span>
                                <span class="bg-gray-200 border px-2 py-1.5 rounded-lg text-xs whitespace-nowrap">
                                    Neural Nets
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              ))}
            </div>
          </section>
          <button
        onClick={handleSendRequest}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        Send Request
      </button>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProjectInformation;
