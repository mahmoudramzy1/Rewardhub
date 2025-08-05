import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const Toolbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    { label: "Manage Offers", path: "/offerDashBoard", icon: "pi-gift" },
    { label: "Manage Vendors", path: "/marketDashBoard", icon: "pi-shop" },
    { label: "Add Admin", path: "/register", icon: "pi-user-plus" },
    { label: "Show Admins", path: "/dashboard", icon: "pi-users" }
  ];

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error('No refresh token found');
      return;
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = '/';
  };

  const handleNavigation = (path, index) => {
    setActiveItem(index);
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primaryColor cursor-pointer to-green-600 p-2 rounded-xl shadow-md"
              onClick={() => navigate('/')}>
                <img
                  src="/public/pixelcut-export (1).png"
                  alt="RewardHub Logo"
                  className="h-8 w-auto filter brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path, index)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${activeItem === index 
                    ? 'bg-primaryColor text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-primaryColor'}`}
              >
                <i className={`pi ${item.icon} text-sm`}></i>
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
            >
              <span className="text-sm">Logout</span>
              <i className="pi pi-sign-out text-sm"></i>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primaryColor p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <i className={`pi ${isMenuOpen ? 'pi-times' : 'pi-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path, index)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${activeItem === index 
                      ? 'bg-primaryColor text-white' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primaryColor'}`}
                >
                  <i className={`pi ${item.icon}`}></i>
                  {item.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <i className="pi pi-sign-out"></i>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        className="modern-dialog"
        header={
          <div className="flex items-center gap-2">
            <i className="pi pi-exclamation-triangle text-orange-600"></i>
            <span className="font-semibold">Confirm Logout</span>
          </div>
        }
        visible={showLogoutDialog}
        style={{ width: '90%', maxWidth: '400px' }}
        onHide={() => setShowLogoutDialog(false)}
        footer={
          <div className="flex gap-3 justify-end">
            <Button 
              label="Cancel" 
              icon="pi pi-times" 
              onClick={() => setShowLogoutDialog(false)}
              className="p-button-outlined p-button-secondary"
            />
            <Button 
              label="Logout" 
              icon="pi pi-sign-out" 
              onClick={confirmLogout}
              className="p-button-danger"
            />
          </div>
        }
      >
        <div className="text-center py-4">
          <i className="pi pi-sign-out text-orange-500 text-4xl mb-4"></i>
          <p className="text-lg font-medium text-gray-900 mb-2">Are you sure you want to logout?</p>
          <p className="text-gray-600">You will be redirected to the login page.</p>
        </div>
      </Dialog>
    </nav>
  );
};

export default Toolbar;