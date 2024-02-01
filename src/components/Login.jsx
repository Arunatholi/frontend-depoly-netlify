import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authUserSuccess} from './redux/userAuth';
import { useDispatch } from 'react-redux';


function Login() {

    const [validated, setValidated] = useState(false);
    const [userEmail,SetUserEmail] = useState('');
    const [userPassword,SetUserPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        if(form.checkValidity() === false){
          e.stopPropagation();
        }
        else{
  
  
          try {
            let res = await axios.post('https://deploy-back-bsxa.onrender.com/api/v2/login',{
            email:userEmail,
            password:userPassword
            
          },{
            withCredentials:true
          }
          );
  
          if(res.data.success){

            if(res.data.isAuthenticated){
              dispatch(authUserSuccess({user:res.data,isAuthenticated:res.data.isAuthenticated}))


            }

            toast.success(res.data.message,{
              autoClose:1000
            });
  
            await new Promise((resolve) =>setTimeout(resolve, 1000))
            navigate('/');
  
          }else{
            toast.error(res.data.message)
  
          }
  
          } catch (error) {
            // console.log(error.response.data.message);
            toast.error(error.response.data.message)
          }
  
  
         
        }
  
        setValidated(true);
  
      }

      const handleUserEmail = (e)=>{
        SetUserEmail(e.target.value)
      }
  
      const handleUserPassword = (e)=>{
        SetUserPassword(e.target.value)
      }



  return (
    <Container>
    <Row>
        <Col className='mt-3'>
       <h3>Login</h3>
        </Col>
    </Row>
    <Row>
        <Col className='mt-3'>
        <ToastContainer position="top-center" autoClose={1000}/>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Email"  onChange={(e) => handleUserEmail (e)} required/>
                    <Form.Control.Feedback type='invalid'>please enter Email</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Email Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Password"  onChange={(e) => handleUserPassword (e)} required/>
                    <Form.Control.Feedback type='invalid'>please enter Password</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Password Looks good!</Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Login
                </Button>
            </Form> 
          
        </Col>
    </Row>
</Container>
  )
}

export default Login