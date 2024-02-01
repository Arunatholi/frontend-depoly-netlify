// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';

function User() {

    const [validated, setValidated] = useState(false);
    


    const{id} = useParams();
    const navigate = useNavigate();


    const[user,SetUser] = useState({
      name:'',
      email:''
    });

    useEffect(()=>{
      const getUserDetails = async () => {

        try {
         const res = await instance.get (`api/v2/user/${id}`,{
          withCredentials:true
         });
         if(!res.data.success) {
          navigate("/users");
         }

        // console.log(res.data.user);

         SetUser({
          name:res.data.user.name,
          email:res.data.user.email,
         });
          
        } catch (error) {
          navigate("/users");
        }
      }

      getUserDetails();
    },[id,navigate]);

    // const navigate = useNavigate();

    const handleFormSubmit = async(e)=>{
      e.preventDefault();
      const form = e.currentTarget;
      if(form.checkValidity() === false){
        e.stopPropagation();
      }
      else{


        try {
          let res = await instance.put(`api/v2/user/${id}`,{
            name:user.name,
            email:user.email
          },{
            withCredentials:true
          });
          if(!res.data.success){
            toast.error(res.data.message)
          }
          toast.success(res.data.message);

          await new Promise((resolve) =>setTimeout(resolve, 1000))
            navigate('/users');
  


        } catch (error) {
          toast.error(error.response.data.message)
        }


        // try {
        //   let res = await axios.post('http://localhost:5000/api/v2/register',{
        //   name:userName,
        //   email:userEmail,
        //   password:userPassword
          
        // });

        // if(res.data.success){
        //   toast.success(res.data.message,{
        //     autoClose:1000
        //   });

        //   await new Promise((resolve) =>setTimeout(resolve, 1000))
        //   navigate('/');

        // }else{
        //   toast.error(res.data.message)

        // }

        // } catch (error) {
        //   console.log(error.message);
        //   // toast.error(error.message)
        // }


       
      }

      setValidated(true);

    }
    

    // const handleUserName = (e) => {
    //   SetUserName(e.target.value)
    // }

    // const handleUserEmail = (e)=>{
    //   SetUserEmail(e.target.value)
    // }

    // const handleUserPassword = (e)=>{
    //   SetUserPassword(e.target.value)
    // }

    console.log(user);
  return (
    <Container>
        <Row>
            <Col className='mt-3'>
            User Edit
            </Col>
        </Row>
        <Row>
            <Col className='mt-3'>
            <ToastContainer position="top-center"/>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                   <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="ENTER NAME" defaultValue={user.name} onChange={(e) => SetUser({...user,name:e.target.value})} required/>
                        <Form.Control.Feedback type='invalid'>please enter Name</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Name Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Email" defaultValue={user.email}  onChange={(e) => SetUser({...user,email:e.target.value})} required/>
                        <Form.Control.Feedback type='invalid'>please enter Email</Form.Control.Feedback>
                        <Form.Control.Feedback type='valid'>Email Looks good!</Form.Control.Feedback>
                    </Form.Group>
                   
                    
                    <Button variant="primary" type="submit">
                      update
                    </Button>
                </Form> 
              
            </Col>
        </Row>
    </Container>
  )
}

export default User