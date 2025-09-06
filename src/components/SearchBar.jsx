import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-10">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full p-4 pl-12 pr-16 rounded-full bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;
