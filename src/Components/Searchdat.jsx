import React from 'react'
import './Style.css'

const Searchdat = ( {item} ) => {
  return (
    <div>
        <div className='movie'>
            <div className='date'>
                <p>{item.release_date}</p>
            
            </div>
            <div className='image'>
                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} /> 
            </div>
            <div className='other'>
                <span>{item.original_language}</span>
                <h3>{item.name || item.title}</h3>
            </div>
        </div>

    </div>
  )
}

export default Searchdat