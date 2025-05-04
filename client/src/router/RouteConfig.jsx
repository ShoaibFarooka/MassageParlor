import Login from '../pages/common/Login/Login.jsx';
import Register from '../pages/common/Register/Register.jsx';
import ForgotPassword from '../pages/common/ForgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/common/ResetPassword/ResetPassword.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import Home from '../pages/common/Home/Home.jsx';
import UserHome from '../pages/user/Home/Home.jsx';
import UserBooking from '../pages/user/booking/Booking.jsx';
import Dashboard from '../pages/serviceProvider/dashboard/Dashboard.jsx';
import Calendar from '../pages/serviceProvider/calendar/Calendar.jsx';
import Services from '../pages/serviceProvider/services/Services.jsx';
import Gallery from '../pages/serviceProvider/gallery/Gallery.jsx';

import AdminDashboard from '../pages/admin/dashboard/Dashboard.jsx';
import AdminCalendar from '../pages/admin/calendar/Calendar.jsx';
import AdminServices from '../pages/admin/services/Services.jsx';
import AdminGallery from '../pages/admin/gallery/Gallery.jsx';

const routes = [

  { path: "/user/home", element: <UserHome />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/user/booking", element: <UserBooking />, protected: true, authRedirect: false, showSidebar: true },

  //service Provider
  { path: "/service/dashboard", element: <Dashboard />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/service/calendar", element: <Calendar />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/service/services", element: <Services />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/service/gallery", element: <Gallery />, protected: true, authRedirect: false, showSidebar: true },

  //admin
  { path: "/admin/dashboard", element: <AdminDashboard />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/admin/calendar", element: <AdminCalendar />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/admin/services", element: <AdminServices />, protected: true, authRedirect: false, showSidebar: true },
  { path: "/admin/gallery", element: <AdminGallery />, protected: true, authRedirect: false, showSidebar: true },

  //common
  { path: "/", element: <Redirect />, protected: true, authRedirect: false, showSidebar: false },
  { path: "/login", element: <Login />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/home", element: <Home />, protected: false, authRedirect: false, showSidebar: false },
  { path: "/register", element: <Register />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/forgot-password", element: <ForgotPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "/reset-password", element: <ResetPassword />, protected: false, authRedirect: true, showSidebar: false },
  { path: "*", element: <NotFound />, protected: false, showSidebar: false },
];

export default routes;
