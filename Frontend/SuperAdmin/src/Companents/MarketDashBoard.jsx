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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Vendor Management</h1>
                            <p className="text-sm text-gray-600">Manage vendor accounts and marketplace settings</p>
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <i className="pi pi-home"></i>
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Vendor Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <i className="pi pi-plus-circle text-primaryColor"></i>
                                {editingMarketId ? "Update Vendor" : "Add New Vendor"}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Username <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="Enter username"
                                            required
                                        />
                                    </div>
                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="password"
                                            name="password"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Logo/Image
                                    </label>
                                    <div
                                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primaryColor transition-colors duration-200"
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
                                        <label htmlFor="imageInput" className="cursor-pointer">
                                            <i className="pi pi-cloud-upload text-3xl text-gray-400 mb-2 block"></i>
                                            <p className="text-gray-600">
                                                {form.image ? form.image.name : "Click to upload or drag and drop"}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="tel"
                                            name="phonenumber"
                                            value={form.phonenumber}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    {errors.phonenumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Points (Optional)
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-star absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="number"
                                            name="points"
                                            value={form.points}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="Enter points"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Industry Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            name="industryType"
                                            value={form.industryType}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="e.g., Food & Beverage"
                                            required
                                        />
                                    </div>
                                    {errors.industryType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.industryType}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <i className="pi pi-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="url"
                                            name="website"
                                            value={form.website}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                            placeholder="https://example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {response.message && (
                                    <div
                                        className={`p-4 rounded-lg ${
                                            response.success 
                                                ? "bg-green-50 border border-green-200 text-green-700" 
                                                : "bg-red-50 border border-red-200 text-red-700"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <i className={`pi ${response.success ? 'pi-check-circle' : 'pi-exclamation-triangle'}`}></i>
                                            {response.message}
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-primaryColor hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                                >
                                    <i className={`pi ${editingMarketId ? 'pi-save' : 'pi-plus'} mr-2`}></i>
                                    {editingMarketId ? "Update Vendor" : "Add Vendor"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Vendors List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <i className="pi pi-shop text-primaryColor"></i>
                                    Vendor List ({markets.length})
                                </h2>
                                
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <div className="relative">
                                        <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            value={query}
                                            onChange={handleInputChange}
                                            placeholder="Search vendors..."
                                            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>

                            {markets.length === 0 ? (
                                <div className="text-center py-12">
                                    <i className="pi pi-shop text-4xl text-gray-300 mb-4 block"></i>
                                    <p className="text-gray-500 text-lg">No vendors found</p>
                                    <p className="text-gray-400 text-sm">Add your first vendor to get started</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {markets.map((market) => (
                                        <div
                                            key={market._id}
                                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                                        >
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Vendor Image */}
                                                <div className="flex-shrink-0">
                                                    {market.imageUrl ? (
                                                        <img
                                                            src={`http://localhost:3000${market.imageUrl}`}
                                                            alt={market.username}
                                                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <i className="pi pi-shop text-gray-400 text-xl"></i>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Vendor Info */}
                                                <div className="flex-grow">
                                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{market.username}</h3>
                                                            <div className="space-y-1 text-sm text-gray-600">
                                                                <p className="flex items-center gap-2">
                                                                    <i className="pi pi-envelope text-gray-400"></i>
                                                                    {market.email}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <i className="pi pi-phone text-gray-400"></i>
                                                                    {market.phonenumber}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <i className="pi pi-tag text-gray-400"></i>
                                                                    {market.industryType}
                                                                </p>
                                                                <p className="flex items-center gap-2">
                                                                    <i className="pi pi-globe text-gray-400"></i>
                                                                    <a 
                                                                        href={market.website} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-primaryColor hover:underline"
                                                                    >
                                                                        {market.website}
                                                                    </a>
                                                                </p>
                                                                {market.points && (
                                                                    <p className="flex items-center gap-2">
                                                                        <i className="pi pi-star text-gray-400"></i>
                                                                        {market.points} points
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => handleDelete(market._id)}
                                                                className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                                                            >
                                                                <i className="pi pi-trash"></i>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketDashboard;
