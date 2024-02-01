import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from 'react-bootstrap';
import instance from '../axios';
import { ToastContainer,toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDelete({id}) {
    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async() => {
        try {
            const res = await instance.delete(`api/v2/user/${id}`,{
                withCredentials: true
            })
            if(!res.data.success){
                toast.error(res.data.message)
              }

              setShow (false)
              toast.success(res.data.message);
    
            //   await new Promise((resolve) =>setTimeout(resolve, 1000))
            //     Navigate('/users');
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


  return (
    <>
    <DeleteIcon onClick ={handleShow}/>
    <ToastContainer position="top-center"/>

    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>USER DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure that want to delete this user ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default UserDelete