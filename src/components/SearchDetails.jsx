import React, { useState } from 'react'
import { Box,Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Videos,Loader } from '.'
import { useEffect } from 'react'
import { fetchFromApi } from '../utils/FetchFromApi'

const SearchDetails = () => {
  const{searchTerm}=useParams();
  
  const[videos,setVideos]=useState([]);
  useEffect(() => {
    setVideos([]);

    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
    }, [searchTerm]);
    
  return (
    <Box p={6} sx={{overflowY:"auto",height:"90vh",flex:2}}>
          <Typography variant='h4' fontWeight="bold" mb={2} sx={{color:"white"}}>
           Showing Results for <span style={{color:"#F31503"}}>{searchTerm}</span> Videos..
          </Typography>
          <Videos videos={videos}/>
    </Box>
  )
}

export default SearchDetails
