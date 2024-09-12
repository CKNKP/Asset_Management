import { useState} from "react";
import Header from "../../Header/Header";
import Sidebar from "../UserSidebar/UserSidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UserRequest() {
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    requestedBy: "",
    employeeId: "",
    requisitionNo: "",
    date: "",
    department: "",
    location: "",
    project: "",
    employeeName: "",
    processorType: "",
    lineManagerName: "",
    storageSize: "",
    memorySize: "",
    assetType: "",
    remarks: "",
  });


  const user = sessionStorage.getItem('employeeId');
  console.log(user)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    const formattedFormData = {
      ...formData,
      purchasedOn: new Date(formData.purchasedOn)
        .toISOString()
        .split("T")[0],
      warrantyExpirationDate: new Date(formData.warrantyExpirationDate)
        .toISOString()
        .split("T")[0],
    };
    console.log("Payload:", formattedFormData);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/hardware/save?employeeId=${user}`,
        formattedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Hardware added successfully!");
        setFormData({
            requestedBy: "",
            employeeId: "",
            requisitionNo: "",
            date: "",
            department: "",
            location: "",
            project: "",
            employeeName: "",
            processorType: "",
            lineManagerName: "",
            storageSize: "",
            memorySize: "",
            assetType: "",
            remarks: "",
        });
      } else {
        toast.error("Error adding hardware. Please try again.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Error adding hardware. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setView(!view);
  };
 

  return (
    <>
      {view && (
        <>
          <Header />
          <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 mt-14">
              <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                  <h2 className = "text-2xl font-semibold">Create Request</h2>
                  <button
                    onClick={toggleView}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out"
                  >
                    View
                  </button>
                </div>
                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
                <div>
                  <label
                    htmlFor="requestedBy"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter Employee Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter Employee ID"
                  />
                </div>

                <div>
                  <label
                    htmlFor="requisitionNo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Requisition Number
                  </label>
                  <input
                    id="requisitionNo"
                    name="requisitionNo"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.requisitionNo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Requisition Number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    onChange={handleChange}
                    value={formData.date}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Hard Disk"
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter PC Model"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.location}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Location"
                  />
                 
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project
                  </label>
                  <input
                    id="project"
                    name="project"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.project}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Project Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="employeeName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Employee Name
                  </label>
                  <input
                    id="employeeName"
                    name="employeeName"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.employeeName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Employee Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="processorType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter Processsor Type"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lineManagerName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Line Manager Name
                  </label>
                  <input
                    id="lineManagerName"
                    name="lineManagerName"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.lineManagerName}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter Line Manager Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="storageSize"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter Storage Size"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mmemorySize"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                    placeholder="Enter Memory Size"
                  />
                </div>

                <div>
                  <label
                    htmlFor="assetType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Asset Type
                  </label>
                  <select
                    id="assetType"
                    name="assetType"
                    required
                    onChange={handleChange}
                    value={formData.assetType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="remarks"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Remarks
                  </label>
                  <input
                    id="remarks"
                    name="remarks"
                    type="text"
                    required
                    onChange={handleChange}
                    value={formData.remarks}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Give Remarks"
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
          <ToastContainer/>
        </>
      )}
    </>
  );
}

export default UserRequest;
