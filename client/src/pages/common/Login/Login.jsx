import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import userService from '../../../services/userService';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { isValidEmail } from '../../../utils/validationUtils';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({});

    const validateUser = () => {
        let newError = {};
        let hasError = false;
        const { email, password } = credentials;
        if (!email) {
            newError.email = 'Email is required!';
            hasError = true;
        } else if (!isValidEmail(email)) {
            newError.email = 'Please provide a valid email!';
            hasError = true;
        } else {
            newError.email = '';
        }
        if (!password) {
            newError.password = 'Password is required!';
            hasError = true;
        } else {
            newError.password = '';
        }
        setError(newError);
        if (hasError) {
            console.log('Validation errors: ', newError);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateUser()) {
            return;
        }
        dispatch(ShowLoading());
        try {
            const response = await userService.loginUser(credentials);
            if (response.token) {
                Cookies.set('adstatixx-jwt-token', response.token, {
                    secure: true,
                    sameSite: 'Lax'
                });
                const from = location.state?.from?.pathname;
                navigate(from || '/');
                toast.success('Successfully Login')
            } else {
                toast.error(response.message || "Login failed");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "An error occurred during login");
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-[24px] mx-4 shadow">
                <h1 className="text-[30px] font-bold text-center">Sign In</h1>
                <p className="text-[12px] text-gray-500 text-center">
                    Enter your details to continue
                </p>

                <form className="mt-6" onSubmit={handleSubmit}>
                    {(error.email || error.password) && (
                        <div className="text-red-500 text-center mb-4">
                            {error.email || error.password}
                        </div>
                    )}

                    {/* Email Field */}
                    <div className='mb-6'>
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@email.com"
                            className="w-full input"
                            value={credentials.email}
                            onChange={(e) =>
                                setCredentials({ ...credentials, email: e.target.value })
                            }
                        />
                    </div>

                    {/* Password Field */}
                    <div className='mb-6'>
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full input"
                                value={credentials.password}
                                onChange={(e) =>
                                    setCredentials({ ...credentials, password: e.target.value })
                                }
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4"
                            >
                                {showPassword ? (
                                    <FaEyeSlash size={18} color="#858FAD" />
                                ) : (
                                    <FaEye size={18} color="#858FAD" />
                                )}
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
                        type="submit"
                        className="w-full h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
                    >
                        Sign in
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-sm text-center text-[#858FAD] mt-[24px] flex flex-col">
                    Don’t have an account?{' '}
                    <span
                        onClick={() => navigate('/register')}
                        className="text-[#5E50BF] cursor-pointer hover:underline font-semibold"
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
