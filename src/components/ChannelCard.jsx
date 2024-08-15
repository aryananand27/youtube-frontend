import React, { useEffect,useContext } from 'react'
import { Box ,Typography,CardMedia, CardContent,Button} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoneIcon from '@mui/icons-material/Done';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { demoProfilePicture } from '../utils/constants';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { CounterContext } from './context/count';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const ChannelCard = ({channelDetail,marginTop,id,subdetails}) => {
//********************************* starting--> code for get subscribers data .................

const counterContext=useContext(CounterContext);
const auth=JSON.parse(sessionStorage.getItem('user'));
let userId;
if(auth &&auth.result){
  userId=auth.result._id;
}




//********************************* ending--> code for get subscribers data.................
//********************************* starting--> code for toggle button.................





//********************************* ending--> code for toggle button.................


//********************************* starting--> code for push subscribed channel details.................
    let [check,setCheck] =useState(false);
    let channelId;
    if(id){
      channelId=id;
    }
    else{
      channelId=channelDetail.id.channelId;
    }
   let navigate=useNavigate();


    const Subscribed=async()=>{

      
      let imgurl,subcount,channelTitle;
      if(auth&& auth.result){
        userId=auth.result._id;
        if(channelDetail.snippet.thumbnails.high.url){
          imgurl=channelDetail.snippet.thumbnails.high.url;
        }
        else{
          imgurl=demoProfilePicture;
        }
        if(channelDetail.statistics){
          subcount=parseInt(channelDetail.statistics.subscriberCount).toLocaleString('en-US');
        }
        else{
          subcount="";
        }
        
        channelTitle=channelDetail.snippet.title;
      
      }

      


      let subsdata=[{imgurl:imgurl,subcount:subcount,channelTitle:channelTitle,channelId:channelId}];
      
      let result=await fetch(`https://youtube-backend-liard.vercel.app/subscribers/${userId}`,{
        method:"Post",
        body:JSON.stringify({userId,subsdata}),
        headers:{
          'Content-Type':"application/json"
        }
      })
      result=await result.json();
      
      counterContext.setSubCount(counterContext.subcount+1);
      if(result.reslt){
        alert(`${result.reslt}`);
      }
    }
//********************************* Ending--> code for push subscribed channel details.................

//********************************* starting--> code for  unsubscribed channel details.................
console.log(channelId);
const unsubscribed=async()=>{
 
  counterContext.setCount(counterContext.count+1);
  const result=await fetch(`https://youtube-backend-liard.vercel.app/deletesubscribers/${channelId}`,{
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


//********************************* Ending--> code for  unsubscribed channel details.................

const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
 
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};


  return (
    <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: "100%", md: "300px" },
      height: "326px",
      margin: 'auto',
      marginTop
    }}
  >
   
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff',width:{xs:"240px",sm:"348px",md:"300px"} }}>
        <CardMedia
          image={ channelDetail?.snippet?.thumbnails?.high?.url ||  demoProfilePicture}
          alt={channelDetail?.snippet?.title}
          sx={{ borderRadius: '50%', height: '180px', width: '180px', mb: 2, border: '1px solid #e3e3e3' }}
        />
        <Typography variant="h6">
          {channelDetail?.snippet?.title}{' '}
          <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography sx={{ fontSize: '15px', fontWeight: 800, color: 'gray' ,fontFamily:`"Baloo Bhai 2", sans-serif`}}>
            {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
          </Typography>
        )}
       
      {auth&& <>    {subdetails.includes(channelId)  ? <>
          <Button



style={{marginTop:"12px",backgroundColor:"rgba(128, 128, 128, 0.164)"}} variant="contained" size='medium'
  id="demo-customized-button"
  aria-controls={open ? 'demo-customized-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}

  disableElevation
  onClick={handleClick}
  endIcon={<KeyboardArrowDownIcon />}
>
<DoneIcon style={{fontSize:"20px" ,color:"lightgreen" ,fontWeight:"800",marginRight:"4px"}}/>
  Subscribed
</Button>
<StyledMenu
  id="demo-customized-menu"
  MenuListProps={{
    'aria-labelledby': 'demo-customized-button',
  }}
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
>

  <MenuItem onClick={unsubscribed} disableRipple style={{backgroundColor:"rgba(128, 128, 128, 0.164)"}}>
    <UnsubscribeIcon style={{fontWeight:"bolder"}}/>
    <span style={{fontWeight:"bolder"}}>Unsubscribe</span>
  </MenuItem>
  
</StyledMenu></>

        :<Button startIcon={<NotificationsNoneIcon/>} style={{marginTop:"12px",backgroundColor:"rgba(128, 128, 128, 0.164)"}} variant="contained" size='medium' onClick={Subscribed}> Subscribe</Button>}

        
        </>}
      </CardContent>
    
  </Box>
  )
}

export default ChannelCard
