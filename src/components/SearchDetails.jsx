import React, { useState,useContext } from 'react'
import { Box,Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Videos,Loader } from '.'
import { useEffect } from 'react'
import { fetchFromApi } from '../utils/FetchFromApi'
import { CounterContext } from './context/count'

const SearchDetails = () => {
  const{searchTerm}=useParams();
  
  const[videos,setVideos]=useState([]);


  const counterContext=useContext(CounterContext);
  let [svideo,setSvideo]=useState([]);
  let cvideo=[];
  let cauth=JSON.parse(sessionStorage.getItem('user'));
  let userId;
  if(cauth && cauth.result){
     userId=cauth.result._id;
  }
  
  
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
    setSvideo(cvideo);
   
  }


useEffect(()=>{
  getdata();
},[counterContext.count])

  useEffect(() => {
    setVideos([]);
    
    fetchFromApi(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
    }, [searchTerm]);
    
  return (
    <Box pl={{lg:12}} pt={{xs:2,md:4,lg:6}} sx={{overflowY:"auto",height:"90vh",flex:2}}>
          <Typography variant="h4" fontSize={{xs:"20px",sm:"25px",md:"30px"}} fontWeight="bold" mb={2} ml={{xs:2,sm:5,md:4,lg:1}} sx={{color:"white",fontFamily:`"Poppins", sans-serif`}}>
           Showing Results for <span style={{color:"#F31503"}}>{searchTerm}</span> Videos..
          </Typography>
          <Videos videos={videos} subdetails={svideo}/>
    </Box>
  )
}

export default SearchDetails
