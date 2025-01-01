// this is for student project joined cards
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectsCards({ project }) {
  const [uncompletedTasks, setUncompletedTasks] = useState(0);
  const [closestTime, setClosestTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/project/student/tasksNumber/${project.project_id}`, { withCredentials: true });
        setUncompletedTasks(response.data.UncompletedTasks);
        setClosestTime(response.data.ClosestTimeToSubmit);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };
    fetchData();
  }, [project.project_id]);

  return (
    <div className="w-80 shadow-md bg-white p-2 rounded-xl dark:bg-gray-700 hover:scale-105 duration-300 hover:shadow-xl">
      <div className="p-4">
        <img
          className="rounded-lg h-32 w-full object-cover"
          src={project.project_img}
          alt={project.project_img}
        />
      </div>
      <div className="p-2 capitalize text-xl font-semibold dark:text-white">
        <h2>{project.project_name}</h2>
      </div>
      <div className="flex justify-between dark:text-white p-2 capitalize text-base font-normal">
        <div>
          <h3>Uncompleted tasks</h3>
        </div>
        <div>
          <h3>{uncompletedTasks} tasks</h3>
        </div>
      </div>
      <div className="flex justify-between dark:text-white p-2 capitalize text-base font-normal">
        <div>
          <h3>Closest time to submit</h3>
        </div>
        <div>
        <h3>
        {closestTime && new Date(closestTime) > new Date()
            ? new Date(closestTime).toISOString().slice(0, 10)
            : 'N/A'}
        </h3>
        </div>
      </div>
      <div className="p-2">
      <Link to = {`/student/project/tasks/${project.project_id}`}>
        <button className="uppercase text-white text-base font-bold text-center rounded-lg bg-blue-500 p-1 w-full">
          view
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ProjectsCards;
