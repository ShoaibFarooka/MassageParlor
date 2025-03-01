import React, { useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import userService from '../../../../services/userService';

function UserSignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user.name || !user.surname || !user.dateOfBirth || !user.email || !user.password) {
            setError({ form: "Please fill in all required fields" });
            return;
        }
    
        if (user.password !== confirmPassword) {
            setError({ password: "Passwords do not match" });
            return;
        }
    
        setError({});
    
        // Combine name and surname into a single "name" field for the payload
        const payload = {
            ...user,
            name: `${user.name} ${user.surname}` // Combining both fields
        };
        // Remove the surname property since it's now merged
        delete payload.surname;
    
        try {
            const response = await userService.registerUser(payload, 'user');
    
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
        <form className="mt-6" onSubmit={handleSubmit}>
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
                </div>
            </div>

            {/* Form-level error */}
            {error.form && (
                <div className="text-red-500 text-center mt-4">{error.form}</div>
            )}

            {/* Full Name */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        placeholder="John"
                        className="w-full input"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label className="label">Surname</label>
                    <input
                        type="text"
                        placeholder="Doe"
                        className="w-full input"
                        value={user.surname}
                        onChange={(e) =>
                            setUser({ ...user, surname: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Date of Birth */}
            <div>
                <label className="label">Date of birth</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Jan 12 1980"
                        className="w-full input"
                        value={user.dateOfBirth}
                        onChange={(e) =>
                            setUser({ ...user, dateOfBirth: e.target.value })
                        }
                    />
                    <div className="absolute right-4 top-4 text-[#858FAD]">
                        <FaCalendarCheck />
                    </div>
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="label">Email</label>
                <input
                    type="email"
                    placeholder="john@email.com"
                    className="w-full input"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
            </div>

            <div>
                <label className="label">Contact Number</label>
                <input
                    type="text"
                    placeholder="0710000000"
                    className="w-full input"
                    value={user.number}
                    onChange={(e) => setUser({ ...user, number: e.target.value })}
                />
            </div>

            {/* Password */}
            <div>
                <label className="label">Password</label>
                <div className="relative">
                    <input
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
            <div>
                <label className="label">Confirm Password</label>
                <div className="relative">
                    <input
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
                </div>
            </div>

            {/* Sign Up Button */}
            <button
                type="submit"
                className="w-full mt-6 h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full"
            >
                Sign up
            </button>
        </form>
    );
}

export default UserSignUpForm;
