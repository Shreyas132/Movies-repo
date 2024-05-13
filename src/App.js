import './App.css';
import Movie from './Components/Movie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Components/Style.css'
import Tvshow from './Components/Tvshow';
import Search from './Components/Search';
// import Tmdb from './Components/Tmdb';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Movie />
              <Tvshow />
            </>
          } />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>  );
}

export default App;
