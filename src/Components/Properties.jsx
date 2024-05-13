import React from 'react'

const Properties = ({ tv }) => {



 return(
    <div className='movie'>
    <div className='date'>
        <p>{tv.first_air_date}</p>
    
    </div>
    <div className='image'>
        <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt={tv.name} /> 
    </div>
    <div className='other'>
        <span>{tv.original_language}</span>
        <h3>{tv.name}</h3>
    </div>
    <div>
        <img src={`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`} alt={tv.name} /> 
    </div>
</div>

 )

}

export default Properties