import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Box} from '@mui/material'
import {Navbar,Feed,VideosDetails,ChannelsDetails,SearchDetails} from './components'


const App = () =>(
    <BrowserRouter>
       <Box sx={{background:"#000"}}>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Feed/>}/>
                <Route path ='/video/:id' element={<VideosDetails/>}/>
                <Route path ='/Channel/:id' element={<ChannelsDetails/>}/>
                <Route path ='/Search/:searchTerm' element={<SearchDetails/>}/>
            </Routes>
       </Box>
    </BrowserRouter>
  );


export default App
