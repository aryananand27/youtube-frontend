import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Box} from '@mui/material'
import {Navbar,Feed,VideosDetails,ChannelsDetails,SearchDetails} from './components'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Favourites from './components/Favourites'
import Subscribed from './components/Subscribed'
import WatchLater from './components/WatchLater'
import Plans from './components/Plans'
import { ToastContainer } from 'react-toastify'


const App = () =>(
 
  
    <BrowserRouter>  
       <Box sx={{background:"#000"}}>  
            <Navbar/>    
            <Routes>
                <Route path='/' element={<Feed/>}/>
                <Route path ='/video/:id' element={<VideosDetails/>}/>
                <Route path ='/Channel/:id' element={<ChannelsDetails/>}/>
                <Route path ='/Search/:searchTerm' element={<SearchDetails/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/favourites/:id' element={<Favourites/>} />
                <Route path='/watchlater/:id' element={<WatchLater/>} />
                <Route path='/subscribed/:id' element={<Subscribed/>} />
                <Route path='/plans' element={<Plans/>}/>
            </Routes>
       </Box>
       <ToastContainer position='top-center' theme='dark'/>
    </BrowserRouter>
    
  );


export default App
