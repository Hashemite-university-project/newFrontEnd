import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import HomeTopCourses from '../components/HomeTopCourses';

function Developers() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:8000/user/popularStudents')
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });
    }, []);
    if (!user) {
        return <p>Loading...</p>;
    }

  return (
    <>
    <NavBar />
    <section class="pt-10 pb-8 overflow-hidden bg-gray-100 sm:pt-16 lg:pt-24 mt-10">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Learn all the most used technologies</h2>
                <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">you will learn to work in all the technologies and libraries</p>
            </div>
        </div>
        <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true, amount: 0.2 }}
        >
            <img class="w-full min-w-full mx-auto mt-12 scale-150 max-w-7xl lg:min-w-0 lg:mt-0 lg:scale-100" src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/1/services-icons.png" alt="" />
        </motion.div>
    </section>
    <HomeTopCourses/>

    {/* ================================================> */}
    <div className="w-full h-5/6 bg-gray-100 dark:bg-gray-800 mb-16 flex flex-col items-center">
    <h1 className="text-xl font-extrabold leading-tight text-black sm:text-4xl lg:text-3xl mt-8">Meet Our Top Performers</h1>
        <div className="w-full h-screen flex flex-wrap justify-center items-center gap-32">
            {user.map((user) => (
            <div
                key={user.user_id}
                className="w-[20rem] flex flex-col gap-2 px-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-900"
            >
                <div className="w-full flex justify-center items-center">
                <img
                    className="w-[8rem] h-[8rem] rounded-full outline outline-offset-2 outline-1 outline-blue-400 shadow-lg relative -top-[4rem]"
                    src={user.user.user_img}
                    alt="ProfileImage"
                />
                </div>
                <div className="w-full h-60 text-center justify-between flex flex-col gap-4 relative -top-10">
                <h1 className="uppercase text-lg font-thin dark:text-white">
                    {user.major}
                </h1>
                <h2 className="text-xl capitalize font-semibold text-gray-700 dark:text-gray-300">
                    {user.user.user_name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 overflow-hidden">
                        {user.about_me && user.about_me.length > 100
                        ? `${user.about_me.slice(0, 100)}...`
                        : null}
                </p>
                <Link
                    to={`/MemberCV/${user.user_id}`}
                    className="w-[60%] mx-auto bg-blue-500 hover:bg-blue-700 text-white rounded-3xl px-4 py-2"
                >
                    See profile
                </Link>
                </div>
            </div>
            ))}
        </div>
    </div>

    {/* ================================================> */}
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5 mb-10">
        <h2 class="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Our Expertise</h2>
        <p class="mb-12 text-lg text-gray-500">At ScepHub, we provide comprehensive learning experiences that empower students to master in-demand technologies. Our curriculum covers:</p>
        <div class="w-full">
            <div class="flex flex-col w-full mb-10 sm:flex-row">
                <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    >
                    <div class="relative h-full ml-0 mr-0 sm:mr-10">
                        <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                        <div class="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">MERN Stack</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                            <p class="mb-2 text-gray-600">Students dive deep into the MERN Stack (MongoDB, Express.js, React.js, Node.js), learning to build full-stack web applications. From backend server management to frontend user interfaces, they get hands-on experience in creating scalable, dynamic, and responsive web applications.</p>
                        </div>
                    </div>
                    </motion.div>
                </div>
                <div class="w-full sm:w-1/2">
                <motion.div
                                initial={{ opacity: 0, x: 150 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 2.0 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                    <div class="relative h-full ml-0 md:mr-10">
                        <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                        <div class="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">PHP with Laravel</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                            <p class="mb-2 text-gray-600">Our PHP with Laravel course teaches students how to develop robust and secure web applications using the popular Laravel framework. Students learn to build RESTful APIs, integrate database systems, and implement advanced security features to deliver high-quality solutions.</p>
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
            <div class="flex flex-col w-full mb-5 sm:flex-row">
                <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <motion.div
                                initial={{ opacity: 0, x: -150 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 2.0 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                    <div class="relative h-full ml-0 mr-0 sm:mr-10">
                        <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                        <div class="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Python</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                            <p class="mb-2 text-gray-600">We offer an in-depth exploration of Python with Django, where students develop powerful web applications using Python’s Django framework. They learn how to create scalable backends, build RESTful services, and implement a secure user authentication system, all while mastering Python’s syntax and libraries.</p>
                        </div>
                    </div>
                    </motion.div>
                </div>
                <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                <motion.div
                                initial={{ opacity: 0, y: 150 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2.0 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                    <div class="relative h-full ml-0 mr-0 sm:mr-10">
                        <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                        <div class="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Flutter and React Native</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                            <p class="mb-2 text-gray-600">Students gain expertise in mobile app development with Flutter and React Native. They learn to build cross-platform mobile applications, ensuring they can deliver apps on both iOS and Android with a single codebase, enhancing their versatility in mobile development.</p>
                        </div>
                    </div>
                    </motion.div>
                </div>
                <div class="w-full sm:w-1/2">
                <motion.div
                                initial={{ opacity: 0, y: 150 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2.0 }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                    <div class="relative h-full ml-0 md:mr-10">
                        <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                        <div class="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">Databases like MongoDB and PostgreSQL</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                            <p class="mb-2 text-gray-600">We provide students with hands-on experience in MongoDB and PostgreSQL, teaching them how to design, manage, and optimize both NoSQL and relational databases. Students understand the best practices for data modeling, query optimization, and data integrity to build efficient and reliable backends.</p>
                        </div>
                    </div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Developers;