import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import CustomModal from '../../../../components/CustomModal/CustomModal';
import serviceService from '../../../../services/serviceService';
import { useDispatch, useSelector } from 'react-redux';

function CreateEditService({ isOpen, onClose, serviceId, refreshServices }) {
    const isEditMode = Boolean(serviceId);
    const user = useSelector((state) => state.user.user);

    const [service, setService] = useState({
        serviceProvider: user?._id || '', // Ensure it always has a value
        gallery: '67c8402e6088c63eccaeac66', // Ensure gallery is always set
        name: '',
        price: '',
        duration: '',
        calendarColor: '',
        isActive: false, // Default to boolean instead of empty string
        description: '',
    });

    const [error, setError] = useState({});

    useEffect(() => {
        if (isEditMode && isOpen) {
            loadServiceData();
        } else {
            setService({
                serviceProvider: user?._id || '',
                gallery: '67c8402e6088c63eccaeac66',
                name: '',
                price: '',
                duration: '',
                calendarColor: '',
                isActive: false,
                description: '',
            });
            setError({});
        }
    }, [serviceId, isOpen, user?._id]);

    const loadServiceData = async () => {
        try {
            const data = await serviceService.getServiceById(serviceId);
            setService({
                serviceProvider: data.serviceProvider || user?._id,
                gallery: data.gallery || '67c8402e6088c63eccaeac66',
                name: data.name,
                price: data.price,
                duration: data.duration,
                calendarColor: data.calendarColor,
                isActive: Boolean(data.isActive), // Ensure boolean value
                description: data.description,
            });
        } catch (err) {
            toast.error('Failed to fetch service details.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};

        if (!service.name.trim()) errors.name = 'Name is required';
        if (!service.price.trim()) errors.price = 'Price is required';
        if (!service.duration.trim()) errors.duration = 'Duration is required';
        if (!service.calendarColor.trim()) errors.calendarColor = 'Calendar calendarColor is required';
        if (service.isActive === '') errors.isActive = 'Active status is required';
        if (!service.description.trim()) errors.description = 'Description is required';

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setError({});

        try {
            if (isEditMode) {
                await serviceService.updateService(serviceId, service);
                toast.success('Service updated successfully');
            } else {
                await serviceService.createService(service);
                toast.success('Service created successfully');
            }
            refreshServices();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onClose}
            width="697px"
            contentLabel={isEditMode ? "Edit Service Modal" : "Add Service Modal"}
        >
            <div className='px-[48px] py-[43px]'>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{isEditMode ? 'Edit Service' : 'Add a service'}</h2>
                    <p className="text-gray-500">Enter service details to continue</p>
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="name" className="label">Name</label>
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

                        <div>
                            <label htmlFor="price" className="label">Price (R)</label>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label htmlFor="duration" className="label">Duration</label>
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

                        <div>
                            <label htmlFor="calendarColor" className="label">Calendar calendarColor</label>
                            <select
                                id="calendarColor"
                                className="w-full input"
                                value={service.calendarColor}
                                onChange={(e) => setService({ ...service, calendarColor: e.target.value })}
                            >
                                <option disabled value="">Select One</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Purple">Purple</option>
                            </select>
                            {error.calendarColor && <div className="text-red-500 text-sm">{error.calendarColor}</div>}
                        </div>

                        <div>
                            <label htmlFor="isActive" className="label">Active Status</label>
                            <select
                                id="isActive"
                                className="w-full input"
                                value={service.isActive ? 'true' : 'false'}
                                onChange={(e) => setService({ ...service, isActive: e.target.value === 'true' })}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            {error.isActive && <div className="text-red-500 text-sm">{error.isActive}</div>}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="label">The description</label>
                        <textarea
                            id="description"
                            placeholder="Write a short description..."
                            className="w-full p-4 bg-[#F3F2F8] rounded-2xl text-sm outline-0"
                            rows={6}
                            value={service.description}
                            onChange={(e) => setService({ ...service, description: e.target.value })}
                        />
                        {error.description && <div className="text-red-500 text-sm">{error.description}</div>}
                    </div>


                  <div className='flex justify-center items-center'>
                  <button
                        type="button"
                        onClick={onClose}
                        className="h-[48px] mr-2 cursor-pointer px-8 py-2 text-sm font-medium text-[#5E50BF] border border-[#5E50BF] bg-white min-w-[200px] rounded-tr-none rounded-full"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="md:w-auto h-[48px] cursor-pointer px-8 py-2 text-sm font-medium text-white bg-[#5E50BF] min-w-[200px] rounded-tr-none rounded-full">
                        {isEditMode ? 'Update Service' : 'Add Service'}
                    </button>
                  </div>

                </form>
            </div>
        </CustomModal>
    );
}

export default CreateEditService;
