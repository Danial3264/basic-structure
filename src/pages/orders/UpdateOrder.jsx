import React from 'react';

const UpdateOrder = ({ formData, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-200 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Edit Order</h3>
      
      <div className="mb-2">
        <label className="block mb-1">Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-2">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-2">
        <label className="block mb-1">Product Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-2">
        <label className="block mb-1">Customer Address</label>
        <input
          type="text"
          name="customerAddress"
          value={formData.customerAddress}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Order
      </button>
    </form>
  );
};

export default UpdateOrder;
