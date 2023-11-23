import axios from "axios";
 export const BASE_URL='https://youtube-v31.p.rapidapi.com'

const options = {
    params: {
      maxResults:50
    },
    headers: {
      'X-RapidAPI-Key': '1106b3e7e7mshc44f11f684fc398p1fdbc2jsn54ed65b7a40f',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  export const fetchFromApi=async(url)=>{
      const {data}=await axios.get(`${BASE_URL}/${url}`,options)
      return data;
  }

