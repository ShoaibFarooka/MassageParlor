import React from 'react';
import CustomModal from '../CustomModal/CustomModal';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <CustomModal isOpen={isOpen} onRequestClose={onClose} width={'436px'} contentLabel="Delete Confirmation">
            <div className="text-center flex justify-center items-center flex-col">
                <div className='mt-10'>
                    <h2 className="text-[30px] font-bold">Delete Confirmation</h2>
                </div>
                <div className='py-4'>
                    <p className="">Are you sure you want to <span className='text-red-600'>delete</span> this item?</p>
                </div>
                <div className='mb-8'>
                    <button onClick={onClose} className="cursor-pointer px-4 py-2 bg-gray-500 w-[131px] h-[48px] text-white rounded-full rounded-tr-none mr-[12px]">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="cursor-pointer px-4 py-2 bg-[#D74042] w-[131px] h-[48px] text-white rounded-full rounded-tl-none">
                        Delete
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default DeleteConfirmationModal;
