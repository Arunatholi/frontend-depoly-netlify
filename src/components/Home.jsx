import React, { useState } from 'react';
import { Container, Row, Card, Button, ListGroup, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { configDotenv } from 'dotenv';



function Home() {


    const [Count, setCount]=useState(10);

    const restaurants = useSelector((state) => state.data.restaurants);

    // console.log("Count No: 9---------->",Count);

     const  updateCount = ()=>{
        setCount (40);

        // console.log ("Count No: 13---------->",Count);
     }
      
    



    // console.log(restaurant);
  return (
    <Container>
        <button onClick = {updateCount}>update count</button>
        <Row>
            {restaurants &&  restaurants.map((res, index) =>(
               <Col md ={4} className='mt-4' key={index} > 
               <Card>
                    <Card.Img variant="top" src={process.env.REACT_APP_SERVER_URL + res.Photograph} />
                    <Card.Body>
                        <Card.Title>{res.name}</Card.Title>
                            <Card.Text>
                            {res.address}
                         </Card.Text>
                        <Button as = {Link} to={`/details/${res._id}`} variant="primary">More info</Button>
                    </Card.Body>
                </Card> 
            </Col>
             ))} 

        </Row>
    </Container>
  )
}

export default Home;
