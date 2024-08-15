import React, { useEffect, useState,useContext } from 'react'
import {Card, Typography,CardMedia, CardContent, Box} from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NotFound} from '.'
import { CounterContext } from './context/count';

const WatchLater = () => {
  let [videos,setVideos]=useState([]);
  const auth=JSON.parse(sessionStorage.getItem("user"));
  let [count,setCount]=useState(0);
 
  
  useEffect(()=>{
   
    getData();
  },[count]);
  const getData=async()=>{
    let result=await fetch(`https://youtube-backend-liard.vercel.app/getwatchlaters/${auth.result._id}`,{
      "method":"Get",
      "headers":{
        "Content-Type":"application/json"
      }
    })
      result=await result.json();

      setVideos(result);
      
  }
 
  const deleteData=async(id)=>{
    toast.warn("The Selected video is removed from your WatchLater list.");
     count++;

     let userId=auth.result._id;
      let result=await fetch(`https://youtube-backend-liard.vercel.app/watchdelete/${id}`,{
        method:"Put",
        body:JSON.stringify({userId}),
        headers:{
          'Content-Type':"application/json"
      }
      })
      result=await result.json();
      
      if(result.acknowledged){
      
        setCount(count);
      }
      
   


    
    
  }
  return (
    <>
   
        {videos && videos.length>0?
          <div className='fav-main-container'>
          
          <div className='fav-first-container'>
              <div className='fav-img-container'>
                  <img src={`${videos[0].imgurl}`} alt="Front image" />
              </div>
              <div className="fav-direct">
              <div className='fav-heading'>
                <h2>Watch Later</h2>
              </div>
              <div className="fav-name-heading">
                <h3>{auth && auth.result.name}</h3>
                <span>{videos.length} videos &nbsp; &nbsp;   Updated Today.</span> 
              </div>
              </div>
          </div>
          <div className='fav-card-container'>
            {videos.map((items,idx)=>(
              <Box key={idx} sx={{paddingLeft:{xs:"20px",md:"0px"},margin:"8px"}}>
              <Card sx={{ width: { xs: "100%", sm: "338px", md: "300px", }, boxShadow: "none", borderRadius: 0}}>
              <Link to={`/video/${items.videoId}`}>
                  <CardMedia image={items.imgurl} alt={items.title}  sx={{ width: { xs: "100%", sm: "338px",md:"300px"}, height: 180 }}/>
                  
              </Link>
              <CardContent sx={{ backgroundColor: "#1E1E1E", height: "95px",width:{xs:"270px",sm:"338px",md:"300px"}}}>
            <Link to={ `/video/${items.videoId}`} >
              <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
                {items.title}
              </Typography>
            </Link>
            
              <Typography variant="subtitle2" color="gray">
                {items.channelTitle}
                <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
            


              <button className='fav-delbtn' onClick={()=>{deleteData(`${items._id}`)}}>
                <Tooltip title="Remove" arrow>
                <DeleteIcon /></Tooltip>
                {/* <ToastContainer position='top-center' theme='dark' /> */}
               
             </button>
            
            </CardContent>

            </Card>
              </Box>
            
            ))}
          </div>
        </div>
         : <NotFound/>
        }
        
    </>
    
  )
}

export default WatchLater
