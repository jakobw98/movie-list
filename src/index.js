import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  // State for keeping track of movie data
  const [movies, setMovies] = useState([]);

  // State for input form values
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

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

    // Reset form values
    setTitle('');
    setRating('');
  };

  // Function to handle movie deletion
  const handleDelete = (index) => {
    // Create new array without deleted movie
    const newMovies = movies.filter((movie, i) => i !== index);

    // Update state with new array of movies
    setMovies(newMovies);
  };

  return (
    <div>
      <h1>My Movie List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" min="1" max="5" value={rating} onChange={(event) => setRating(event.target.value)} />
        </label>
        <button type="submit">Add Movie</button>
      </form>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            {movie.title} {Array(movie.rating).fill().map((_, i) => <span key={i}>&#9733;</span>)}
            <button onClick={() => handleDelete(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
