// import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Form, Row,  } from 'react-bootstrap'
import instance from '../axios';
import { useNavigate } from 'react-router-dom';


function Addrestaurants() {

    const [restaurantsName,SetRestaurantsName] = useState('');
    const [restaurantsAddress,SetRestaurantsAddress] = useState('');
    const [restaurantsPhotograph,SetRestaurantsPhotograph] = useState(null);

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    // const [Show,setShow] = useState(false);
    
    
    const handleRestaurantsName =(e) =>{
        SetRestaurantsName(e.target.value);
    }

    const handleRestaurantsAddress =(e) =>{
        SetRestaurantsAddress(e.target.value);
    }
    
    const handlePhotograph =(e) =>{
        // console.log(e.target.files);
        SetRestaurantsPhotograph(e.target.files[0])

    }

    const handleFormSubmit = async(event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
        //   event.preventDefault();
          event.stopPropagation();
        }else{

            const formData = new FormData();

            formData.append("name",restaurantsName);
            formData.append("address",restaurantsAddress);
            formData.append("Photograph",restaurantsPhotograph);
            
            // setShow(true);
            try {
                const res = await instance.post('/api/v2/restaurant',formData,{
                    withCredentials: true,
                    headers:{
                        'content-type': 'multipart/form-data'
    
                    }

                })

                if(res.data.success){
                    toast.success(res.data.message, {
                      autoClose:1000
                    });
          
                    await new Promise((resolve) =>setTimeout(resolve, 1000))
                    navigate('/');
          
                  }else{
                    toast.error(res.data.message)
          
                  }
            } catch (error) {
                toast.error(error.response.data.message)
                // console.log(error.message);
            }

            
        }
    
        setValidated(true);
      };

    console.log("Name---------------->",restaurantsName);
    console.log("restaurantAddress---------------->",restaurantsAddress);

    
  return (
    <Container>
        <Row>
            <Col className='mt-3'>
            <ToastContainer position="top-center"/>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                   <Form.Group className="mb-3">
                        <Form.Label>Restaurants Name</Form.Label>
                        <Form.Control type="text" placeholder="Restaurant Name"  onChange={(e) => handleRestaurantsName(e)} required/>
                        <Form.Control.Feedback type='invalidaton'>please enter restaurant name</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Restaurants Address</Form.Label>
                        <Form.Control type="text" placeholder="Restaurant Address"  onChange={(e) => handleRestaurantsAddress(e)} required/>
                        <Form.Control.Feedback type='invalidaton'>please enter restaurant Address</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group ControlId="formFile" className='mb-3'>
                        <Form.Label>Restaurant Photograph:</Form.Label>
                        <Form.Control type="file"  onChange={(e)=>handlePhotograph(e)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    
                </Form>
                {/* {Show &&<Alert variant='success'>
                    Reastaurant added successfully !!
                </Alert>} */}
            </Col>
        </Row>
    </Container>
  )
}

export default Addrestaurants
