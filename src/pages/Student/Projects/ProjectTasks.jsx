import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import { Link, useParams } from 'react-router-dom';
import LiveChat from '../../../components/LiveChat';

function ProjectTasks() {
    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(1);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const itemsPerPage = 6;
    const [taskDelivery, setTaskDelivery] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [userID, setuserID] = useState('');
    const [animate, setAnimate] = useState(false);


    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/task/student/tasksForStudentProject/${id}`, {
                    params: {
                        searchQuery,
                        page: currentPage,
                        limit: itemsPerPage
                    },
                    withCredentials: true,
                });
                setTasks(response.data.tasks);
                setTotalPages(response.data.meta.totalPages);
                setTotalItems(response.data.meta.totalItems);
                setuserID(response.data.StudentID);
            } catch (err) {
                setError(err.message || 'Failed to fetch Tasks');
            } finally {
                setLoading(false);
                setAnimate(true);
            }
        };
        fetchProjects();
    }, [id, currentPage, searchQuery, refresh]);

    const handleSubmit = async (e, taskID) => {
        e.preventDefault();
        if (taskDelivery.trim() === '') {
          alert('Please enter task delivery details.');
          return;
        }
        try {
          const response = await axios.post(
            `http://localhost:8000/task/student/taskDelivery/${taskID}`,
            {
              task_link: taskDelivery,
            },
            { withCredentials: true }
          );
          if (response.status === 201) {
            alert('Task delivery details sent successfully!');
            setRefresh(taskID);
          } else {
            alert('Failed to send task delivery details. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('There was an error sending your task delivery details.');
        }
      };

    const handleViewDetails = (task) => {
        setSelectedTask(task);
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false); 
        setSelectedTask(null); 
    };

  const handleInputChange = (e) => {
    setTaskDelivery(e.target.value);
  };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DashboardLayout>
            <main className=" p-4 md:ml-64 pt-2 dark:bg-gray-900 transition-colors duration-300 overflow-auto">
            <div class="-my-2 py-0 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-4">
                <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                    <div class="flex justify-between ">
                        <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                            <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                                <div class="flex">
                                    <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                        <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <h2>sdsdsdsd</h2>
                    </div>
                </div>
                <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg pb-4">
                <table className="min-w-full">
                    <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Task ID</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Title</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Task Delivery</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Due Date</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Created At</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                </tr>
                    </thead>
                    <tbody className="bg-white">
                                {tasks.map((task) => (
                                    <tr key={task.task_id} className='bg-white hover:bg-gray-100 border-b transform hover:scale-105 transition duration-200'>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm leading-5 text-gray-800">#{task.task_id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                            <div className="text-sm leading-5 text-blue-900">{task.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                            <Link to={`${task.task_delivery}`}>View</Link>
                                        </td>
                                        <td
                                            className={`px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 ${
                                                new Date(task.due_date) < new Date() ? 'text-red-600 font-bold' : 'text-blue-900'
                                            }`}
                                            >
                                            {new Date(task.due_date).toLocaleString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                            </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <span
                                            className={`relative inline-block px-3 py-1 font-semibold ${
                                                task.status === 'completed'
                                                ? 'text-green-900'
                                                : task.status === 'pending_approval'
                                                ? 'text-blue-900'
                                                : 'text-yellow-900'
                                            } leading-tight`}
                                            >
                                            <span
                                                aria-hidden
                                                className={`absolute inset-0 ${
                                                task.status === 'completed'
                                                    ? 'bg-green-200'
                                                    : task.status === 'pending_approval'
                                                    ? 'bg-blue-200'
                                                    : 'bg-yellow-200'
                                                } opacity-50 rounded-full`}
                                            ></span>
                                            <span className="relative text-xs">{task.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                                            {new Date(task.createdAt).toLocaleString('en-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                            <button
                                                onClick={() => handleViewDetails(task)}
                                                className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
                    <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                        <div>
                            <p class="text-sm leading-5 text-blue-700">
                                Showing 
                                <span class="font-medium"> {currentPage} </span>
                                to 
                                <span class="font-medium"> {Math.min(currentPage * itemsPerPage, tasks.length)} </span>
                                of 
                                <span class="font-medium"> {totalItems} </span>
                                results 
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex shadow-sm">
                                <div>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                        aria-label="Previous"
                                    >
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Dynamically generate page numbers */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`-ml-px relative inline-flex items-center px-4 py-2 border text-sm leading-5 font-medium ${currentPage === index + 1 ? 'text-blue-700 bg-white' : 'text-blue-600 hover:bg-tertiary'} focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <div>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                        aria-label="Next"
                                    >
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg"
                >
                    Open Chat
                </button>
                {isChatOpen && (
                    <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} groupId={id} userID={userID} />
                )}
            </div>
            </main>
            {/* Popup Modal */}
            {isPopupOpen && selectedTask && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="flex flex-col bg-white p-10 rounded-lg w-[700px] gap-3">
                        <h3 className="text-xl font-bold">Task Details</h3>
                        <p><strong>Title:</strong> {selectedTask.title}</p>
                        <p><strong>Description:</strong> {selectedTask.description}</p>
                        <p><strong>Due Date:</strong> {new Date(selectedTask.due_date).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        <p><strong>Status:</strong> {selectedTask.status}</p>
                        <p><button className='mt-3 px-2 py-0 bg-slate-400 text-white rounded hover:bg-slate-600'><Link target="_blank" to={selectedTask.task_img} className='font-light'>Additional file</Link></button></p>
                        <div>
                            <p>
                                <strong>Task Delivery:</strong>{' '}
                                <Link
                                href={selectedTask.task_delivery}
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                previous link
                                </Link>
                            </p>
                            <form
                                onSubmit={(e) => handleSubmit(e, selectedTask.task_id)}
                                className="space-y-4"
                            >
                                <div>
                                <input
                                    id="taskDelivery"
                                    type="text"
                                    value={taskDelivery}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter task delivery details"
                                />
                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Submit Task Delivery
                                </button>
                                </div>
                            </form>
                            </div>
                            <button
                            onClick={closePopup}
                            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                            Close
                            </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default ProjectTasks;