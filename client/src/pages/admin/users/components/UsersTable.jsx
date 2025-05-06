import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import DeleteConfirmationModal from '../../../../components/Delete/DeleteConfirmationModal';
import CreateEditService from './CreateService';
import userService from '../../../../services/userService';

function UsersTable({ users, setUsers, onLoad }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const dispatch = useDispatch();

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
      await userService.deleteUser(selectedServiceId);
      setUsers((prevServices) => prevServices.filter(service => service.id !== selectedServiceId));
      toast.success("Service deleted successfully");
      onLoad()
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
      setSelectedServiceId(null);
    }
  };

  // const handleToggle = async (id) => {
  //   setUsers((prevServices) =>
  //     prevServices.map((service) =>
  //       service._id === id
  //         ? { ...service, isActive: !service.isActive }
  //         : service
  //     )
  //   );

  //   try {
  //     dispatch(ShowLoading());
  //     await serviceService.updateService(id, { isActive: !users.find(service => service._id === id)?.isActive });
  //     toast.success("Service status updated successfully");
  //     onLoad();
  //   } catch (error) {
  //     console.error("Error updating service status:", error);
  //     toast.error("Failed to update service status");
  //   } finally {
  //     dispatch(HideLoading());
  //   }
  // };


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
              Mobile number
            </th>

            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Date of birth
            </th>

            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal">
              Profile Status
            </th>

            <th className="text-sm font-bold text-center md:whitespace-nowrap whitespace-normal pr-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.result?.users?.map((service) => (
            <tr
              key={service.id}
              className="border-b border-[#E8E9EE] h-[79.96px] last:border-none bg-white"
            >
              <td className="text-start text-[12px] pl-6">
                {service?.name}
              </td>

              <td className="text-start text-[12px] pl-6">
                {service?.email}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.number}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.dateOfBirth}
              </td>

              <td className="text-center text-[12px] pl-6">
                {service?.isActive ? "Active" : "Suspended"}
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
        onLoad={onLoad}
      />

    </div>
  );
}

export default UsersTable;
