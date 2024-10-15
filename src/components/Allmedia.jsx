import React, { useEffect, useState } from 'react';
import Videocard from '../components/Videocard';
import { addvideoToCategoryApi, getVideosApi } from '../services/allApi';

function Allmedia({addVideoStatus,setVideoStatus}) {
  const [allVideos, setAllVideos] = useState([]);
  const[deleteVideoStatus ,setDeleteVideoStatus] = useState({})
  // const[videoStatus, setVideoStatus]= useState({})



  const getAllVideo = async () => {
    try {
      const result = await getVideosApi();
      setAllVideos(result.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const ondrop = (e)=>{
    e.preventDefault()
  }

  const VideoDrop = async (e) => {
    const {category, video} = JSON.parse(e.dataTransfer.getData("dataShare"));
    console.log(category, video);
  
    const newArray = category.allvideos.filter((item) => item.id !== video.id);
    const newCategory = {
      category: category.category,
      allvideos: newArray,
      id: category.id
    };
  
    try {
      const result = await addvideoToCategoryApi(category.id, newCategory);
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setVideoStatus(result.data)
      }
    } catch (error) {
      console.error('Error updating video category:', error);
    }
  };

  useEffect(() => {
    getAllVideo();
  }, [addVideoStatus, deleteVideoStatus]); /*[]-useEffecti called when two components render to the browser */

  return (
    <div droppable onDragOver={(e)=>ondrop(e)} onDrop={(e)=>{
      VideoDrop(e)}}>
      <h4>All Videos</h4>

      {/* added videos */}

      {allVideos.length > 0 ? (
        <div className="container">
          <div className="row">
            {allVideos.map((item, index) => (
              <div className="col-md-3 p-3" key={item.id || index}> {/* Use `item.id` or fallback to `index` */}
                <Videocard video={item} setDeleteVideoStatus ={setDeleteVideoStatus} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row"> {/* Fixed 'ro' to 'row' */}
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTMh2RlXvCKWVgC70q06r8sntDKl5dOKZHw&s"
                alt="No videos"
                className="w-100"
              />
              <h5 className="text-warning text-center">No video added yet</h5>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allmedia;
