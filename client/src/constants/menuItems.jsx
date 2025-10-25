import DashboardIcon from '../assets/icons/dashboard_icon.svg?react';
import CampaignsIcon from '../assets/icons/campaigns_icon.svg?react';

export const menuItems = {
    admin: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: false },
        { path: '/admin/calendar', label: 'Calendar', icon: <CampaignsIcon />, disabled: false },
        { path: '/admin/users', label: 'User', icon: <CampaignsIcon />, disabled: false },
        { path: '/admin/service-providers', label: 'Service Provider', icon: <CampaignsIcon />, disabled: false },
        { path: '/admin/bookings', label: 'Bookings', icon: <DashboardIcon />, disabled: false },
    ],
    'service-provider': [
        { path: '/service/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: false },
        { path: '/service/calendar', label: 'Calendar', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/services', label: 'Services', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/gallery', label: 'Gallery', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/bookings', label: 'Bookings', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/plans', label: 'Plans', icon: <CampaignsIcon />, disabled: false },
        { path: '/success' },
    ],
    user: [
        { path: '/user/home', label: 'Home', icon: <DashboardIcon />, disabled: false },
        { path: '/user/booking', label: 'Calender', icon: <CampaignsIcon />, disabled: false },
        { path: '/user/bookings', label: 'Bookings', icon: <CampaignsIcon />, disabled: false },
    ],
};
