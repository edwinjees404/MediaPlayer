import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Videocard from '../components/Videocard';
import { toast } from 'react-toastify';
import { addCategoryApi, addvideoToCategoryApi, deleteCategoryApi, getAllCategoryApi } from '../services/allApi';

function Genre({videoStatus}) {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [addcategoryStatus, setAddCategoryStatus] = useState({})
  const [deleteCategoryStatus, setDeleteCategoryStatus] = useState()
  const [videoCategoryStatus, setVideoCategoryStatus] = useState({});


  const handleClose = () => {
    setShow(false);
    setCategoryName(''); // Clear the input when modal is closed
  };

  const handleShow = () => setShow(true);

  const handleCancel = () => {
    setCategoryName(''); // Clear the input when "Cancel" button is clicked
    setShow(false);
  };

  const handleAdd = async () => {
    if (categoryName) {
      const reqBody = {
        category: categoryName,
        allvideos: []
      };

      try {
        const result = await addCategoryApi(reqBody); // Calling the API function
        if (result.status >= 200 && result.status < 300) {
          toast.success('Category added successfully');
          handleClose();
          setAddCategoryStatus(result.data)


        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error('Error adding category');
        console.error(error); // Log the actual error for debugging
      }
    } else {
      toast.info('Please add a category name');
    }
  };

  const getCategory = async () => {
    try {
      const result = await getAllCategoryApi();
      setAllCategory(result.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleDelete = async(id)=>{
    const result = await deleteCategoryApi(id)
    console.log(result);
    if (result.status >= 200 && result.status < 300){
      setDeleteCategoryStatus(result.data)
    }
  }


    const ondrag = (e)=>{
      e.preventDefault()
    }

    const VideoDrop = async(e, categoryDetails)=>{
      console.log(categoryDetails);


    const videoDetails =JSON.parse (e.dataTransfer.getData("videoDetails"))

      console.log(videoDetails);


      if(categoryDetails.allvideos.find((item)=>item.id==videoDetails.id)){
        toast.error('Video already present in the category')
      }
      else{
        categoryDetails.allvideos.push(videoDetails)
        const result = await addvideoToCategoryApi(categoryDetails.id, categoryDetails)

        if(result.status>=200 && result.status<300){
          toast.success('Video added')
          setVideoCategoryStatus(result.data)
        }
        else{
          toast.error('Something went wrong')
        }
      }
      
      console.log(categoryDetails);
      

     
    }

    const videoDrag =(e, video, category) =>{
      console.log(video)
      console.log(category)

      const dataShare ={
        category,
        video
      }

      e.dataTransfer.setData("dataShare",JSON.stringify(dataShare))

    }



  useEffect(() => {
    getCategory();
  }, [addcategoryStatus,deleteCategoryStatus,videoCategoryStatus,videoStatus]);

  return (
    <>
      <h4>Category</h4>
      <button className='btn btn-warning w-100 mt-4' onClick={handleShow}>Add Category</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3 border border-secondary border-2 rounded">
            <input
              type="text"
              placeholder='Category Name'
              className='form-control'
              value={categoryName} // Bind input value to state
              onChange={(e) => setCategoryName(e.target.value)} // Update state on input change
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>

      {allCategory?.length > 0 && allCategory.map((item, index) => (
        <div key={index} className="border border-secondary border-2 p-3 rounded mt-5  "droppable onDragOver ={(e)=>ondrag(e)} onDrop={(e)=>VideoDrop(e, item)}>
          <div className="d-flex justify-content-between mb-3">
            <h5>{item?.category}</h5>
            <button className='btn btn-danger' onClick={()=>handleDelete(item?.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

         { item?.allvideos?.length>0 &&
           item?.allvideos?.map((video)=>(
            <div draggable onDragStart={(e)=>videoDrag(e,video,item)}>

            <Videocard video={video} isPresent = {true} />
            
          </div>
           ))
          
          }

        </div>
      ))}
    </>
  );
}

export default Genre;
