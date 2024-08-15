import React, { useEffect, useState,useContext } from 'react'
import {NotFound} from '.'
import { Box,CardContent,CardMedia,Stack,Typography ,Button} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled, alpha } from '@mui/material/styles';

import Menu from '@mui/material/Menu';

import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';

import { CounterContext } from './context/count';
import { toast } from 'react-toastify';




const Subscribed = () => {
  let auth=JSON.parse(sessionStorage.getItem("user"));
  let [videos,setVideos]=useState([]);
  let counterContext=useContext(CounterContext);
  const getdata=async()=>{
    let result=await fetch(`https://youtube-backend-liard.vercel.app/getsubscribers/${auth.result._id}`,{
      method:"Get",
      headers:{
        'Content-Type':"application/json"
      }
    })
    result=await result.json();
    setVideos(result);
  }
 useEffect(()=>{
  getdata();
 },[counterContext.count])

 
 const unsubscribed=async(id)=>{
let userId;
toast.warn('Oops!! The Selected channel is no longer your friend..')
  if(auth&&auth.result){
  userId=auth.result._id;
  }
  counterContext.setCount(counterContext.count+1);
  const result=await fetch(`https://youtube-backend-liard.vercel.app/deletesubscribers/${id}`,{
    method:"Put",
    body:JSON.stringify({userId}),
    headers:{
      'Content-Type':"application/json"
    }
  })
  if(result.acknowledged){
    counterContext.setCount(counterContext.count+1);
  }
}


 
  return (
    <>
    {(videos && videos.length)>0?
    <div className='fav-main-container'>
    
      <Stack direction='row' flexWrap="wrap" justifyContent="space-evenly" alignItems="start" gap={0.5}>
    {
      
      videos.map((items,idx)=>(
          <Box key={idx}
      
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: "100%", md: "300px" },
      height: "326px",
      margin: '35px',
     
    }}
  >
   
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff',width:{xs:"240px",sm:"348px",md:"300px"} }}>
        <CardMedia
          image={ items.imgurl}
          alt={items.title}
          sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant="h6">
          {items.channelTitle}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>
        <Button startIcon={<UnsubscribeIcon/>} style={{marginTop:"12px",backgroundColor:"rgba(128, 128, 128, 0.164)"}} variant="contained" size='medium' onClick={()=>{unsubscribed(`${items.channelId}`)}}> UnSubscribe</Button>
        </CardContent>
        </Box>
        )
    )}
    </Stack>
    </div>
    :<NotFound/>}
    
    </>
  )
}

export default Subscribed
