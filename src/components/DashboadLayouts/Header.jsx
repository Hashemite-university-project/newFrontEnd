// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Header({ toggleDrawer }) {
    const [userAccount, SetUserAccount] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/info', { withCredentials: true });
        SetUserAccount(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    fetchProjects();
  }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isAppsDropdownOpen, setIsAppsDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);

    const notificationRef = useRef(null);
    const appsDropdownRef = useRef(null);
    const userMenuRef = useRef(null);

    const toggleAppsDropdown = () => setIsAppsDropdownOpen(!isAppsDropdownOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const handleLogout = () => {
        localStorage.removeItem('auth');
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');
        dispatch(logout());
        navigate('/SignIn');
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
            if (appsDropdownRef.current && !appsDropdownRef.current.contains(event.target)) {
                setIsAppsDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!userAccount) return <div>Loading...</div>;

    // Determine the correct URL based on the role
    let updateProfileUrl = '';
    if (userAccount.role === 3) {
        updateProfileUrl = `/updateAdminProfile/${userAccount.user_id}`;
    } else if (userAccount.role === 2) {
        updateProfileUrl = `/updateInstructorProfile/${userAccount.user_id}`;
    } else if (userAccount.role === 1) {
        updateProfileUrl = `/updateStudentProfile/${userAccount.user_id}`;
    }

    return (
        <nav
            className="bg-gray-50 border-b border-gray-300 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50 transition-colors duration-300"
            aria-label="Main Navigation"
        >
            <div className="flex justify-between items-center ">
                {/* Left Section */}
                <div className="flex items-center ">
                    <button
                        onClick={toggleDrawer}
                        aria-controls="drawer-navigation"
                        aria-expanded="false"
                        className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 dark:focus:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 transition-colors duration-300"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Toggle sidebar</span>
                    </button>
                    <img className='w-[40px] h-[40px]' src='https://cdn-icons-png.flaticon.com/512/7509/7509527.png' alt=''></img>
                        <span className="text-[#350dc4] ml-2 self-center text-2xl font-bold whitespace-nowrap dark:text-white transition-colors duration-300">
                            SCEPHUB
                        </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 mr-10">
                    {/* Dark Mode Toggler */}
                    {/* <button
                        onClick={toggleDarkMode}
                        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors duration-300"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button> */}

                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            type="button"
                            onClick={toggleUserMenu}
                            aria-haspopup="true"
                            aria-expanded={isUserMenuOpen}
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-colors duration-300"
                            id="user-menu-button"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src={userAccount.user_img}
                                alt="User avatar"
                            />
                        </button>

                        {isUserMenuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg dark:bg-gray-700 z-50 transition-opacity duration-300"
                            >
                                <div className="py-3 px-4">
                                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                        {userAccount.user_name}
                                    </span>
                                    <span className="block text-sm text-gray-900 truncate dark:text-white">
                                    {userAccount.user_email}
                                    </span>
                                </div>
                                <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="user-menu-button">
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-300"
                                        >
                                            My profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Link
                                            to={updateProfileUrl}
                                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-300"
                                        >
                                            Update Account
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="user-menu-button">
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-300"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
