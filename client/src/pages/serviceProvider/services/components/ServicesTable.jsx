import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import serviceService from '../../../../services/serviceService';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import DeleteConfirmationModal from '../../../../components/Delete/DeleteConfirmationModal';
import CreateEditService from './CreateService';

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const loadServiceData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await serviceService.getServicesByProvider(user?._id);
      setServices(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    loadServiceData()
  }, [])

  const handleToggle = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );
  };

  const handleEdit = (id) => {
    setSelectedServiceId(id);
    setEditOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedServiceId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedServiceId) return;
    dispatch(ShowLoading());
    try {
      await serviceService.deleteService(selectedServiceId);
      setServices((prevServices) => prevServices.filter(service => service.id !== selectedServiceId));
      toast.success("Service deleted successfully");
      loadServiceData()
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
      setSelectedServiceId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead >
          <tr className="bg-[#E8E9EE] h-[64px]">
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pl-6">
              Service Name
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Description
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Price
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Duration
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Calendar Color
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Active Status
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pr-6">
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
                  onClick={() => handleEdit(service._id)}
                  className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-l-[7.69px]"
                >
                  <FaEdit fontSize={14} color='#0E1E40' />
                </button>
                <button
                  onClick={() => handleDeleteClick(service._id)}
                  className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] border-l-0 rounded-r-[7.69px]"
                >
                  <RiDeleteBin6Line fontSize={14} color='#EF3826' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => handleConfirmDelete()}
      />
      <CreateEditService
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        serviceId={selectedServiceId}
        refreshServices={loadServiceData}
      />

    </div>
  );
}

export default ServiceTable;
