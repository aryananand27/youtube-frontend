import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HoverSearch = () => {
  const[searchTerm,setSearchTerm]=useState('')
 
 const navigate=useNavigate();
 const spaceSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm){
      navigate(`/search/${searchTerm}`)
      setSearchTerm('');
    }
    
 }
  
  return (
    <>
     <form className = 'search-box'  onSubmit={spaceSubmit} >
       
        <input className = "search-text" type="text" placeholder = "Search Anything" onChange={(e)=>setSearchTerm(e.target.value)} />
        <a href="#" className = "search-btn" onClick={spaceSubmit}>
          <i className="fas fa-search"></i>
        </a>
      
    
    </form>
    </>
  )
}

export default HoverSearch
