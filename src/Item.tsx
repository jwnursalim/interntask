import React from 'react'

interface Todo {
    text: string;
    complete: boolean;
  }
  
  interface Props {
    todo: Todo;
  }
  
export const Item: React.FC<Props> = ({ todo }) => {
    return(
        <li>
        <label
          style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
        >
          <input type="checkbox" checked={todo.complete} /> {todo.text}
        </label>
      </li>
    );
};