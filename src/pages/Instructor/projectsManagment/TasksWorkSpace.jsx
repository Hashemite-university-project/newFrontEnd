import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../../components/DashboadLayouts/DashbordLayout';
import LiveChat from '../../../components/LiveChat';

function TasksWorkSpace() {
  const [tasks, setTasks] = useState([]);
  const { id: projectId } = useParams();
  const [task_name, setTaskName] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchTasks = async () => {
    try {
      // status is from select tag
      const response = await axios.get(
        `http://localhost:8000/project/instructor/allTasks/${projectId}/${active}?task_name=${encodeURIComponent(task_name)}`,
        { withCredentials: true }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const [active, setStatusFilter] = useState("in_progress");

  const filteredTasks = tasks.filter((task) =>
    active === "completed" || task.status === active
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  return (
    <DashboardLayout>
      <main className="md:ml-64 ">
        <div>
          <div className="flex flex-wrap justify-between p-4 ">
            {tasks.length > 0 ? (
              <>
                <div class="container mx-auto px-4 sm:px-8">
                  <div class="py-8">
                    <div>
                      <h2 class="text-2xl font-semibold leading-tight">WorkSpace</h2>
                    </div>
                    <div class=" gap-4 my-2 flex sm:flex-row flex-col items-center justify-start align-middle p-4">
                      <div class="flex flex-row mb-1 sm:mb-0">
                        <div class="relative">
                          <select
                            value={active}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="..."
                          >
                            <option>All</option>
                            <option>Active</option>
                            <option>Ended</option>
                          </select>
                        </div>
                      </div>
                      
                      <div class="block relative">
                        <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                            <path
                              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                          </svg>
                        </span>
                        <input
                          type="text"
                          placeholder="Search"
                          value={task_name}
                          onChange={(e) => setTaskName(e.target.value)}
                          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        />
                      </div>
                      <div>
                      <Link to={`/instructor/addTask/${projectId}`} className=" rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700 text-sm shadow-lg">
                           Add Task
                    </Link>
                      </div>
                      
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Assigned To
                              </th>
                              <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Task
                              </th>
                              <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                End date
                              </th>
                              <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                              <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tasks.map((task) => (
                              <tr key={task.task_id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={task.assignedUser.user?.user_img || "default_avatar_url"}
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {task.assignedUser.user?.user_name || "No User"}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">{task.title}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {formatDate(task.due_date)}
                                  </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <span
                                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${task.status === "completed" ? "text-green-900" : "text-orange-900"
                                      }`}
                                  >
                                    <span
                                      aria-hidden
                                      className={`absolute inset-0 ${task.status === "completed" ? "bg-green-200" : "bg-orange-200"
                                        } opacity-50 rounded-full`}
                                    ></span>
                                    <span className="relative">{task.status}</span>
                                  </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                  <button
                                    onClick={() => openModal(task)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    Show Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div
                          class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                          <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                          </span>
                          <div class="inline-flex mt-2 xs:mt-0">
                            {/* make this run correctly */}
                            <button
                              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                              disabled={currentPage === 1}
                              className="..."
                            >
                              Prev
                            </button>
                            <button
                              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                              disabled={currentPage === totalPages}
                              className="..."
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>

            ) : (
              <div>No Tasks yet</div>
            )}
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-2/3">
              <h2 className="text-xl font-semibold mb-4">
                Task Details
              </h2>
              <p>
                <strong>Title:</strong> {selectedTask?.title || "Untitled Task"}
              </p>
              <p>
                <strong>description:</strong> {selectedTask?.description || "Untitled Task"}
              </p>
              <p>
                <strong>Assigned User:</strong>{" "}
                {selectedTask?.assignedUser?.user?.user_name || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedTask?.status || "N/A"}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {formatDate(selectedTask?.due_date) || "N/A"}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="relative">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-4 right-4 rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700 text-sm shadow-lg"
                >
                    Open Chat
                </button>
                {isChatOpen && (
                    <LiveChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} groupId={projectId} />
                )}
        </div>
      </main>
    </DashboardLayout>
  );
}

export default TasksWorkSpace;
