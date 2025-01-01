import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import ProjectsCards from '../../../components/Projects/ProjectsCards';
import Breadcrumb from '../../../components/Breadcrump';

function EnrolledProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8000/project/student/enrolledProjects', { withCredentials: true });
                setProjects(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <DashboardLayout>
            <main className="p-4 md:ml-64 h-full bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 ">
            <div className="container mx-auto px-4">
                <div className="mb-4">
                    <Breadcrumb pageTitle="Joined Projects" />
                </div>
                {loading && <p className="text-gray-500 dark:text-gray-400">Loading projects...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <ProjectsCards key={project.project_id} project={project} />
                        ))}
                    </div>
                )}
                </div>
            </main>
        </DashboardLayout>
    );
}

export default EnrolledProjects;
