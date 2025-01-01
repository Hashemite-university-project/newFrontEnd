import React, { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router';
import axios from 'axios';

function HomeProjectDetails() {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectNumber, setProjectNumber] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/project/homeProjectDetails/${id}`);
            setProjectDetails(response.data.project);
            setProjectNumber(response.data.number);
            let parsedSkills = response.data.project.required_skills;
                if (typeof parsedSkills === 'string') {
                    parsedSkills = parsedSkills.replace(/^"(.+)"$/, '$1');
                    parsedSkills = parsedSkills.replace(/'/g, '"');
                    console.log('Cleaned parsedSkills:', parsedSkills);
                    parsedSkills = JSON.parse(parsedSkills);
                }
                if (Array.isArray(parsedSkills)) {
                    setSkills(parsedSkills);
                } else {
                    console.error('Parsed skills is not an array:', parsedSkills);
                }
          } catch (err) {
            console.log(err);
            setError('Failed to fetch project details');
          } finally {
            setLoading(false);
          }
        };
        fetchProjectDetails();
      }, [id]);
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;

    return (
        <>
            <NavBar />
            <main>
                <article>
                    <header class="mx-auto max-w-screen-xl pt-28 text-center">
                    <p class="text-gray-500">{projectDetails.end_date}</p>
                    <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">{projectDetails.project_name}</h1>
                    <p class="mt-6 text-lg text-gray-700">Category - {projectDetails.category.category_name}</p>
                    <div class="mt-6 flex flex-wrap justify-center gap-2" aria-label="Tags">
                    {skills && skills.map((skill, index) => (
                            <span 
                                key={index} 
                                className="rounded-lg bg-gray-100 px-2 py-1 font-medium text-gray-600 hover:bg-gray-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                    <img class="sm:h-[34rem] mt-10 w-full object-contain" src={projectDetails.project_img} alt="FeaturedImage" />
                    </header>
                    <div class="mx-auto mt-10 max-w-screen-md space-y-12 px-4 py-10 text-lg tracking-wide text-gray-700">
                    {/* <strong class="text-2xl font-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime impedit ex consequatur nostrum cupiditate at sequi? Ipsam commodi modi officia mollitia doloribus tenetur consectetur quae?</strong> */}
                    <p>{projectDetails.project_description}</p><br />
                    <span>Instructor: {projectDetails.instructor.major}-{projectDetails.instructor.user.user_name}</span><br />
                    <span>Number of participants  - {projectNumber}</span>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}

export default HomeProjectDetails;
