import React from 'react'
import { Link } from 'react-router-dom'
import {logo} from '../utils/constants'
import { Stack ,Typography} from '@mui/material'
import { SpaceBar } from '.'

const Navbar = () => (
    <Stack direction={{xs:"column",sm:"row"}} alignItems="center" p={2} sx={{position:
    "sticky",background:"#000",justifyContent:"space-between",top:"0"}}>
        <Link to="/" style={{display:"flex",alignItems:"center"}} >
            <img src={logo} alt="logo" height={40}  />
            <Typography style={{color:"#fff",paddingLeft:"6px",fontWeight:"bold",fontSize:"30px"}}>YourTube</Typography>
            <Typography style={{color:"gray",position:"relative",top:"-12px",fontWeight:"bold",fontSize:"12px"}}>IN</Typography>
        </Link>
        <SpaceBar/>
    </Stack>
)
  


export default Navbar
