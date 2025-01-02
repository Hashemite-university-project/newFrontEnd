import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import LiveChat from '../../../components/LiveChat';

// Importing Icons from Heroicons
import {
  PencilAltIcon,
  TrashIcon,
  XIcon,
  EyeIcon
} from '@heroicons/react/solid';

// Importing React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TasksWorkSpace() {
  // State Variables
  const [tasks, setTasks] = useState([]);
  const { id: projectId } = useParams();
  const [taskName, setTaskName] = useState('');
  const [active, setStatusFilter] = useState('in_progress');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State for Students
  const [students, setStudents] = useState([]);
  const [isFetchingStudents, setIsFetchingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState('');

  // Modals & Task Selection
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Editing State: If true, the details modal is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State for Create / Edit Task Form
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    file: null,
    assignedStudentId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Utility Function to Format Dates
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /* ==================== Fetching Logic ==================== */
  
  // Fetch Tasks from Backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/project/instructor/allTasks/${projectId}/${active}?task_name=${encodeURIComponent(
          taskName
        )}`,
        { withCredentials: true }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  // Fetch Students Associated with the Project
  const fetchStudents = async () => {
    setIsFetchingStudents(true);
    setStudentsError('');
    try {
      const response = await axios.get(
        `http://localhost:8000/project/projectJoinedStudents/${projectId}`,
        { withCredentials: true }
      );
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
      setStudentsError('Failed to fetch students.');
    } finally {
      setIsFetchingStudents(false);
    }
  };

  // Fetch tasks whenever dependencies change
  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId, active, taskName]);

  // Fetch students when create modal OR edit mode is opened
  useEffect(() => {
    if (isCreateModalOpen || isEditing) {
      fetchStudents();
    }
  }, [isCreateModalOpen, isEditing]);

  /* ==================== Modal & Edit Logic ==================== */

  // Open Details Modal in View Mode
  const openDetailsModal = (task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
    setIsEditing(false);
  };

  // Close Details Modal
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedTask(null);
    setIsEditing(false);
  };

  // Enter Edit Mode within Details Modal
  const handleEnterEditMode = () => {
    if (!selectedTask) return;

    // Populate form with selectedTask data
    setNewTask({
      title: selectedTask.title || '',
      description: selectedTask.description || '',
      due_date: selectedTask.due_date
        ? formatDate(selectedTask.due_date)
        : '',
      file: null,
      assignedStudentId:
        selectedTask.assignedUser?.user_id || ''
    });

    setIsEditing(true);
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSubmissionError('');
  };

  // Open and Close Create Task Modal
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    setNewTask({
      title: '',
      description: '',
      due_date: '',
      file: null,
      assignedStudentId: ''
    });
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      due_date: '',
      file: null,
      assignedStudentId: ''
    });
    setSubmissionError('');
  };

  /* ==================== Filtering & Pagination ==================== */

  const filteredTasks = tasks.filter((task) =>
    active === 'All' ? true : task.status === active.toLowerCase()
  );
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  /* ==================== Handlers for Form Input ==================== */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewTask((prev) => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  /* ==================== Create Task ==================== */

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');

    const { title, description, due_date, file, assignedStudentId } = newTask;

    // Basic Validation
    if (!title || !description || !due_date || !assignedStudentId) {
      setSubmissionError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Prepare Form Data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('due_date', due_date);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post(
        `http://localhost:8000/task/addTask/${projectId}/${assignedStudentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      // Re-fetch tasks
      await fetchTasks();
      // Reset & Close
      closeCreateModal();
      toast.success('Task Created!', {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      console.error('Error creating task:', error.message);
      setSubmissionError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ==================== Update Task ==================== */

  const handleUpdateTaskRequest = async (e) => {
    e.preventDefault();
    if (!selectedTask) return;
    setIsSubmitting(true);
    setSubmissionError('');

    const { title, description, due_date, file, assignedStudentId } = newTask;

    // Basic Validation
    if (!title || !description || !due_date || !assignedStudentId) {
      setSubmissionError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Prepare Form Data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('due_date', due_date);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/task/updateTask/${selectedTask.task_id}/${assignedStudentId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      // If the API returns a success message like {"message": "Task updated!"}
      if (response.data.status == 200) {
        toast.success('Task updated!', {
          position: 'top-right',
          autoClose: 3000
        });
      }

      // Re-fetch tasks
      await fetchTasks();
      // Close details modal
      closeDetailsModal();
    } catch (error) {
      console.error('Error updating task:', error.message);
      setSubmissionError('Failed to update task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ==================== Delete Task ==================== */

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/task/deleteTask/${taskId}`, {
        withCredentials: true
      });
      // Re-fetch tasks
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      {/* Toast Container for React Toastify */}
      <ToastContainer />
      <main className="md:ml-64 w-full max-w-screen-xl mx-auto">
        <div className="p-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full">
              <div className="py-4">
                <h2 className="text-2xl font-semibold leading-tight">
                  WorkSpace
                </h2>
              </div>

              {/* Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-between mb-4">
                {/* Search Input */}
                <div className="relative w-full sm:max-w-xs">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-gray-500"
                    >
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="appearance-none rounded-md border border-gray-300 pl-8 pr-4 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex flex-row items-center">
                  <label
                    htmlFor="statusFilter"
                    className="mr-2 text-sm font-medium text-gray-700"
                  >
                    Status:
                  </label>
                  <select
                    id="statusFilter"
                    value={active}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block appearance-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Ended</option>
                  </select>
                </div>

                {/* Add Task Button */}
                <div>
                  <button
                    onClick={openCreateModal}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    Add Task
                  </button>
                </div>
              </div>

              {/* Tasks Table */}
              {/** NOTE: Using `table-auto w-full` + `overflow-x-auto` ensures scrollability on mobile **/}
              <div className="w-full overflow-x-auto shadow rounded-lg">
                <table className="table-auto w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTasks.length > 0 ? (
                      paginatedTasks.map((task) => (
                        <tr key={task.task_id}>
                          {/* Assigned To */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full object-cover"
                                  src={
                                    task.assignedUser?.user?.user_img ||
                                    'https://via.placeholder.com/150'
                                  }
                                  alt={
                                    task.assignedUser?.user?.user_name ||
                                    'No User'
                                  }
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap font-medium">
                                  {task.assignedUser?.user?.user_name ||
                                    'No User'}
                                </p>
                                <p className="text-xs text-gray-500 whitespace-no-wrap">
                                  {task.assignedUser?.user?.user_email ||
                                    'No Email'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Task Title */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {task.title}
                            </p>
                          </td>

                          {/* Due Date */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {formatDate(task.due_date)}
                            </p>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                              className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                                task.status === 'completed'
                                  ? 'text-green-900'
                                  : 'text-orange-900'
                              }`}
                            >
                              <span
                                aria-hidden
                                className={`absolute inset-0 ${
                                  task.status === 'completed'
                                    ? 'bg-green-200'
                                    : 'bg-orange-200'
                                } opacity-50 rounded-full`}
                              ></span>
                              <span className="relative capitalize">
                                {task.status.replace('_', ' ')}
                              </span>
                            </span>
                          </td>

                          {/* Actions (Icons Only) */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                            <div className="flex justify-center space-x-4">
                              {/* View (Details) Icon */}
                              <button
                                onClick={() => openDetailsModal(task)}
                                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                title="View Task"
                                aria-label="View Task"
                              >
                                <EyeIcon className="h-5 w-5" />
                              </button>

                              {/* Delete Icon */}
                              <button
                                onClick={() => handleDeleteTask(task.task_id)}
                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                title="Delete Task"
                                aria-label="Delete Task"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                        >
                          No tasks found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="px-5 py-5 bg-white border-t flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                  <span className="text-xs sm:text-sm text-gray-900">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredTasks.length)}{' '}
                    of {filteredTasks.length} Entries
                  </span>
                  <div className="inline-flex sm:mt-0">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-l ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      Prev
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-r ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Modal */}
        {isDetailsModalOpen && selectedTask && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8 overflow-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full mx-auto"
              role="document"
            >
              {/* Modal Header */}
              <div className="bg-blue-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3
                  className="text-lg leading-6 font-medium text-white"
                  id="modal-title"
                >
                  {isEditing ? 'Edit Task' : 'Task Details'}
                </h3>
                <button
                  onClick={closeDetailsModal}
                  className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
                  aria-label="Close modal"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-4 py-5 sm:p-6">
                {/** If not editing, show read-only details; if editing, show a form **/}
                {!isEditing ? (
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Title:</span>
                      <p className="text-gray-700">
                        {selectedTask.title || 'Untitled Task'}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="flex items-start">
                      <span className="font-semibold w-32">Description:</span>
                      <p className="text-gray-700">
                        {selectedTask.description || 'No Description'}
                      </p>
                    </div>

                    {/* Assigned User */}
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Assigned User:</span>
                      <p className="text-gray-700">
                        {selectedTask.assignedUser?.user?.user_name || 'N/A'}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Status:</span>
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          selectedTask.status === 'completed'
                            ? 'text-green-900'
                            : 'text-orange-900'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            selectedTask.status === 'completed'
                              ? 'bg-green-200'
                              : 'bg-orange-200'
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative capitalize">
                          {selectedTask.status.replace('_', ' ')}
                        </span>
                      </span>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Due Date:</span>
                      <p className="text-gray-700">
                        {formatDate(selectedTask.due_date) || 'N/A'}
                      </p>
                    </div>

                    {/* Task Image/File */}
                    {selectedTask.task_img && (
                      <div className="flex items-center">
                        <span className="font-semibold w-32">File:</span>
                        <a
                          href={selectedTask.task_img}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-700 flex items-center"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Edit Form */
                  <form
                    onSubmit={handleUpdateTaskRequest}
                    encType="multipart/form-data"
                    className="space-y-4"
                  >
                    {/* Title */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    {/* Due Date */}
                    <div>
                      <label
                        htmlFor="due_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Due Date<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="due_date"
                        name="due_date"
                        value={newTask.due_date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* File Upload */}
                    <div>
                      <label
                        htmlFor="file"
                        className="block text-sm font-medium text-gray-700"
                      >
                        File
                      </label>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>

                    {/* Assign to Student */}
                    <div>
                      <label
                        htmlFor="assignedStudentId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Assign to<span className="text-red-500">*</span>
                      </label>
                      {isFetchingStudents ? (
                        <p className="text-gray-500">Loading students...</p>
                      ) : studentsError ? (
                        <p className="text-red-500">{studentsError}</p>
                      ) : (
                        <select
                          id="assignedStudentId"
                          name="assignedStudentId"
                          value={newTask.assignedStudentId}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">-- Select a Student --</option>
                          {students.map((student) => (
                            <option
                              key={student.student.user.user_id}
                              value={student.student.user.user_id}
                            >
                              {student.student.user?.user_name} (
                              {student.student.user?.user_email})
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Submission Error */}
                    {submissionError && (
                      <p className="text-red-500">{submissionError}</p>
                    )}

                    {/* Buttons: Update / Cancel */}
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Modal Footer (View Mode Only) */}
              {!isEditing && (
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                  <button
                    onClick={handleEnterEditMode}
                    className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  >
                    <PencilAltIcon className="h-5 w-5 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={closeDetailsModal}
                    className="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Task Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8 overflow-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-auto">
              <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
              <form onSubmit={handleCreateTask} encType="multipart/form-data">
                {/* Title */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Due Date */}
                <div className="mb-4">
                  <label
                    htmlFor="due_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Due Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={newTask.due_date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label
                    htmlFor="file"
                    className="block text-sm font-medium text-gray-700"
                  >
                    File
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                {/* Assign to Student */}
                <div className="mb-4">
                  <label
                    htmlFor="assignedStudentId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assign to<span className="text-red-500">*</span>
                  </label>
                  {isFetchingStudents ? (
                    <p className="text-gray-500">Loading students...</p>
                  ) : studentsError ? (
                    <p className="text-red-500">{studentsError}</p>
                  ) : (
                    <select
                      id="assignedStudentId"
                      name="assignedStudentId"
                      value={newTask.assignedStudentId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">-- Select a Student --</option>
                      {students.map((student) => (
                        <option key={student.user_id} value={student.student.user.user_id}>
                          {student.student.user?.user_name} (
                          {student.student.user?.user_email})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Submission Error */}
                {submissionError && (
                  <p className="text-red-500 mb-4">{submissionError}</p>
                )}

                {/* Form Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Live Chat */}
        <div className="relative">
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700 text-sm shadow-lg"
          >
            Open Chat
          </button>
          {isChatOpen && (
            <LiveChat
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              groupId={projectId}
            />
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}

export default TasksWorkSpace;