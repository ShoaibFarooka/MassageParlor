import React, { useEffect, useState } from 'react'
import ServicesHeader from '../components/ServicesHeader'
import UsersTable from './components/UsersTable';
import { useDispatch } from 'react-redux';
import userService from '../../../services/userService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import CreateUser from './components/CreateUser';
import { FaSearch } from 'react-icons/fa';

const AdminUsers = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const loadUserData = async () => {
        dispatch(ShowLoading());
        try {
            const response = await userService.searchUsers({
                page: 1,
                limit: 10,
                searchQuery: searchQuery,
                role: "user"
            });
            console.log(response)
            setUsers(response?.result?.users);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        } finally {
            dispatch(HideLoading());
        }
    };


    const onLoad = () => {
        loadUserData()
    }

    const handleFilterChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadUserData();
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);


    return (
        <div>
            <div className=''>
                <ServicesHeader title={'Users'} />

                <div className='flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-4'>
                    <div className="relative">
                        <input
                            type="text"
                            name="searchQuery"
                            value={searchQuery}
                            onChange={handleFilterChange}
                            placeholder="Search"
                            className="pl-6 pr-4 py-2 text-lg rounded-full h-[56px] w-full sm:w-[400px] bg-white shadow outline-0"
                        />
                    </div>

                    <button onClick={() => setIsOpen(true)} className='w-[203px] md:ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add User</button>

                </div>
                <UsersTable users={users} setUsers={setUsers} onLoad={onLoad} />

                <CreateUser onLoad={onLoad} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </div>
    )
}

export default AdminUsers
