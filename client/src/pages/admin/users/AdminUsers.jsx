import React from 'react'
import ServicesHeader from '../components/ServicesHeader'
import UsersTable from './components/UsersTable';
import { useDispatch } from 'react-redux';

const AdminUsers = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();

    return (
        <div>
            <div className=''>
                <ServicesHeader title={'Users'} />

                <button onClick={() => setIsOpen(true)} className='w-[203px] ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add User</button>

                <UsersTable setServices={setServices} services={services} onLoad={onLoad} />

            </div>
        </div>
    )
}

export default AdminUsers
