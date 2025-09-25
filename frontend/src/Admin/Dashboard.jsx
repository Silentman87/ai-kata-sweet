import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: 0, quantity: 0 });

  useEffect(() => { fetchSweets(); }, []);

  const fetchSweets = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSweets(data);
    } catch (err) {
      toast.error('Failed to fetch sweets');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value
    });
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/sweets`, form, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Sweet added!');
      setForm({ name: '', category: '', price: 0, quantity: 0 });
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Sweet deleted!');
      fetchSweets();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/sweets/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Sweet updated!');
      fetchSweets();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/sweets/${id}/restock`, { quantity }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Sweet restocked!');
      fetchSweets();
    } catch (err) {
      toast.error('Restock failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow container mx-auto p-6">

          {/* Add Sweet Form */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
            >
              Add Sweet
            </button>
          </div>

          {/* Sweet List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sweets.map((s) => (
              <div key={s._id} className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col justify-between p-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1">{s.name}</h2>
                  <p className="text-gray-700">Category: {s.category}</p>
                  <p className="text-gray-700">Price: ${s.price}</p>
                  <p className="text-gray-700">Quantity: {s.quantity}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex-1"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      const newPrice = prompt('Enter new price:', s.price);
                      if (newPrice !== null) handleUpdate(s._id, { ...s, price: Number(newPrice) });
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded flex-1"
                  >
                    Update Price
                  </button>

                  <button
                    onClick={() => {
                      const addQty = prompt('Enter quantity to restock:', 0);
                      if (addQty !== null) handleRestock(s._id, Number(addQty));
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex-1"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
