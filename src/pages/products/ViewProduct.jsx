import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../../redux/ProductSlice';
import UpdateProduct from './UpdateProduct';




const Products = () => {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null); // State for the currently editing order
  const [formData, setFormData] = useState({}); // State to store form data


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, status, error } = useSelector((state) => state.products);

  console.log(products);
  

  // Handle edit button click
  const handleEdit = (product) => {
    setEditingProduct(product.id); // Set the order ID for editing
    setFormData({
      name: product.name,
      unitPrice: product.unitPrice,
      shippingCost: product.shippingCost,
    });
  };

  // Handle form input change
const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  
  // Check if the input is a file input
  if (name === "image") {
    setFormData({ ...formData, [name]: files[0] }); // Store the selected image file
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  // Handle form submission to update the order
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: editingProduct, updatedProduct: formData }));
    dispatch(fetchProducts());
    setEditingProduct(null); // Close the edit form
  };

  // Handle delete button click
  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteProduct(productId));
    }
  };


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {products && products.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Product Image</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Product Price</th>
              <th className="border px-4 py-2">shippingCost</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 rounded">{product.image}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.unitPrice}</td>
                <td className="border px-4 py-2">{product.shippingCost}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Products found</p>
      )}

      {/* Show edit form if editing */}
      {editingProduct && (
        <UpdateProduct
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      )}
    </div>
  );
};

export default Products;
