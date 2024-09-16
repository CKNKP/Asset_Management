import { useState, useEffect } from "react";
import SuperSidebar from "../SuperSidebar/SuperSidebar";
import Header from "../../Header/Header";
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignRole = () => {
  const [roles, setRoles] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchEmployeeIds();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/role/get/all/role');
      const roleOptions = response.data.map(role => ({ value: role, label: role }));
      setRoles(roleOptions);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Error fetching roles. Please try again.');
    }
  };

  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/employee/get/ids');
      const options = response.data.map(employee => ({
        value: employee.id,
        label: `${employee.name} (${employee.id})`
      }));
      setEmployeeOptions(options);
    } catch (error) {
      console.error('Error fetching employee IDs:', error);
      toast.error('Error fetching employee IDs. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedRole || !selectedEmployee) {
      toast.error('Please select both a role and an employee.');
      setLoading(false);
      return;
    }

    const loginId = sessionStorage.getItem('employeeId');

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/employee/assign/${selectedRole.value}/${selectedEmployee.value}?loginId=${loginId}`
      );

      if (response.data && response.data.message) {
        toast.success(response.data.message);
        setSelectedRole(null);
        setSelectedEmployee(null);
      } else {
        toast.success('Role assigned successfully!');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error(error.response?.data?.message || 'Error assigning role. Please try again.');
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
              <h2 className="text-2xl font-semibold">Assign Role</h2>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <Select
                  id="role"
                  options={roles}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  className="w-full"
                  placeholder="Select Role"
                />
              </div>
              <div>
                <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
                  Employee
                </label>
                <Select
                  id="employee"
                  options={employeeOptions}
                  value={selectedEmployee}
                  onChange={setSelectedEmployee}
                  className="w-full"
                  placeholder="Select Employee"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? "Assigning..." : "Assign Role"}
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

export default AssignRole;
