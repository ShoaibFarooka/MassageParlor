import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [activeTab, setActiveTab] = useState('user');
    const navigate = useNavigate();


  return (
    <div className="flex min-h-screen py-10 items-center justify-center bg-gray-100">
      {/* Outer Container */}
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        {/* Page Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Enter your details to continue
        </p>

        {/* Tabs: User vs. Service Provider */}
        <div className="flex items-center justify-center mt-4 space-x-6">
          <button
            onClick={() => setActiveTab('user')}
            className={`pb-2 text-sm font-medium focus:outline-none ${
              activeTab === 'user'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
            }`}
          >
            User
          </button>
          <button
            onClick={() => setActiveTab('provider')}
            className={`pb-2 text-sm font-medium focus:outline-none ${
              activeTab === 'provider'
                ? 'border-b-2 border-violet-600 text-violet-600'
                : 'text-gray-500'
            }`}
          >
            Service Provider
          </button>
        </div>

        {/* Conditional Rendering of Forms */}
        {activeTab === 'user' ? <UserSignUpForm /> : <ProviderSignUpForm />}

        {/* Already have an account? */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span onClick={()=>navigate('/login')} className="text-violet-600 cursor-pointer hover:underline" >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

/* ------------------------------------------------------------------
   User Sign-Up Form (Single Column)
   Matches your first screenshot more closely.
------------------------------------------------------------------ */
function UserSignUpForm() {
  return (
    <form className="mt-6 space-y-4">
      {/* Full Name */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-violet-500"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Date of birth
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Jan 12 1980"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
          {/* Calendar Icon */}
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="john@email.com"
          className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-violet-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
          {/* Eye Icon */}
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center 
                       text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
          {/* Eye Icon */}
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center 
                       text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full py-2 text-sm font-medium text-white bg-violet-600 
                   rounded-xl hover:bg-violet-700"
      >
        Sign up
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------
   Service Provider Sign-Up Form
   More fields in a grid layout, matching your second screenshot.
------------------------------------------------------------------ */
function ProviderSignUpForm() {
  return (
    <form className="mt-6">
      {/* Profile Icon (centered) */}
      <div className="flex justify-center mb-6">
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
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="John"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            placeholder="Doe"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="email@email.com"
          className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-violet-500"
        />
      </div>

      {/* Contact Number */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="0710000000"
          className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-violet-500"
        />
      </div>

      {/* Ethnicity and Location (side by side) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Ethnicity
          </label>
          <input
            type="text"
            placeholder="Black"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="Bramley"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Height and Hair color (side by side) */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Height (cm)
          </label>
          <input
            type="number"
            placeholder="165"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Hair color
          </label>
          <input
            type="text"
            placeholder="Brown"
            className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Call-out Type */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Call-out Type
        </label>
        <input
          type="text"
          placeholder="In-call"
          className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 
                     placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-violet-500"
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full py-2 text-sm font-medium text-white bg-violet-600 
                   rounded-xl hover:bg-violet-700"
      >
        Sign up
      </button>
    </form>
  );
}
