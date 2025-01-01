// src/pages/SignUp.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    role: 'Student',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setRole = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });
  };

  const validateForm = () => {
    const { user_name, user_email, phone_number, password, confirm_password } = formData;
    if (!user_name || !user_email || !phone_number || !password || !confirm_password) {
      Swal.fire({
        title: 'Incomplete Data',
        text: 'Please fill in all the fields',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    }
    if (password !== confirm_password) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Please make sure the password matches the confirm password',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return false;
    }
    // Additional validations can be added here (e.g., email format, password strength)
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(signUp(formData))
      .unwrap()
      .then(() => {
        navigate('/SignIn');
      })
      .catch((err) => {
        // Errors are already handled in the slice via Swal
      });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="absolute bg-gradient-to-r from-gray-100 via-blue-300 to-gray-950 opacity-60 inset-0 z-0"></div>
      <div className="max-w-xl w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Sign Up As</p>
        </div>
        <div className="flex flex-row justify-center items-center space-x-3">
          <div className="flex flex-col align-middle justify-center items-center">
            <button
              name="Instructor"
              className={`w-32 p-2 rounded-full font-bold text-lg ${formData.role === 'Instructor' ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'
                }`}
              onClick={() => setRole('Instructor')}
              aria-pressed={formData.role === 'Instructor'}
            >
              Instructor
            </button>
            {/* <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor="Instructor">
              Instructor
            </label> */}
          </div>
          <div className="flex flex-col align-middle justify-center items-center">
            <button
              name="Student"
              className={`w-32 p-2 rounded-full font-bold text-lg ${formData.role === 'Student' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              onClick={() => setRole('Student')}
              aria-pressed={formData.role === 'Student'}
            >
              Student
            </button>
            {/* <label className="text-sm font-bold text-gray-700 tracking-wide" htmlFor="Student">
              Student
            </label> */}
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="text-sm font-bold text-gray-700 tracking-wide">User Name</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Your name"
              value={formData.user_name}
              onChange={handleChange}
              name="user_name"
              required
            />
          </div>
          <div className="relative">
            <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="email"
              placeholder="clientemail@mail.com"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">Phone Number</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="07 *778 7***"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative mt-8">
            <label className="text-sm font-bold text-gray-700 tracking-wide">Confirm Password</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Confirm your password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center bg-blue-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Already have an account?</span>
            <Link
              to="/SignIn"
              className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
