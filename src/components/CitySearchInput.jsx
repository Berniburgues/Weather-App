import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function CitySearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mb-2">
      <div className="relative inline-flex">
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 pl-10 bg-black text-white"
        />
        <span className="absolute left-3 top-2 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <button
        type="submit"
        className="bg-black text-white rounded px-3 py-1 ml-1 hover:bg-gray-800 hover:text-white"
      >
        GO!
      </button>
    </form>
  );
}

export default CitySearchInput;
