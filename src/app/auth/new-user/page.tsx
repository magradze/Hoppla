"use client";

import {useState} from "react";

const NewUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        birthday: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-8">
            <h1 className="text-2xl font-semibold mb-6">Complete Your Profile</h1>
            <form onSubmit={handleSubmit}>
                {/* Your form fields go here */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-600">
                        Birthday
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={formData.birthday}
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                    />
                </div>
                {/* Add more form fields as needed */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewUser;
