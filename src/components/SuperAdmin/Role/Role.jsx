import SuperSidebar from "../SuperSidebar/SuperSidebar";
import Header from "../../Header/Header";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Role = () => {
  const [formData, setFormData] = useState({
    roleName: "",
  });

  const [loading, setLoading] = useState(false);

  const employee = sessionStorage.getItem('employeeId');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/role?roleName=${formData.roleName}&employeeId=${employee}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response);

      if (response.data) {
        if (response.data.message) {
          toast.success(response.data.message);
        } else if (response.data.status === "SUCCESS") {
          toast.success("Role added successfully!");
        } else {
          toast.success("Role added successfully!");
        }
        setFormData({ roleName: "" });
      } else {
        toast.error("Unexpected response format. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Error adding role. Please try again.");
      } else if (error.request) {
        toast.error("No response received from server. Please try again.");
      } else {
        toast.error("Error setting up the request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex">
        <SuperSidebar />
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 mt-14">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white py-4 px-6">
              <h2 className="text-2xl font-semibold">Add Role</h2>
            </div>
  
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="roleName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role Name
                </label>
                <input
                  id="roleName"
                  name="roleName"
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.roleName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Role Name"
                />
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
  );
};

export default Role;
