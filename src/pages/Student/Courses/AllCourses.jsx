// src/components/Student/Courses/AllCourses.jsx

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import CourseSidebar from './CourseSidebar';
import Breadcrumb from '../../../components/Breadcrump/';
import AllCoursesCards from '../../../components/Student/Courses/AllCoursesCards';
import axios from 'axios';

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setcategory] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  // Function to fetch courses from the API
  const fetchCourses = async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/course/allCourses', {
        params: { course_name: search },
        withCredentials: true, // Include credentials if needed
      });

      // Map the API response to match the structure expected by AllCoursesCards
      const fetchedCourses = response.data.map((course) => ({
        id: course.course_id,
        image: course.course_img, // Assuming this is a full URL
        bannerImg: course.bannerImg || 'course-banner3.jpg', // Fallback if not provided
        name: course.category?.category_name || 'Unknown',
        author: course.instructor?.user?.user_name || 'Unknown',
        authorImg: 'author.png', // Update if API provides this
        lesson: course.lesson || '0',
        enrolled: course.enrolled || '0',
        price: course.price || '$0.00',
        regularPrice: course.regularPrice || '$0.00',
        duration: course.duration || 'N/A',
        type: course.type || 'Beginner',
        language: course.language || 'English',
        review: course.rating || '0.0',
        title: course.course_name || 'Untitled Course',
      }));

      setCourses(fetchedCourses);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (err) {
      console.error(err);
      setError('Failed to fetch courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount and when searchTerm changes
  useEffect(() => {
    fetchCourses(searchTerm);
  }, [searchTerm]);

  // Handle search from the sidebar
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Calculate total pages
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Scroll to top on page change
  };

  // Generate page numbers for pagination (up to 8)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 8;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxPageNumbers) {
      const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbers / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbers / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageNumbers;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageNumbers + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <DashboardLayout>
      <main className="p-4 md:ml-64 h-full bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 ">
          <div className="react-wrapper-inner">
            <div className="container mx-auto px-4">
              <div className='mb-4'>
                <Breadcrumb pageTitle="Available Courses" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Course List Section */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loading && <p>Loading courses...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && currentCourses.length === 0 && <p>No courses found.</p>}
                  {!loading && !error && currentCourses.map((data) => (
                    <AllCoursesCards
                      key={data.id}
                      courseID={data.id}
                      courseImg={data.image}
                      courseTitle={data.title}
                      courseAuthor={data.author}
                      courseType={data.type}
                      courseLesson={data.lesson}
                      courseDuration={data.duration}
                      courseReview={data.review}
                    />
                  ))}
                </div>

                {/* Sidebar */}
                <CourseSidebar onSearch={handleSearch} />

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2 col-span-1 lg:col-span-3">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border border-gray-300 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  >
                    Previous
                  </button>
                  {getPageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 border border-gray-300 rounded ${currentPage === number ? 'bg-[#152c5a] text-white' : 'hover:bg-gray-100'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border border-gray-300 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 flex items-center'}`}
                  >
                    Next
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
      </main>
    </DashboardLayout>
  );
}

export default AllCourses;