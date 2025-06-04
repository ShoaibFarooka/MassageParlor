import React, { useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserSignUpForm from './components/User/UserSignUpForm';
import ProviderSignUpForm from './components/ServiceProvider/ProviderSignUpForm';

const Register = () => {
  const [activeTab, setActiveTab] = useState('user');
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen py-10 items-center justify-center bg-gray-100 ">
      {/* Outer Container */}
      <div className="w-full max-w-lg p-8 bg-white rounded-xl mx-4 shadow-lg">
        {/* Page Heading */}
        <h1 className="text-[30px] font-bold text-center">Sign Up</h1>
        <p className=" text-[12px] text-[#858FAD] text-center">
          Enter your details to continue
        </p>

        {/* Tabs: User vs. Service Provider */}
        <div className="flex items-center justify-center mt-6 space-x-[24px]">
          <button
            onClick={() => setActiveTab('user')}
            className={`pb-2 text-sm font-medium cursor-pointer focus:outline-none ${activeTab === 'user'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
              }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('provider')}
            className={`pb-2 text-sm font-medium cursor-pointer focus:outline-none ${activeTab === 'provider'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
              }`}
          >
            Service Provider
          </button>
        </div>

        {activeTab === 'user' ? <UserSignUpForm /> : <ProviderSignUpForm />}

        <p className="text-sm text-center text-[#858FAD] !mt-[24px] flex flex-col">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-[#5E50BF] cursor-pointer hover:underline font-semibold" >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;