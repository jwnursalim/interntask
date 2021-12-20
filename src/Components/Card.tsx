import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import { Droppable } from 'react-beautiful-dnd'
import { DragDropContext } from 'react-beautiful-dnd'

export class Wrap extends React.Component {

    todos: Todo[] = [
        {
          id: 0,
          text: 'Walk the dog',
          complete: false,
        },
        {
          id: 1,
          text: 'Write app',
          complete: true,
        },
        {
            id: 2,
            text: 'Do MATH 1014 homework 14',
            complete: true,
          }
      ];
    


    render(): React.ReactNode {
        return(
            <ListGroup defaultActiveKey="#link1">
         
            </ListGroup>
        );
        
    }
    
};