import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CustomModal from '../../../../components/CustomModal/CustomModal';
// import serviceService from '../../../../../services/serviceService'; // Example import if you have a dedicated service

function CreateService({ isOpen, onClose }) {
    const navigate = useNavigate();

    // Form state for creating a service
    const [service, setService] = useState({
        name: '',
        price: '',
        duration: '',
        color: '',
        status: '',
        description: '',
    });

    // Track validation errors
    const [error, setError] = useState({});

    // Example form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        let errors = {};

        if (!service.name.trim()) errors.name = 'Name is required';
        if (!service.price.trim()) errors.price = 'Price is required';
        if (!service.duration.trim()) errors.duration = 'Duration is required';
        if (!service.color.trim()) errors.color = 'Calendar color is required';
        if (!service.status.trim()) errors.status = 'Active status is required';
        if (!service.description.trim()) errors.description = 'Description is required';

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setError({});

        try {
            // If you have a dedicated service-creation function, use it here:
            // const response = await serviceService.createService(service);

            // For now, just simulate success:
            toast.success('Service created successfully');
            // Navigate or close modal on success:
            onClose(); // or navigate('/services')
        } catch (err) {
            console.error(err);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <CustomModal isOpen={isOpen} onRequestClose={onClose} width="697px" contentLabel="Add Service Modal">
            {/* Heading */}
            <div className='px-[48px] py-[43px]'>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Add a service</h2>
                    <p className="text-gray-500">Enter service details to continue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} autoComplete="off">
                    {/* Row 1: Name, Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="label">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="e.g. Swedish Massage"
                                className="w-full input"
                                value={service.name}
                                onChange={(e) => setService({ ...service, name: e.target.value })}
                            />
                            {error.name && <div className="text-red-500 text-sm">{error.name}</div>}
                        </div>

                        {/* Price (R) */}
                        <div>
                            <label htmlFor="price" className="label">
                                Price (R)
                            </label>
                            <input
                                id="price"
                                type="text"
                                placeholder="e.g. 920"
                                className="w-full input"
                                value={service.price}
                                onChange={(e) => setService({ ...service, price: e.target.value })}
                            />
                            {error.price && <div className="text-red-500 text-sm">{error.price}</div>}
                        </div>
                    </div>

                    {/* Row 2: Duration, Calendar Color */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Duration */}
                        <div>
                            <label htmlFor="duration" className="label">
                                Duration
                            </label>
                            <input
                                id="duration"
                                type="text"
                                placeholder="e.g. 1h"
                                className="w-full input"
                                value={service.duration}
                                onChange={(e) => setService({ ...service, duration: e.target.value })}
                            />
                            {error.duration && <div className="text-red-500 text-sm">{error.duration}</div>}
                        </div>

                        {/* Calendar Color */}
                        <div>
                            <label htmlFor="color" className="label">
                                Calendar Color
                            </label>
                            <select
                                id="color"
                                className="w-full input"
                                value={service.color}
                                onChange={(e) => setService({ ...service, color: e.target.value })}
                            >
                                <option disabled value="">
                                    Select One
                                </option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Purple">Purple</option>
                            </select>
                            {error.color && <div className="text-red-500 text-sm">{error.color}</div>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="status" className="label">
                                Active status
                            </label>
                            <select
                                id="status"
                                className="w-full input"
                                value={service.status}
                                onChange={(e) => setService({ ...service, status: e.target.value })}
                            >
                                <option disabled value="">
                                    Select One
                                </option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {error.status && <div className="text-red-500 text-sm">{error.status}</div>}
                        </div>
                    </div>

                    {/* Row 3: Active Status */}


                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="label">
                            The description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Write a short description..."
                            className="w-full input p-4"
                            value={service.description}
                            onChange={(e) => setService({ ...service, description: e.target.value })}
                        />
                        {error.description && <div className="text-red-500 text-sm">{error.description}</div>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row items-center md:justify-center gap-4">
                        <button
                            type="submit"
                            className="w-full md:w-auto h-[48px] cursor-pointer px-8 py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full"
                        >
                            Add Service
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full md:w-auto h-[48px] cursor-pointer px-8 py-2 text-sm font-medium text-[#5E50BF] bg-white border border-[#5E50BF] rounded-full"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </CustomModal>
    );
}

export default CreateService;
