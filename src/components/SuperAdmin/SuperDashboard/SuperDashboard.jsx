import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../Header/Header";
import SuperSidebar from "../SuperSidebar/SuperSidebar";
import { People, Inventory, AssignmentTurnedIn, AssignmentLate } from "@mui/icons-material";

const SuperDashboard = () => {
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
    { title: "Total Employees", value: dashboardData.totalEmployee, icon: People, color: "text-green-500" },
    { title: "Total Assets", value: dashboardData.totalAsset, icon: Inventory, color: "text-blue-500" },
    { title: "Allocated Assets", value: dashboardData.allocatedAssets, icon: AssignmentTurnedIn, color: "text-yellow-500" },
    { title: "Unallocated Assets", value: dashboardData.unAllocatedAsset, icon: AssignmentLate, color: "text-red-500" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <SuperSidebar />
        <div className="flex-1 bg-gray-100 flex flex-col p-4 mt-14">
          <div className="w-full shadow-lg rounded-lg overflow-hidden p-6 bg-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-white">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardData.map((card, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                  <card.icon className={`text-5xl ${card.color}`} />
                  <span className="text-3xl font-bold mt-2">{card.value}</span>
                  <span className="text-gray-600 text-center mt-2">{card.title}</span>
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

export default SuperDashboard;
