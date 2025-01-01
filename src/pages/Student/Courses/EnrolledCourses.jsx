import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrump';
import EnrolledCoursesCards from '../../../components/Student/Courses/EnrolledCoursesCards';

function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [UnSubcourses, setUnSubCourses] = useState([]);
  const [UnSubloading, setUnSubLoading] = useState(true);
  const [UnSuberror, setUnSubError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Loading state for checkout

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/course/enrollmentCourses', {
          withCredentials: true, // Include cookies
        });
        console.log(response.data); // Debugging: Check the structure of the response
        setCourses(Array.isArray(response.data) ? response.data : []); // Ensure courses is an array
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUnSubCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/course/getUnSubCourses', {
          withCredentials: true, // Include cookies
        });
        console.log(response.data); // Debugging: Check the structure of the response
        setUnSubCourses(Array.isArray(response.data) ? response.data : []); // Ensure courses is an array
        setUnSubLoading(false);
      } catch (err) {
        console.error(err);
        setUnSubError('Failed to fetch UnSub courses.');
        setUnSubLoading(false);
      }
    };

    fetchUnSubCourses();
  }, []);

  const handleCheckout = async () => {
    setCheckoutLoading(true); // Start loading state for checkout
    try {
      const response = await axios.post('http://localhost:8000/create-checkout-session',{}, {
        withCredentials: true,
      });
      if (response.data && response.data.url) {
        // Redirect to the Stripe checkout URL
        window.location.href = response.data.url;
      } else {
        throw new Error('Checkout session URL not found');
      }
    } catch (err) {
      console.error('Failed to create checkout session:', err);
      alert('Failed to initiate checkout. Please try again.');
    } finally {
      setCheckoutLoading(false); // Stop loading state if there's an error
    }
  };

//   if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <DashboardLayout>
            <main className="p-4 md:ml-64 h-full bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300 ">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Breadcrumb pageTitle="Enrolled Courses" />
          </div>

          {courses.length === 0 ? (
            <div className="text-center text-gray-500">No enrolled courses found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <EnrolledCoursesCards
                  key={index}
                  courseID={course.course_id}
                  courseImg={course.course_img || 'default-course-image.png'} // Provide a default image
                  courseTitle={course.course_name}
                  courseAuthor={course.instructor?.user?.user_name || 'Unknown Author'}
                  courseType="Beginner"
                  courseLesson="5 Lessons"
                  courseDuration="3 Weeks"
                  courseReview={course.rating || '0.0'}
                />
              ))}
            </div>
          )}

          <div className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden transition-transform">
            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">Check alert!</span> You need to check out to view these courses. Please complete your checkout process to access the content.
            </div>

            {UnSubcourses.length === 0 ? (
              <div className="text-center text-gray-500">No unsubscribed courses found.</div>
            ) : (
              <div className="grid m-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {UnSubcourses.map((course, index) => (
                  <EnrolledCoursesCards
                    key={index}
                    border={true}
                    courseID={course.course.course_id}
                    courseImg={course.course.course_img || 'default-course-image.png'}
                    courseTitle={course.course.course_name}
                    courseAuthor={course.course.instructor?.user?.user_name || 'Unknown Author'}
                    courseType="Beginner"
                    courseLesson="5 Lessons"
                    courseDuration="3 Weeks"
                    courseReview={course.rating || '0.0'}
                  />
                ))}
              </div>
            )}

            {/* Checkout Button */}
            <div className="flex justify-center m-6 space-x-2">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading} // Disable button while loading
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
                  checkoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {checkoutLoading ? 'Redirecting to checkout...' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default EnrolledCourses;