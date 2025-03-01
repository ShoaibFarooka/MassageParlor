import React, { useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import userService from '../../../../services/userService';


function ProviderSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    number: "",
    email: "",
    password: "",
    ethnicity: "",
    location: "",
    height: "",
    hairColor: "",
    callOutType: ""
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (!user.name) {
      errors.name = "Name is required";
    }
    if (!user.surname) {
      errors.surname = "Surname is required";
    }
    if (!user.email) {
      errors.email = "Email is required";
    }
    if (!user.number) {
      errors.number = "Contact number is required";
    }
    if (!user.password) {
      errors.password = "Password is required";
    }
    if (user.password && user.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});

    const payload = {
      ...user,
      name: `${user.name} ${user.surname}`,
    };
    delete payload.surname;

    try {
      const response = await userService.registerUser(payload, 'service-provider');
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError({ form: data.message || "Registration failed" });
      }
    } catch (err) {
      console.error("Registration error", err);
      setError({ form: "An error occurred. Please try again later." });
    }
  };


  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="mt-6">
      <div className="flex justify-center">
        <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
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
          <button
            type="button"
            className="absolute bottom-0 right-0 w-6 h-6 bg-violet-600 
                         rounded-full flex items-center justify-center text-white"
          >
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className='mb-6'>
          <label className=" label">
            Name
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="John"
            className="w-full input"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {error.name && <div className="text-red-500 text-sm">{error.name}</div>}
        </div>

        <div className='mb-6'>
          <label className=" label">
            Surname
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Doe"
            className="w-full input"
            value={user.surname}
            onChange={(e) => setUser({ ...user, surname: e.target.value })}
          />
          {error.surname && <div className="text-red-500 text-sm">{error.surname}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className='mb-6'>
          <label className=" label">
            Email
          </label>
          <input
            autoComplete="off"
            type="email"
            placeholder="email@email.com"
            className="w-full input "
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
        </div>

        <div className='mb-6'>
          <label className=" label">
            Contact Number
          </label>
          <input
            autoComplete="off"
            type="tel"
            placeholder="0710000000"
            className="w-full input"
            value={user.number}
            onChange={(e) => setUser({ ...user, number: e.target.value })}
          />
          {error.number && <div className="text-red-500 text-sm">{error.number}</div>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className='mb-6'>
          <label className=" label">
            Ethnicity
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Black"
            className="w-full input"
            value={user.ethnicity}
            onChange={(e) => setUser({ ...user, ethnicity: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <label className=" label">
            Location
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Bramley"
            className="w-full input"
            value={user.location}
            onChange={(e) => setUser({ ...user, location: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className='mb-6'>
          <label className=" label">
            Height (cm)
          </label>
          <input
            autoComplete="off"
            type="number"
            placeholder="165"
            className="w-full input"
            value={user.height}
            onChange={(e) => setUser({ ...user, height: e.target.value })}
          />
        </div>
        <div className='mb-6'>
          <label className=" label">
            Hair color
          </label>
          <input
            autoComplete="off"
            type="text"
            placeholder="Brown"
            className="w-full input"
            value={user.hairColor}
            onChange={(e) => setUser({ ...user, hairColor: e.target.value })}
          />
        </div>
      </div>

      <div className='mb-6'>
        <label className=" label">
          Call-out Type
        </label>
        <input
          autoComplete="off"
          type="text"
          placeholder="In-call"
          className="w-full input "
          value={user.callOutType}
          onChange={(e) => setUser({ ...user, callOutType: e.target.value })}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='mb-6'>
          <label className="label">Password</label>
          <div className="relative">
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full input"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-[#858FAD]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash size={18} color="#858FAD" />
              ) : (
                <FaEye size={18} color="#858FAD" />
              )}
            </button>
          </div>
          {error.password && (
            <div className="text-red-500 mt-2 text-sm">{error.password}</div>
          )}
        </div>

        <div>
          <label className="label">Confirm Password</label>
          <div className="relative mb-6">
            <input
              autoComplete="off"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-4 text-[#858FAD]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} color="#858FAD" />
              ) : (
                <FaEye size={18} color="#858FAD" />
              )}
            </button>
            {error.confirmPassword && <div className="text-red-500 text-sm">{error.confirmPassword}</div>}
          </div>

        </div>
      </div>

      <button
        type="submit"
        className="w-full h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
      >
        Sign up
      </button>
    </form>
  );
}

export default ProviderSignUpForm;