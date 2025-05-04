import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import ServicesHeader from '../components/ServicesHeader';
import CreateService from './components/CreateService';
import ServiceTable from './components/ServicesTable';
import serviceService from '../../../services/serviceService';

const Services = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
    const [services, setServices] = useState([]);
  
  const loadServiceData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await serviceService.getServicesByProvider();
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

  const onLoad=()=>{
    loadServiceData()
  }

  return (
    <div className=''>
      <ServicesHeader title={'Services'} />

      <button onClick={() => setIsOpen(true)} className='w-[203px] ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add Service</button>

      <ServiceTable setServices={setServices} services={services} onLoad={onLoad} />

      <CreateService onLoad={onLoad} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Services