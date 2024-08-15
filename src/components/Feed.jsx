import React, { useState,useContext } from 'react'
import { Stack,Box,Typography } from '@mui/material'

import { SideBar,Videos } from '.'
import { useEffect } from 'react'
import { fetchFromApi } from '../utils/FetchFromApi'
import { CounterContext } from './context/count'
const Feed = () => {
  let [favvideo,setFavVideo]=useState([]);
  let [video,setVideo]=useState([]);
  let cvideo=[];
  let cauth=JSON.parse(sessionStorage.getItem('user'));
  
  let userId;
  if(cauth&&cauth.result){
      userId=cauth.result._id;
  }
  const counterContext=useContext(CounterContext);




  let getdata=async()=>{
    let data=await fetch(`https://youtube-backend-liard.vercel.app/getsubscribers/${userId}`,{
        method:"Get",
        headers:{
          'Content-Type':"application/json"
        }
    })
    data=await data.json();
     
    if(data.length>0){
      data.forEach(element => {
        cvideo.push(element.channelId);
      });
    }
    setVideo(cvideo);
   
  }







  const[selectedCategory,setSelectedCategory]=useState('Trending');
  const[videos,setVideos]=useState([]);
  let auth;


  useEffect(()=>{
    if(cauth&&cauth.result){
      getdata();
    }
    
  },[counterContext.subcount]);
 

  useEffect(()=>{
    if(cauth&&cauth.result){
      getdata();
    }
},[counterContext.count]);


 


  useEffect(() => {
     auth=JSON.parse(sessionStorage.getItem("user"))
    //  getdata();
   
    setVideos([]);

    fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
    }, [counterContext.log+selectedCategory]);
  return (
    <Stack  sx={{flexDirection:{sx:"column",md:"row"}}}>
      <Box sx={{height:{sx:"auto",md:"92vh"},borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}}}>
          <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          <Typography className='copyright' variant='body2' sx={{mt:2,color:"white",fontFamily:`"Baloo Bhai 2", sans-serif`}} >
                ©️ 2024 @Aryan Bharadwaaj
          </Typography>
      </Box>
      <Box p={2} sx={{overflowY:"auto",height:"90vh",flex:2}}>
          <Typography variant='h4' fontWeight="bold" mb={2} sx={{color:"white",fontFamily:`"Poppins", sans-serif`}}>
           {selectedCategory} <span style={{color:"#F31503"}}>Videos</span>
          </Typography>
          <Videos videos={videos} subdetails={video} />
      </Box>
    </Stack>
  )
}

export default Feed
