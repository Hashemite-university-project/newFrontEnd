import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

function HeroSection() {
    return (
        <div className="relative pt-48 pb-12 bg-black xl:pt-44 sm:pb-16 lg:pb-32 xl:pb-40 2xl:pb-56">
      <div className="absolute inset-0">
        <div className="absolute bg-gradient-to-r from-gray-950 via-blue-300 to-gray-700 opacity-60 inset-0 z-0"></div>
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="relative">
        <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
          <div className="w-full lg:w-4/4 xl:w-2/2">
            <h1 className="font-sans text-base font-normal tracking-tight text-white text-opacity-70">
            Master the fundamentals of coding.
            </h1>
            <div className="mt-6 tracking-tighter text-white">
              <span className="font-sans font-normal text-6xl block">
                The road to
              </span>
              <TypeAnimation
                sequence={[
                  'Real-World Projects, Real Skills',
                  2000, 
                  'Master In-Demand Skills with Our Courses',
                  2000,
                  'Learn, Apply, and Evolve with ScepHub',
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="font-serif italic font-normal text-6xl"
              />
            </div>
            <p className="mt-12 w-2/3 font-sans text-base font-normal leading-7 text-white text-opacity-70">
            At ScepHub, we empower individuals and teams to master new skills, work on real-world projects, and grow professionally. Whether you're learning to build or building to learn, our platform is designed to help you thrive in the ever-evolving tech industry.
            </p>
            <div className="flex items-center mt-5 space-x-3 sm:space-x-4">
              <Link
                to="/AboutUs"
                className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 border-2 border-transparent rounded-full sm:leading-8 bg-white sm:text-lg text-black hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary"
              >
                Read About Us
              </Link>
              <Link
                to="/SignUp"
                className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full sm:leading-8 text-white border-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:text-black sm:text-lg focus:ring-offset-secondary"
              >
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default HeroSection