import React, { useContext, useEffect, useState } from 'react'
import {Card, Typography,CardMedia, CardContent} from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CounterContext } from './context/count';


const VideoCard = ({video:{id:{videoId},snippet}}) => {
  const auth=JSON.parse(sessionStorage.getItem("user"));
 
 const counterContext=useContext(CounterContext);
 
 const log=counterContext.log;
 
  let userId,imgurl,title,channelTitle;

 

  const favourite=async()=>{
     
    if(auth && auth.result){
      userId=auth.result._id;
      imgurl= snippet.thumbnails.high.url;
     title=snippet?.title.slice(0, 60);
     channelTitle=snippet.channelTitle;
      
      
   }
    
  let favdata=[{videoId:videoId,imgurl:imgurl,title:title,channelTitle:channelTitle}];

   
    

    
    let result=await fetch(`https://youtube-backend-liard.vercel.app/favourites/${userId}`, {
      method:"Post",
      body:JSON.stringify({userId,favdata}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result=await result.json();
   
    toast.success("Video is added to your Favourites..");
  }

const watchlater=async()=>{
  
  if(auth && auth.result){
    userId=auth.result._id;
    imgurl= snippet.thumbnails.high.url;
   title=snippet?.title.slice(0, 60);
   channelTitle=snippet.channelTitle;

 }
 let watchdata=[{videoId:videoId,imgurl:imgurl,title:title,channelTitle:channelTitle}];

  let result=await fetch(`https://youtube-backend-liard.vercel.app/watchlaters/${userId}` ,{
    "method":"Post",
    "body":JSON.stringify({userId,watchdata}),
    "headers":{
      "Content-Type":"application/json"
    }
  })
  result=await result.json();

   toast.success("Video is added to your Watchlater..");

}

  return (
   <Card sx={{ width: { xs: "100%", sm: "338px", md: "300px", }, boxShadow: "none", borderRadius: 0}}>
        <Link to={videoId && `/video/${videoId}`}>
            <CardMedia image={snippet?.thumbnails?.high?.url} alt={snippet?.title}  sx={{ width: { xs: "100%", sm: "338px",md:"300px"}, height: 180 }}/>
            
        </Link>
        <CardContent sx={{ backgroundColor: "#1E1E1E", height: "95px",width:{xs:"270px",sm:"338px",md:"300px"}}}>
      <Link to={videoId && `/video/${videoId}`} >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF" sx={{fontFamily:` "Poppins", sans-serif`}} >
          {snippet?.title.slice(0, 60)}
        </Typography>
      </Link>
      <Link to={snippet?.channelId && `/channel/${snippet?.channelId}`} >
        <Typography variant="subtitle2" color="rgb(163, 154, 154)" sx={{fontFamily:`"Baloo Bhai 2", sans-serif`,fontWeight:800}}>
          {snippet?.channelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
        </Typography>
      </Link>
      
      {auth &&<>
      <div style={{display:"flex",flexDirection:"row"}}>
      <button className='favbtn' onClick={favourite}>
      <Tooltip title="Add Favourite" arrow>
      <FavoriteIcon /></Tooltip>
      
      </button>
      {/* <ToastContainer position='top-center' theme='dark' width="100px" height="100px" /> */}
      <button className='favbtn' onClick={watchlater}>
       
      <Tooltip title="Watch Later" arrow>
      <WatchLaterIcon /></Tooltip>
      
      </button>
      {/* <ToastContainer position='top-center' theme='dark' /> */}
      
      </div>
      </>
      }
      
    </CardContent>
   </Card>
  )
}

export default VideoCard
