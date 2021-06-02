import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList(props) {
  return (
    <>

      {props.list.map(item => (

          
        <ListGroup horizontal className={`complete-${item.complete.toString()}`}
          key={item._id}>
          <ListGroup.Item action variant="primary" onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </ListGroup.Item>
          <ListGroup.Item variant="warning" className="personSpan">{item.assignee}</ListGroup.Item>
        </ListGroup>

      ))}

  </>
  );
}

export default TodoList;
