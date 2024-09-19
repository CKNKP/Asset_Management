import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import UserSidebar from "../UserSidebar/UserSidebar";
import { Table } from "antd";

const UserRequest = () => {
  const [view, setView] = useState(true);
  const [formData, setFormData] = useState({
    requestedBy: "",
    employeeId: "",
    department: "",
    dateOfRequest: "",
    projectName: "",
    processorType: "",
    workLocation: "",
    storageSize: "",
    memorySize: "",
    assetType: "",
    remarks: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [trackingData, setTrackingData] = useState([]);

  useEffect(() => {
    const employeeId = sessionStorage.getItem("employeeId");
    if (employeeId) {
      setFormData(prevState => ({ ...prevState, employeeId }));
    }
  }, []);

  const toggleView = () => {
    setView(!view);
    if (!view) {
      fetchTrackingData();
    }
  };

  const fetchTrackingData = async () => {
    try {
      const employeeId = sessionStorage.getItem("employeeId");
      const response = await axios.get(`http://localhost:8080/api/user/trackStatus?employeeId=${employeeId}`);
      setTrackingData([response.data]); 
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      toast.error("Failed to fetch tracking data.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendRequest",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResponseData(response.data);
        setShowModal(true);
        toast.success("Request sent successfully!");
        setFormData({
          requestedBy: "",
          department: "",
          dateOfRequest: "",
          projectName: "",
          processorType: "",
          workLocation: "",
          storageSize: "",
          memorySize: "",
          assetType: "",
          remarks: "",
        });
      } else {
        toast.error("Error sending request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Requisition Number",
      dataIndex: "requisitionNumber",
      key: "requisitionNumber",
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      key: "requestedBy",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Requested Date",
      dataIndex: "requestedDate",
      key: "requestedDate",
      render: (date) => date.join("-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <UserSidebar />
        <div className="flex-1 bg-gray-100 flex flex-col p-4 mt-14">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white py-4 px-6 flex justify-between">
              <h2 className="text-2xl font-semibold">
                {view ? "Create Request" : "Track Request Status"}
              </h2>
              <button
                onClick={toggleView}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                {view ? "View Status" : "Create Request"}
              </button>
            </div>

            {view ? (
              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="requestedBy" className="block text-sm font-medium text-gray-700 mb-1">
                      Requested By
                    </label>
                    <input
                      id="requestedBy"
                      name="requestedBy"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.requestedBy}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                      Employee ID
                    </label>
                    <input
                      id="employeeId"
                      name="employeeId"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.employeeId}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your employee ID"
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      id="department"
                      name="department"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.department}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your department"
                    />
                  </div>

                  <div>
                    <label htmlFor="dateOfRequest" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Request
                    </label>
                    <input
                      id="dateOfRequest"
                      name="dateOfRequest"
                      type="date"
                      required
                      onChange={handleChange}
                      value={formData.dateOfRequest}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      id="projectName"
                      name="projectName"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.projectName}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label htmlFor="processorType" className="block text-sm font-medium text-gray-700 mb-1">
                      Processor Type
                    </label>
                    <input
                      id="processorType"
                      name="processorType"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.processorType}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter processor type"
                    />
                  </div>

                  <div>
                    <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Location
                    </label>
                    <input
                      id="workLocation"
                      name="workLocation"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.workLocation}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter work location"
                    />
                  </div>

                  <div>
                    <label htmlFor="storageSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Storage Size
                    </label>
                    <input
                      id="storageSize"
                      name="storageSize"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.storageSize}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter storage size"
                    />
                  </div>

                  <div>
                    <label htmlFor="memorySize" className="block text-sm font-medium text-gray-700 mb-1">
                      Memory Size
                    </label>
                    <input
                      id="memorySize"
                      name="memorySize"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.memorySize}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter memory size"
                    />
                  </div>

                  <div>
                    <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 mb-1">
                      Asset Type
                    </label>
                    <input
                      id="assetType"
                      name="assetType"
                      type="text"
                      required
                      onChange={handleChange}
                      value={formData.assetType}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter asset type"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                    Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    rows="3"
                    onChange={handleChange}
                    value={formData.remarks}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter any additional remarks"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  dataSource={trackingData}
                  rowKey="requisitionNumber"
                  style={{ whiteSpace: "nowrap" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Request Sent Successfully</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  The asset request has been sent to the admin.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => setShowModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default UserRequest;
