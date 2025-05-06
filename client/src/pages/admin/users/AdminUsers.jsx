import React, { useEffect, useState } from 'react'
import ServicesHeader from '../components/ServicesHeader'
import UsersTable from './components/UsersTable';
import { useDispatch } from 'react-redux';
import userService from '../../../services/userService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';

const AdminUsers = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const loadUserData = async () => {
        dispatch(ShowLoading());
        try {
            const response = await userService.searchUsers();
            setUsers(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            dispatch(HideLoading());
        }
    }

    const onLoad = () => {
        loadUserData()
    }

    useEffect(() => {
        loadUserData()
    }, [])  


    return (
        <div>
            <div className=''>
                <ServicesHeader title={'Users'} />

                <button onClick={() => setIsOpen(true)} className='w-[203px] ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add User</button>

                <UsersTable users={users} setUsers={setUsers} onLoad={onLoad} />
            </div>
        </div>
    )
}

export default AdminUsers
