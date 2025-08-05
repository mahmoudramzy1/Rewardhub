import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from 'react-router-dom';

const OffersDashboard = () => {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]); // State to store offers
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: null, // Store image file instead of URL
        points: "",
        expiryDate: "",
        thirdparty: "", // Added market name
    });
    const [response, setResponse] = useState({});
    // Fetch offers from the backend
    useEffect(() => {
        axios
        .get("/api/offers")
        .then((response) => {
            const transformedOffers = response.data.map((offer) => ({
            ...offer,
              image: `http://localhost:3000${offer.imageUrl}`, // Prefix with your backend's base URL
            }));
            setOffers(transformedOffers);
        })
        .catch((error) => console.error("Error fetching offers:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
        setForm({ ...form, image: file });
        }
    };

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

    // Add Offer
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("points", form.points);
        formData.append("expiryDate", form.expiryDate);
        formData.append("thirdparty", form.thirdparty); // Include market name in the request
        if (form.image) {
        formData.append("image", form.image);
        }

        try {
        const response = await axios.post("/api/offers", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        setOffers([...offers, response.data]);
        setForm({ title: "", description: "", image: null, points: "", expiryDate: "", thirdparty: "" }); // Reset form
        } catch (error) {
            setResponse({
                success: false,
                message: error.response?.data?.message || "An error occurred while adding the offer.",
            });
        }
    };

    // Handle offer deletion
    const handleDelete = async (id) => {
        try {
        await axios.delete(`/api/offers/${id}`);
        setOffers(offers.filter((offer) => offer._id !== id));
        } catch (error) {
        console.error("Error deleting offer:", error);
        }
    };
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header Section */}
        <div className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Offer Management</h1>
                        <p className="text-sm text-gray-600">Create and manage promotional offers</p>
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
                {/* Add Offer Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <i className="pi pi-plus-circle text-primaryColor"></i>
                            Create New Offer
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <i className="pi pi-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                        placeholder="Enter offer title"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <i className="pi pi-align-left absolute left-3 top-3 text-gray-400"></i>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Describe your offer..."
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vendor/Partner <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <i className="pi pi-shop absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        name="thirdparty"
                                        value={form.thirdparty}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                        placeholder="Enter vendor name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Offer Image
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
                                    Points Required
                                </label>
                                <div className="relative">
                                    <i className="pi pi-star absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="number"
                                        name="points"
                                        value={form.points}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                        placeholder="Enter points required"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date
                                </label>
                                <div className="relative">
                                    <i className="pi pi-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={form.expiryDate}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
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
                                <i className="pi pi-plus mr-2"></i>
                                Create Offer
                            </button>
                        </form>
                    </div>
                </div>

                {/* Offers List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <i className="pi pi-gift text-primaryColor"></i>
                            Active Offers ({offers.length})
                        </h2>

                        {offers.length === 0 ? (
                            <div className="text-center py-12">
                                <i className="pi pi-gift text-4xl text-gray-300 mb-4 block"></i>
                                <p className="text-gray-500 text-lg">No offers available</p>
                                <p className="text-gray-400 text-sm">Create your first offer to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {offers.map((offer) => (
                                    <div
                                        key={offer.id}
                                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Offer Image */}
                                            <div className="flex-shrink-0">
                                                {offer.imageUrl ? (
                                                    <img
                                                        src={`http://localhost:3000${offer.imageUrl}`}
                                                        alt={offer.title}
                                                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <i className="pi pi-image text-gray-400 text-2xl"></i>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Offer Info */}
                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
                                                        <p className="text-gray-600 mb-3 leading-relaxed">{offer.description}</p>
                                                        
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <i className="pi pi-shop text-gray-400"></i>
                                                                <span className="font-medium">Vendor:</span>
                                                                <span>{offer.thirdPartyId}</span>
                                                            </div>
                                                            
                                                            {offer.points && (
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <i className="pi pi-star text-yellow-500"></i>
                                                                    <span className="font-medium">Points Required:</span>
                                                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                                                        {offer.points} points
                                                                    </span>
                                                                </div>
                                                            )}
                                                            
                                                            {offer.expiryDate && (
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <i className="pi pi-calendar text-gray-400"></i>
                                                                    <span className="font-medium">Expires:</span>
                                                                    <span>{new Date(offer.expiryDate).toLocaleDateString()}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => handleDelete(offer._id)}
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
)
}

export default OffersDashboard