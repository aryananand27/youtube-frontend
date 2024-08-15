import React, { useEffect,useContext } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { fetchFromApi } from '../utils/FetchFromApi'
import ChannelCard from './ChannelCard'
import Videos from './Videos'
import { CounterContext } from './context/count'

const ChannelsDetails = () => {
  let [svideo,setSvideo]=useState([]);
  let cvideo=[];
  let cauth=JSON.parse(sessionStorage.getItem('user'));
  let userId;
  if(cauth && cauth.result){
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
    setSvideo(cvideo);
   
  }

useEffect(()=>{
  getdata();
},[counterContext.count]);

useEffect(()=>{
  getdata();
},[counterContext.subcount])


  const[channelDetail,setChannelDetail]=useState();
  const[video,setVideo]=useState([]);

  const {id}=useParams();
  useEffect(()=>{
    
      fetchFromApi(`channels?part=snippet&id=${id}`).then((data)=>setChannelDetail(data?.items[0]))
      fetchFromApi(`search?channelId=${id} &part=snippet&order=date`).then((data)=>setVideo(data?.items))
  },[id])

  console.log(channelDetail);
  return (                                                                               
  
    
      <Box minHeight="95vh" minWidth="40vw">
      <Box>
        <div style={{
          height:"300px",background: 'linear-gradient(90deg, rgba(138,133,226,1) 5%, rgba(69,223,149,1) 50%, rgba(255,0,249,0.7960434173669468) 100%)'
        }}/>
        <ChannelCard channelDetail={channelDetail} subdetails={svideo} marginTop='-92px' id={id}/>
      </Box>
      <Box display="flex" p={2}>
        <Box sx={{mr:{lg:"100px"}}}/>
          <Videos videos={video}/>
      </Box>
    </Box>
    
    
  )
}

export default ChannelsDetails
