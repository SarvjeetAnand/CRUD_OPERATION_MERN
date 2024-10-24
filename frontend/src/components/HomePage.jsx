import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../slices/userSlice';

function HomePage() {

    const [selectedUser, setSelectedUser] = useState(null); // For storing the user to be edited
    const [editFormData, setEditFormData] = useState({ _id: '', name: '', email: '' }); // State for form data

    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        console.log(id);

    };

    const handleEditClick = (user) => {
        setSelectedUser(user); // Set the user being edited
        setEditFormData({ id: user._id, name: user.username, email: user.email }); // Pre-fill the form with user data        
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
        
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateUser(editFormData));
        
        setSelectedUser(null); // Close the modal after editing
    };



    return (
        <div className="container mt-5">
            <h2 className="text-center">User List</h2>

            {status === 'loading' && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditClick(user)}>Edit</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Edit Modal */}
            {selectedUser && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={editFormData.email}
                                            onChange={handleEditChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

export default HomePage;
