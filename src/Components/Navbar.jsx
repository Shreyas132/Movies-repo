import React, { useState } from 'react'
import './Additional.css'
import Search from './Search'


const Navbar = (  {click} ) => {
// const [clicknav,setclicknav] = useState()
  const [selected,setselected] = useState()

const handlenavclick = (category) =>{
    setselected(category)   
    click(category)

 }

  return (
    <div className='navbar'>
        <div className='nav-items'>
            <ul className='items'>
                <li><span style={{marginRight:'5%',
                  color:'goldenrod',
                  fontSize:'2rem',
                }}>Movies2Day</span></li>
                <li className={selected === 'top_rated' ? 'link active' : 'link' }onClick={()=> handlenavclick ('top_rated')}>TOP Rated</li>
                <li className={selected === 'upcoming' ? 'link active' : 'link' }onClick={()=> handlenavclick ('upcoming')}>Upcoming</li>
                <li className={selected === 'latest' ? 'link active' : 'link' }onClick={()=> handlenavclick ('latest')}>Latest</li>
                <li>Gener</li>
                <li>Tv Shows</li>
                <li><Search /></li>


            </ul>

        </div>
    </div>
  )
}

export default Navbar