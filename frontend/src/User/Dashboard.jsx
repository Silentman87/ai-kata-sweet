import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'

export default function Dashboard() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/sweets`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSweets(data);
    } catch (err) {
      toast.error('Failed to fetch sweets');
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sweets/search?query=${search}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSweets(data);
    } catch (err) {
      toast.error('Search failed');
    }
  };

  const handlePurchase = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sweets/${id}/purchase`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Purchased!');
      fetchSweets();
    } catch (err) {
      toast.error('Purchase failed');
    }
  };

  return (
    <>
      <Navbar />

      {/* Layout wrapper */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main content */}
        <main className="flex-grow container mx-auto p-6">
          {/* Search bar */}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Search sweets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full md:w-auto"
            >
              Search
            </button>
          </div>

          {/* Sweets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
              <div
                key={sweet._id}
                className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition duration-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">{sweet.name}</h2>
                  <p className="text-gray-700 mb-1">Price: ${sweet.price}</p>
                  <p className="text-gray-700">Quantity: {sweet.quantity}</p>
                </div>

                <button
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet._id)}
                  className={`mt-4 p-2 rounded text-white font-medium transition-colors ${
                    sweet.quantity === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {sweet.quantity === 0 ? 'Out of stock' : 'Purchase'}
                </button>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
