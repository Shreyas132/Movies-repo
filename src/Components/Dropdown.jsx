import React, { useState } from 'react'
import './Additional.css'

const Dropdown = ({ selected }) => {

    const [open,setopen] = useState(false)

    const toggleDropdown = ()=>{
        setopen(!open)
    }
  return (
        <div className="dropdown">
            <button className="drop-toggle" type="button" id="dropdown" onClick={toggleDropdown}>
                Sort By
            </button>
            <div className={`dropdown-menu ${open ? 'show' : 'hide'}`}>
                <li><button  className="dropdown-item" onClick={() => selected("top_rated")}>Top Rated</button></li>
                <li><button  className="dropdown-item" onClick={() => selected("upcoming")}>Upcoming</button></li>
                <li><button  className="dropdown-item" onClick={() => selected("popular")}>popular</button></li>
                <li><button className="dropdown-item" onClick={() => selected("now_playing")}>now_playing</button></li>
            </div>
        </div>
 )
}

export default Dropdown