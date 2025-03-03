import { useState } from 'react';
import '../../../../../styles/authForm.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../../redux/loaderSlice';
import FacebookIcon from '../../../../../assets/icons/facebook_logo.svg?react';
import GoogleIcon from '../../../../../assets/icons/google_logo.svg?react';
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { isValidEmail } from '../../../../../utils/validationUtils';
import userService from '../../../../../services/userService';

const Form = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setUser({ ...user, [name]: value });
    };

    const togglePasswordView = () => {
        setShowPassword(!showPassword);
    };

    const validateUser = () => {
        let newError = { ...error };
        let errors = false;
        const { email, password } = user;
        if (!email) {
            newError.email = 'Email is required!';
            errors = true;
        }
        else if (!isValidEmail(email)) {
            newError.email = 'Please provide valid email!';
            errors = true;
        }
        else {
            newError.email = '';
        }
        if (!password) {
            newError.password = 'Password is required!';
            errors = true;
        }
        else {
            newError.password = '';
        }
        setError(newError);
        if (errors) {
            console.log('Error: ', newError);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateUser()) {
            return;
        }
        dispatch(ShowLoading());
        try {
            const response = await userService.loginUser(user);
            if (response.token) {
                Cookies.set('parlor-jwt-token', response.token, {
                    secure: true,
                    sameSite: 'Lax'
                });
                const from = location.state?.from.pathname;
                navigate(from || '/');
            }
        } catch (error) {
            message.error(error.response.data?.error);
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
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
              type="submit"
              className="w-full py-2 text-sm font-medium text-white bg-violet-600 rounded hover:bg-violet-700"
            >
              Sign in
            </button>
          </form>
  
          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="text-violet-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    )
};

export default Form;