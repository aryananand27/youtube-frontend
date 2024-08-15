import { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper,IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { CounterContext } from './context/count';

const SpaceBar = () =>  {
 const[searchTerm,setSearchTerm]=useState('');
 const counterContext=useContext(CounterContext);
 const navigate=useNavigate();
 const spaceSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm){
      navigate(`/search/${searchTerm}`)
      setSearchTerm('');
    }
    counterContext.setSearch(true);
 }
  return(
    
   
    <Paper component="form" sx={{borderRadius:20, border:'1px solid #e3e3e3',pl:2,boxShadow:"none",mx:"auto",mt:{xs:2},display:{xs:"none",md:"block"}}} onSubmit={spaceSubmit}>
        <input  className='search-bar' placeholder='Search....' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
    <IconButton type='submit' sx={{ p: '10px', color: 'red' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
    
   
  )
}
  
  


export default SpaceBar
