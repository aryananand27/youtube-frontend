import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {green } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ShopIcon from '@mui/icons-material/Shop';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { CounterContext } from './context/count';
import SearchIcon from '@mui/icons-material/Search';
import HoverSearch from './HoverSearch';


export default function AccountMenu() {
    const auth=JSON.parse(sessionStorage.getItem('user'));
    const counterContext=React.useContext(CounterContext);
    let myname;
    if(auth.result){
      myname=auth.result.name;
    }
  
    const color=green[500];
    const navigate=useNavigate();
    
 // logout function
 const loggedOut=()=>{
  sessionStorage.clear();
  counterContext.setLog(counterContext.log+1);
   navigate('/');
 }
 
 
    //color Code ---->

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
  
  
  // Menu Functonality code--->
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const searchicon=()=>{
    counterContext.setSearch(false);
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

      <HoverSearch/>
    
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > 
          
            <Avatar sx={{width:32, height: 32}} {...stringAvatar( `${auth.result.name}`)}  />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
       
        PaperProps={{
          elevation: 0,
          sx: {
            
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} >
          <Avatar /> {`${auth.result.name}`}
        </MenuItem>
       
        <Divider />
        <Link to={`/favourites/${auth.result._id}`} >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          My Favourites
        </MenuItem>
        </Link>
        <Link to={`/watchlater/${auth.result._id}`}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <WatchLaterIcon fontSize="small" />
          </ListItemIcon>
          My WatchLater 
        </MenuItem>
        </Link>
        <Link to={`/subscribed/${auth.result._id}`}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SubscriptionsIcon fontSize="small" />
          </ListItemIcon>
         My Subscribed Channels
        </MenuItem>
        </Link>
        <Divider sx={{height:"25px"}}/>
        <Link to='/plans'>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShopIcon fontSize="small" />
          </ListItemIcon>
          Plans & Subscriptions
        </MenuItem>
        </Link>
     
       
        <MenuItem onClick={loggedOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
