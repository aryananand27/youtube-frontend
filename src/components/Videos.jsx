import React, { useState } from 'react'
import { Stack,Box } from '@mui/material'
import {VideoCard,ChannelCard,Loader} from '.'


const Videos = ({videos,direction,subdetails}) =>  {
  const [favdata,setFavData]=useState([]);
  if(!videos?.length) return <Loader />;
const row="row";

let direct=direction||'row';
console.log(direct);
    return(
      
        <Stack direction={{xs:"row",md:`${direct}`}} flexWrap="wrap"  alignItems="start" gap={2} sx={{justifyContent:{xs:"center",lg:"start"}}} >
                {videos.map((item, idx) => (
                  <Box key={idx} >
                    {item.id.videoId && <VideoCard video={item} favdata={favdata} setFavData={setFavData} index={idx} /> }
                    {item.id.channelId && <ChannelCard channelDetail={item} subdetails={subdetails}/>}
                  </Box>
            ))}
        </Stack>
    )
    
    }


export default Videos
