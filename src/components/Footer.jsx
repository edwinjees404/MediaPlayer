import { faFacebook, faInstagram,  faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='container-fluid p-4'>
      <div className="row">


        <div className="col-md-4">
          <h4 className="text-warning"><FontAwesomeIcon icon={faVideo} beatFade className='me-2' />Media Player</h4>
          <p style={{textAlign:'Justify'}} className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel atque perferendis eaque porro mollitia voluptas! Dolore inventore optio perferendis sed accusantium natus iste, repellat voluptas tempora doloremque eius! Officiis, soluta?</p>

        </div>


        <div className="col-md-2">
          <h4>Links</h4>
          <Link to={'/'}><p className='mt-4'>LAnding Page</p></Link>
          <Link to={'/home'}><p>Home Page</p></Link>
          <Link to={'/Watchhistory'}><p>Watch History</p></Link>
        </div>

        <div className="col-md-2">
          <h4>Guides</h4>
          <p className='mt-4'>React</p>
          <p>ReactBootstrap</p>
          <p>Bootswatch</p>
        </div>

        <div className="col-md-4 px-5">
          <h4>Contact Us</h4>
          <div className=" d-flex mt-4">
            <input type="text" placeholder='Email ID' className='form-control' />
            <button className='btn btn-warning ms-3'>Subscribe</button>
          </div>

          <div className="d-flex justify-content-between mt-3">
          <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
          <FontAwesomeIcon icon={faXTwitter} className='fa-2x' />
          <FontAwesomeIcon icon={faWhatsapp} className='fa-2x' />
          <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer
