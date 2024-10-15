import React from 'react'
import { faCloudArrowUp, faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddVideoApi } from '../services/allApi';



function Add({setAddVideoStatus}) {
  const[videoDetails,setVideoDetails] = useState({
    caption:"",
    imageUrl:"",
    embedLink:"",
  })
  const [show, setShow] = useState(false);

  console.log(videoDetails);

  const handleClose = () => {setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);

  const getEmbedLink = (e)=>{
    const link = e.target.value
    // https://youtu.be/r7COWvxlN5g?si=j3YRJYVPJGYvQwaT
    
    
    
  }

  const handleCancel = ()=>{
    setVideoDetails({
      caption:"",
      imageUrl:"",
      embedLink:"",
    })
  }
  
  const handleAdd = async () => {
    const { caption, imageUrl, embedLink } = videoDetails;
  
    if (!caption || !imageUrl || !embedLink) {
      toast.info('Please fill the form');
    } else {
      let embedL;
      
      if (videoDetails.embedLink.startsWith('https://youtu.be/')) {
        embedL = `https://www.youtube.com/embed/${videoDetails.embedLink.slice(17, 28)}`;
      } else {
        embedL = `https://www.youtube.com/embed/${videoDetails.embedLink.slice(-11)}`;
      }
      
      const result = await AddVideoApi({ ...videoDetails, embedLink: embedL });
      console.log(result);
  
      if (result.status >= 200 && result.status < 300) {
        toast.success('Video uploaded successfully');
        handleClose();
        setAddVideoStatus(result.data)
      } else {
        toast.error('Something went wrong');
        handleClose();
      }
    }
  };
  

  return (
    <>
      <div className='d-flex align-items-center'>
        <h5><span className='d-none d-md-inline'>Upload New Video</span></h5>
        <button className='btn pb-3' onClick={handleShow}>
  <FontAwesomeIcon icon={faCloudArrowUp} className='fs-5' />
</button>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-warning'><FontAwesomeIcon icon={faFilm} className='me-2' />Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Please fill the following details</h6>
          <form className='p-3 border border-dark rounded mt-3'>

            <div className="mb-3">
              <input type="text" placeholder='Video Caption' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails,caption:e.target.value})} />
            </div>

            <div className="mb-3">
              <input type="text" placeholder='Video Image' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails,imageUrl:e.target.value})} />
            </div>

            <div className="mb-3">
              <input type="text" placeholder='Video Url' className='form-control' onChange={(e)=>setVideoDetails({...videoDetails,embedLink:e.target.value})} />
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" type='button' onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer 
          position='top-center' 
          autoClose={2000} 
          theme="colored" 
        />
    </>
  )
}

export default Add
