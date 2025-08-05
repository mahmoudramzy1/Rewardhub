import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"; 
import { toast } from "react-toastify";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()
    const proceedLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('http://localhost:3000/admin/login', {
                    username: userName,
                    password: password,
                    role: 'admin'
                });
                const { accessToken, refreshToken, passwordChangeRequired } = response.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("passwordChangeRequired", passwordChangeRequired);
                console.log("Login Done", accessToken);
                toast("Login successful!");
                if (passwordChangeRequired) {
                    navigate("/change-password");
                } else {
                    navigate("/")
                }
            } catch (error) {
                console.error("Login failed:", error.response ? error.response.data : error.message);
                toast("Invalid username or password");
            }
        }
    };

    const validate = () => {
        let result = true;
        if (userName === "" || userName === null) {
            result = false;
            toast("Please enter UserName");
        }
        if (password === "" || password === null) {
            result = false;
            toast("Please enter Password");
        }
        return result;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-50">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-primaryColor to-green-600 p-4 rounded-2xl shadow-lg inline-block mb-4">
                        <img
                            src="/rewardhub-high-resolution-logo__2_-removebg-preview-2.png"
                            alt="RewardHub Logo"
                            className="h-12 w-auto filter brightness-0 invert"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your admin account</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={proceedLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="username"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <i className="pi pi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primaryColor hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Need help? Contact your system administrator
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

export default Login;
