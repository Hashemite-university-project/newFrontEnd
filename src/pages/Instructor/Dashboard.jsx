import React, { useEffect, useState } from 'react';
import { 
  LayoutGrid, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import DashboardLayout from '../../components/DashboadLayouts/DashbordLayout';
function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    endedProjects: 0,
    awaitProjects: 0,
    paymentMonth: 0,
    subscriptionStudents: 0,
    subscriptionPercentage: 0,
    projectStatistics: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/instructorStatistics', {
          withCredentials: true,
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart configurations with a more modern, sleek look
  const courseProgressOptions = {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5,
        },
        hollow: {
          margin: 15,
          size: '65%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'solid',
      colors: ['#4CAF50']
    },
    labels: ['Course Progress']
  };

  const projectProgressOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '22%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Projects'],
    },
    fill: {
      opacity: 1,
      colors: ['#3B82F6']
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " projects"
        }
      }
    }
  };

  const projectProgressSeries = dashboardData.projectStatistics && dashboardData.projectStatistics.length > 0 
    ? dashboardData.projectStatistics
    : [{
        name: "Projects",
        data: [dashboardData.endedProjects]
      }];

  return (
    <DashboardLayout>
    <main className="p-4 md:ml-64 min-h-screen bg-meta-2">
      <div className="flex flex-wrap text-center">
        {/* Total Courses Card */}
        {/* <div className="w-full"> */}
    {/* <div className=" dark:bg-gray-900 min-h-screen"> */}
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
          <LayoutGrid className="mr-3 text-blue-500" /> Dashboard
        </h1> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Courses Card */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <BookOpen className="text-blue-500 w-10 h-10 mb-3" />
                <h3 className="text-gray-500 dark:text-gray-300 text-sm">Total Courses</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {dashboardData.subscriptionStudents}
                </p>
              </div>
            </div>
          </div>

          {/* Completed Projects Card */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <CheckCircle2 className="text-green-500 w-10 h-10 mb-3" />
                <h3 className="text-gray-500 dark:text-gray-300 text-sm">Completed Projects</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {dashboardData.endedProjects}
                </p>
              </div>
            </div>
          </div>

          {/* Active Courses Card */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <TrendingUp className="text-purple-500 w-10 h-10 mb-3" />
                <h3 className="text-gray-500 dark:text-gray-300 text-sm">Active Courses</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {dashboardData.awaitProjects}
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines Card */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6 transform transition-all hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <Clock className="text-red-500 w-10 h-10 mb-3" />
                <h3 className="text-gray-500 dark:text-gray-300 text-sm">Upcoming Deadlines</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  {dashboardData.awaitProjects}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Project Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Project Progress
            </h2>
            <Chart
              options={projectProgressOptions}
              series={projectProgressSeries}
              type="bar"
              height={350}
            />
          </div>

          {/* Subscription Percentage Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Subscription Percentage
            </h2>
            <Chart
              options={courseProgressOptions}
              series={[dashboardData.subscriptionPercentage]}
              type="radialBar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
    {/* </div> */}
        {/* </div> */}
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;