import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [oldpass, setOldpass] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        // Check if passwordChangeRequired is true
        const passwordChangeRequired = localStorage.getItem("passwordChangeRequired");
        if (passwordChangeRequired === "true") {
            setOldpass("P@ssw0rd2024"); // Set default old password
        }
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {

            const response = await axios.patch(
                "/admin/change-password",
                { oldpass, password },
            );

            toast.success(response.data.message);

            localStorage.removeItem("passwordChangeRequired");
            navigate("/");
        } catch (error) {
            console.error("Password change failed:", error.response ? error.response.data : error.message);
            setErrors(error.response.data.errors || {});
            toast.error("Failed to change password.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-primaryColor to-green-600 p-4 rounded-2xl shadow-lg inline-block mb-4">
                        <img
                            src="/rewardhup-high-resolution-logo-transparent.png"
                            alt="RewardHub Logo"
                            className="h-12 w-auto filter brightness-0 invert"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Change Password</h1>
                    <p className="text-gray-600">Update your account password</p>
                </div>

                {/* Change Password Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        {!localStorage.getItem("passwordChangeRequired") && (
                            <div>
                                <label htmlFor="oldpass" className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <i className="pi pi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        id="oldpass"
                                        type="password"
                                        value={oldpass}
                                        onChange={(e) => setOldpass(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your current password"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <i className="pi pi-key absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter your new password"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <i className="pi pi-check-circle absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Confirm your new password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primaryColor hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                        >
                            Change Password
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Make sure your password is strong and secure
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        © 2024 RewardHub. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;