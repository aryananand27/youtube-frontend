import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchFromApi } from '../utils/FetchFromApi'
import ChannelCard from './ChannelCard'
import Videos from './Videos'


const ChannelsDetails = () => {
  



  const[channelDetail,setChannelDetail]=useState();
  const[video,setVideo]=useState([]);

  const {id}=useParams();
  useEffect(()=>{
      fetchFromApi(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]))
      fetchFromApi(`search?channelId=${id} &part=snippet&order=date`).then((data)=>setVideo(data?.items))
  },[id])
  return (
  
    
      <Box minHeight="95vh" minWidth="40vw">
      <Box>
        <div style={{
          height:"300px",background: 'linear-gradient(90deg, rgba(138,133,226,1) 5%, rgba(69,223,149,1) 50%, rgba(255,0,249,0.7960434173669468) 100%)'
        }}/>
        <ChannelCard channelDetail={channelDetail} marginTop='-92px'/>
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{mr:{sm:"100px"}}}/>
          <Videos videos={video}/>
      </Box>
    </Box>
    
    
  )
}

export default ChannelsDetails
