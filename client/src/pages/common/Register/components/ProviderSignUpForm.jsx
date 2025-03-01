import React, { useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


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
            <label className=" label">
              Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full input"
            />
          </div>
          <div>
            <label className=" label">
              Surname
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full input"
            />
          </div>
        </div>
  
        {/* Email */}
        <div className="">
          <label className=" label">
            Email
          </label>
          <input
            type="email"
            placeholder="email@email.com"
            className="w-full input "
          />
        </div>
  
        {/* Contact Number */}
        <div className="">
          <label className=" label">
            Contact Number
          </label>
          <input
            type="tel"
            placeholder="0710000000"
            className="w-full input "
          />
        </div>
  
        {/* Ethnicity and Location (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" label">
              Ethnicity
            </label>
            <input
              type="text"
              placeholder="Black"
              className="w-full input"
            />
          </div>
          <div>
            <label className=" label">
              Location
            </label>
            <input
              type="text"
              placeholder="Bramley"
              className="w-full input"
            />
          </div>
        </div>
  
        {/* Height and Hair color (side by side) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className=" label">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="165"
              className="w-full input"
            />
          </div>
          <div>
            <label className=" label">
              Hair color
            </label>
            <input
              type="text"
              placeholder="Brown"
              className="w-full input"
            />
          </div>
        </div>
  
        {/* Call-out Type */}
        <div className="">
          <label className=" label">
            Call-out Type
          </label>
          <input
            type="text"
            placeholder="In-call"
            className="w-full input "
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
  
  export default ProviderSignUpForm;