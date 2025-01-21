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
                <h1 className="text-2xl font-bold text-center mb-4 text-TextColor">Manage Offers</h1>
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
                <label className="block text-TextColor mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                </div>

                <div className="mb-4">
                <label className="block text-TextColor mb-2">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                ></textarea>
                </div>

                <div className="mb-4">
                <label className="block text-TextColor mb-2">Market Name</label>
                <input
                    type="text"
                    name="thirdparty"
                    value={form.thirdparty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                    required
                />
                </div>

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
                    className="hidden text-textInput"
                    id="imageInput"
                    />
                    <label htmlFor="imageInput" className="cursor-pointer text-textInput">
                    {form.image ? form.image.name : "Click to upload or drag and drop an image here"}
                    </label>
                </div>
                </div>

                <div className="mb-4">
                <label className="block text-TextColor mb-2">Point (Optional)</label>
                <input
                    type="number"
                    name="points"
                    value={form.points}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
                />
                </div>

                <div className="mb-4">
                <label className="block mb-2 text-TextColor">Expiry Date (Optional)</label>
                <input
                    type="date"
                    name="expiryDate"
                    value={form.expiryDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded text-textInput"
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
                Add Offer
                </button>
            </form>

            {/* Offers List */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-TextColor">Offers</h2>
                {offers.length === 0 ? (
                <p className="text-TextColor ">No offers available.</p>
                ) : (
                <ul className="space-y-4">
                    {offers.map((offer) => (
                    <li
                        key={offer.id}
                        className="p-4 border rounded shadow flex justify-between items-center text-TextColor"
                    >
                        <div>
                        <h3 className="text-lg font-bold">{offer.title}</h3>
                        <p>{offer.description}</p>
                        <p className=""> {offer.thirdPartyId}</p>
                        {}
                        {offer.image && (
                            <img
                            src={`http://localhost:3000${offer.imageUrl}`}
                            alt="Offer"
                            className="w-16 h-16 mt-2 rounded"
                            />
                        )}
                        {offer.points && <p className="text-TextColor">Points: {offer.points}</p>}
                        {offer.expiryDate && (
                            <p className="text-TextColor">Expiry Date: {offer.expiryDate}</p>
                        )}
                        </div>
                        <button
                        onClick={() => handleDelete(offer._id)}
                        className="py-3 px-4 bg-deleteColor rounded-lg duration-75 hover:bg-deleteColorHover"
                        >
                        Delete
                        </button>
                    </li>
                    ))}
                </ul>
                )}
            </div>
            </div>
        </div>
        </div>
)
}

export default OffersDashboard