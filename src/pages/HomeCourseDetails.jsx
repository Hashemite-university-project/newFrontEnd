import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

function HomeCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState(null);
  const [enrollments, setEnrollments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/course/coursePage/${id}`);
        setCourse(response.data.course);
        setContent(response.data.content);
        setEnrollments(response.data.enrollments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div class="w-screen h-screen overflow-hidden pt-24 pb-20 mb-20">
            <div class="mx-auto max-w-screen-lg px-3 py-10">
            <div class="space-y-3">
                <h5 class="text-sm font-medium uppercase text-gray-400">{course.category.category_name}</h5>
                <h1 class="text-3xl font-semibold">{course.course_name}</h1>
                <p class="">{course.course_description}</p>
                <ul class="flex gap-4">
                <li class="flex items-center">
                    <span class="mr-1.5 rounded bg-gray-900 px-2 text-sm font-semibold text-white">{course.rating}</span>
                    <div class="flex items-center justify-center">
                    <div className="flex">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1; 
                            if (ratingValue <= Math.floor(course.rating)) {
                            return (
                                <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-orange-400"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            );
                            }
                            if (ratingValue - course.rating < 1 && ratingValue - course.rating > 0) {
                            return (
                                <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-orange-300"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            );
                            }
                            return (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5 text-gray-400"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            );
                        })}
                    </div>
                    </div>
                </li>
                <li class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {`${enrollments}`} Enrolled
                </li>
                </ul>
                <ul class="sm:flex items-center text-sm text-gray-500">
                <li>Created by <span class="font-bold"> {course.instructor.user.user_name} </span></li>
                <span class="hidden sm:inline mx-3 text-2xl">·</span>
                <li>Last updated {new Date(course.updatedAt).toLocaleDateString()}</li>
                </ul>
            </div>
            <div class="mt-10 bg-white py-2">
                <nav class="flex flex-wrap gap-4">
                <span class="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-600 py-2 px-3 text-sm font-semibold text-blue-600 transition-all duration-200 ease-in-out"> course details </span>
                </nav>
            </div>
            <ul class="mt-2 space-y-4 mb-24">
                <li class="text-left">
                <label for="accordion-1" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
                    <input class="peer hidden" type="checkbox" id="accordion-1" />
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-2">
                    <h3 class="text-base font-bold text-gray-600 lg:text-base">all sections</h3>
                    </div>
                    <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
                        <ul class="space-y-1 font-semibold text-gray-600 mb-6">
                        {content.map((content) => (
                            <li class="flex px-2 sm:px-6 py-2.5 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mr-2 w-6">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                                </svg>
                                {content.video_title}
                            </li>
                        ))}
                        </ul>
                    </div>
                </label>
                </li>
            </ul>
            </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default HomeCourseDetails;
