import React from 'react'

import { Container,Row, Card, Col, Button, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

function Details() {

  
  const {id} = useParams();
  const restaurants = useSelector((state) => state.data.restaurants);

 

  const currentRes = restaurants.find((res) => res._id === id );
  
  console.log(currentRes);

  return (
      
  
    <Container>
      {currentRes &&  <Row>
            <Col className='mt-3' md={5}>
            <Card >
      <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + currentRes.Photograph} />
      <Card.Body>
        <Card.Title>{currentRes.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
            </Col>

            <Col className='mt-3' md={4}>
            <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
            </Col>
        </Row>   }
        
        
    </Container>
    
  )
}

export default Details
