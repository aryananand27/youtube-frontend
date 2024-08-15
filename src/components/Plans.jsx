import React from 'react'
import {logo} from '../utils/constants'
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const Plans = () => {
  return (
   <>
    
      <div className="plan-main-container">
        <div className='logo-container'>
          <img src={logo} alt="" />
          <h1 >YourTube Premium</h1>
        </div>
        <div className="plan-mid-container">
          <h1> <span className='span-h1'> All YourTube.</span> <br></br><span className='span-interr'> No interruptions.</span> </h1>
        </div>
        <div className="plan-last-container">
          <h1>Pick a membership <br></br> <span className='span-fits'>that fits you</span></h1>
        </div>
      </div>
      
     
     <div className="paisa-container">
      <div className="box">
         <div className="box-content">
         <PermIdentityIcon/>
          <h2>Individual</h2>
         </div>
         <hr className='underline'></hr>
         <div className="box-last-content">
         <h3><span style={{fontSize:"13px",fontFamily:`"Baloo Bhai 2", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`}}>Prepaid or monthly.</span> <br></br> Starting from ₹29.00/month <br></br><span style={{fontSize:"14px",fontFamily:` "Poppins", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`,fontWeight:"350"}}>Free trials with monthly plans.</span></h3>
           
         </div>
         <button className='btn-pay'>Get YourTube Premium</button>
      </div>
      <div className="box1">
      <div className="box-content">
         <GroupsIcon/>
          <h2>Family</h2>
         </div>
         <hr className='underline'></hr>
         <div className="box-last-content">
         <h3><span style={{fontSize:"13px",fontFamily:`"Baloo Bhai 2", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`}}>Monthly.</span> <br></br> ₹79.00/month <br></br><span style={{fontSize:"14px",fontFamily:` "Poppins", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`,fontWeight:"350"}}>Get <spans style={{fontWeight:"bolder"}}>1</spans> month free. Add up to 5 family members (ages 13+).</span></h3>
       
         </div>
         <button className='btn-pay'>Get YourTube Premium</button>
      </div>



      <div className="box">
      <div className="box-content">
         <SchoolIcon/>
          <h2>Student</h2>
         </div>
         <hr className='underline'></hr>
         <div className="box-last-content">
         <h3><span style={{fontSize:"13px",fontFamily:`"Baloo Bhai 2", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`}}>Monthly.</span> <br></br> ₹19.00/month <br></br><span style={{fontSize:"14px",fontFamily:` "Poppins", sans-serif`,textShadow:`0rem 0.4rem 0.5rem rgba(128, 128, 128, 0.489)`,fontWeight:"350"}}>Get <spans style={{fontWeight:"bolder"}}>1</spans> month free. Eligible students only.</span></h3>
           
         </div>
         <button className='btn-pay'>Get YourTube Premium</button>

      </div>
     </div>

    
   </>
  )
}

export default Plans
