import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from './Components/Box';
import Drag from './Components/Drag'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

function App() {

  function handleClick(){
    alert("hello")
  }

  return (
    <>
        {/* <Box/> */}
        <div className="cont">
          <div className="left">
            <Button variant="primary" onClick={handleClick} className="add-btn">Add Task</Button>
            <Button variant="outline-success">Edit</Button> {' '}
            <Button variant="outline-danger">Delete</Button>
            <Drag/>
          </div>
          <div className="right">
            <h2>Completed!</h2>
            <Drag/>
          </div>
        </div>
        
    </>
  );
}

export default App;
