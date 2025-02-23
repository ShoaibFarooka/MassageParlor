import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                {/* Container */}
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
                    <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Enter your details to continue
                    </p>

                    {/* Form */}
                    <form className="mt-6 space-y-4">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="john@email.com"
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
                                />
                                {/* 
                If you want a toggle button for password visibility,
                you can place an icon button here.
              */}
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {/* Example eye icon (you can swap with your own) */}
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

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="text-sm text-violet-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                        onClick={()=>navigate('/home')}
                            type="submit"
                            className="w-full cursor-pointer py-2 text-sm font-medium text-white bg-violet-600 rounded hover:bg-violet-700"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don’t have an account?{' '}
                        <span onClick={() => navigate('/register')} className="text-violet-600 cursor-pointer hover:underline">
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login