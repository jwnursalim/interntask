import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Drag from './Components/Drag'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Modal from './Components/Modal'
import PatchTitle from './Components/PatchTitle'
import axios from "axios";
import 'animate.css';
import { BASE_URL } from "./Components/BaseURL"

function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [loading, setLoading] = React.useState("true");
  const [data1, setData1] = React.useState<any>([])
  const [data2, setData2] = React.useState([])
  const [tempID, setTempID] = React.useState("0")

  const baseURL = BASE_URL
  const [postStatus, setPost] = useState(false)
  
  React.useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(BASE_URL)
      setData1(result.data)
      setLoading("false")
    } 
    fetchData()
  }, [postStatus]);

  function refresh(){
    setPost(!postStatus)
    setLoading("true")
  }

  function createPost(title: string) {
    axios
      .post(baseURL, {
        id: 0,
        title: title,
        status: "OPEN"
      })
      .then((response) => {
        // setPost(response.data);
        setPost(!postStatus)
        setModalShow(false)
    });
 }

 function handleCall(id: string){
   setModalShow2(true)
   setTempID(id)
 }

 function updateTitle(title: string){
    axios.patch(BASE_URL + "/" + tempID + "/title", {
      title: title
    }).then((r) => setPost(!postStatus))
 }

 function reset(){
  if (window.confirm('Are you sure you want to delete?')) {
    axios.patch(BASE_URL + "/reset")
    setPost(!postStatus)
  }
  else{
    alert("Delete cancelled")
  }
  
 }

  if(loading === "true"){
    return <div>Loading...</div>
  }

  else{
    if(data1.length === 0){
      return(
        <>
        {/* <Box/> */}
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          createpost={createPost}
        />
        <div className="cont">
          {
            
          }
          <div className="left ">
            <Button 
             onClick={() => setModalShow(true)}
            variant="primary" className="add-btn">Add Task</Button>
            <Button variant="outline-success">Edit</Button> {' '}
            <Button variant="outline-danger" onClick={reset}>Reset</Button>
            {/* <Drag data={data1} key={data1} long={data1.length} type1="OPEN" auto={refresh}/> */}
            <div className="drag-box2">
            </div>
          </div>
          <div className="right">
            <h2>Completed!</h2>
            <div className="drag-box2">
            </div>
            {/* <Drag data={data1} key={data1} long={data1.length} type1="DONE" auto={refresh}/> */}
          </div>
        </div>
        
    </>
      )
    }
    else{
      return (
        <>
            {/* <Box/> */}
            <Modal
              show={modalShow}
              onHide={() => setModalShow(false)}
              createpost={createPost}
            />
            <PatchTitle
              show={modalShow2}
              onHide={() => setModalShow2(false)}
              createpost={updateTitle}
            />
            <div className="cont">
              {
                
              }
              <div className="left ">
                <Button 
                 onClick={() => setModalShow(true)}
                variant="primary" className="add-btn">Add Task</Button>
                <Button variant="outline-success">Edit</Button> {' '}
                <Button variant="outline-danger" onClick={reset}>Reset</Button>
                <Drag data={data1} key={data1} long={data1.length} type1="OPEN" auto={refresh} call={handleCall}/>
              </div>
              <div className="right">
                <h2>Completed!</h2>
                <Drag data={data1} key={data1} long={data1.length} type1="DONE" auto={refresh} call={handleCall}/>
              </div>
            </div>
            
        </>
      );
    }
  }

 
}

export default App;
