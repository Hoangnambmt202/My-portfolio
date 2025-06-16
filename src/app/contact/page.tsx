'use client'

import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin  } from 'react-icons/fi';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div>
        
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Let&apos;s work together! Feel free to reach out to me.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FiMail className="text-blue-600 text-xl mr-4" />
                                <span>nam23062002@gmail.com</span>
                            </div>
                            <div className="flex items-center">
                                <FiPhone className="text-blue-600 text-xl mr-4" />
                                <span>+84 914 837 433 (Zalo)</span>
                            </div>
                            
                            <div className="flex items-center">
                                <FiMapPin className="text-blue-600 text-xl mr-4" />
                                <span>Ho Chi Minh City, Vietnam</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full border-solid border rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 text-base"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-solid border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 text-base"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-solid border border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 text-base"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>        
    );
};

export default Contact;