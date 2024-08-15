import React, { useEffect, useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logo} from '../utils/constants'
import { IconButton, Stack ,Typography} from '@mui/material'
import { SpaceBar ,Menu} from '.'
import { Height } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import HoverSearch from './HoverSearch';

import { CounterContext } from './context/count'

const Navbar = () => {
 let auth=JSON.parse(sessionStorage.getItem("user"));
 const counterContext=useContext(CounterContext);
 let navigate=useNavigate();
 
   return(
    <Stack direction="row" alignItems="center" p={2} sx={{position:
        "sticky",background:"#000",justifyContent:"space-between",top:"0"}}>
            <Link to="/" style={{display:"flex",alignItems:"center"}} >
                <img src={logo} alt="logo" height={40} className='logo-img'/>
                <Typography sx={{color:"#fff",paddingLeft:{sm:"4px",md:"4px",lg:"6px"},fontWeight:"bold",fontSize:{xs:"14px",sm:"18px",md:"20px",lg:"30px"}}} >YourTube</Typography>
                <Typography sx={{color:"gray",position:"relative",top:"-12px",fontWeight:"bold",fontSize:{xs:"6px",sm:"8px",md:"10px",lg:"12px"}}}>IN</Typography>
            </Link>
        
            <SpaceBar />
          {auth && auth.result ?
          <>
        
        
          
          <Menu/>
          </>
          
            
          :<>
          <HoverSearch/>
            <Link to='/register'>
                <button className='btn'>Register</button>
            </Link></>}
        </Stack>
   )
}
  


export default Navbar
