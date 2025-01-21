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
        <div className="min-h-screen h-full w-full bg-primaryColor text-center py-2 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
            <div className="w-[70%] flex items-center justify-center pr-20">
            <img
                src="/public/pixelcut-export (1).png"
                alt="logo"
                className="w-[100%]"
            />
            </div>
            <div className="w-full">
            <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">Admin Panel</h1>
            <div className="flex justify-center items-center mb-6">
                {/* Logout Button */}
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-center transition-all duration-300" onClick={confirmLogout}>
                    Logout <i className="pi pi-sign-out"></i>
                </button>
            </div>
            {/* Action Buttons */}
        <div className="mb-6 grid  grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Group 1: Offers */}
            <button onClick={handleOffersDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Manage Offers
            </button>

            {/* Group 2: Markets */}
            <button onClick={handleMarketDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Manage Vendors
            </button>

            {/* Group 3: Admins */}
            <button onClick={handleAddAdmin} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Add Admin
            </button>
            <button onClick={handleAdminDashboard} className="py-3 px-4 bg-btnColor rounded-lg hover:bg-btnColorHover text-white">
                Show Admins
            </button>
            </div>


            </div>
        </div>
        </div>
    );
};

export default SuperAdminDashboard;
