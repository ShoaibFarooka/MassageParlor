import React from 'react';
import Modal from 'react-modal';
import './CustomModal.css';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children, width = '90%', height = 'fit-content' }) => {
    const modalStyle = {
        content: {
            width: width,
            height: height,
            overflow:'auto',
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal relative outline-none border-none"
            style={modalStyle}
            contentLabel={contentLabel}
            overlayClassName="overlay"
        >
            <div className='absolute top-4 right-4 cursor-pointer' onClick={onRequestClose}>
                <IoClose fontSize={20} />
            </div>
            {children}
        </Modal>
    );
};

export default CustomModal;
