import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                {/* Container */}
                <div className="w-full max-w-sm p-8 bg-white rounded-[24px] shadow">
                    <h1 className="text-[30px] font-bold text-center">Sign In</h1>
                    <p className=" text-[12px] text-gray-500 text-center">
                        Enter your details to continue
                    </p>

                    {/* Form */}
                    <form className="mt-6">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="label"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="john@email.com"
                                className="w-full input "
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="label"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                      type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full input"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4"
                                >
                                    {showPassword ? <FaEyeSlash size={18} color='#858FAD' /> : <FaEye size={18} color='#858FAD' />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="text-sm text-[#5E50BF] hover:underline mb-[24px] font-semibold"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            onClick={() => navigate('/home')}
                            type="submit"
                            className="w-full h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-sm text-center text-[#858FAD] mt-[24px] flex flex-col">
                        Don’t have an account?{' '}
                        <span onClick={() => navigate('/register')} className="text-[#5E50BF] cursor-pointer hover:underline font-semibold">
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login