import React, { useEffect, useState } from 'react'
import SearchIcon from './search.svg'
import './Style.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Searchdat from './Searchdat'
import API_KEY from './config';


const Search = () => {

    const [search,setsearch] = useState([])
    const [loading,setloading] = useState(false)
    const [find,setfind] = useState('')
    const [error, seterror] = useState('');
    const navigate = useNavigate(); 
    const location = useLocation();

    const searchdata = async (searchname) =>{
        setloading(true)
        seterror('')
        try{

            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${searchname}&api_key=${API_KEY}&include_adult=false&language=en-US`,{
                method: 'GET',
                headers:{
                    accept:'application/json',
                    Authorization : `Bearer ${API_KEY}`
                }
                
            })
            const data = await response.json()
            console.log(data.results)
            setsearch(data.results)
        }
        catch(error){
            console.error("Do not find a match",error)
            seterror("failed to load data")
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{

        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
    
        if (query) {
            searchdata(query);
        }
    
    },[location.search])
    const handleSearch = () => {
        navigate(`/search?query=${encodeURIComponent(find)}`);
        searchdata(find)
    };



  return (
    <div className='app'>
        <div className='search'>
            {/* <input placeholder='search here' value= {find} onChange={(e) =>setfind(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && searchdata(find)}/> */}
            {/* <img src={SearchIcon} alt='search' onClick={()=>searchdata(handleSearch)} /> */}

            <input placeholder='search here' value= {find} onChange={(e) =>setfind(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}/>

            <img src={SearchIcon} alt='search' onClick={handleSearch} />

        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {
            search.length > 0 ? (
                <div className='container'>
                    {search.map((item)=>{
                        return <Searchdat key={item.id} item={item} />
                    })}
                </div>
            ) : (
                find && !loading && <p>No results found.</p>   
                )
        }


    </div>
  )
}

export default Search