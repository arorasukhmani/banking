import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Actual user ID and API endpoint
    const userId = 'USER_ID';
    const apiUrl = 'http://localhost:3001/user/${userId}';

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setUser(response.data);
                setFormData(response.data);
            })
            .catch(error => console.error(error));
    }, [apiUrl]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(apiUrl, formData)
            .then(response => {
                setUser(response.data);
                setIsEditing(false);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Personal details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Middle Name:</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Date of Birth:</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Nationality:</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Employment Status:</label>
                            <input
                                type="text"
                                name="employmentStatus"
                                value={formData.employmentStatus}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Industry:</label>
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Occupation:</label>
                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="mt-4 ml-2 p-2 bg-gray-500 text-white rounded-md">Cancel</button>
                </form>
            ) : (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Personal Information</h2>
                        <p>Name: {user.name}</p>
                        <p>Middle Name: {user.middleName}</p>
                        <p>Last Name: {user.lastName}</p>
                        <p>Date of Birth: {user.dob}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-md">Edit Information</button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Contact Details</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-md">Edit Information</button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Address</h2>
                        <p>{user.address}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-md">Edit Information</button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Nationality</h2>
                        <p>{user.nationality}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-md">Edit Information</button>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Employment Details</h2>
                        <p>Status: {user.employmentStatus}</p>
                        <p>Industry: {user.industry}</p>
                        <p>Occupation: {user.occupation}</p>
                        <button onClick={() => setIsEditing(true)} className="mt-2 p-2 bg-gray-200 text-gray-700 rounded-md">Edit Information</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
