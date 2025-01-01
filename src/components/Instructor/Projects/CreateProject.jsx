import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../DashboadLayouts/DashbordLayout';
import DatePicker from "react-datepicker";


const CreateProject = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    project_name: '',
    project_category: '',
    project_description: '',
    file: null,
    start_date: new Date(), // Default start date
    end_date: new Date(), // Default end date
    required_skills: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/category',{ withCredentials: true })
      .then(response => {
        console.log(response.data)

        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'file') {
        formPayload.append(key, formData[key]);
      } else {
        formPayload.append(key, formData[key]);
      }
    });
    const skillsArray = formData.required_skills
    .split(',')
    .map(skill => skill.trim()) 
    .filter(skill => skill !== '');  

    const formDataToSend = {
        ...formData,
        required_skills: skillsArray,  
    };
    axios.post('http://localhost:8000/project/instructor/createProject', formPayload, { withCredentials: true })
      .then(response => {
        console.log('Project created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating project:', error);
      });
      window.location.href = '/instructor/projects';
  };

  return (
    <DashboardLayout>
        <main className="md:ml-80">
            <div className='w-[1000px] border p-6 rounded-xl bg-white'>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-[black] mb-6">Create Project</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div className="p-2">
                    <input
                        type="text"
                        id="project_name"
                        name="project_name"
                        placeholder="project name"
                        value={formData.project_name}
                        onChange={handleChange}
                        className="bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                    />
                    </div>

                    <div className="p-2">
                    <select
                        id="project_category"
                        name="project_category"
                        value={formData.project_category}
                        onChange={handleChange}
                        className="bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"

                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                        <option key={index} value={category.category_id}>{category.category_name}</option>
                        ))}
                    </select>
                    </div>

                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <textarea
                        id="project_description"
                        name="project_description"
                        rows="3"
                        placeholder="project description"
                        value={formData.project_description}
                        onChange={handleChange}
                        className="bg-gray-100 block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"

                        />
                    </div>

                    <div>
                        <label
                        htmlFor="image-upload"
                        className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-50"
                        >
                        <div className="text-center">
                            <div className="mb-2">
                            <button type="button" className="bg-[#4040de] hover:bg-[#2135e5] text-white rounded-full py-2 px-4">
                                Select from the computer
                            </button>
                            </div>
                            <p className="text-gray-500">or drag photo here</p>
                            <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
                        </div>
                        </label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                        />
                    </div>
                    </div>
                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center bg-white rounded-md p-2">
                        <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"></path>
                        </svg>
                        <span className="ml-2">Start Date</span>
                        </span>
                        <input
                            type="datetime-local"
                            id="start_date"
                            name="start-start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2636bf] focus:ring-[#2f42ed] focus:ring-opacity-50 p-2"
                        />
                    </div>

                    <div className="flex items-center bg-white rounded-md p-2">
                        <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"></path>
                        </svg>
                        <span className="ml-2">End Date</span>
                        </span>
                        <input
                            type="datetime-local"
                            id="end_date"
                            name="end_date-date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2b3abf] focus:ring-[#2c44e2] focus:ring-opacity-50 p-2"
                        />
                    </div>
                    </div>

                    <div className="p-2 grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                    <input
                        type="text"
                        id="required_skills"
                        name="required_skills"
                        placeholder="Tags (comma-separated)"
                        value={formData.required_skills}
                        onChange={handleChange}
                        className="bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#5126d1] focus:ring-[#3e65c9] focus:ring-opacity-50 h-12"
                    />
                    </div>
                    </div>

                    <div className="col-span-full mt-6 p-2">
                    <button
                        type="submit"
                        className="block w-full bg-[#354dd8] hover:bg-[#3d68f4] text-white font-bold py-3 px-4 rounded-full"
                    >
                        Register for Event
                    </button>
                    </div>
                </form>
            </div>
            </div>
        </main>
    </DashboardLayout>
  );
};

export default CreateProject;
