import React, { useEffect, useState } from 'react'
import './Style.css'
import SearchIcon from'./search.svg'
import Container from './Container'


const url =  `http://www.omdbapi.com/?apikey=26628113`

// const movie = {
//     "Title": "Superman",
//     "Year": "1978",
//     "imdbID": "tt0078346",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
// }

const Main = () => {

    const [movies,setmovies] = useState([])

    const [find,setfind] = useState('')


    const search = async(title) =>{
        const response = await fetch(`${url}&s=${title}`)
        const data = await response.json()
        setmovies(data.Search)
    }

    useEffect(() =>{
        search('superman')
    },[])


  return (
    <div className='app'>
        <h1>MovieVerse</h1>

        <div className='search'>
            <input placeholder='search here' value= {find} onChange={(e) =>setfind(e.target.value)} />
            <img src={SearchIcon} alt='search' onClick={()=>search(find)} />

        </div>

        {
            movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie)=>(
                            <Container movie={movie}/>
                        ))}
                    </div>
        
                ) : (
                    <div className='empty'>
                        <h3>No Movies found</h3>
                    </div>

                )
        }

    </div>
  )
}

export default Main