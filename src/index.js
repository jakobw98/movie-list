import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  // State for keeping track of movie data
  const [movies, setMovies] = useState([]);

  // State for input form values
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  // State for sorting
  const [sortBy, setSortBy] = useState('title'); // 'title' or 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both title and rating have been entered
    if (!title || !rating) {
      alert('Please enter a title and rating!');
      return;
    }

    // Create new movie object
    const newMovie = {
      title: title,
      rating: rating
    };

    // Add new movie to array of movies
    setMovies([...movies, newMovie]);

    // Reset input form values
    setTitle('');
    setRating('');
  };

  // Function to render movie list
  const renderMovieList = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      const keyA = sortBy === 'title' ? a.title : a.rating;
      const keyB = sortBy === 'title' ? b.title : b.rating;
      if (sortOrder === 'asc') {
        return keyA.localeCompare(keyB);
      } else {
        return keyB.localeCompare(keyA);
      }
    });

    return (
      <ul>
        {sortedMovies.map((movie, index) => (
          <li key={index}>
            {movie.title}{' '}
            {Array(parseInt(movie.rating)).fill().map((_, i) => (
              <span key={i}>&#9733;</span>
            ))}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>Movie Ratings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Rating:
          <select value={rating} onChange={(event) => setRating(event.target.value)}>
            <option value="">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit">Add Movie</button>
      </form>
      <div>
        <button onClick={() => setSortBy('title')}>Sort by Title</button>
        <button onClick={() => setSortBy('rating')}>Sort by Rating</button>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
        </button>
      </div>
      {movies.length > 0 ? renderMovieList() : <p>No movies yet!</p>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

