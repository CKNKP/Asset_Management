import { useState,useEffect } from "react";

import SuperSidebar from "../SuperSidebar/SuperSidebar";

import Header from "../../Header/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";


const Software = () => {
  const [view, setView] = useState(true);
  const [software, setSoftware] = useState([]);

  const toggleView = () => {
    setView(!view);

    if (!view) {
      fetchSoftware();
    }
  };

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/software/list"
      );
      setSoftware(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  const columns = [
    {
      title: "Software Name",
      dataIndex: "softwareName",
      key: "softwareName",
    },
    {
      title: "License Key",
      dataIndex: "liscenseKey",
      key: "liscenseKey",
    },
    {
      title: "Software Expiry Date",
      dataIndex: "softwareExpiryDate",
      key: "softwareExpiryDate",
    },
    {
      title: "Software Purchase Date",
      dataIndex: "softwareInstallationDate",
      key: "softwareInstallationDate",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "License Type",
      dataIndex: "liscenseType",
      key: "liscenseType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const [softwareData, setSoftwareData] = useState({
    softwareName: "",
    liscenseKey: "",
    softwareExpiryDate: "",
    softwareInstallationDate: "",
    version: "",
    vendorName: "",
    liscenseType: "", 
    status: "",
    description: "",
  });

  const employee = sessionStorage.getItem('employeeId');
  console.log(employee)


  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setSoftwareData({ ...softwareData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    
    const formattedSoftwareData = {
      ...softwareData,
      softwareExpiryDate: new Date(softwareData.softwareExpiryDate).toISOString().split('T')[0],
      softwareInstallationDate: new Date(softwareData.softwareInstallationDate).toISOString().split('T')[0],
    };
    console.log("Payload:", formattedSoftwareData);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/software/addsoftware?employeeId=${employee}`,
        formattedSoftwareData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Software added successfully!");
      
        setSoftwareData({
          softwareName: "",
          liscenseKey: "",
          softwareExpiryDate: "",
          softwareInstallationDate: "",
          version: "",
          vendorName: "",
          liscenseType: "",
          status: "",
          description: "",
        });

      } else {
        toast.error("Error adding software. Please try again.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Error adding software. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      { view && (
        <>
      <Header />
      <div className="min-h-screen flex">
        <SuperSidebar />
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 mt-14">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
              <h2 className="text-2xl font-semibold">Add Software</h2>
              <button
                    onClick={toggleView}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    View
                  </button>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="softwareName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Software Name
                  </label>
                  <input
                    id="softwareName"
                    name="softwareName"
                    type="text"
                    value={softwareData.softwareName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Software Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="liscenseKey"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    License Key
                  </label>
                  <input
                    id="liscenseKey"
                    name="liscenseKey"
                    type="text"
                    value={softwareData.liscenseKey}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter License Key"
                  />
                </div>

                <div>
                  <label
                    htmlFor="softwareInstallationDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Software Purchase Date
                  </label>
                  <input
                    id="softwareInstallationDate"
                    name="softwareInstallationDate"
                    type="date"
                    value={softwareData.softwareInstallationDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="softwareExpiryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Software Expiry Date
                  </label>
                  <input
                    id="softwareExpiryDate"
                    name="softwareExpiryDate"
                    type="date"
                    value={softwareData.softwareExpiryDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

              

                <div>
                  <label
                    htmlFor="version"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Version
                  </label>
                  <input
                    id="version"
                    name="version"
                    type="text"
                    value={softwareData.version}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Version"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vendorName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vendor Name
                  </label>
                  <input
                    id="vendorName"
                    name="vendorName"
                    type="text"
                    value={softwareData.vendorName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Vendor Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="liscenseType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    License Type
                  </label>
                  <input
                    id="liscenseType"
                    name="liscenseType"
                    type="text"
                    value={softwareData.liscenseType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter License Type"
                  />
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <input
                    id="status"
                    name="status"
                    type="text"
                    value={softwareData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Software Status"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={softwareData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Software Description"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
    )}
    {!view && (
        <>
          <Header />
          <div className="min-h-screen flex">
            <SuperSidebar />
            <div className="flex-1 bg-gray-100 flex flex-col p-4 mt-14">
              <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                  <h2 className="text-2xl font-semibold">
                    Software Information
                  </h2>
                  <button
                    onClick={toggleView}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                  >
                    Add
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    columns={columns}
                    dataSource={software}
                    rowKey="employeeId"
                    style={{ whiteSpace: "nowrap" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Software;
