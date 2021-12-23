import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloseButton from 'react-bootstrap/CloseButton'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import axios from "axios";
import { idText } from "typescript";
import { BASE_URL } from "./BaseURL"

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `${k}`
  }));

var finalArray = []

// a little function to help us with reordering the result
const reorder = (list: any, startIndex:any, endIndex:any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging:any, draggableStyle:any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: "15px",
  margin: `0 0 ${grid}px 0`,
  borderRadius: "5px",
  border: "0.5px solid lightgray",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver:any)=> ({
  background: isDraggingOver ? "white" : "white",
  borderRadius: "10px",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  margin: "auto",
  width: "400px",
  marginTop: "5%",
  padding: "35px",
});

const tempBox: Array<string> = ["Hello", "Dog", "Cat"]

export default class Drag extends Component<{data: any, long: number, type1: string, auto: any, call: any}, {items: any, stuff: any, filterData:any, refresh: boolean}> {
  constructor(props:any) {
    super(props);
    var filterData = []
    if(this.props.type1 === "DONE"){
        filterData = this.props.data.filter((x: any) => x.status === "DONE")
    }
    else{
        filterData = this.props.data.filter((x: any) => x.status === "OPEN")
    }
    console.log(filterData.length)
    this.state = {
      items: getItems(filterData.length),
      stuff: ["Hello", "Dog", "Cat"],
      filterData: [],
      refresh: false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.deleteTask = this.deleteTask.bind(this)
  }


  onDragEnd(result:any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  handleCheck(e: any){
    console.log(e.target.checked)
    if(e.target.checked){
        axios.patch(BASE_URL + "/" + e.target.id + "/status",{
            status: "DONE"
        })
        .then((r) => this.props.auto())
    }
    else{
        axios.patch(BASE_URL + "/" + e.target.id + "/status",{
            status: "OPEN"
        })
        .then((r) => this.props.auto())
    }
    
  }

  deleteTask(e: any){
    if (window.confirm('Are you sure you want to delete?')) {
        axios
        .delete(BASE_URL + "/" + e.target.id)
        .then(() => {
        alert("Post deleted!");
        this.props.auto()
        }); 
    } else {
        // Do nothing!
        alert('Delete cancelled');
      }
    
  }


  getFilter = () => {
      const {data} = this.props
      var filterData: any = []
      var check = false
      if(this.props.type1 === "DONE"){
        filterData = this.props.data.filter((x: any) => x.status === "DONE")
        check = true
      }
      else{
        filterData = this.props.data.filter((x: any) => x.status === "OPEN")
        check = false
      }
      console.log(filterData)
      if(filterData.length === 0){
          return <div className="drag-box2"></div>
      }
      else{
        var temp: any = []
        return (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided:any, snapshot:any) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {
                  this.state.items.map((item:any, index:any) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided:any, snapshot:any) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="drag-box"
                         
                        >
                            <Form.Check type="checkbox"
                            style={{textDecoration: "line-through;"}}
                            label={filterData[item.content].title} 
                            onChange={this.handleCheck}
                            id={filterData[item.content].id}
                            checked={check}
                            />
                            <CloseButton className="del-btn" 
                            onClick={this.deleteTask}
                            id={filterData[item.content].id}/>
                            <Button onClick={() => this.props.call(filterData[item.content].id)} 
                            id={filterData[item.content].id}
                            variant="light" className="patch-btn">Edit</Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        );

      }
      
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
      return(
          <>
            {this.getFilter()}
          </>
      )
        
   
  }
}

