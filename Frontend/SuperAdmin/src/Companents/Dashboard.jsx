import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './Dashboard.css';
import axios from '../api/axiosInstance';
import { Buffer } from 'buffer';
import { jwtDecode } from 'jwt-decode';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';


window.Buffer = Buffer;
const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [query, setQuery] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogType, setDialogType] = useState(''); // 'add', 'edit', or 'delete'
    const [selectedProduct, setSelectedProduct] = useState(null); // For edit or delete
    const [errors, setErrors] = useState({})
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
                 // Refresh the data
                alert('Password reset successfully!');
            
        } catch (error) {
            console.error('Error resetting password:', error);
        }
        fetchProducts();
    };
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const confirmResetPassword = (rowData) => {
         // Set the user to be reset
        confirmDialog({
            message: `Are you sure you want to reset the password for ${rowData.username}?`,
            header: 'Reset Password Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleResetPassword(rowData), // Call the reset handler on confirmation
            reject: () => console.log('ok'), // Reset the state if rejected
        });
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
            <div className="actions-container">
                <button
                    className="btn btn-success"
                    onClick={() => {
                        setDialogType('view');
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                >
                    <i className="pi pi-eye"></i>
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setDialogType('edit');
                        console.log('Editing product:', rowData);
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                >
                    <i className="pi pi-file-edit"></i>
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        setDialogType('delete');
                        setSelectedProduct(rowData);
                        setShowDialog(true);
                    }}
                >
                    <i className="pi pi-trash"></i>
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => confirmResetPassword(rowData)}

                >
                    <i className="pi pi-refresh"></i>
                </button>
            </div>
        );
    };
   
    return (
        
        <div className="min-h-screen bg-primaryColor h-full w-full py-2 px-4 rounded-lg">
        <div className=" max-w-4xl mx-auto py-6 text-textColor flex items-center justify-center flex-col">
   
        <div className="w-[70%] flex items-center justify-center pr-20">
            <img
                src="/public/pixelcut-export (1).png"
                alt="logo"
                className="w-[100%]"
            />
            </div>
        <div className="dashboard text-center p-4">
            
        <div className="justify-between items-center mb-6">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-btnColor hover:bg-btnColorHover text-white py-2 px-4 rounded duration-75"
                        >
                            Go to Home
                        </button>
                        </div>

            {/* Confirm Dialog */}
            
            <div className="data-list">
                <div className="add-user">
                    <button
                        className="btn btn-success mb-3"
                        onClick={() => {
                            navigate('/register')
                        }}
                    >
                        Add New admin <i className="pi pi-plus"></i>
                    </button>
                    <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for admin..."
                    style={{
                        padding: '8px',
                        width: '300px',
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        height: '39px',
                    }}
                />
                <button
                    className="btn btn-success mb-3"
                >
                    Search
                </button>
            </form>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable value={products} responsiveLayout="scroll" className="p-datatable-sm">
                        <Column className="p-2" field="username" header="Username"></Column>
                        <Column field="firstname" header="First name"></Column>
                        <Column field="lastname" header="Last name"></Column>

                        <Column field="phonenumber" header="Phone Number"></Column>
                        <Column field="company" header="company"></Column>

                        <Column
                            header="Actions"
                            body={(rowData) => actionsTemplate(rowData)}
                            className="action-column"
                            headerStyle={{textAlign: 'center',
                                paddingLeft: '3em',
                            }}
                            style={{
                                
                                width: '11em'
                            }}
                        ></Column>
                    </DataTable>
                )}
            </div>
            </div>
                </div>
               
            {/* Dialog Component */}
            <Dialog
                className="custom-dialog"
                header={dialogType === 'edit' ? 'Edit User' : dialogType === 'delete' ? 'Confirm Delete' : 'View user'}
                visible={showDialog}
                style={{ width: '50%' }}
                headerStyle={{  
                    padding: '15px 20px', // Add padding directly to the header
                    backgroundColor: '#f5f5f5', // Optional: light background
                    borderBottom: '1px solid #ddd', // Optional: border at the bottom
                    fontSize: '18px', // Optional: font size
                    fontWeight: 'bold', // Optional: make text bold
                    textAlign: 'center', 
                }}
                onHide={() => setShowDialog(false)}
                footer={
                    dialogType === 'delete' ? (
                        <>
                            <Button label="No" icon="pi pi-times" onClick={() => setShowDialog(false)} />
                            <Button label="Yes" icon="pi pi-check" onClick={handleDelete} />
                        </>
                    ) : dialogType === 'edit' || dialogType === 'add' ? (
                        <>
                            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowDialog(false)} />
                            <Button label="Save" icon="pi pi-check" onClick={handleSave} />
                        </>
                    ) : null
                }
>
    <div className="dialog-content">
        {dialogType === 'delete' ? (
            <p>Are you sure you want to delete this user?</p>
        ) : dialogType === 'view' ? (
            <div>
            <label>Username:</label>
            <div className="input-with-icon">
                <i className="pi pi-user input-icon"></i>
                <input
                    type="text"
                    className="dialog-input"
                    value={selectedProduct?.username || ''}
                    disabled
                />
            </div>

            <label>First name:</label>
            <div className="input-with-icon">
                <i className="pi pi-user input-icon"></i>
                <input
                    type="text"
                    className="dialog-input"
                    value={selectedProduct?.firstname || ''}
                    disabled
                />
            </div>

            <label>Last name:</label>
            <div className="input-with-icon">
                <i className="pi pi-user input-icon"></i>
                <input
                    type="text"
                    className="dialog-input"
                    value={selectedProduct?.lastname || ''}
                    disabled
                />
            </div>


            <label>Phone Number:</label>
            <div className="input-with-icon">
                <i className="pi pi-phone input-icon"></i>
                <input
                    type="phonenumber"
                    className="dialog-input"
                    value={selectedProduct?.phonenumber || ''}
                    disabled
                />
            </div>

            <label>company:</label>
            <div className="input-with-icon">
                <i className="pi pi-sitemap input-icon"></i>
                <input
                    type="text"
                    className="dialog-input"
                    value={selectedProduct?.company || ''}
                    disabled
                />
            </div>

        </div>
        ) : (
                <div>
                <label>User name:</label>
                <div className="input-with-icon">
                    <i className="pi pi-user input-icon"></i>
                    <input
                        type="text"
                        className="dialog-input"
                        required
                        value={selectedProduct?.username || ''}
                        onChange={(e) =>
                            setSelectedProduct((prev) => ({ ...prev, username: e.target.value }))
                        }
                    />
                    
                </div>
             
                {errors.username && <p className="text-red-500 text-sm w-[150px] break-words mt-1">{errors.username}</p>}
                
                <label>First name:</label>
                <div className="input-with-icon">
                    <i className="pi pi-user input-icon"></i>
                    <input
                        type="text"
                        className="dialog-input"
                        required
                        value={selectedProduct?.firstname || ''}
                        onChange={(e) =>
                            setSelectedProduct((prev) => ({ ...prev, firstname: e.target.value }))
                        }
                    />
                    
                </div>
                {errors.firstname && <p className="text-red-500 text-sm w-[150px] break-words mt-1">{errors.firstname}</p>}

                <label>Last name:</label>
                <div className="input-with-icon">
                    <i className="pi pi-user input-icon"></i>
                    <input
                        type="text"
                        className="dialog-input"
                        required
                        value={selectedProduct?.lastname || ''}
                        onChange={(e) =>
                            setSelectedProduct((prev) => ({ ...prev, lastname: e.target.value }))
                        }
                    />
                    
                </div>
             
                {errors.lastname && <p className="text-red-500 text-sm w-[150px] break-words mt-1">{errors.lastname}</p>}
               

                <label>Phone Number:</label>
                <div className="input-with-icon">
                    <i className="pi pi-phone input-icon"></i>
                    <input
                        type="phonenumber"
                        className="dialog-input"
                        required
                        value={selectedProduct?.phonenumber || ''}
                        onChange={(e) =>
                            setSelectedProduct((prev) => ({ ...prev, phonenumber: e.target.value }))
                        }
                    />
                </div>

                {errors.phonenumber && <p className="text-red-500 text-sm w-[150px] break-words mt-1">{errors.phonenumber}</p>}

                <label>Company:</label>
                <div className="input-with-icon">
                    <i className="pi pi-sitemap input-icon"></i>
                    <input
                        type="text"
                        className="dialog-input"
                        value={selectedProduct?.company || ''}
                        onChange={(e) =>
                            setSelectedProduct((prev) => ({ ...prev, company: e.target.value }))
                        }
                    />
                </div>
                {errors.company && <p className="text-red-500 text-sm w-[150px] break-words mt-1">{errors.company}</p>}
            </div>
        )}
    </div>
</Dialog>
        </div>
    );
};

export default Dashboard;