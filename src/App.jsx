import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  // Function to load data from the backend
  const loadData = async (productName) => {
    const url = `${import.meta.env.VITE_BACKEND_SITE_LINK}/search`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to application/json
        },
        body: JSON.stringify({ productName })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const resultData = await res.json();
      setData(resultData.results || []); // Assuming the response data has a `results` field
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    loadData(productName);
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row items-center">
        <input
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Search for products..."
          value={productName}
          className="p-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/2 md:w-1/3"
        />
        <button
          type="submit"
          className="mt-4 sm:mt-0 sm:ml-4 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Show the loading spinner when loading */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
        </div>
      )}


      {/* Display the product results */}
      {!loading && data?.length > 0 && (
        <div className="mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Website</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <img src={product.imageUrl} alt='image' className="w-24 h-24" />
                  </td>
                  <td className="px-4 py-2">{product.site}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  
                  <td className="px-4 py-2">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Product
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
