    import { useState } from "react";
    import axios from "../api/axiosInstance";
    import { useNavigate } from "react-router-dom";

    const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        company: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("/admin/signup", form);
        console.log(response.data);
        navigate("/dashboard");
        } catch (error) {
        console.error("Registration failed:", error.response.data);
        setErrors(error.response.data.errors || {});
        }
    };

    return (
        <div className="min-h-screen bg-primaryColor h-full w-full py-2 px-4 rounded-lg">
        <div className="max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
            <div className="w-[70%] flex items-center justify-center pr-20">
            <img
                src="/public/pixelcut-export (1).png"
                alt="logo"
                className="w-[100%]"
            />
            </div>
            <div className="w-full">
            <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">
                Add Admin
            </h1>
                <div className="flex justify-center items-center mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="justify-between items-center bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            Go to Home
                        </button>
                </div>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                <label htmlFor="username" className="block text-TextColor mb-2">
                    UserName <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="password" className="block text-TextColor mb-2">
                    Password <span className="text-red-600">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="firstname" className="block text-TextColor mb-2">
                    First Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="lastname" className="block text-TextColor mb-2">
                    Last Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="phonenumber" className="block text-TextColor mb-2">
                    Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="phonenumber"
                    id="phonenumber"
                    value={form.phonenumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.phonenumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
                )}
                </div>
                <div className="mb-4">
                <label htmlFor="company" className="block text-TextColor mb-2">
                    Company <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="company"
                    id="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
                </div>
                <button
                type="submit"
                className="w-full bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                >
                Add
                </button>
            </form>
            </div>
        </div>
        </div>
    );
    };

    export default Register;
