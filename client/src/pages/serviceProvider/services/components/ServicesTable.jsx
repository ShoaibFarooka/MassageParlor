import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";

function ServiceTable() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Swedish Massage',
      description: 'A relaxing massage using gentle techniques...',
      price: 'R920.00',
      duration: '1h',
      calendarColor: '#A78BFA', // example color
      isActive: true,
    },
    {
      id: 2,
      name: 'Swedish Massage',
      description: 'A relaxing massage using gentle techniques...',
      price: 'R920.00',
      duration: '0.5h',
      calendarColor: '#A78BFA',
      isActive: false,
    },
  ]);

  // Toggle active status
  const handleToggle = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  // Example edit & delete handlers
  const handleEdit = (id) => {
    alert(`Editing service with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting service with ID: ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow ">
      {/* Responsive scroll container */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[600px] ">
          <thead>
            <tr className="bg-[#E8E9EE] h-[64px] ">
              <th className=" text-sm font-bold text-center whitespace-nowrap pl-6">
                Service Name
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap">
                Description
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap">
                Price
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap">
                Duration
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap">
                Calendar Color
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap">
                Active Status
              </th>
              <th className=" text-sm font-bold text-center whitespace-nowrap pr-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-[#E8E9EE] h-[79.96px] last:border-none bg-white"
              >
                <td className="text-center text-[12px] pl-6">
                  {service.name}
                </td>
                <td className="text-center text-[12px] ">
                  {service.description}
                </td>
                <td className="text-center text-[13px] font-semibold">
                  {service.price}
                </td>
                <td className="text-center text-[13px] font-semibold">
                  {service.duration}
                </td>
                <td className="">
                  {/* Calendar Color Circle */}
                  <div
                    className="w-5 h-5 rounded-full mx-auto"
                    style={{ backgroundColor: service.calendarColor }}
                  ></div>
                </td>
                <td className=" ">
                  {/* Toggle for Active/Inactive */}
                  <div className=' flex justify-center items-center h-[79.96px]'>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={service.isActive}
                      onChange={() => handleToggle(service.id)}
                    />
                    {/* Slider background */}
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-[#5E50BF] relative transition-colors duration-200">
                      {/* Slider knob */}
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transform transition-transform duration-200
                          ${service.isActive ? 'translate-x-5' : ''}`}
                      ></span>
                    </div>
                  </label>
                  <span className="ml-2 text-sm">
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                  </div>
                </td>
                <td className=" flex justify-center items-center h-[79.96px] pr-6">
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-l-[7.69px]"
                  >
                    <FaEdit fontSize={14} color='#0E1E40' />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] border-l-0 rounded-r-[7.69px]"
                  >
                    <RiDeleteBin6Line fontSize={14} color='#EF3826' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceTable;
