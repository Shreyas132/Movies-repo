import React, { useEffect, useState } from 'react'
import Properties from './Properties'
import API_KEY from './config'

const Tvshow = () => {

    const [tvshow,settvshow] = useState([])
    const [currentpage,setcurrentpage]= useState(1)
    const perpage = 10


    const findtv = async (option) =>{
        try{
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${option}&sort_by=popularity.desc&api_key=${API_KEY}`,{
                method:'GET',
                headers:{
                    accept:'application/json',
                    Authorization:`Bearer ${API_KEY}` 

                }
                
            })
            const data = await response.json()
            console.log(data)
            settvshow(data.results)
        }
        catch(error){
            console.error(`couldn't find any:`,error)
        }
    }
    useEffect(() =>{
        findtv(1)
    },[])

    const startindex = (currentpage - 1) * perpage
    const endindex = startindex + perpage

    const currenttvshow = tvshow.slice(startindex,endindex)

    const handlePageChange = (newPage) =>{
        setcurrentpage(newPage)
    }


  return (
    <div className='app'>
        {/* <Navbar click={findtv}/> */}

        <h2 className='subhead'>TV Shows</h2>
        <hr className='line' />
        {tvshow!== null ? (
     
                    <div className='container'>
                        {currenttvshow.map((tv,index)=>(
                            <div key={index}>
                                <Properties tv={tv} />
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading....</p>
                )
        }

        <div className='prevnext'>
            <button className='prev' disabled={currentpage === 1} onClick={()=> handlePageChange(currentpage - 1)}>
                <span className='arrow'>&lt;</span>
            </button>
            <span style={{color:'green',margin:'20px 5px 0px 5px'}}> page no: {`${currentpage}`}</span>
            <button className='next' disabled={endindex >= tvshow.length} onClick={()=> handlePageChange(currentpage + 1)}>
                <span className='arrow'>&gt;</span>
            </button>
        </div>
        


    </div>
  )
}

export default Tvshow