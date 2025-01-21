import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const MarketDashboard = () => {
    const navigate = useNavigate();
    const [markets, setMarkets] = useState([]);
    const [query, setQuery] = useState('');
    const [errors, setErrors] = useState({});
    const [editingMarketId, setEditingMarketId] = useState(null); // ID of the market being edited



    const [response, setResponse] = useState({}); // State to store markets
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        image: null,
        phonenumber: "",
        points: "",
        industryType: "",
        website: "",
    });

    // Fetch markets from the backend
    useEffect(() => {
        axios
            .get("/superadmin/thirdparties")
            .then((response) => setMarkets(response.data))
            .catch((error) => console.error("Error fetching markets:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        setForm({ ...form, image: file });
        }
    };
    // const handleEdit = (market) => {
    //     setEditingMarketId(market._id);
    //     setForm({
    //         username: market.username,
    //         password: "", // Keep empty for security purposes
    //         email: market.email,
    //         image: null, // If image editing is optional
    //         phonenumber: market.phonenumber,
    //         points: market.points || "",
    //         industryType: market.industryType,
    //         website: market.website,
    //     });
    // };
    
    // Handle image drag and drop
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
        setForm({ ...form, image: file });
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const response = await axios.get(`/superadmin/thirdparty/search?q=${query}`);
            setMarkets(response.data); // Update products with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    // Add Market
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("username", form.username);
            formData.append("password", form.password);
            formData.append("email", form.email);
            if (form.image) formData.append("image", form.image); // Add image only if it exists
            formData.append("phonenumber", form.phonenumber);
            formData.append("points", form.points);
            formData.append("industrytype", form.industryType);
            formData.append("website", form.website);

            if (editingMarketId) {
                // Update market
                const response = await axios.put(`/superadmin/thirdparty/edit/${editingMarketId}`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                setMarkets((prevMarkets) =>
                    prevMarkets.map((market) =>
                        market._id === editingMarketId ? { ...market, ...response.data } : market
                    )
                );
                setEditingMarketId(null); // Reset editing state
            } else {
                // Add new market
                const response = await axios.post("/superadmin/thirdparty", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                setMarkets([...markets, response.data]);
            }
    
            setForm({
                username: "",
                password: "",
                email: "",
                image: null,
                phonenumber: "",
                points: "",
                industryType: "",
                website: "",
            }); // Reset form
        } catch (error) {
            setResponse({
                success: false,
                message: error.response?.data?.message || "An error occurred.",
            });
            setErrors(error.response?.data?.errors || {});
        }
    };
    
    // Handle market deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/superadmin/thirdparty/${id}`);
            setMarkets(markets.filter((market) => market._id !== id));
        } catch (error) {
            console.error("Error deleting market:", error);
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
                    <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">Manage Vendors</h1>
                    <div className="flex justify-center items-center mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            Go to Home
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Image</label>
                            <div
                                className="w-full px-3 py-2 border rounded bg-gray-50 text-center cursor-pointer"
                                onDrop={handleImageDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="imageInput"
                                />
                                <label htmlFor="imageInput" className="cursor-pointer text-textInput">
                                    {form.image ? form.image.name : "Click to upload or drag and drop an image here"}
                                </label>
                            </div>
                        </div>
                            
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Phone number</label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={form.phonenumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                            />
                        </div>
                        {errors.phonenumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>)}
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Points (Optional)</label>
                            <input
                                type="number"
                                name="points"
                                value={form.points}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Industry Type</label>
                            <input
                                type="text"
                                name="industryType"
                                value={form.industryType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {errors.industryType && (
                        <p className="text-red-500 text-sm mt-1">{errors.industryType}</p>)}
                        <div className="mb-4">
                            <label className="block text-TextColor mb-2">Website</label>
                            <input
                                type="website"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded text-textInput"
                                required
                            />
                        </div>
                        {response.message && (
                            <div
                                className={`p-4 mb-4 rounded ${
                                    response.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                            >
                                {response.message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            {editingMarketId ? "Update Store" : "Add Vendor"}
                        </button>

                    </form>

                    {/* Markets List */}
                    <div>
                        <div className="flex flex-col justify-center items-center mb-4">
                        <h2 className="text-xl font-bold mb-4 text-TextColor text-center">Vendors</h2>
                        <form onSubmit={handleSearch} className="flex flex-col items-center">
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Search for stores..."
                                className="px-3 py-2 border border-gray-300 rounded-md mb-4 w-72"
                            />
                            <button
                                type="submit"
                                className="btn btn-success mb-3"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                        {markets.length === 0 ? (
                            <p className="text-TextColor">No markets available.</p>
                        ) : (
                            <ul className="space-y-4">
                                {markets.map((market) => (
                                    <li
                                        key={market._id}
                                        className="p-4 border rounded shadow flex justify-between items-center text-TextColor"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold">{market.username}</h3>
                                            <p>Email: {market.email}</p>
                                            <p>Phone number: {market.phonenumber}</p>
                                            <p>Industry: {market.industryType}</p>
                                            <p>Website: {market.website}</p>
                                            {market.points && <p>Points: {market.points}</p>}
                                            {market.imageUrl && (
                                                <img
                                                    src={`http://localhost:3000${market.imageUrl}`}
                                                    alt="Market"
                                                    className="w-16 h-16 mt-2 rounded"
                                                />
                                            )}
                                        </div>
                                        <div className="mr-4">
                                            <button 
                                                onClick={() => handleDelete(market._id)}
                                                className="mr-4 py-3 px-4 bg-deleteColor rounded-lg duration-75 hover:bg-deleteColorHover"
                                            >
                                                Delete
                                            </button>
                                            {/* <button
                                                onClick={() => handleEdit(market)}
                                                className="py-3 px-4 bg-blue-500 text-white rounded-lg duration-75 hover:bg-blue-600"
                                            >
                                                Edit
                                            </button> */}
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketDashboard;
