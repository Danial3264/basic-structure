import React, { useState } from 'react';
import axios from 'axios';

const AddNewProduct = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    qty: '',
    unitPrice: '',
    discount: '',
    shippingCost: '',
    image: null // Initialize image as null for file handling
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] // Store the first selected file
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formAllData = new FormData();
    formAllData.append('name', formData.name);
    formAllData.append('qty', formData.qty);
    formAllData.append('unitPrice', formData.unitPrice);
    formAllData.append('discount', formData.discount);
    formAllData.append('shippingCost', formData.shippingCost);
    formAllData.append('image', formData.image); // Append the image file

    // Make the API request to the server
    axios.post('/create-product', formAllData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set header for file upload
      }
    })
    .then(response => {
      alert('Product Created Successfully!');
      onProductCreated(); // Notify parent component on successful creation
    })
    .catch(error => {
      console.error('There was an error creating the product:', error);
    });

    // Reset form data after submission
    setFormData({
      name: '',
      qty: '',
      unitPrice: '',
      discount: '',
      shippingCost: '',
      image: null
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter quantity"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block text-gray-700">Discount</label>
          <input
            type="text"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Discount"
            required
          />
        </div>

        {/* Shipping Cost */}
        <div>
          <label className="block text-gray-700">Shipping Cost</label>
          <input
            type="text"
            name="shippingCost"
            value={formData.shippingCost}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Shipping Cost"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
