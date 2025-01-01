import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import ReactQuill from 'react-quill';
import { ChevronRight, Edit, X, Upload, BookOpen, Video } from 'lucide-react';

// Styles (assumed to be imported or available)
import 'react-quill/dist/quill.snow.css';
import 'filepond/dist/filepond.min.css';
import './edit.css';

function EditCourses() {
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sections, setSections] = useState([
    { 
      title: 'Section 1', 
      videoTitle: 'Intro to Programming', 
      description: 'Introduction to basic programming concepts.', 
      video: null, 
      isEditing: false 
    },
    { 
      title: 'Section 2', 
      videoTitle: 'Variables and Data Types', 
      description: 'Understanding variables and different data types.', 
      video: null, 
      isEditing: false 
    },
    { 
      title: 'Section 3', 
      videoTitle: 'Control Structures', 
      description: 'Exploring if statements and loops.', 
      video: null, 
      isEditing: false 
    },
    { 
      title: 'Section 1', 
      videoTitle: 'Intro to Programming', 
      description: 'Introduction to basic programming concepts.', 
      video: null, 
      isEditing: false 
    },
    { 
      title: 'Section 2', 
      videoTitle: 'Variables and Data Types', 
      description: 'Understanding variables and different data types.', 
      video: null, 
      isEditing: false 
    },
    { 
      title: 'Section 3', 
      videoTitle: 'Control Structures', 
      description: 'Exploring if statements and loops.', 
      video: null, 
      isEditing: false 
    }
  ]);

  const toggleCourseEdit = () => {
    setIsEditingCourse(!isEditingCourse);
  };

  const toggleSectionEdit = (index) => {
    setSections(prev =>
      prev.map((section, i) => (i === index ? { ...section, isEditing: !section.isEditing } : section))
    );
  };

  const updateSection = (index, updates) => {
    setSections(prev =>
      prev.map((section, i) => (i === index ? { ...section, ...updates } : section))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-700  shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#152c5a] to-[#1e4d8b] p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <BookOpen className="text-white w-10 h-10" />
            <h1 className="text-3xl font-bold text-white">Course Editor</h1>
          </div>
          <button
            onClick={toggleCourseEdit}
            className="flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition"
          >
            {isEditingCourse ? <X className="mr-2" /> : <Edit className="mr-2" />}
            {isEditingCourse ? 'Cancel' : 'Edit Course'}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Course Details Column */}
          <div className="md:col-span-1 bg-gray-50 dark:bg-gray-600 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Course Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Course Name</label>
                {isEditingCourse ? (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white dark:bg-gray-500 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course name"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white text-sm ">Test Course</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Description</label>
                {isEditingCourse ? (
                  <ReactQuill
                    theme="snow"
                    placeholder="Enter course description"
                    className="bg-white dark:bg-gray-500 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white text-sm">Course description goes here Course description goes here Course description goes here Course description goes here...</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Thumbnail</label>
                {isEditingCourse ? (
                  <FilePond
                    maxFiles={1}
                    name="thumbnail"
                    labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
                    className="dark:bg-gray-500"
                  />
                ) : (
                  <img
                    src="https://www.shutterstock.com/image-photo/stack-books-on-wooden-table-260nw-2544354079.jpg"
                    alt="Course Thumbnail"
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sections Column */}
          <div className="md:col-span-2 bg-white dark:bg-gray-700 rounded-xl">
            <div className="border-b dark:border-gray-600 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ">Course Sections</h2>
            </div>

            {/* Sections Tabs */}
            <div className="flex overflow-x-auto">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSectionIndex(index)}
                  className={`
                     px-6 py-4 flex items-center space-x-2 
                    ${activeSectionIndex === index
                      ? 'bg-blue-100 dark:bg-blue-900 text-[#051941] dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}
                    transition-colors
                  `}
                >
                  <Video className="w-5 h-5" />
                  <span className='w-20'>{section.title}</span>
                  {activeSectionIndex === index && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Active Section Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Edit Button for Section */}
                <button
                  onClick={() => toggleSectionEdit(activeSectionIndex)}
                  className="flex items-center bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 px-4 py-2 rounded transition"
                >
                  {sections[activeSectionIndex].isEditing ? <X className="mr-2" /> : <Edit className="mr-2" />}
                  {sections[activeSectionIndex].isEditing ? 'Cancel Edit' : 'Edit Section'}
                </button>

                {/* Video Title */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Video Title</label>
                  {sections[activeSectionIndex].isEditing ? (
                    <input
                      type="text"
                      value={sections[activeSectionIndex].videoTitle}
                      onChange={(e) => updateSection(activeSectionIndex, { videoTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-500 rounded-lg border dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter video title"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-white text-sm">{sections[activeSectionIndex].videoTitle || 'No title provided'}</p>
                  )}
                </div>

                {/* Video Description */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Video Description</label>
                  {sections[activeSectionIndex].isEditing ? (
                    <ReactQuill
                      theme="snow"
                      value={sections[activeSectionIndex].description}
                      onChange={(content) => updateSection(activeSectionIndex, { description: content })}
                      placeholder="Enter video description"
                      className="bg-white dark:bg-gray-500 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-white text-sm">{sections[activeSectionIndex].description || 'No description provided'}</p>
                  )}
                </div>

                {/* Video Upload */}
                {sections[activeSectionIndex].isEditing && (
                  <div>
                    <label className="block text-gray-600 dark:text-gray-300 mb-2 font-semibold">Video Upload</label>
                    <FilePond
                      name="video"
                      labelIdle='Drag & Drop your video or <span class="filepond--label-action">Browse</span>'
                      acceptedFileTypes={['video/*']}
                      className="dark:bg-gray-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourses;
