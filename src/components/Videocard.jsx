import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import Modal from 'react-bootstrap/Modal'; 
import { addVideoHistoryApi } from '../services/allApi';
import { deleteVideoApi } from '../services/allApi';



function Videocard({ video , setDeleteVideoStatus, isPresent  }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false); // Correct declaration
  const handleShow = async () => {
    setShow(true);
  
    const time = new Date(); // Define the 'time' variable
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(time);
  
    console.log(formattedDate);
  
    const reqBody = {
      Caption: video?.caption,
      url: video?.embedLink,
      time: formattedDate // Correct the variable reference here
    };
  
    const result = await addVideoHistoryApi(reqBody);
    console.log(result);
  };
  
  const handleDelete = async(id)=>{
    const result = await deleteVideoApi(id)
    console.log(result)
    if(result.status>=200 && result.status<300){
      setDeleteVideoStatus(result.data)
    }
  }

  const videoDrag = (e, video) =>{
    console.log(video)
    e.dataTransfer.setData("videoDetails",JSON.stringify(video))
  }
  
  return (
    <>
      <Card style={{ width: '100%' }} draggable onDragStart={(e)=>videoDrag(e, video)} className='mt-4'>
        { !isPresent && <Card.Img
          onClick={handleShow}
          variant="top"
          src={video?.imageUrl} // Make sure you reference 'video'
          className='w-100'
          height={'300px'}
        />}

        <Card.Body className='d-flex justify-content-between'>
          <Card.Title>{video?.caption}</Card.Title>
         { !isPresent && <Button variant="danger" onClick={() => handleDelete(video?.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{video?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="480"
            src={`${video?.embedLink}?autoplay=1`}
            title={video?.caption}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Videocard;
