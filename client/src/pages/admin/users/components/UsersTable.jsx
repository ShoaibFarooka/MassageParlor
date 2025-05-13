import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import DeleteConfirmationModal from '../../../../components/Delete/DeleteConfirmationModal';
import CreateEditService from './CreateUser';
import userService from '../../../../services/userService';
import CreateUser from './CreateUser';

function UsersTable({ users, setUsers, onLoad }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch();

  const handleEdit = (data) => {
    setSelectedUser(data);
    setIsOpen(true);
  };

  const handleDeleteClick = (data) => {
    setSelectedUser(data);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    dispatch(ShowLoading());
    try {
      await userService.deleteUser(selectedUser._id);
      onLoad();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
      setSelectedUser(null);
    }
  };

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
          {users?.map((user) => (
            <tr
              key={user.id}
              className="border-b border-[#E8E9EE] h-[79.96px] last:border-none bg-white"
            >
              <td className="text-start text-[12px] pl-6">
                {user?.name}
              </td>

              <td className="text-center text-[12px] pl-6">
                {user?.email}
              </td>

              <td className="text-center text-[12px] pl-6">
                {user?.number}
              </td>

              <td className="text-center text-[12px] pl-6">
                {user?.dateOfBirth}
              </td>

              <td className="text-center text-[12px] pl-6">
                <div className={`${user?.isActive ? "bg-[#02A847]" : 'bg-[#FF9E58]'} p-[6px] px-5 text-white w-fit mx-auto rounded-4xl`}>
                  {user?.isActive ? "Active" : "Suspended"}
                </div>
              </td>

              <td className=" flex justify-center items-center h-[79.96px] pr-6">
                <button
                  onClick={() => handleEdit(user)}
                  className="border cursor-pointer border-[#D5D5D5] px-[15.8px] py-[8.17px] rounded-l-[7.69px]"
                >
                  <FaEdit fontSize={14} color='#0E1E40' />
                </button>

                <button
                  onClick={() => handleDeleteClick(user)}
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

      <CreateUser selectedUser={selectedUser} onLoad={onLoad} isOpen={isOpen} onClose={() => setIsOpen(false)} />

    </div>
  );
}

export default UsersTable;
