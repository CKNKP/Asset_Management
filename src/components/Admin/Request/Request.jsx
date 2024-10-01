import  { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table, Descriptions, Button} from 'antd';



const AllocationTable = ({ allocations, onDeallocation }) => {
  const handleDeallocation = async (imacNo) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/allocation/deallocate?imacNo=${imacNo}`);
      if (response.data === "Asset deallocated successfully") {
        toast.success("Asset deallocated successfully");
        onDeallocation(imacNo);
      } else {
        toast.error("Failed to deallocate asset");
      }
    } catch (error) {
      console.error('Error deallocating asset:', error);
      toast.error("Error deallocating asset");
    }
  };

  const columns = [
    {
      title: 'IMAC No',
      dataIndex: 'imacNo',
      key: 'imacNo',
    },
    {
      title: 'Employee',
      dataIndex: ['employee', 'employeeName'],
      key: 'employeeName',
      render: (text, record) => (
        <span>
          {text} ({record.employee.employeeId})
        </span>
      ),
    },
    {
      title: 'Device',
      dataIndex: 'deviceName',
      key: 'deviceName',
      render: (text, record) => (
        <span>
          {text} ({record.assetCode})
        </span>
      ),
    },
    {
      title: 'Division',
      dataIndex: 'division',
      key: 'division',
    },
    {
      title: 'Assigned By',
      dataIndex: 'assignedBy',
      key: 'assignedBy',
    },
    {
      title: 'Assigned From',
      dataIndex: 'assignedFrom',
      key: 'assignedFrom',
    },
    {
      title: 'Help Desk No',
      dataIndex: 'helpDeskNo',
      key: 'helpDeskNo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          onClick={() => handleDeallocation(record.imacNo)}
          type="primary" 
          danger
        >
          Deallocate
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Employee Details" span={2}>
          <Descriptions size="small" layout="vertical" bordered>
            <Descriptions.Item label="Email">{record.employee.employeeEmail}</Descriptions.Item>
            <Descriptions.Item label="Department">{record.employee.employeeDepartment}</Descriptions.Item>
            <Descriptions.Item label="Grade">{record.employee.employeeGrade}</Descriptions.Item>
            <Descriptions.Item label="Location">{record.employee.employeeLocation}</Descriptions.Item>
            <Descriptions.Item label="Designation">{record.employee.employeeDesignation}</Descriptions.Item>
            <Descriptions.Item label="Date of Joining">{record.employee.dateOfJoining}</Descriptions.Item>
            <Descriptions.Item label="Reporting Manager">{record.employee.reportingManager}</Descriptions.Item>
            <Descriptions.Item label="Manager Email">{record.employee.reportingManagerEmailId}</Descriptions.Item>
            <Descriptions.Item label="Status">{record.employee.employeeStatus}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="Hardware Details" span={2}>
          <Descriptions size="small" layout="vertical" bordered>
            <Descriptions.Item label="Machine Serial No">{record.hardware.machineSerialNo}</Descriptions.Item>
            <Descriptions.Item label="Processor Type">{record.hardware.processorType}</Descriptions.Item>
            <Descriptions.Item label="Hardware Type">{record.hardware.hardWareType}</Descriptions.Item>
            <Descriptions.Item label="Hard Disk">{record.hardware.harddisk}</Descriptions.Item>
            <Descriptions.Item label="PC Model">{record.hardware.pcModel}</Descriptions.Item>
            <Descriptions.Item label="RAM">{record.hardware.ram}</Descriptions.Item>
            <Descriptions.Item label="Make Type">{record.hardware.makeType}</Descriptions.Item>
            <Descriptions.Item label="Monitor Model">{record.hardware.monitorModel}</Descriptions.Item>
            <Descriptions.Item label="Help Desk Case ID">{record.hardware.helpDeskCaseId}</Descriptions.Item>
            <Descriptions.Item label="Invoice No">{record.hardware.invoiceNo}</Descriptions.Item>
            <Descriptions.Item label="Vendor Name">{record.hardware.vendorName}</Descriptions.Item>
            <Descriptions.Item label="Asset Status">{record.hardware.assetStatus}</Descriptions.Item>
            <Descriptions.Item label="Purchased On">{record.hardware.purchasedOn}</Descriptions.Item>
            <Descriptions.Item label="Warranty Expiration">{record.hardware.warrantyExpirationDate}</Descriptions.Item>
            <Descriptions.Item label="Warranty Status">{record.hardware.warrantyExpirationStatus}</Descriptions.Item>
            <Descriptions.Item label="Asset Category">{record.hardware.assetCategory}</Descriptions.Item>
          </Descriptions>
        </Descriptions.Item>
        <Descriptions.Item label="IMAC Requirements">{record.imacRequirements}</Descriptions.Item>
        <Descriptions.Item label="Software ID">{record.softwareId}</Descriptions.Item>
        <Descriptions.Item label="Assigned To">{record.assignTo}</Descriptions.Item>
        <Descriptions.Item label="Assigned Up To">{record.assignedUpto || 'N/A'}</Descriptions.Item>
      </Descriptions>
    );
  };

  return (
    <Table 
      columns={columns} 
      dataSource={allocations} 
      rowKey="imacNo" 
      expandable={{
        expandedRowRender,
        rowExpandable: record => true,
      }}
    />
  );
};

function Request() {
  const [view, setView] = useState(true);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [machineOptions, setMachineOptions] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [hardwareDetails, setHardwareDetails] = useState({});
  const [formData, setFormData] = useState({
    deviceName: "",
    assetCode: "",
    division: "",
    employeeId: "",
    imacRequirement: "",
    assignTo: "",
    machineSerialNo: "",
    softwareRQ: [],
    requisitionNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [allocations, setAllocations] = useState([]);

  const employee = sessionStorage.getItem('employeeId');

  useEffect(() => {
    fetchEmployeeIds();
    fetchMachineSerialNumbers();
    if (!view) {
      fetchAllocations();
    }
  }, [view]);

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
    }
  };

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/employee/get?employeeId=${employeeId}`);
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const fetchMachineSerialNumbers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/hardware/all');
      const options = response.data.map(hardware => ({
        value: hardware.machineSerialNo,
        label: hardware.machineSerialNo
      }));
      setMachineOptions(options);
    } catch (error) {
      console.error('Error fetching machine serial numbers:', error);
    }
  };

  const fetchHardwareDetails = async (machineSerialNo) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/hardware/get/id?id=${machineSerialNo}`);
      setHardwareDetails(response.data);
    } catch (error) {
      console.error('Error fetching hardware details:', error);
    }
  };

  const fetchAllocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/allocation/getAll');
      setAllocations(response.data);
    } catch (error) {
      console.error('Error fetching allocations:', error);
      toast.error("Failed to fetch allocations.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEmployeeChange = (selectedOption, action) => {
    setSelectedEmployee(selectedOption);
    fetchEmployeeDetails(selectedOption.value);
    setFormData(prevState => ({
      ...prevState,
      [action.name]: selectedOption.value
    }));
  };

  const handleMachineChange = (selectedOption) => {
    setSelectedMachine(selectedOption);
    fetchHardwareDetails(selectedOption.value);
    setFormData(prevState => ({
      ...prevState,
      machineSerialNo: selectedOption.value
    }));
  };

  const handleSoftwareChange = (e) => {
    const software = e.target.value.split(',').map(s => s.trim());
    setFormData(prevState => ({
      ...prevState,
      softwareRQ: software
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/allocation/asset?employeeId=${employee}`, formData);
      console.log('Form submitted successfully:', response.data);
      toast.success("Request submitted successfully!");
      setFormData({
        deviceName: "",
        assetCode: "",
        division: "",
        employeeId: "",
        imacRequirement: "",
        assignTo: "",
        machineSerialNo: "",
        softwareRQ: [],
      });
      setSelectedEmployee(null);
      setSelectedMachine(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error submitting request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setView(!view);
  };

  const handleDeallocation = (imacNo) => {
    setAllocations(prevAllocations => prevAllocations.filter(allocation => allocation.imacNo !== imacNo));
  };


  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4 mt-14">
          <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
              <h2 className="text-2xl font-semibold">
                {view ? "Asset Allocation" : "Allocation Information"}
              </h2>
              <button
                onClick={toggleView}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150 ease-in-out"
              >
                {view ? "View" : "Add"}
              </button>
            </div>
            {view ? (
              <>
                <div className="bg-gray-700 text-white justify-center flex py-2 px-3 mt-3">
                  <h2 className="text-1xl font-semibold">
                    IMAC Requisition Form
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div>
                    <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700">Device name</label>
                    <input
                      id="deviceName"
                      name="deviceName"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MacBook Pro 16-inch"
                      value={formData.deviceName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="assetCode" className="block text-sm font-medium text-gray-700">Asset code</label>
                    <input
                      id="assetCode"
                      name="assetCode"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MBP16-2024-001"
                      value={formData.assetCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
                    <input
                      id="division"
                      name="division"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="IT"
                      value={formData.division}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID</label>
                    <Select
                      id="employeeId"
                      name="employeeId"
                      options={employeeOptions}
                      value={selectedEmployee}
                      onChange={handleEmployeeChange}
                      className="w-full"
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
                      value={employeeDetails.employeeName || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      value={employeeDetails.employeeDepartment || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      value={employeeDetails.employeeDesignation || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      value={employeeDetails.employeeGrade || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      value={employeeDetails.employeeLocation || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      type="text"
                      value={employeeDetails.dateOfJoining || ''}
                      readOnly
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label htmlFor="machineSerialNumber" className="block text-sm font-medium text-gray-700">Machine Serial Number</label>
                    <Select
                      id="machineSerialNumber"
                      name="machineSerialNo"
                      options={machineOptions}
                      value={selectedMachine}
                      onChange={handleMachineChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="processorType" className="block text-sm font-medium text-gray-700">Processor Type</label>
                    <input
                      id="processorType"
                      name="processorType"
                      type="text"
                      value={hardwareDetails.processorType || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="hardwareRequirement" className="block text-sm font-medium text-gray-700">Hardware Type</label>
                    <input
                      id="hardwareRequirement"
                      name="hardwareRequirement"
                      type="text"
                      value={hardwareDetails.hardWareType || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="pcModel" className="block text-sm font-medium text-gray-700">PC Model</label>
                    <input
                      id="pcModel"
                      name="pcModel"
                      type="text"
                      value={hardwareDetails.pcModel || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="hdd" className="block text-sm font-medium text-gray-700">HDD</label>
                    <input
                      id="hdd"
                      name="hdd"
                      type="text"
                      value={hardwareDetails.harddisk || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="RAM" className="block text-sm font-medium text-gray-700 mb-1">RAM</label>
                    <input
                      id="RAM"
                      name="RAM"
                      type="text"
                      value={hardwareDetails.ram || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="helpDeskCaseId" className="block text-sm font-medium text-gray-700">HelpDesk Case ID</label>
                    <input
                      id="helpDeskCaseId"
                      name="helpDeskCaseId"
                      type="text"
                      value={hardwareDetails.helpDeskCaseId || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="makeType" className="block text-sm font-medium text-gray-700">Make Type</label>
                    <input
                      id="makeType"
                      name="makeType"
                      type="text"
                      value={hardwareDetails.makeType || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label>IMAC Requirement</label>
                    <input
                      id="imacRequirement"
                      name="imacRequirement"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Yes/No"
                      value={formData.imacRequirement}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">Assign To</label>
                    <Select
                      id="assignTo"
                      name="assignTo"
                      options={employeeOptions}
                      value={employeeOptions.find(option => option.value === formData.assignTo)}
                      onChange={handleEmployeeChange}
                      className="w-full"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="softwareRQ" className="block text-sm font-medium text-gray-700">Software Requirements</label>
                    <input
                      id="softwareRQ"
                      name="softwareRQ"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Adobe Photoshop, Microsoft Office 365, Slack"
                      value={formData.softwareRQ.join(', ')}
                      onChange={handleSoftwareChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="requisitionNumber" className="block text-sm font-medium text-gray-700">Requisition Number</label>
                    <input
                      id="requisitionNumber"
                      name="requisitionNumber"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter requisition number"
                      value={formData.requisitionNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-4">
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
              </>
            ) : (
              <div className="p-6">
                 <AllocationTable allocations={allocations} onDeallocation={handleDeallocation} />
                 </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Request;
