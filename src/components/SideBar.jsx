import { Stack, } from "@mui/material"
import { categories } from "../utils/constants"

import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
const SideBar = ({selectedCategory,setSelectedCategory}) =>  (
    <Stack  direction="row" sx={{overflowY:"auto",height:{xs:"auto",md:"95%"},flexDirection:{md:"column"}}}>
            
          <button className="category-btn" style={{background:selectedCategory==="Trending"&&'#FC1503',color:"white"}} onClick={()=>setSelectedCategory("Trending")}>
            <span style={{marginRight:"4px"}}><HomeIcon/></span>
            <span>Home</span>
          </button>
            {categories.map((category)=>(
            
                <button 
                className="category-btn" 
                style={{background:category.name===selectedCategory&&'#FC1503' , color:"white"}}
                 key={category.name}  onClick={() => setSelectedCategory(category.name)}>
       
                        <span style={{color:category.name===selectedCategory? "white":"red",marginRight:"4px"}}>{category.icon}</span>
                        <span style={{opacity:category.name===selectedCategory? "1":"0.8"}}>{category.name==='Trending'?`Home`:category.name}</span>
              
                </button>
            ))}
    </Stack>
  )


export default SideBar
