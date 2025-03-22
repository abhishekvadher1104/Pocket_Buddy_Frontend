import React from 'react'
import loader from '../../assets/images/loader2.gif'
const Loader = () => {
  return (
    <div style={{height:"70vh" , width:"70vw" , display:"flex" , alignItems:"center" , justifyContent:"center"}}>
      <center>
    <img src={loader} style={{height:"200px" ,width:"200px"}} alt="Loading..." />
    <h1>Wait a Moment...</h1>
      </center>
      
    </div>
  )
}

export default Loader
