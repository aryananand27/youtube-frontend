import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper,IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const SpaceBar = () =>  {
 const[searchTerm,setSearchTerm]=useState('');
 const navigate=useNavigate();
 const spaceSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm){
      navigate(`/search/${searchTerm}`)
    }
 }
  return(
    <Paper component="form" sx={{borderRadius:20, border:'1px solid #e3e3e3',pl:2,boxShadow:"none",mr:{sm:5},mt:{xs:2}}} onSubmit={spaceSubmit}>
        <input  className='search-bar' placeholder='Search....' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
    <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
  
  


export default SpaceBar
