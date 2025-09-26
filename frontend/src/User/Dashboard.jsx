import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Dashboard() {
  const { user } = useAuth();
  const [sweets, setSweets] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.token) return;
    fetchSweets();
  }, [user?.token]);

  const fetchSweets = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sweets${params ? `/search?${params}` : ''}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSweets(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const filters = {};
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    fetchSweets(filters);
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
      toast.error(err?.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow container mx-auto p-6">
          {/* Price Filter */}
          <div className="mb-6 flex flex-col md:flex-row items-center gap-3 bg-gray-300 flex-row p-4 rounded">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 bg-white p-2 rounded w-full md:w-40  text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 p-2  bg-white rounded w-full text-black md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleFilter}
              className="bg-blue-500 hover:bg-blue-600   text-black p-2 rounded w-full md:w-auto"
            >
              Apply Price Filter
            </button>
          </div>

          {/* Loading state */}
          {loading && <p className="text-center text-gray-600">Loading sweets...</p>}

          {/* Empty state */}
          {!loading && sweets.length === 0 && (
            <p className="text-center text-gray-600">No sweets found in this price range</p>
          )}

          {/* Sweets grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
              <div
                key={sweet._id}
                className="border border-gray-200 p-4 rounded-lg shadow hover:shadow-lg transition duration-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">{sweet.name}</h2>
                  <p className="text-gray-700 mb-1">
                    Price: ₹{Number(sweet.price).toFixed(2)}
                  </p>
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

        <Footer />
      </div>
    </>
  );
}
