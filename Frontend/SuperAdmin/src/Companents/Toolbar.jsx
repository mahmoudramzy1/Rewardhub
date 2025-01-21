import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";

const Toolbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { label: "Manage Offers", path: "/offerDashBoard" },
    { label: "Manage Vendors", path: "/marketDashBoard" },
    { label: "Add Admin", path: "/register" },
    { label: "Show Admins", path: "/dashboard" }
  ];

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error('No refresh token found');
      return;
    }

    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = '/';
    }
  };

  const handleNavigation = (path, index) => {
    setActiveItem(index);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#149817] h-12 z-50 shadow-lg">
      <div className="absolute inset-0 bg-[#0f7313] clip-curve"></div>
      <div className="max-w-7xl mx-auto px-4 h-full relative">
        <div className="flex justify-between items-center h-full">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-white text-lg font-bold">RewardHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 h-full">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path, index)}
                className={`relative h-full px-4 group transition-all duration-200 ease-in-out
                  ${activeItem === index ? 'text-white' : 'text-white/80 hover:text-white'}`}
              >
                <span className="relative z-10 text-sm font-medium">{item.label}</span>
                {activeItem === index && (
                  <div className="absolute bottom-0 left-2 right-2 h-1 bg-white rounded-t-full" />
                )}
                <div className="absolute bottom-0 left-2 right-2 h-0 bg-white/20 rounded-t-full transition-all duration-200 ease-in-out group-hover:h-full" />
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/90 hover:text-white px-4 py-1.5 rounded-full bg-[#0f7313] hover:bg-[#0c5f10] transition-all duration-200 border border-white/10"
            >
              <span className="text-sm">Logout</span>
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1 rounded-full hover:bg-[#0f7313] transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-[#149817] shadow-lg rounded-b-xl overflow-hidden transition-all duration-200 border-t border-white/10">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleNavigation(item.path, index);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-white/80 hover:text-white hover:bg-[#0f7313] px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full text-left text-white/80 hover:text-white hover:bg-[#0f7313] px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <style>{`
        .clip-curve {
          clip-path: circle(170% at 100% 0);
        }
      `}</style>
    </nav>
  );
};

export default Toolbar;