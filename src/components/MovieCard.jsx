import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaFilm, FaCalendarAlt, FaUserAlt, FaUsers, FaBookOpen } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
    >
      <div className="md:flex">
        {movie.Poster !== 'N/A' ? (
          <div className="md:flex-shrink-0">
            <img 
              className="h-96 w-full md:w-64 object-cover" 
              src={movie.Poster} 
              alt={movie.Title} 
            />
          </div>
        ) : (
          <div className="h-96 w-full md:w-64 bg-gray-700 flex items-center justify-center">
            <FaFilm className="text-gray-500 text-5xl" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{movie.Title}</h2>
            {movie.imdbRating !== 'N/A' && (
              <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                <FaStar className="mr-1" />
                {movie.imdbRating}/10
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center text-gray-300 text-sm">
              <FaCalendarAlt className="mr-1 text-blue-400" />
              {movie.Year}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300 text-sm">{movie.Rated || 'N/A'}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300 text-sm">{movie.Runtime || 'N/A'}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300 text-sm">{movie.Genre || 'N/A'}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Plot</h3>
              <p className="text-gray-300">{movie.Plot || 'No plot available.'}</p>
            </div>
            
            {movie.Director && movie.Director !== 'N/A' && (
              <div>
                <h3 className="text-gray-400 text-sm font-medium flex items-center">
                  <FaUserAlt className="mr-1" /> Director
                </h3>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
            )}
            
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div>
                <h3 className="text-gray-400 text-sm font-medium flex items-center">
                  <FaUsers className="mr-1" /> Cast
                </h3>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
            )}
            
            {movie.Writer && movie.Writer !== 'N/A' && (
              <div>
                <h3 className="text-gray-400 text-sm font-medium flex items-center">
                  <FaBookOpen className="mr-1" /> Writer
                </h3>
                <p className="text-gray-300">{movie.Writer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
