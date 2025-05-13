import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import serviceService from '../../../../services/serviceService';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import DeleteConfirmationModal from '../../../../components/Delete/DeleteConfirmationModal';
import CreateEditService from './CreateEditService';

function ServiceTable({ selectedImage, setSelectedImage, user, setUser, editOpen, setEditOpen, serviceProviders, setServiceProviders, onLoad }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null);

  const dispatch = useDispatch();

  const handleEdit = (data) => {
    setSelectedService(data);
    setEditOpen(true);
  };

  const handleDeleteClick = (data) => {
    setSelectedService(data);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedService) return;
    dispatch(ShowLoading());
    try {
      await serviceService.deleteService(selectedService);
      setServiceProviders((prevServices) => prevServices.filter(service => service._id !== selectedService._id));
      toast.success("Service deleted successfully");
      onLoad()
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
      setSelectedService(null);
    }
  };

  console.log(serviceProviders, 'serviceProviders')

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedService(null);
    setUser({
      name: '',
      surname: '',
      number: '',
      email: '',
      password: '',
      ethnicity: '',
      location: '',
      height: '',
      hairColor: '',
      callOutType: '',
    });
    setSelectedImage(null);
  }


  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead >
          <tr className="bg-[#E8E9EE] h-[64px]">
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pl-6">
              Name
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Email
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Phone Number
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Location
            </th>
            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Hair Color
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
          {serviceProviders.map((service) => (
            <tr
              key={service.id}
              className="border-b border-[#E8E9EE] h-[79.96px] last:border-none bg-white"
            >
              <td className="text-start text-[12px] pl-6">
                {service?.name}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.email}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.number}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.location}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.hairColor}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.isActive ? "Active" : "Suspended"}
              </td>

              <td className=" flex justify-center items-center h-[79.96px] pr-6">
                <button
                  onClick={() => handleEdit(service)}
                  className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-l-[7.69px]"
                >
                  <FaEdit fontSize={14} color='#0E1E40' />
                </button>

                <button
                  onClick={() => handleDeleteClick(service)}
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
        onClose={handleCloseEdit}
        selectedService={selectedService}
        onLoad={onLoad}
        setUser={setUser}
        user={user}
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
      />

    </div>
  );
}

export default ServiceTable;
