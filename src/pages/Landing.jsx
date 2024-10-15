import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Landing() {
  return (
    <>
      <Container className='d-flex justify-content-center align-items-center py-5 px-4' >
      <Row className='mt-5'>
       

        <Col md={6}>
          <h2>Welcome to <span className='text-warning'>Media Player</span></h2>

          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptas omnis doloremque inventore distinctio, quasi consequuntur sequi iure eum ratione blanditiis velit ducimus ea illum molestias saepe. Culpa, fuga quo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis assumenda modi sit eos velit qui libero ipsam. Adipisci eligendi, minus voluptas quis itaque nulla, sunt, laudantium similique corporis est officiis.</p>

          <Link to={'/home'}><button className='btn btn-warning mt-5'>Get Started</button></Link>


        </Col>


        <Col md={1}>

        </Col>

        <Col md={5} className='d-flex justify-content-center mt-5 mt-md-0'>
          <img src="https://c.tenor.com/lhlDEs5fNNEAAAAC/music-beat.gif" alt="no image" className='w-75' />

        </Col>


      </Row>
    </Container>

      {/*  */}


      <Container className="mt-5">
  <h2 className="text-center">Features</h2>
  <Row>
    <Col md={1}></Col>
    <Col md={10}>
      <Row className="mt-5 d-flex justify-content-center align-items-center">
        <Col md={4} className="p-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img className="w-100" height={300} variant="top" src="https://24.media.tumblr.com/d36278415ea2632bb223d8e736a93a6b/tumblr_n6akz39WvM1shpedgo1_500.gif" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="p-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img className="w-100" height={300} variant="top" src="https://media.giphy.com/media/XMaB779YCmP9m/giphy.gif" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="p-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img className="w-100" height={300} variant="top" src="https://media0.giphy.com/media/3o7btZ1pMda4to9zR6/source.gif" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
    <Col md={1}></Col>
  </Row>
</Container>


    </>
  )
}

export default Landing
