import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import userService from '../../../services/userService';
import ServicesHeader from '../components/ServicesHeader';
import ServicesTable from './components/ServicesTable';
import ServicesModel from './components/Services';
import profile from '../../../assets/images/profile.png';

const Services = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dropdownRef = useRef(null);
  const [height, setHeight] = useState(165);
  const minVal = 100;
  const maxVal = 200;
  const fillPercentage = ((height - minVal) / (maxVal - minVal)) * 100;
  const debounceTimer = useRef(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const dispatch = useDispatch();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [user, setUser] = useState({
    name: '',
    surname: '',
    number: '',
    email: '',
    password: '',
    ethnicity: '',
    location: '',
    height: '',
    hairColor: '',
    callOutType: '',
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    city: "",
    suburb: "",
    ethnicity: "",
    hairColor: "",
    minHeight: "",
    maxHeight: "",
    callOutType: "",
  });

  const [skipEffect, setSkipEffect] = useState(false);


  const fetchServiceProviders = async () => {
    dispatch(ShowLoading());
    try {
      const response = await userService.searchServiceProvidersAdmin(filters);
      let fetchedProviders = response.result.users;

      // Apply local filtering in case the API doesn't support it
      fetchedProviders = fetchedProviders.filter((provider) => {
        const searchQuery = filters.searchQuery.toLowerCase();
        return (
          provider.name.toLowerCase().includes(searchQuery) ||
          (provider.city && provider.city.toLowerCase().includes(searchQuery)) ||
          (provider.suburb && provider.suburb.toLowerCase().includes(searchQuery))
        );
      });

      console.log("fetchedProviders", fetchedProviders);

      // Add static data if missing
      fetchedProviders = fetchedProviders.map((provider) => ({
        ...provider,
        age: provider?.age,
        years: provider?.years,
        clients: provider?.clients,
        specialization: provider?.specialization,
        image: provider?.image ? `http://localhost:5777/static/images/${provider?.image}` : profile,
      }));

      setServiceProviders(fetchedProviders);
    } catch (error) {
      console.error("Error fetching service providers:", error);
      setServiceProviders([]);
    }
    dispatch(HideLoading());
  };


  useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false); // reset flag after skipping
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchServiceProviders();
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [filters.searchQuery]);


  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };


  const applyFilters = async () => {
    // Clear any existing debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Apply filters immediately when button is clicked
    await fetchServiceProviders();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const clearFilters = async () => {
    const resetFilters = {
      searchQuery: "",
      city: "",
      suburb: "",
      ethnicity: "",
      hairColor: "",
      minHeight: "",
      maxHeight: "",
      callOutType: "",
    };

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setSkipEffect(true);
    setFilters(resetFilters);
    setHeight(165);

    dispatch(ShowLoading());
    try {
      const response = await userService.searchServiceProviders(resetFilters);
      let fetchedProviders = response.result.users;

      fetchedProviders = fetchedProviders.map((provider) => ({
        ...provider,
        age: provider.age || 25,
        years: provider.years || 3,
        clients: provider.clients || 24,
        specialization: provider.specialization || "Specializes in Hot Stone and Sports massage.",
        image: provider.image ? `http://localhost:5777/static/images/${provider.image}` : profile,
      }));

      setServiceProviders(fetchedProviders);
    } catch (error) {
      console.error("Error fetching service providers:", error);
      setServiceProviders([]);
    }
    dispatch(HideLoading());
  };


  const onLoad = () => {
    fetchServiceProviders()
  }

  const handleServicesModel = (data) => {
    setServiceData(data);
    setIsOpen(true)
  }

  return (
    <div className=''>
      <ServicesHeader title={'Services'} />

      <div className='flex flex-col lg:flex-row items-center justify-center md:justify-between '>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="flex items-center pb-4 mt-8 lg:mt-0 lg:pb-0 justify-center space-x-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search"
                className="pl-6 pr-4 py-2 text-lg rounded-full h-[56px] w-[220px] sm:w-[400px] bg-white shadow outline-0"
              />
            </div>

            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full bg-white h-[50px] w-[50px] flex justify-center items-center cursor-pointer shadow"
              >
                <FaSlidersH className="text-black" fontSize={24} />
              </button>
              {isOpenFilter && (
                <div ref={dropdownRef} className="absolute right-0 w-[234px] mt-2 rounded-2xl shadow-lg bg-white z-50">
                  <h2 className="text-base font-semibold mb-4 mt-4 text-center">Filters</h2>

                  <div className='px-4'>
                    <div className="mb-2">
                      <label className="block text-[12px] font-medium ">City</label>
                      <input
                        type="text"
                        name="city"
                        value={filters.city}
                        onChange={handleFilterChange}
                        className="w-full h-[30px] text-[12px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-[12px] font-medium ">Suburb</label>
                      <input
                        type="text"
                        name="suburb"
                        value={filters.suburb}
                        onChange={handleFilterChange}
                        className="w-full h-[30px] text-[12px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                        placeholder="Enter suburb"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="block text-[12px] font-medium ">Ethnicity</label>
                      <select
                        name="ethnicity"
                        value={filters.ethnicity}
                        onChange={handleFilterChange}
                        className="w-full h-[30px] text-[12px] border-none outline-0 rounded-lg mt-2 p-2 bg-[#F3F2F8]"
                      >
                        <option value="">All</option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="block text-[12px] font-medium">Hair Color</label>
                      <div className="flex mt-2">
                        {["Blonde", "Brown", "Black", "Red"].map((color, index) => (
                          <span
                            key={index}
                            className={`w-5 h-5 rounded-full mr-[10px] cursor-pointer ${filters.hairColor === color ? "border-2 border-[#a3a0a0]" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setFilters((prev) => ({ ...prev, hairColor: color }))}
                          ></span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="block text-[12px] font-medium">Height - ({height}cm)</label>
                      <div className="mt-2">
                        <input
                          type="range"
                          min={minVal}
                          max={maxVal}
                          value={height}
                          onChange={(e) => {
                            const newHeight = e.target.value;
                            setHeight(newHeight);
                            setFilters((prev) => ({ ...prev, maxHeight: newHeight }));
                          }}
                          className="range-slider w-full"
                          style={{
                            background: `linear-gradient(to right, #000 0%, #000 ${fillPercentage}%, #ddd ${fillPercentage}%, #ddd 100%)`,
                          }}
                        />
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={clearFilters}
                    className="text-sm cursor-pointer font-semibold mt-2 text-[#5E50BF] bg-white py-3 w-full border-t border-gray-200"
                  >
                    Clear Filters
                  </button>


                  <button onClick={applyFilters} className='text-sm cursor-pointer font-semibold rounded-b-3xl text-white bg-[#5E50BF] py-3 w-full'>
                    Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>



        <button onClick={() => setEditOpen(true)} className='w-[210px] md:ml-auto flex justify-center items-center cursor-pointer my-6 font-semibold bg-[#5E50BF] text-white rounded-full rounded-tr-none h-[52px]'>Add Service Provider</button>
      </div>

      <ServicesTable handleServicesModel={handleServicesModel} selectedImage={selectedImage} setSelectedImage={setSelectedImage} user={user} setUser={setUser} editOpen={editOpen} setEditOpen={setEditOpen} setServiceProviders={setServiceProviders} serviceProviders={serviceProviders} onLoad={onLoad} />

      <ServicesModel
        setIsOpen={setIsOpen} isOpen={isOpen} serviceData={serviceData}
      />

      {/* <CreateService onLoad={onLoad} isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </div>
  )
}

export default Services