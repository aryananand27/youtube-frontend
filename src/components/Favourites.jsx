import React, { useEffect, useState } from 'react'
import {Card, Typography,CardMedia, CardContent, Box} from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from '@mui/material';
import {NotFound} from '.';

const Favourites = () => {
  let [videos,setVideos]=useState([]);
  const auth=JSON.parse(sessionStorage.getItem("user"));
  let [delcount,setDelCount]=useState(0);

 
 useEffect(()=>{
    getData();
 },[delcount])
  const getData=async()=>{
    let result=await fetch(`https://youtube-backend-liard.vercel.app/getfavourites/${auth.result._id}`,{
      "method":"Get",
      "headers":{
        "Content-Type":"application/json"
      }
    })
      result=await result.json();

      setVideos(result.favdata);
      
  }
 
  const deleteData=async(id)=>{
    toast.warn("The Selected video is removed from your Favourite list.");
   
   let userId=auth.result._id
    delcount++;

   let result=await fetch(`https://youtube-backend-liard.vercel.app/favdelete/${id}`,{
     method:"Put",
     body:JSON.stringify({userId}),
     "headers":{
        "Content-Type":"application/json"
      }
   })
   result=await result.json();
   console.log(delcount)
   if(result.acknowledged){
   
   setDelCount(delcount);
   }
     
  }
  
  return (
    <>
   
        {videos&&videos.length>0?
          <div className='fav-main-container'>
          
          <div className='fav-first-container'>
              <div className='fav-img-container'>
                  <img src={`${videos[0].imgurl}`} alt="Front image" />
              </div>
              <div className="flex-direct">
                  <div className='fav-heading'>
                    <h2>Favourite Videos</h2>
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
                <DeleteIcon  /></Tooltip>
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

export default Favourites
