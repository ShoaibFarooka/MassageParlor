import './App.css';
import Loader from "./components/Loader/Loader.jsx";
import { useSelector } from "react-redux";
import Router from './router/Router.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  return (
    <div className="App">
      {loading && <Loader />}
      <Router />
      <Toaster />
    </div>
  )
};

export default App;