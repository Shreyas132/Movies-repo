import React from 'react'

const Container = ( { movie,selectheromovie }) => {


  return (
    //Movie verse
    // <div className='movie'>
    //     <div>
    //         <p>{movie.Year}</p>
        
    //     </div>
    //     <div>
    //         <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/404'} alt={movie.Title} />
    //     </div>
    //     <div>
    //         <span>{movie.Type}</span>
    //         <h3>{movie.Title}</h3>
    //     </div>
    // </div>
        <div className='movie' onClick={() => selectheromovie(movie)}>
        <div className='date'>
            <p>{movie.release_date || movie.id}</p>
        
        </div>
        <div className='image'>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /> 
        </div>
        <div className='other'>
            <span>{movie.original_language}</span>
            <h3>{movie.title}</h3>
        </div>
    </div>

)
}

export default Container