import React, { useState, forwardRef, useRef } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import userService from '../../../../../services/userService';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';


const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative" onClick={onClick}>
        <input
            type="text"
            value={value}
            placeholder={'Feb, 28 2025'}
            readOnly
            className="w-full input"
            ref={ref}
        />
        <div className="absolute right-4 top-4 text-[#858FAD] pointer-events-none">
            <FaCalendarCheck />
        </div>
    </div>
));

function UserSignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        dateOfBirth: "",
        number: "",
        email: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setSelectedImage(URL.createObjectURL(file)); // Show preview
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errors = {};
        if (!user.name) errors.name = "Name is required";
        if (!user.surname) errors.surname = "Surname is required";
        if (!user.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(user.email.toLowerCase().trim())) {
            errors.email = "Please enter a valid email address";
        }
        if (!user.number) errors.number = "Contact number is required";
        if (!user.password) errors.password = "Password is required";
        if (user.password && user.password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

        // Age validation - must be at least 18 years old
        if (selectedDate) {
            const today = new Date();
            const birthDate = new Date(selectedDate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                errors.dateOfBirth = "You must be at least 18 years old to register";
            }
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setError({});

        const formData = new FormData();
        formData.append('name', `${user.name} ${user.surname}`);
        formData.append('dateOfBirth', selectedDate ? selectedDate.toISOString().split('T')[0] : "");
        formData.append('number', user.number);
        formData.append('email', user.email.toLowerCase().trim()); // Convert to lowercase and trim
        formData.append('password', user.password);
        if (imageFile) formData.append('file', imageFile); // ✅ Append Image

        try {
            const response = await userService.registerUser(formData, 'user');

            if (!response) {
                const data = await response.json();
                setError({ form: data.message || "Registration failed" });
                return;
            }

            navigate("/login");
            toast.success('New User Registered');
        } catch (err) {
            toast.error(err.response.data.error);
            setError({ form: "An error occurred. Please try again later." });
        }
    };


    return (
        <form className="mt-6" autoComplete="off" onSubmit={handleSubmit}>
            <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" />
                            <path d="M12 14c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4z" />
                        </svg>
                    )}
                    <button
                        onClick={() => fileInputRef.current.click()}
                        type="button"
                        className="absolute bottom-0 right-0 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-white"
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

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange} // ✅ Handle Image Select
                    />
                </div>
            </div>

            {/* Form-level error */}
            {error.form && (
                <div className="text-red-500 text-center mt-4">{error.form}</div>
            )}

            {/* Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className='mb-6'>
                    <label htmlFor="name" className="label">Name</label>
                    <input
                        name='name'
                        id='name'
                        type="text"
                        placeholder="John"
                        className="w-full input"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                    {error.name && <div className="text-red-500 text-sm">{error.name}</div>}
                </div>

                <div className='mb-6'>
                    <label htmlFor="surname" className="label">Surname</label>
                    <input
                        name='surname'
                        id='surname'
                        type="text"
                        placeholder="Doe"
                        className="w-full input"
                        value={user.surname}
                        onChange={(e) =>
                            setUser({ ...user, surname: e.target.value })
                        }
                    />
                    {error.surname && <div className="text-red-500 text-sm">{error.surname}</div>}
                </div>
            </div>

            {/* Date of Birth */}
            <div className='mb-6'>
                <label htmlFor="db" className="label">Date of birth</label>
                <div className="relative">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            const utcDate = new Date(Date.UTC(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                            ));
                            setSelectedDate(utcDate);
                        }}
                        customInput={
                            <CustomDateInput
                                value={
                                    selectedDate
                                        ? selectedDate.toLocaleDateString('en-GB', {
                                            timeZone: 'UTC',
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit',
                                        })
                                        : ''
                                }
                            />
                        }
                        dateFormat="MMM, dd yyyy"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                    />
                </div>
                {error.dateOfBirth && <div className="text-red-500 text-sm">{error.dateOfBirth}</div>}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                {/* Email */}
                <div className='mb-6'>
                    <label htmlFor="email" className="label">Email</label>
                    <input
                        name='email'
                        id='email'
                        type="text"
                        placeholder="john@email.com"
                        className="w-full input"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                    {error.email && <div className="text-red-500 text-sm">{error.email}</div>}
                </div>

                <div className='mb-6'>
                    <label htmlFor="num" className="label">Contact Number</label>
                    <input
                        name="num"
                        id="num"
                        type="number"
                        placeholder="0710000000"
                        className="w-full input"
                        value={user.number}
                        onChange={(e) => setUser({ ...user, number: e.target.value })}
                        onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />

                    {error.number && <div className="text-red-500 text-sm">{error.number}</div>}
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Password */}
                <div className='mb-6'>
                    <label htmlFor="pass" className="label">Password</label>
                    <div className="relative">
                        <input
                            name='pass'
                            id='pass'
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

                {/* Confirm Password */}
                <div className='mb-6'>
                    <label htmlFor="cp" className="label">Confirm Password</label>
                    <div className="relative">
                        <input
                            name='cp'
                            id='cp'
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

            {/* Sign Up Button */}
            <button
                type="submit"
                className="w-full h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
            >
                Sign up
            </button>
        </form>
    );
}

export default UserSignUpForm;
