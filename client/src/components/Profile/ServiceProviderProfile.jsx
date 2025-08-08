import React, { useRef, useState } from 'react';
import { FaCalendarCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import userService from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../redux/userSlice';


function ServiceProviderProfile({ setIsOpen }) {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const oldUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const [firstName, ...rest] = (oldUser?.name || "").split(" ");
    const surname = rest.join(" ") || oldUser?.surname || "";

    const [user, setUser] = useState({
        name: firstName || '',
        surname: surname || '',
        number: oldUser?.number || '',
        email: oldUser?.email || '',
        // password: oldUser?.password || '',
        ethnicity: oldUser?.ethnicity || '',
        city: oldUser?.city || '',
        suburb: oldUser?.suburb || '',
        height: oldUser?.height || '',
        hairColor: oldUser?.hairColor || '',
        callOutType: oldUser?.callOutType || '',
        _id: oldUser?._id || ''
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setSelectedImage(URL.createObjectURL(file)); // ✅ Show preview
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};
        if (!user.name) errors.name = "Name is required";
        if (!user.surname) errors.surname = "Surname is required";
        if (!user.email) errors.email = "Email is required";
        if (!user.number) errors.number = "Contact number is required";
        // if (!user.password) errors.password = "Password is required";
        // if (user.password && user.password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
        if (!user.ethnicity.trim()) errors.ethnicity = "Ethnicity is required";
        if (!user.city.trim()) errors.city = "City is required";
        if (!user.suburb.trim()) errors.suburb = "Suburb is required";
        if (!user.height) errors.height = "Height is required";
        if (!user.hairColor.trim()) errors.hairColor = "Hair color is required";
        if (!user.callOutType.trim()) errors.callOutType = "Call-out type is required";

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setError({});

        const formData = new FormData();
        formData.append('name', `${user.name} ${user.surname}`);
        formData.append('number', user.number);
        formData.append('email', user.email);
        // formData.append('password', user.password);
        formData.append('ethnicity', user.ethnicity);
        formData.append('city', user.city);
        formData.append('suburb', user.suburb);
        formData.append('height', user.height);
        formData.append('hairColor', user.hairColor);
        formData.append('callOutType', user.callOutType);

        if (imageFile) formData.append('file', imageFile); // ✅ Append Image

        try {
            const response = await userService.updateUserProfile(formData, oldUser._id);
            if (!response) {
                const data = await response.json();
                setError({ form: data.message || "Registration failed" });
                return;
            }
            toast.success('Profile updated successfully');
            dispatch(fetchUserInfo());
            setIsOpen(false);
        } catch (err) {
            console.log(err, 'qwqw')
            toast.error(err.response.data.error);
            setError({ form: "An error occurred. Please try again later." });
        }
    };



    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="mt-6">
            <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                    {selectedImage || oldUser?.image ? (
                        <img
                            src={
                                selectedImage
                                    ? selectedImage
                                    : `http://localhost:5777/static/images/${oldUser.image}`
                            }
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className='mb-6'>
                    <label htmlFor="name" className=" label">
                        Name
                    </label>
                    <input
                        name='name'
                        id='name'
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
                    <label htmlFor="sur" className=" label">
                        Surname
                    </label>
                    <input
                        name='sur'
                        id='sur'
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
                    <label htmlFor="email" className=" label">
                        Email
                    </label>
                    <input
                        name='email'
                        id='email'
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
                    <label htmlFor="num" className=" label">
                        Contact Number
                    </label>
                    <input
                        name='num'
                        id='num'
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
                    <label htmlFor="eth" className="label">
                        Ethnicity
                    </label>
                    <select
                        id="ethnicity"
                        name="ethnicity"
                        className="w-full input"
                        value={user.ethnicity}
                        onChange={(e) => setUser({ ...user, ethnicity: e.target.value })}
                    >
                        <option disabled value="">Select One</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Other">Other</option>
                    </select>
                    {error.ethnicity && <div className="text-red-500 text-sm">{error.ethnicity}</div>}
                </div>
                <div className='mb-6'>
                    <label htmlFor="city" className=" label">
                        City
                    </label>
                    <input
                        id='city'
                        name='city'
                        autoComplete="off"
                        type="text"
                        placeholder="Johannesburg"
                        className="w-full input"
                        value={user.city}
                        onChange={(e) => setUser({ ...user, city: e.target.value })}
                    />
                    {error.city && <div className="text-red-500 text-sm">{error.city}</div>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className='mb-6'>
                    <label htmlFor="suburb" className=" label">
                        Suburb
                    </label>
                    <input
                        id='suburb'
                        name='suburb'
                        autoComplete="off"
                        type="text"
                        placeholder="Bramley"
                        className="w-full input"
                        value={user.suburb}
                        onChange={(e) => setUser({ ...user, suburb: e.target.value })}
                    />
                    {error.suburb && <div className="text-red-500 text-sm">{error.suburb}</div>}
                </div>
                <div className='mb-6'>
                    <label htmlFor="height" className="label">
                        Height (cm)
                    </label>
                    <input
                        name='height'
                        id='height'
                        autoComplete="off"
                        type="number"
                        placeholder="165"
                        className="w-full input"
                        value={user.height}
                        onChange={(e) => setUser({ ...user, height: e.target.value })}
                    />
                    {error.height && <div className="text-red-500 text-sm">{error.height}</div>}
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div className='mb-6'>
                    <label htmlFor="hc" className=" label">
                        Hair color
                    </label>
                    <select
                        id="hairColor"
                        name="hairColor"
                        className="w-full input"
                        value={user.hairColor}
                        onChange={(e) => setUser({ ...user, hairColor: e.target.value })}
                    >
                        <option disabled value="">Select One</option>
                        <option value="Blonde">Blonde</option>
                        <option value="Brown">Brown</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                    </select>
                    {error.hairColor && <div className="text-red-500 text-sm">{error.hairColor}</div>}

                </div>
                <div className='mb-6'>
                    <label htmlFor="cot" className=" label">
                        Call-out Type
                    </label>
                    <select
                        id="callOutType"
                        name="callOutType"
                        className="w-full input"
                        value={user.callOutType}
                        onChange={(e) => setUser({ ...user, callOutType: e.target.value })}
                    >
                        <option disabled value="">Select One</option>
                        <option value="In-call">In-call</option>
                        <option value="Out-call">Out-call</option>
                        <option value="Both">Both</option>
                    </select>
                    {error.callOutType && <div className="text-red-500 text-sm">{error.callOutType}</div>}
                </div>
            </div>

            {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='mb-6'>
                    <label htmlFor="pass" className="label">Password</label>
                    <div className="relative">
                        <input
                            name='pass'
                            id='pass'
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
                    <label htmlFor="cp" className="label">Confirm Password</label>
                    <div className="relative mb-6">
                        <input
                            name='cp'
                            id='cp'
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
            </div> */}

            <button
                type="submit"
                className="w-full h-[48px] cursor-pointer py-2 text-sm font-medium text-white bg-[#5E50BF] rounded-full rounded-tr-none"
            >
                Update
            </button>
        </form>
    );
}

export default ServiceProviderProfile;