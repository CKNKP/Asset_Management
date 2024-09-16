import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { People, Inventory, AssignmentTurnedIn, AssignmentLate } from "@mui/icons-material";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    unAllocatedAsset: 0,
    totalEmployee: 0,
    totalAsset: 0,
    allocatedAssets: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [unAllocated, employees, totalAssets, allocated] = await Promise.all([
        axios.get('http://localhost:8080/api/v1/dashboard/unAllocatedAsset'),
        axios.get('http://localhost:8080/api/v1/dashboard/totalEmployee'),
        axios.get('http://localhost:8080/api/v1/dashboard/totalAsset'),
        axios.get('http://localhost:8080/api/v1/dashboard/allocatedAssets'),
      ]);

      setDashboardData({
        unAllocatedAsset: unAllocated.data,
        totalEmployee: employees.data,
        totalAsset: totalAssets.data,
        allocatedAssets: allocated.data,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error("Failed to fetch dashboard data.");
    }
  };

  const cardData = [
    { title: "Total Employees", value: dashboardData.totalEmployee, icon: People, color: "bg-gradient-to-r from-green-400 to-green-600" },
    { title: "Total Assets", value: dashboardData.totalAsset, icon: Inventory, color: "bg-gradient-to-r from-blue-400 to-blue-600" },
    { title: "Allocated Assets", value: dashboardData.allocatedAssets, icon: AssignmentTurnedIn, color: "bg-gradient-to-r from-yellow-400 to-yellow-600" },
    { title: "Unallocated Assets", value: dashboardData.unAllocatedAsset, icon: AssignmentLate, color: "bg-gradient-to-r from-red-400 to-red-600" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 mt-14">
          <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-white">
            <div className="p-6 bg-gray-800">
              <h2 className="text-3xl font-bold mb-2 text-white">Dashboard</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
              {cardData.map((card, index) => (
                <div key={index} className={`rounded-lg shadow-md p-6 ${card.color} transform hover:scale-105 transition-transform duration-300`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm uppercase font-semibold mb-1">{card.title}</p>
                      <p className="text-white text-3xl font-bold">{card.value}</p>
                    </div>
                    <card.icon className="text-white text-5xl opacity-75" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
