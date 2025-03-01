import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './CustomModal.css';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children, width = '90%', height = 'fit-content' }) => {
    const [modalWidth, setModalWidth] = useState(width);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 450) {
          setModalWidth("90%");
        } else {
          setModalWidth(width);
        }
      };
  
      // Call on mount
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [width]);
  
    const modalStyle = {
      content: {
        width: modalWidth,
        height: height,
        overflow: 'auto',
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
