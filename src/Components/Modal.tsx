import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { allowedNodeEnvironmentFlags } from 'process'

export default function MyVerticallyCenteredModal(props: any) {

    const baseURL = "http://localhost:3000/tasks"
    const [title, setTitle] = useState("")
    const [post, setPost] = useState(false)

    React.useEffect(() => {
       
    }, [post]);


    function handleTitle(e: any) {
        setTitle(e.target.value)
    }

    function submit(){
        if(title.trim() === ""){
            alert("Task cannot be empty")
        }
        else{   
            props.createpost(title)
            props.onHide()
        }
        
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Control type="text" placeholder="New task" onChange={handleTitle}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }