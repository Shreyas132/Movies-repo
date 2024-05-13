import React, { useEffect, useState } from 'react'
import Container from './Container'
import SearchIcon from './search.svg'
import './Style.css'

const Tmdb = () => {
    const [movies,setmovies] = useState([])
    const [find,setfind] = useState('')
    const [currentpage,setcurrentpage] = useState([])

    const perpage = 10
    const key = '279c6f6cf8b3bcb1930225f47c4857c5'
      
      const findmovie = async () =>{
        try{


            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US`,{
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer 279c6f6cf8b3bcb1930225f47c4857c5`
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            setmovies(data.results)
        }


        catch(error) {
            console.error("error fetching data",error)
        }
          
      }
      useEffect(()=>{
        findmovie()
      },[])
      const startindex = (currentpage - 1 ) * perpage
      const endindex = startindex + perpage
      const currentContents = movies.slice(startindex,endindex)

      const HandlePageChange = (newPage) =>{
        setcurrentpage(newPage)
      }
    

  return (
    <div className='app'>

        <div className='search'>
            <input placeholder='search here' value= {find} onChange={(e) =>setfind(e.target.value)} />
            <img src={SearchIcon} alt='search' onClick={()=>findmovie(find)} />

        </div>

        {
            movies.length > 0
                ? (
                    <div className='container'>
                        {currentContents.map((movie,index)=>(
                            <div key={index}>
                                <Container key={index} movie={movie} />

                            </div>
                        ))}
                    </div>
        
                ) : (
                    <p>Loading...</p>

                )
        }
        <div className='prevnext'>
                <button className='prev' disabled={currentpage === 1} onClick={() => HandlePageChange(currentpage - 1)}>
                <span className="arrow">&lt;</span>
                    
                </button>
                <span style={{color:'green',margin:'20px 5px 0px 5px'}}> Page no: {`${currentpage}`}</span>
                <button  className="next"disabled={endindex >= movies.length} onClick={() => HandlePageChange(currentpage + 1)}>
                <span className="arrow">&gt;</span>
                    
                </button>
        </div>
        
    </div>
  )
}

export default Tmdb