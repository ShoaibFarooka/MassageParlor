import DashboardIcon from '../assets/icons/dashboard_icon.svg?react';
import CampaignsIcon from '../assets/icons/campaigns_icon.svg?react';

export const menuItems = {
    admin: [
        { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: false },
        { path: '/admin/calendar', label: 'Calendar', icon: <CampaignsIcon />, disabled: false },
        { path: '/admin/services', label: 'Services', icon: <CampaignsIcon />, disabled: false },
        { path: '/admin/gallery', label: 'Gallery', icon: <CampaignsIcon />, disabled: false },
    ],
    'service-provider': [
        { path: '/service/dashboard', label: 'Dashboard', icon: <DashboardIcon />, disabled: false },
        { path: '/service/calendar', label: 'Calendar', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/services', label: 'Services', icon: <CampaignsIcon />, disabled: false },
        { path: '/service/gallery', label: 'Gallery', icon: <CampaignsIcon />, disabled: false },
    ],
    user: [
        { path: '/user/home', label: 'Home', icon: <DashboardIcon />, disabled: false },
        { path: '/user/booking', label: 'Bookings', icon: <CampaignsIcon />, disabled: false },
    ],
};
