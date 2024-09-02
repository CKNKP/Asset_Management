
import Sidebar from "../../Sidebar/Sidebar";
import Header from "../../Header/Header";

const Hardware = () => {




  return (
    <>
     <Header/>
 
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4  mt-14">
            <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white py-4 px-6 flex justify-between gap-5">
                <h2 className="text-2xl font-semibold">Add Hardware</h2>
              </div>
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label
                      htmlFor="machineSerialName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Machine Serial Name
                    </label>
                    <input
                      id="machineSerialName"
                      name="machineSerialName"
                      type="text"
                      required
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
                      htmlFor="hardwareType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Hardware Type
                    </label>
                    <input
                      id="hardwareType"
                      name="hardwareType"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Hardware Type"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="hardDisk"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Hard Disk
                    </label>
                    <input
                      id="hardDisk"
                      name="hardDisk"
                      type="text"
                      required
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter PC Model"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Monitor Model"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assignTo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Assign To
                    </label>
                    <input
                      id="assignTo"
                      name="assignTo"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Assign To"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="assignedFromDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Assigned Date
                    </label>
                    <input
                      id="assignedFromDate"
                      name="assignedFromDate"
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Help Desk Case ID"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Vendor Name"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Invoice Number"
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
                    <input
                      id="assetCategory"
                      name="assetCategory"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Asset Category"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default Hardware;

