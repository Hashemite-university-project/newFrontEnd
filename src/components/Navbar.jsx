import React from 'react'
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';

function NavBar() {
    return (
        <div className="flex flex-col">
            <nav className="flex justify-around py-4 bg-white
                    backdrop-blur-md  w-full
                    fixed top-0 left-0 right-0 z-10 border-b-1 border-blue-500 shadow-md ">
                <div className="flex flex-row items-center">
                    {/* <img className="h-10 object-cover" src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-company-logo-png-image_6145477.png" alt="compny Logo" /> */}
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r bg-gray-600">ScepHub</div>
                </div>
                <div className="items-center hidden space-x-8 lg:flex">
                    <Link to={'/'} className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                        Home
                    </Link>
                    <Link to={'/Developers'} className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                        Developers
                    </Link>
                    <Link to={'/ContactUs'} className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                        Contact US
                    </Link>
                    <Link to={'/AboutUs'} className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                        About Us
                    </Link>
                </div>
                <div className="flex items-center space-x-5">
                    <Link to={'/SignIn'} className="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    font-semibold">
                        <svg className="fill-current h-5 w-5 mr-2 mt-0.5" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                        </svg>
                        Login
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;




















// <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
//     <Link to="/HomePage" className="flex items-center whitespace-nowrap text-2xl font-black">
//         <span className="mr-2 w-8">
//             <img src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-company-logo-png-image_6145477.png" alt="company logo" />
//         </span>
//         ScepHub
//     </Link>
//     <input type="checkbox" className="peer hidden" id="navbar-open" />
//     <label className="absolute top-5 right-5 cursor-pointer lg:hidden" for="navbar-open">
//         <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
//         </svg>
//     </label>
//     <nav aria-label="Header Navigation" className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
//         <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
//             <li className="lg:mr-12"><Link className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/HomePage">Home</Link></li>
//             <li className="lg:mr-12"><Link className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/Services">Services</Link></li>
//             <li className="lg:mr-12"><Link className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/ContactUs">Contact</Link></li>
//             <li className="lg:mr-12"><Link className="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" to="/AboutUs">About Us</Link></li>
//         </ul>
//         <hr className="mt-4 w-full lg:hidden" />
//         <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
//             <a href="#" title="" className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"> Log in </a>
//             <a href="#" title="" className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">Get free trial</a>
//         </div>
//     </nav>
// </header>