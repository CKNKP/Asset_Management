import { useState } from "react";
import Header from "../../Header/Header";
import Sidebar from "../../Sidebar/Sidebar";

function Request() {
  const [view, setView] = useState(true);

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
                  <h2 className="text-2xl font-semibold">Create Request</h2>
                  <button
                    onClick={toggleView}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out"
                  >
                    View
                  </button>
                </div>
                <div className="bg-gray-700 text-white justify-center flex py-2 px-3 mt-3">
                  <h2 className="text-1xl font-semibold">
                    IMAC Requisition Form
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <label
                        htmlFor="hostname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Hostname
                      </label>
                      <input
                        id="hostname"
                        name="hostname"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="IMAC"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="assetCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Asset code
                      </label>
                      <input
                        id="assetCode"
                        name="assetCode"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="IMAC-001"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="division"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Division
                      </label>
                      <input
                        id="division"
                        name="division"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="IT"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="employeeId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Employee ID
                      </label>
                      <input
                        id="employeeId"
                        name="employeeId"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="LD000143"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 text-white justify-center flex py-2 px-3 mt-3">
                  <h2 className="text-1xl font-semibold">
                    Employee Personal Details
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="employeeName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Employee Name
                      </label>
                      <input
                        id="employeeName"
                        name="employeeName"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <input
                        id="department"
                        name="department"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Human Resources"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Designation
                      </label>
                      <input
                        id="designation"
                        name="designation"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Manager"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="grade"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Grade
                      </label>
                      <input
                        id="grade"
                        name="grade"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="A"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="India"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dateOfJoining"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Joining
                      </label>
                      <input
                        id="dateOfJoining"
                        name="dateOfJoining"
                        type="date"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 text-white justify-center flex py-2 px-3 mt-3">
                  <h2 className="text-1xl font-semibold">
                    Details for Hardware Requirement
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="machineSerialNumber" className="block text-sm font-medium text-gray-700">Machine Serial Number</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" required id="machineSerialNumber" name="machineSerialNumber">
                        <option value="">Select Machine Serial Number</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="imacRequirement" className="block text-sm font-medium text-gray-700">IMAC Requirement</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" required id="imacRequirement" name="imacRequirement">
                        <option value="">Select IMAC Requirement</option>

                      </select>
                    </div>
                    <div>
                      <label htmlFor="processorType" className="block text-sm font-medium text-gray-700">Processor Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" required id="processorType" name="processorType">
                        <option value="">Select Processor Type</option>
                      </select>

                    </div>
                    <div>
                      <label htmlFor="hardwareRequirement" className="block text-sm font-medium text-gray-700">Hardware Requirement</label>
                      <input
                        id="hardwareRequirement"
                        name="hardwareRequirement"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Laptop"
                      />
                    </div>
                    <div>
                      <label htmlFor="pcModel" className="block text-sm font-medium text-gray-700">PC Model</label>
                      <input
                        id="pcModel"
                        name="pcModel"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="HP"
                      />
                    </div>
                    <div>
                      <label htmlFor="hdd" className="block text-sm font-medium text-gray-700">HDD</label>
                      <input
                        id="hdd"
                        name="hdd"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="500 GB"
                      />

                    </div>
                    <div>
                      <label
                        htmlFor="RAM"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        RAM
                      </label>
                      <select
                        id="RAM"
                        name="RAM"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select RAM</option>
                        <option value="4GB">4GB</option>
                        <option value="8GB">8GB</option>
                        <option value="12GB">12GB</option>
                        <option value="16GB">16GB</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="helpDeskCaseId" className="block text-sm font-medium text-gray-700">HelpDesk Case ID</label>
                      <input
                        id="helpDeskCaseId"
                        name="helpDeskCaseId"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="LD000143"
                      />
                    </div>
                    <div>
                      <label htmlFor="makeType" className="block text-sm font-medium text-gray-700">Make Type</label>
                      <input
                        id="makeType"
                        name="makeType"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Laptop"
                      />
                    </div>
                    <div>
                      <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">Assign To</label>
                      <input
                        id="assignTo"
                        name="assignTo"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 text-white justify-center flex py-2 px-3 mt-3">
                  <h2 className="text-1xl font-semibold">
                    Details for Software Requirement
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                      <div>
                        <label htmlFor="software" className="block text-sm font-medium text-gray-700">Software</label>
                        <input 
                          id="software"
                          name="software"
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Microsoft Office"
                        />
                      </div>
                      <div>
                        <label htmlFor="bit" className="block text-sm font-medium text-gray-700">BIT</label>
                        <input
                          id="bit"
                          name="bit"
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="64"
                        />
                      </div>
                      <div>
                        <label htmlFor="licenseKey" className="block text-sm font-medium text-gray-700">License Key</label>
                        <input 
                          id="licenseKey"
                          name="licenseKey"
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-4">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </div>

              </div>
              
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Request;
