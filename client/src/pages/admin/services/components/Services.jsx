import React, { useEffect, useState } from 'react'
import CustomModal from '../../../../components/CustomModal/CustomModal';
import serviceService from '../../../../services/serviceService';
import galleryService from '../../../../services/galleryService';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';

const Services = ({ setIsOpen, isOpen, serviceData }) => {
    const [services, setServices] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [statusModal, setStatusModal] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);


    const fetchServicesForServiceProvider = async () => {

        dispatch(ShowLoading());
        try {
            const response = await serviceService.getServicesByProvider(serviceData?._id);
            setServices(response);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            dispatch(HideLoading());
        }

        try {
            dispatch(ShowLoading());
            const gallery = await galleryService.getGalleryByServiceProvider(serviceData?._id)
            setGalleries(gallery?.gallery)
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        setGalleries([]);
        setServices([]);
        fetchServicesForServiceProvider();
    }, [serviceData?._id]);



    const handleUpdateStatus = async (id, status) => {
        dispatch(ShowLoading());
        try {
            const response = await galleryService.updateImageStatus(id, status);
            setGalleries((prevGalleries) => ({
                ...prevGalleries,
                images: prevGalleries.images.map((image) =>
                    image._id === id ? { ...image, status } : image
                ),
            }));
        } catch (error) {
            console.error("Error updating service:", error);
        } finally {
            dispatch(HideLoading());
        }
    }

    return (
        <div>

            <CustomModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Modal" height='90%' >
                <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-9 pb-20 md:pb-32">
                    <div className=''>

                        <div className="w-full flex flex-col items-center">

                            <div className='relative'>
                                <img
                                    src={serviceData?.image}
                                    alt={`Profile of ${serviceData?.name}`}
                                    className="w-[108px] h-[108px] object-cover rounded-full mx-auto mt-[100px]"
                                />

                                <div className={`absolute right-1.5 border-1 border-white bottom-3 ${serviceData?.isOnline ? 'bg-[#02A847]' : 'bg-[#858FAD]'} rounded-full w-[14px] h-[14px] flex justify-center items-center`}>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-[17px]">
                                <h2 className="text-[22px] font-semibold">{serviceData?.name}</h2>
                            </div>

                            <p className="text-[#858FAD] text-[12.74px] mt-[8px]">
                                Age {serviceData?.age} | Located in {serviceData?.location}
                            </p>

                            <div className="hidden sm:flex justify-center items-center space-x-2 mt-[19px] mb-[22px]">
                                <div className="text-center  w-[118px]">
                                    <p className="text-[18.7px] font-bold">{serviceData?.years}</p>
                                    <p className="text-[#858FAD] text-[10.86px]">Years</p>
                                </div>

                                <div className="text-center border-l border-r border-[#E0E3EA] w-[118px]">
                                    <p className="text-[18.7px] font-bold">{serviceData?.clients}</p>
                                    <p className="text-[#858FAD] text-[10.86px]">Clients</p>
                                </div>

                                <div className="text-center pt-[5px]  w-[118px]">
                                    <img
                                        src={serviceData?.image}
                                        alt={`Profile of ${serviceData?.name}`}
                                        className="w-[19px] h-[19px] rounded-full mx-auto mb-1.5"
                                    />

                                    <p className="text-[#858FAD] text-[10.86px]">Clients</p>

                                </div>
                            </div>

                            <div className='hidden sm:flex w-[260px] mx-auto mb-[22px] text-center'>
                                <p className="text-[#858FAD] text-[14px] mb-[22px]">{serviceData?.specialization}</p>
                            </div>
                        </div>

                        <h3 className='text-lg font-semibold items-start mt-10 sm:mt-0'>Gallery</h3>
                        {galleries?.images?.length > 0 ? (
                            <div className="flex flex-wrap">
                                {galleries.images.map((image, index) => {
                                    const isBlurred = !user && index >= 3;
                                    return (
                                        <div
                                            key={index}
                                            className={`w-[100px] sm:w-[124px] h-[100px] sm:h-[124px] relative m-2 flex items-center justify-center 
                                                         ${isBlurred ? "bg-gray-300 overflow-hidden" : ""}`}
                                        >
                                            <img
                                                src={`http://localhost:5777/static/images/${image.url}`}
                                                alt={`Gallery Image ${index + 1}`}
                                                className={`object-cover w-full h-full ${isBlurred ? "blur-xs" : ""}`}
                                            />

                                            <div className='absolute bottom-0 left-0 right-0 top-0 w-[100px] sm:w-[124px] h-[100px] sm:h-[124px]  flex justify-center items-center'>
                                                <button
                                                    onClick={() => {
                                                        setSelectedImageId(image);
                                                        setStatusModal(true);
                                                    }}
                                                    className={`${image.status === 'pending' ? 'bg-[#5E50BF]' : image.status === 'approved' ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-full cursor-pointer rounded-tr-none text-white text-[10px] capitalize`}
                                                >
                                                    {image.status === 'pending' ? 'Review' : image.status}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        ) : (
                            <p>No images available.</p>
                        )}

                    </div>

                    <div>
                        <div className='pt-[61px]'>
                            <h3 className='text-lg font-semibold items-start'>Contacts</h3>

                            <div className='bg-white rounded-3xl px-[21px] pt-[17px] h-[80px] mt-5'>
                                <span className='text-sm font-semibold pb-[5px]'>Phone Number</span>
                                <p className=' text-[12px]'>{serviceData?.number}</p>
                            </div>
                        </div>

                        <div className='pt-[48px] relative'>
                            <h3 className='text-lg font-semibold items-start'>Available services</h3>
                            {!serviceData?.isActive && <p className='text-sm text-red-500'>This Service serviceData is not Active</p>}
                            {services.filter(item => item.isActive)?.map((data, index) => (
                                <div key={index} className='relative mb-10' >
                                    <div className='bg-white rounded-3xl px-[21px] pt-[17px] mt-5 pb-[41px]'>
                                        <span className='text-sm font-semibold pb-[5px]'>{data?.name} - {data?.duration}h</span>
                                        <span className='text-[#5E50BF] text-[12px] font-bold block pb-[5px]'>R{data?.price}</span>
                                        <p className='text-[12px]'>{data?.description}</p>

                                        {/* <button disabled={!serviceData?.isActive} onClick={() => { user ? handleBooking(data) : navigate('/login') }} className={`bg-[#5E50BF] rounded-full rounded-tr-none w-[212px] h-[44px] flex justify-center items-center text-white text-sm font-semibold absolute right-0 bottom-[-22px] cursor-pointer ${!serviceData?.isActive && 'opacity-85'}`}>BOOK NOW</button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </CustomModal>

            <CustomModal isOpen={statusModal} onRequestClose={() => setStatusModal(false)} width={'600px'} contentLabel="Status Confirmation">
                <div className="text-center flex justify-center items-center flex-col">
                    <div className='mt-10'>
                        <h2 className="text-[30px] font-bold">Update Status</h2>
                    </div>
                    <div className='py-4'>
                        <img
                            src={`http://localhost:5777/static/images/${selectedImageId?.url}`}
                            alt={`Gallery Image`}
                            className={`object-cover w-[90%] mx-auto h-auto rounded-lg`}
                        />
                    </div>
                    <div className='mb-8 flex justify-center'>
                        <button
                            onClick={() => {
                                handleUpdateStatus(selectedImageId?._id, 'rejected');
                                setStatusModal(false);
                            }}
                            className="cursor-pointer px-4 py-2 bg-red-500 w-[131px] h-[48px] text-white rounded-full rounded-tr-none mr-[12px]"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => {
                                handleUpdateStatus(selectedImageId?._id, 'approved');
                                setStatusModal(false);
                            }}
                            className="cursor-pointer px-4 py-2 bg-green-600 w-[131px] h-[48px] text-white rounded-full rounded-tl-none"
                        >
                            Approve
                        </button>
                    </div>
                </div>
            </CustomModal>

        </div>
    )
}

export default Services
