import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder, updateOrder } from '../../redux/OrdersSlice';  // Import updateOrder action
import UpdateOrder from './UpdateOrder';

const Orders = () => {
  const dispatch = useDispatch();
  const [editingOrder, setEditingOrder] = useState(null); // State for the currently editing order
  const [formData, setFormData] = useState({}); // State to store form data

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders, status, error } = useSelector((state) => state.orders);

  // Handle edit button click
  const handleEdit = (order) => {
    setEditingOrder(order.id); // Set the order ID for editing
    setFormData({
      customerName: order.customerName,
      productName: order.productName,
      price: order.price,
      customerAddress: order.customerAddress,
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to update the order
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateOrder({ id: editingOrder, updatedOrder: formData }));
    setEditingOrder(null); // Close the edit form
  };

  // Handle delete button click
  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      {orders && orders.length > 0 ? (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Product Price</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order.customerName}</td>
                <td className="border px-4 py-2">{order.productName}</td>
                <td className="border px-4 py-2">{order.price}</td>
                <td className="border px-4 py-2">{order.customerAddress}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
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
        <p>No orders found</p>
      )}

      {/* Show edit form if editing */}
      {editingOrder && (
        <UpdateOrder
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      )}
    </div>
  );
};

export default Orders;
