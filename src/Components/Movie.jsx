import React, { useEffect, useState } from 'react'
import Container from './Container'
import './Style.css'
import './Additional.css'
import Navbar from './Navbar'
import Dropdown from './Dropdown'
import YouTube from 'react-youtube'
import API_KEY from './config'


const imageurl = 'https://image.tmdb.org/t/p/w1280'
const Movie = () => {
    const [movies,setmovies] = useState([])
    const [heromovie,setheromovie] = useState([])
    const [trend,settrend] = useState([])
    const [currentpage,setcurrentpage] = useState(1)
    const [activenavitem,setactivenavitem] = useState('now_playing')
    const [player,setplayer] = useState(false)
    const perpage = 10

      
      const findmovie = async (category) =>{
        try{
            const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US`,{
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_KEY}`
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            setmovies(data.results)
            setheromovie(data.results[0])
        }


        catch(error) {
            console.error("error fetching data",error)
        }
          
      }
      const trending = async(time) =>{
        try{
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${time}?api_key=${API_KEY}`,{
                method:'GET',
                header:{
                    accept:'Application/json',
                    Authorization:`Bearer ${API_KEY}`
                }
            
            })
            const data = await response.json()
            console.log("trending movies:",data)
            settrend(data.results)

        }
        catch(error){
            console.error("Error while fetchimg Movies")
        }
      }
    // const findmovie = async (category) => {
    //     try {
    //         let url = '';
    //         if (category === 'popular') {
    //             url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US`;
    //         } else if (category === 'top_rated') {
    //             url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`;
    //         }

    //         const response = await fetch(url);
    //         const data = await response.json();
    //         if (category === 'popular') {
    //             setmovies(data.results);
    //         } else if (category === 'top_rated') {
    //             settopmovies(data.results);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data", error);
    //     }
    // };
      useEffect(()=>{
        findmovie(activenavitem)
        trending('day')
      },[activenavitem])

      const startindex = (currentpage - 1 ) * perpage
      const endindex = startindex + perpage
      const currentContents = movies.slice(startindex,endindex)

      const HandlePageChange = (newPage) =>{
        if (newPage > 0 && newPage <= Math.ceil(movies.length / perpage)){
            setcurrentpage(newPage)

        }
      }

      const fetchvideo = async (id) =>{
        try{

            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`
                }
    
    
            })
            const data = await response.json()
            return data
        }
        catch(error){
            console.error("error fetching video data",error)
        }
      }

      const selecthero = async (movie) =>{
        setplayer(false)
        const data = await fetchvideo(movie.id)
        console.log(data)
        setheromovie(data)

      }

      const playtrailer = () =>{
        const trailer = heromovie.videos.results.find( vid => vid.name === "Official Trailer")
        return <><YouTube  videoId={trailer.key} 
                    opts={{
                        width: '100%',
                        height: '100%',
                        playerVars:{
                            autoplay:1,
                        }
                    
                    }} style={{
                        position:'absolute',
                        left:'0',
                        top:'0',
                        bottom:'0',
                        right:'0'

                    }}
                 />
                </>
        
      }


      const handlenavclick = (category) =>{
        setactivenavitem(category)
      }
  return (
    <div className='app'>
        <Navbar click={handlenavclick} />
        <div className="hero"  style={{backgroundImage:`url('${imageurl}${heromovie.backdrop_path}')`}}>
            <div className="hero-container">
                
                {heromovie.videos && player ? playtrailer() : null}
                <button className='trailer' onClick={() => setplayer(true)} >Play Trailer</button>
                <h2 className='hero-title' >{heromovie.title}</h2>
                <p className='hero-overview'>{heromovie.overview}</p>
                {player ? <button className='close' onClick={() => setplayer(false)}>Close</button> : null}

            </div>
        </div>

        <Dropdown selected={handlenavclick} />
        <h2>Movies</h2>
        <hr className='line' />
        {
            movies.length > 0
                ? (
                    <div className='container'>
                        {currentContents.map((movie)=>(
                            <div key={movie.id}>
                                <Container key={movie.id} movie={movie} selectheromovie={selecthero}/>

                            </div>
                        ))}
                    </div>
        
                ) : (
                    <p>Loading...</p>

                )
        }
        <br/>
        <div className='prevnext'>
                <button className='prev' disabled={currentpage === 1} onClick={() => HandlePageChange(currentpage - 1)}>
                <span className="arrow">&lt;</span>
                    
                </button>
                <span style={{color:'green',margin:'20px 5px 0px 5px'}}> Page no: {`${currentpage}`}</span>
                <button  className="next" disabled={endindex >= movies.length} onClick={() => HandlePageChange(currentpage + 1)}>
                <span className="arrow">&gt;</span>
                    
                </button>
        </div>

        <hr className='line' />
        <h2 className='subhead'>Trending</h2>
        {
            trend.length > 0 ?
                (
                    <div className='container'>
                        {trend.map((movie)=>(
                            <div key={movie.id}>
                                <Container key={movie.id} movie={movie}  selectheromovie={selecthero}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
        }

        
    </div>
  )
}

export default Movie