import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Faq from '../../../components/Faq';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewSubscribedCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/course/coursePage/${courseId}`, {
          withCredentials: true,
        });

        const courseData = response.data;
        setCourse(courseData.course);
        setContent(courseData.content);

        if (courseData.content.length > 0) {
          setCurrentVideo(courseData.content[0]);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast.error('Failed to load course data.');
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!course || !currentVideo) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-600 mt-8">Loading course details...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="p-4 md:ml-64 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto space-y-8">
          {/* Breadcrumb */}
          <div>
            <Link to="/" className="text-indigo-600 hover:underline">
              Home
            </Link>
            {' > '}
            <span className="text-gray-700 dark:text-gray-300">{course.course_name}</span>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-6 shadow-lg rounded-md">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Course Content</h2>
              <ul className="space-y-2">
                {content.map((video) => (
                  <li key={video.video_id}>
                    <button
                      onClick={() => handleVideoClick(video)}
                      className={`w-full text-left py-2 px-4 rounded-md transition ${
                        video.video_id === currentVideo.video_id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {video.video_title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Video and Description */}
            <div className="flex-1 lg:pl-8 mt-8 lg:mt-0">
              {/* Video Player */}
              <div className="relative pb-[56.25%] mb-6" ref={videoRef}>
                {currentVideo.video_url ? (
                  <video
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    controls
                    src={currentVideo.video_url}
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-lg shadow-lg">
                    <p className="text-gray-700">Video not available.</p>
                  </div>
                )}
              </div>

              {/* Video Description */}
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Video Description</h2>
                <div
                  className="text-gray-600 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: currentVideo.video_description || 'No description available.',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs for Additional Information */}
          <Tabs>
            <TabList className="flex space-x-4 border-b border-gray-300">
              <Tab className="py-2 px-4 focus:outline-none">Description</Tab>
              {/* <Tab className="py-2 px-4 focus:outline-none">Curriculum</Tab>
              <Tab className="py-2 px-4 focus:outline-none">FAQ</Tab> */}
            </TabList>

            <TabPanel>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">About This Course</h3>
                <div
                  className="text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: course.course_description,
                  }}
                ></div>
              </div>
            </TabPanel>

          </Tabs>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
      </main>
    </DashboardLayout>
  );
};

export default ViewSubscribedCourse;