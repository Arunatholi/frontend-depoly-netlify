import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserDelete from './UserDelete';
function Users() {

  const[users, setUsers] = useState([]);
  useEffect(()=>{
    const getAllusers = async ()=>{
      try {
        const res = await axios.get("https://deploy-back-bsxa.onrender.com/api/v2/users", {withCredentials:true});
  
        setUsers(res.data.users);
      } catch (error) {
        // console.log(error.message);
        toast.error(error.message);
      }
    }
    getAllusers();

  }, [users]);

  // console.log(users);


  return (
    <Container>
        <Row>
            <Col className='mt-3'>
            <h3>Users</h3>
            </Col>
        </Row>
        <Row>
            <Col className='mt-3'>

            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
         
        </tr>
      </thead>
      <tbody>
       {users && users.map((user,index) => (
         <tr>
         <td>{index + 1}</td>
         <td>{user.name}</td>
         <td>{user.email}</td>
         <td>
          <Link to={`/user/${user._id}`}><EditIcon/></Link>
          </td>
         <td><UserDelete id ={user._id}/></td>
        
       </tr>
       ))}
       
      </tbody>
    </Table>
            
              
            </Col>
        </Row>
    </Container>
  )
}

export default Users