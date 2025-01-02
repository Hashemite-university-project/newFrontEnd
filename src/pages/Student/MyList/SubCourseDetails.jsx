// src/pages/Student/Courses/CourseDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrump'; // Ensure the path is correct
import ViewCourse from './ViewCourse'; // Renamed for clarity
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import axios from 'axios';

const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from URL parameters

  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]); // State for section videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const testData = [
    {
      video_id: 2,
      video_title: "title 1",
      video_url: null,
      video_description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      course_id: 2,
      is_deleted: false,
      createdAt: "2024-11-16T19:24:56.000Z",
      updatedAt: "2024-11-16T19:24:56.000Z"
    },
    {
      video_id: 3,
      video_title: "title 2",
      video_url: null,
      video_description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      course_id: 2,
      is_deleted: false,
      createdAt: "2024-11-16T19:24:58.000Z",
      updatedAt: "2024-11-16T19:24:58.000Z"
    },
    {
      video_id: 4,
      video_title: "title 3",
      video_url: null,
      video_description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      course_id: 2,
      is_deleted: false,
      createdAt: "2024-11-16T19:24:58.000Z",
      updatedAt: "2024-11-16T19:24:58.000Z"
    },
    {
      video_id: 5,
      video_title: "title 4",
      video_url: null,
      video_description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      course_id: 2,
      is_deleted: false,
      createdAt: "2024-11-16T19:24:59.000Z",
      updatedAt: "2024-11-16T19:24:59.000Z"
    },
    {
      video_id: 6,
      video_title: "title 5",
      video_url: null,
      video_description: "lorem lorem lorem lorem lorem lorem lorem lorem",
      course_id: 2,
      is_deleted: false,
      createdAt: "2024-11-16T19:25:00.000Z",
      updatedAt: "2024-11-16T19:25:00.000Z"
    }
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`http://localhost:8000/course/coursePage/${courseId}`, {
          withCredentials: true,
        });

        // Ensure the API response contains the necessary data
        if (courseResponse.data && courseResponse.data.course) {
          setCourse(courseResponse.data.course);
        } else {
          throw new Error('Invalid course data');
        }

        // Fetch section videos
        const contentResponse = await axios.get(`http://localhost:8000/course/courseDetails/${courseId}`, {
          withCredentials: true,
        });

        // If the response is a single object, wrap it in an array
        const fetchedContent = Array.isArray(contentResponse.data)
          ? contentResponse.data
          : [contentResponse.data];
        setContent(fetchedContent);

        // Fetch related courses based on category

      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center">Loading...</h2>
        </div>
      </DashboardLayout>
    );
  }


  if (error || !course) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center">Course not found</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="p-4 md:ml-64 h-full pt-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <Breadcrumb pageTitle={course.course_name} />
        {content.length === 0 ? (
            <div>There is no Content</div>
        ) : (
            <ViewCourse
            course={course}
            content={content}
            allCourses={relatedCourses}
            />
        )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CourseDetails;