import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './Dashboard.css';
import axios from '../api/axiosInstance';
import { Buffer } from 'buffer';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


window.Buffer = Buffer;
const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [query, setQuery] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState(''); // 'add', 'edit', 'delete', or 'resetPassword'
    const [selectedProduct, setSelectedProduct] = useState(null); // For edit or delete
    const [errors, setErrors] = useState({})
    const [showResetDialog, setShowResetDialog] = useState(false);
    const [resetUser, setResetUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    // Fetch data from backend API
    useEffect(() => {
        const abortController = new AbortController(); // Create an AbortController instance
        const signal = abortController.signal; // Extract the signal

        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    // Decode the token to extract the username
                    const decodedToken = jwtDecode(accessToken);
                    console.log("DECODED TOKEN", JSON.stringify(decodedToken));

                }
                const response = await axios.get('/superadmin/admins', { signal });
                setProducts(response.data); // Update state with fetched data
            } catch (error) {
                if (signal.aborted) {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => {
            abortController.abort();
        };
    }, []); // Empty dependency array to run on component mount only

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form reload
        try {
            const response = await axios.get(`superadmin/admin/search?q=${query}`);
            setProducts(response.data); // Update products with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSave = async () => {
    if (dialogType === 'edit') {
            // Call backend API to update the user
            try {
                await axios.put(`/superadmin/admin/edit/${selectedProduct._id}`, selectedProduct);
                setShowDialog(false);
            } catch (error) {
                console.log("Editing User failed:", error.response.data);
                setErrors(error.response.data.errors || {});
            }
        }
        // Refresh data
        fetchProducts();
        
    };

    const handleResetPassword = async (rowData) => {
        try {
            await axios.put(`/superadmin/admin/reset/${rowData._id}`);
            setSuccessMessage(`Password reset successfully for ${rowData.username}!`);
            setShowResetDialog(false);
            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (error) {
            console.error('Error resetting password:', error);
        }
        fetchProducts();
    };
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const confirmResetPassword = (rowData) => {
        setResetUser(rowData);
        setShowResetDialog(true);
    };

    const handleDelete = async () => {
        // Call backend API to delete the user
        await axios.delete(`/superadmin/admin/delete/${selectedProduct._id}`);
        // Refresh data
        fetchProducts();
        setShowDialog(false);
    };

    const fetchProducts = async () => {
        setLoading(true);
        const response = await axios.get('/superadmin/admins');
        setProducts(response.data);
        setLoading(false);
    };

   

    const actionsTemplate = (rowData) => {
        return (
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => {
                        setDialogType('view');
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-200"
                    title="View Details"
                >
                    <i className="pi pi-eye text-sm"></i>
                </button>
                <button
                    onClick={() => {
                        setDialogType('edit');
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-all duration-200"
                    title="Edit Admin"
                >
                    <i className="pi pi-file-edit text-sm"></i>
                </button>
                <button
                    onClick={() => {
                        setDialogType('delete');
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200"
                    title="Delete Admin"
                >
                    <i className="pi pi-trash text-sm"></i>
                </button>
                <button
                    onClick={() => confirmResetPassword(rowData)}
                    className="flex items-center justify-center w-8 h-8 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-all duration-200"
                    title="Reset Password"
                >
                    <i className="pi pi-refresh text-sm"></i>
                </button>
            </div>
        );
    };
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
                            <p className="text-sm text-gray-600">Manage system administrators</p>
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 bg-primaryColor hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            <i className="pi pi-home"></i>
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                        <i className="pi pi-check-circle text-green-600 text-lg"></i>
                        <span className="text-green-800 font-medium">{successMessage}</span>
                    </div>
                )}

                {/* Actions Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <button
                            onClick={() => navigate('/register')}
                            className="flex items-center gap-2 bg-primaryColor hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                        >
                            <i className="pi pi-plus"></i>
                            Add New Admin
                        </button>
                        
                        <form onSubmit={handleSearch} className="flex gap-3">
                            <div className="relative">
                                <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleInputChange}
                                    placeholder="Search for admin..."
                                    className="pl-10 pr-4 py-3 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryColor"></div>
                                <span className="text-gray-600">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <DataTable 
                            value={products} 
                            responsiveLayout="scroll" 
                            className="modern-datatable"
                            paginator 
                            rows={10}
                            stripedRows
                        >
                            <Column 
                                field="username" 
                                header="Username"
                                className="font-medium"
                            />
                            <Column 
                                field="firstname" 
                                header="First Name"
                            />
                            <Column 
                                field="lastname" 
                                header="Last Name"
                            />
                            <Column 
                                field="phonenumber" 
                                header="Phone Number"
                            />
                            <Column 
                                field="company" 
                                header="Company"
                            />
                            <Column
                                header="Actions"
                                body={(rowData) => actionsTemplate(rowData)}
                                className="action-column"
                                headerStyle={{
                                    textAlign: 'center',
                                    width: '180px'
                                }}
                                style={{ width: '180px' }}
                            />
                        </DataTable>
                    )}
                </div>
            </div>
            {/* Dialog Component */}
            <Dialog
                className="modern-dialog"
                header={
                    <div className="flex items-center gap-2">
                        <i className={`pi ${
                            dialogType === 'edit' ? 'pi-edit text-green-600' : 
                            dialogType === 'delete' ? 'pi-trash text-red-600' : 
                            'pi-eye text-blue-600'
                        }`}></i>
                        <span>
                            {dialogType === 'edit' ? 'Edit Admin' : 
                             dialogType === 'delete' ? 'Confirm Delete' : 
                             'View Admin'}
                        </span>
                    </div>
                }
                visible={showDialog}
                style={{ width: '90%', maxWidth: '500px' }}
                onHide={() => setShowDialog(false)}
                footer={
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        {dialogType === 'delete' ? (
                            <>
                                <Button 
                                    label="Cancel" 
                                    icon="pi pi-times" 
                                    onClick={() => setShowDialog(false)}
                                    className="p-button-outlined p-button-secondary px-3 py-2 hover:shadow-md transition-all duration-200"
                                    style={{
                                        borderColor: '#6b7280',
                                        color: '#6b7280'
                                    }}
                                />
                                <Button 
                                    label="Delete Admin" 
                                    icon="pi pi-trash" 
                                    onClick={handleDelete}
                                    className="p-button-danger hover:shadow-md px-3 py-2 transition-all duration-200"
                                    style={{
                                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                        border: 'none'
                                    }}
                                />
                            </>
                        ) : dialogType === 'edit' ? (
                            <>
                                <Button 
                                    label="Cancel" 
                                    icon="pi pi-times" 
                                    onClick={() => setShowDialog(false)}
                                    className="p-button-outlined p-button-secondary px-3 py-2 hover:shadow-md transition-all duration-200"
                                    style={{
                                        borderColor: '#6b7280',
                                        color: '#6b7280'
                                    }}
                                />
                                <Button 
                                    label="Save Changes" 
                                    icon="pi pi-check" 
                                    onClick={handleSave}
                                    className="hover:shadow-md transition-all px-3 py-2 duration-200"
                                    style={{
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        border: 'none',
                                        color: 'white'
                                    }}
                                />
                            </>
                        ) : null}
                    </div>
                }
            >
                <div className="space-y-4">
                    {dialogType === 'delete' ? (
                        <div className="text-center py-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                <i className="pi pi-exclamation-triangle text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Admin Account</h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete <strong>{selectedProduct?.username}</strong>?
                            </p>
                            
                        </div>
                    ) : dialogType === 'view' ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <div className="relative">
                                    <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        value={selectedProduct?.username || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <div className="relative">
                                        <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            value={selectedProduct?.firstname || ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <div className="relative">
                                        <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                            value={selectedProduct?.lastname || ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <i className="pi pi-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        value={selectedProduct?.phonenumber || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <div className="relative">
                                    <i className="pi pi-building absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        value={selectedProduct?.company || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                        required
                                        value={selectedProduct?.username || ''}
                                        onChange={(e) =>
                                            setSelectedProduct((prev) => ({ ...prev, username: e.target.value }))
                                        }
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                            required
                                            value={selectedProduct?.firstname || ''}
                                            onChange={(e) =>
                                                setSelectedProduct((prev) => ({ ...prev, firstname: e.target.value }))
                                            }
                                        />
                                    </div>
                                    {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <i className="pi pi-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                            required
                                            value={selectedProduct?.lastname || ''}
                                            onChange={(e) =>
                                                setSelectedProduct((prev) => ({ ...prev, lastname: e.target.value }))
                                            }
                                        />
                                    </div>
                                    {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <i className="pi pi-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="tel"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                        required
                                        value={selectedProduct?.phonenumber || ''}
                                        onChange={(e) =>
                                            setSelectedProduct((prev) => ({ ...prev, phonenumber: e.target.value }))
                                        }
                                    />
                                </div>
                                {errors.phonenumber && <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <i className="pi pi-building absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                                        value={selectedProduct?.company || ''}
                                        onChange={(e) =>
                                            setSelectedProduct((prev) => ({ ...prev, company: e.target.value }))
                                        }
                                    />
                                </div>
                                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </Dialog>

            {/* Reset Password Confirmation Dialog */}
            <Dialog
                className="modern-dialog"
                header={
                    <div className="flex items-center gap-2">
                        <i className="pi pi-refresh text-orange-600"></i>
                        <span className="font-semibold">Reset Password Confirmation</span>
                    </div>
                }
                visible={showResetDialog}
                style={{ width: '90%', maxWidth: '400px' }}
                onHide={() => setShowResetDialog(false)}
                footer={
                    <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                        <Button 
                            label="Cancel" 
                            icon="pi pi-times" 
                            onClick={() => setShowResetDialog(false)}
                            className="p-button-outlined p-button-secondary hover:shadow-md transition-all duration-200"
                            style={{
                                borderColor: '#6b7280',
                                color: '#6b7280'
                            }}
                        />
                        <Button 
                            label="Reset Password" 
                            icon="pi pi-refresh" 
                            onClick={() => handleResetPassword(resetUser)}
                            className="hover:shadow-md transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                border: 'none',
                                color: 'white'
                            }}
                        />
                    </div>
                }
            >
                <div className="text-center py-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                        <i className="pi pi-refresh text-orange-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Password</h3>
                    <p className="text-gray-600 mb-4">
                        Are you sure you want to reset the password for <strong>{resetUser?.username}</strong>?
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-sm text-orange-800">
                            <i className="pi pi-info-circle mr-2"></i>
                            A new password will be generated and the admin will need to use it for their next login.
                        </p>
                    </div>
                </div>
            </Dialog>
        </div>
        </div>
    );
};

export default Dashboard;