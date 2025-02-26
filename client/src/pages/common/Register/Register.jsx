import React, { useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [activeTab, setActiveTab] = useState('user');
  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen py-10 items-center justify-center bg-gray-100">
      {/* Outer Container */}
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        {/* Page Heading */}
        <h1 className="text-[30px] font-bold text-center">Sign Up</h1>
        <p className=" text-[12px] text-[#858FAD] text-center">
          Enter your details to continue
        </p>

        {/* Tabs: User vs. Service Provider */}
        <div className="flex items-center justify-center mt-6 space-x-[24px]">
          <button
            onClick={() => setActiveTab('user')}
            className={`pb-2 text-sm font-medium focus:outline-none ${activeTab === 'user'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
              }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('provider')}
            className={`pb-2 text-sm font-medium focus:outline-none ${activeTab === 'provider'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
              }`}
          >
            Service Provider
          </button>
        </div>

        {activeTab === 'user' ? <UserSignUpForm /> : <ProviderSignUpForm />}

        <p className="text-sm text-center text-[#858FAD] mt-[24px] flex flex-col">
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


function UserSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="mt-6">
      {/* Full Name */}
      <div>
        <label className="">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full "
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="">
          Date of birth
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Jan 12 1980"
            className="w-full"
          />
          {/* Calendar Icon */}
          <div className="absolute right-4 top-4 text-[#858FAD]">
           <FaCalendarCheck/>
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="">
          Email
        </label>
        <input
          type="email"
          placeholder="john@email.com"
          className="w-full "
        />
      </div>

      {/* Password */}
      <div>
        <label className="">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full"
          />
          {/* Eye Icon */}
          <button
            type="button"
            className="absolute right-4 top-4 text-[#858FAD]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={18} color='#858FAD' /> : <FaEye size={18} color='#858FAD' />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="">
          Confirm Password
        </label>
        <div className="relative">
          <input
           type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full"
          />

          <button
            type="button"
            className="absolute right-4 top-4 text-[#858FAD]"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
           {showConfirmPassword ? <FaEyeSlash size={18} color='#858FAD' /> : <FaEye size={18} color='#858FAD' />}
          </button>
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full mt-6 h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
      >
        Sign up
      </button>
    </form>
  );
}


function ProviderSignUpForm() { 
  return (
    <form className="mt-6">
      {/* Profile Icon (centered) */}
      <div className="flex justify-center">
        <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          {/* User icon */}
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
            <path d="M12 14c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" />
          </svg>
          {/* Small plus button in bottom-right corner of the circle */}
          <button
            type="button"
            className="absolute bottom-0 right-0 w-6 h-6 bg-violet-600 
                       rounded-full flex items-center justify-center text-white"
          >
            {/* Plus icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Name and Surname (side by side) */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="">
            Name
          </label>
          <input
            type="text"
            placeholder="John"
            className="w-full"
          />
        </div>
        <div>
          <label className="">
            Surname
          </label>
          <input
            type="text"
            placeholder="Doe"
            className="w-full"
          />
        </div>
      </div>

      {/* Email */}
      <div className="">
        <label className="">
          Email
        </label>
        <input
          type="email"
          placeholder="email@email.com"
          className="w-full "
        />
      </div>

      {/* Contact Number */}
      <div className="">
        <label className="">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="0710000000"
          className="w-full "
        />
      </div>

      {/* Ethnicity and Location (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="">
            Ethnicity
          </label>
          <input
            type="text"
            placeholder="Black"
            className="w-full"
          />
        </div>
        <div>
          <label className="">
            Location
          </label>
          <input
            type="text"
            placeholder="Bramley"
            className="w-full"
          />
        </div>
      </div>

      {/* Height and Hair color (side by side) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="">
            Height (cm)
          </label>
          <input
            type="number"
            placeholder="165"
            className="w-full"
          />
        </div>
        <div>
          <label className="">
            Hair color
          </label>
          <input
            type="text"
            placeholder="Brown"
            className="w-full"
          />
        </div>
      </div>

      {/* Call-out Type */}
      <div className="">
        <label className="">
          Call-out Type
        </label>
        <input
          type="text"
          placeholder="In-call"
          className="w-full "
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full h-[48px] mt-6 cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
      >
        Sign up
      </button>
    </form>
  );
}
