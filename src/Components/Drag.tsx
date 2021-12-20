import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

// fake data generator
const getItems = (count: any) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `${k}`
  }));


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

export default class Drag extends Component<{}, {items: any, stuff: any}> {
  constructor(props:any) {
    super(props);
    this.state = {
      items: getItems(3),
      stuff: ["Hello", "Dog", "Cat"]
    };
    this.onDragEnd = this.onDragEnd.bind(this);
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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided:any, snapshot:any) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item:any, index:any) => (
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
                    <Form.Check type="checkbox" label={this.state.stuff[item.content]} />
                   
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

