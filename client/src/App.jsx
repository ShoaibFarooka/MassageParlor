import './App.css';
import Loader from "./components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import Router from './router/Router.jsx';
import { Toaster } from 'react-hot-toast';
import CustomModal from './components/CustomModal/CustomModal.jsx';
import { useState } from 'react';

function App() {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;
  const [isOpen, setIsOpen] = useState(true);
  const [condition, setCondition] = useState(false);

  return (
    <div className="App">
      {loading && <Loader />}
      <Router />
      <Toaster />

      <CustomModal isOpen={isOpen} width={'436px'} contentLabel="Modal">
        <div className="text-center flex justify-center items-center flex-col">

          <div className='mt-10'>
            <h2 className="text-[30px] font-bold ">Welcome</h2>
          </div>

          <div className='py-4'>
            <p className="text-[20px] font-semibold ">Are you 18 years or older?</p>
          </div>

          <div className='mb-8'>
            <button onClick={() => setCondition(true)} className="cursor-pointer px-4 py-2 bg-[#D74042] w-[131px] h-[48px] text-white rounded-full rounded-tr-none mr-[12px]">
              No
            </button>

            <button onClick={() => { setIsOpen(false); setCondition(false) }} className=" cursor-pointer px-4 py-2  bg-[#5E50BF] w-[131px] h-[48px] text-white rounded-full rounded-tl-none ">
              Yes
            </button>
          </div>

          {condition && <div className='mb-8'>
            <p className='text-[#D74042] font-semibold'>
              Sorry, you must be 18+ to access this platform.
            </p>
          </div>}

        </div>
      </CustomModal>
    </div>
  )
};

export default App;