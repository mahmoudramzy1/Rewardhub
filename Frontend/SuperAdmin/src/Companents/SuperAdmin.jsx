import { useNavigate } from "react-router-dom";
import { confirmDialog } from 'primereact/confirmdialog';
import axios from "../api/axiosInstance";
    const SuperAdminDashboard = () => {
        const navigate=useNavigate()
    const handleOffersDashboard=()=>{
        navigate("/offerDashBoard")
    }
    const handleMarketDashboard=()=>{
        navigate("/marketDashboard")
    }
    const handleAddAdmin=()=>{
        navigate("/register")
    }

    const handleAdminDashboard=()=>{
        navigate("/dashboard")
    }
    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.error('No refresh token found');
                return;
            }
            console.log("Refresh token:", refreshToken);
            const response = await axios.delete('/admin/logout', {
                data: { token: refreshToken },
            });
    
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    const confirmLogout = () => {
        confirmDialog({
            message: 'Are you sure you want to log out?',
            header: 'Logout Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: handleLogout, // Call handleLogout on confirmation
            reject: () => console.log('Logout cancelled'), // Optional: handle rejection
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
                            <p className="text-sm text-gray-600">Manage your RewardHub platform</p>
                        </div>
                        <button 
                            onClick={confirmLogout}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                        >
                            <i className="pi pi-sign-out"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Section */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Admin Panel</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Manage all aspects of your RewardHub platform from this centralized dashboard. 
                        Access tools for managing offers, vendors, and administrative users.
                    </p>
                </div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Manage Offers Card */}
                    <div className="group">
                        <button 
                            onClick={handleOffersDashboard}
                            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primaryColor transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primaryColor transition-colors duration-300">
                                    <i className="pi pi-gift text-2xl text-green-600 group-hover:text-white"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Offers</h3>
                                <p className="text-sm text-gray-600">Create and manage promotional offers for your platform</p>
                            </div>
                        </button>
                    </div>

                    {/* Manage Vendors Card */}
                    <div className="group">
                        <button 
                            onClick={handleMarketDashboard}
                            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primaryColor transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primaryColor transition-colors duration-300">
                                    <i className="pi pi-shop text-2xl text-blue-600 group-hover:text-white"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Vendors</h3>
                                <p className="text-sm text-gray-600">Oversee vendor accounts and marketplace settings</p>
                            </div>
                        </button>
                    </div>

                    {/* Add Admin Card */}
                    <div className="group">
                        <button 
                            onClick={handleAddAdmin}
                            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primaryColor transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primaryColor transition-colors duration-300">
                                    <i className="pi pi-user-plus text-2xl text-purple-600 group-hover:text-white"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Admin</h3>
                                <p className="text-sm text-gray-600">Create new administrator accounts for your team</p>
                            </div>
                        </button>
                    </div>

                    {/* Show Admins Card */}
                    <div className="group">
                        <button 
                            onClick={handleAdminDashboard}
                            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-primaryColor transition-all duration-300 transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primaryColor transition-colors duration-300">
                                    <i className="pi pi-users text-2xl text-orange-600 group-hover:text-white"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Show Admins</h3>
                                <p className="text-sm text-gray-600">View and manage existing administrator accounts</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Quick Stats Section */}
                <div className="mt-16">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Platform Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="pi pi-chart-line text-green-600 text-xl"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Analytics</h4>
                            <p className="text-sm text-gray-600 mt-1">Monitor platform performance</p>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="pi pi-cog text-blue-600 text-xl"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Settings</h4>
                            <p className="text-sm text-gray-600 mt-1">Configure system preferences</p>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i className="pi pi-shield text-purple-600 text-xl"></i>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Security</h4>
                            <p className="text-sm text-gray-600 mt-1">Manage security settings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
