import React from 'react'
import Add from '../components/Add'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'
import Allmedia from '../components/Allmedia'
import Genre from '../components/Genre'
import { useState } from 'react';


function Home() {
  const [addVideoStatus , setAddVideoStatus] = useState({})
  const[videoStatus, setVideoStatus] = useState({})
  return (
    <>
    <div className='d-flex p-md-5 p-3 align-items-center'>
      <Add setAddVideoStatus={setAddVideoStatus}/>
      <Link to={'/Watchhistory'} className='ms-auto ' style={{textDecoration:'none'}}><h3><span className='d-none d-md-inline'>Watch History</span> <FontAwesomeIcon icon={faClockRotateLeft} /></h3></Link>
    
    </div> 
    
    <div className='container-fluid p-4'>
      <div className='row'>
        <div className='col-md-9'>
          <Allmedia addVideoStatus={addVideoStatus} setVideoStatus={setVideoStatus} />
        </div>
        <div className='col-md-3'>
          <Genre videoStatus = {videoStatus} />
        </div>
      </div>
    </div>

    </>
  )
}

export default Home