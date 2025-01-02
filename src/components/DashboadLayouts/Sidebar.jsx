import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaProjectDiagram, FaTasks, FaBook, FaChalkboardTeacher ,FaUsers,
    FaFileAlt,
    FaEnvelope,
    FaThLarge,
    FaBriefcase,
    FaCheckCircle,} from 'react-icons/fa';

function Sidebar({ isDrawerOpen, closeDrawer }) {
    // Set initial role state based on localStorage
    const [role, setRole] = useState(() => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        return authData?.role;
    });

    useEffect(() => {
        // Define a function to update the role state whenever auth data changes in localStorage
        const handleStorageChange = () => {
            const authData = JSON.parse(localStorage.getItem('auth'));
            setRole(authData?.role);
        };

        // Add event listener for storage change
        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <aside
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-[#E5E7EB] border-r  md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full bg-gray-50">
                {/* Close Button (visible on small screens) */}
                <div className="flex justify-end md:hidden">
                    <button
                        onClick={closeDrawer}
                        className="p-2 text-gray-700 rounded-lg hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700"
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Main Navigation */}
                <ul className="space-y-2">
                    <li className='p-1'>
                        <NavLink
                            to="/dashboard"
                            className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                        >
                            <FaTachometerAlt className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                            <span className="ml-3 font-bold">Dashboard</span>
                        </NavLink>
                    </li>

                    {role === 1 && (
                        <>
                            <li className='p-1'>
                                <NavLink
                                    to="/enrolled-projects"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaCheckCircle className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Joined Projects</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/student/available-projects"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaBriefcase className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Available Projects</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/enrolled-courses"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaBook className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Enrolled Courses</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/available-courses"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaChalkboardTeacher className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Available Courses</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/private/messages"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaEnvelope className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Messages</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    {role === 2 && (
                        <>
                            <li className='p-1'>
                                <NavLink
                                    to="/instructor/courses"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaChalkboardTeacher className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Courses</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/instructor/projects"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaProjectDiagram className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Projects</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/instructor/ProjectManagement"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaTasks className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Projects Workspace</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/private/messages"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaEnvelope className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Messages</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    {role === 3 && (
                        <>
                            <li className='p-1'>
                                <NavLink
                                    to="/admin/instructors"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaUsers className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Instructors</span>
                                </NavLink>
                            </li >
                            <li className='p-1'>
                                <NavLink
                                    to="/admin/students"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaUsers className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Students</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/admin/projects"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaProjectDiagram className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Projects</span>
                                </NavLink>
                            </li>
                            
                            <li className='p-1'>
                                <NavLink
                                    to="/admin/courses"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaBook className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Courses</span>
                                </NavLink>
                            </li>
                            <li className='p-1'>
                                <NavLink
                                    to="/admin/admins"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaUsers className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Admins</span>
                                </NavLink>
                            </li>
                            {/* <li className='p-1'>
                                <NavLink
                                    to="/admin/reports"
                                    className="flex items-center p-2 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                                >
                                    <FaFileAlt  className="w-6 h-6 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-white" />
                                    <span className="ml-3 font-bold">Reports</span>
                                </NavLink>
                            </li> */}
                        </>
                    )}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
