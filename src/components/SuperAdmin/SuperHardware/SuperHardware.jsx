import Sidebar from "../Sidebar/Sidebar";
import Header from "../../Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

const Hardware = () => {
  const [view, setView] = useState(true);
  const [hardware, setHardware] = useState([]);

  const toggleView = () => {
    setView(!view);

    if (!view) {
      fetchHardware();
    }
  };

  useEffect(() => {
    fetchHardware();
  }, []);

  const fetchHardware = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/hardware/all"
      );
      setHardware(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  const columns = [
    {
      title: "Machine Serial No",
      dataIndex: "machineSerialNo",
      key: "machineSerialNo",
    },
    {
      title: "Processor Type",
      dataIndex: "processorType",
      key: "processorType",
    },
    {
      title: "Hardware Type",
      dataIndex: "hardWareType",
      key: "hardWareType",
    },
    {
      title: "Hard Disk",
      dataIndex: "harddisk",
      key: "harddisk",
    },
    {
      title: "PC Model",
      dataIndex: "pcModel",
      key: "pcModel",
    },
    {
      title: "RAM",
      dataIndex: "ram",
      key: "ram",
    },
    {
      title: " Make Type",
      dataIndex: "makeType",
      key: "makeType",
    },
    {
      title: "Monitor Model",
      dataIndex: "monitorModel",
      key: "monitorModel",
    },
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
  ];

  const [formData, setFormData] = useState({
    machineSerialNo: "",
    processorType: "",
    hardWareType: "",
    harddisk: "",
    pcModel: "",
    ram: "",
    makeType: "",
    monitorModel: "",
    helpDeskCaseId: "",
    invoiceNo: "",
    vendorName: "",
    purchasedOn: "",
    warrantyExpirationStatus: "",
    warrantyExpirationDate: "",
    assetCategory: "",
    assetValue:"",
  });

  const [loading, setLoading] = useState(false);

  const employee = sessionStorage.getItem("employeeId");
  console.log(employee);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedFormData = {
      ...formData,
      purchasedOn: new Date(formData.purchasedOn).toISOString().split("T")[0],
      warrantyExpirationDate: new Date(formData.warrantyExpirationDate)
        .toISOString()
        .split("T")[0],
    };
    console.log("Payload:", formattedFormData);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/hardware/save?employeeId=${employee}`,
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
          machineSerialNo: "",
          processorType: "",
          hardWareType: "",
          harddisk: "",
          pcModel: "",
          ram: "",
          makeType: "",
          monitorModel: "",
          helpDeskCaseId: "",
          invoiceNo: "",
          vendorName: "",
          purchasedOn: "",
          warrantyExpirationStatus: "",
          warrantyExpirationDate: "",
          assetCategory: "",
          assetValue: "",
        });
      } else {
        toast.error("Error adding hardware. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding hardware. Please try again.");
    } finally {
      setLoading(false);
    }
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
                  <h2 className="text-2xl font-semibold">Add Hardware</h2>
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
                        htmlFor="machineSerialNo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Machine Serial No
                      </label>
                      <input
                        id="machineSerialNo"
                        name="machineSerialNo"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.machineSerialNo}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Serial Number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="processorType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Processor Type
                      </label>
                      <select
                        id="processorType"
                        name="processorType"
                        required
                        onChange={handleChange}
                        value={formData.processorType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Processor Type</option>
                        <option value="Intel® Core™ i3">Intel® Core™ i3</option>
                        <option value="Intel® Core™ i5">Intel® Core™ i5</option>
                        <option value="Intel® Core™ i7">Intel® Core™ i7</option>
                        <option value="Intel® Core™ i9">Intel® Core™ i9</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="hardWareType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Hardware Type
                      </label>
                      <input
                        id="hardWareType"
                        name="hardWareType"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.hardWareType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Hardware Type"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="harddisk"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Hard Disk
                      </label>
                      <input
                        id="harddisk"
                        name="harddisk"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.harddisk}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Hard Disk"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pcModel"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        PC Model
                      </label>
                      <input
                        id="pcModel"
                        name="pcModel"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.pcModel}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter PC Model"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ram"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        RAM
                      </label>
                      <select
                        id="ram"
                        name="ram"
                        required
                        onChange={handleChange}
                        value={formData.ram}
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
                      <label
                        htmlFor="makeType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Make Type
                      </label>
                      <input
                        id="makeType"
                        name="makeType"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.makeType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Make Type"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="monitorModel"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Monitor Model
                      </label>
                      <input
                        id="monitorModel"
                        name="monitorModel"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.monitorModel}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Monitor Model"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="helpDeskCaseId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Help Desk Case ID
                      </label>
                      <input
                        id="helpDeskCaseId"
                        name="helpDeskCaseId"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.helpDeskCaseId}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Help Desk Case ID"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="invoiceNo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Invoice No.
                      </label>
                      <input
                        id="invoiceNo"
                        name="invoiceNo"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.invoiceNo}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Invoice No."
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
                        required
                        onChange={handleChange}
                        value={formData.vendorName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Vendor Name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="purchasedOn"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Purchased On
                      </label>
                      <input
                        id="purchasedOn"
                        name="purchasedOn"
                        type="date"
                        required
                        onChange={handleChange}
                        value={formData.purchasedOn}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="warrantyExpirationStatus"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Warranty Expiration Status
                      </label>
                      <input
                        id="warrantyExpirationStatus"
                        name="warrantyExpirationStatus"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.warrantyExpirationStatus}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Status"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="warrantyExpirationDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Warranty Expiration Date
                      </label>
                      <input
                        id="warrantyExpirationDate"
                        name="warrantyExpirationDate"
                        type="date"
                        required
                        onChange={handleChange}
                        value={formData.warrantyExpirationDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="assetCategory"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Asset Category
                      </label>
                      <select
                        id="assetCategory"
                        name="assetCategory"
                        required
                        onChange={handleChange}
                        value={formData.assetCategory}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Category</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="assetValue"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Asset Value
                      </label>
                      <input
                        id="assetValue"
                        name="assetValue"
                        type="text"
                        required
                        onChange={handleChange}
                        value={formData.assetValue}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
            <Sidebar />
            <div className="flex-1 bg-gray-100 flex flex-col p-4 mt-14">
              <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                  <h2 className="text-2xl font-semibold">
                    Hardware Information
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
                    dataSource={hardware}
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

export default Hardware;
