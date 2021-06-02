import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function TodoList(props) {
  return (
    <>
    <ul>
      {props.list.map(item => (
        <li
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </span>
          <span className="personSpan">{item.assignee}</span>
        </li>
      ))}
    </ul>
    <ListGroup>
    <ListGroup.Item>No style</ListGroup.Item>
    <ListGroup.Item variant="primary">Primary</ListGroup.Item>
    <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
    <ListGroup.Item variant="success">Success</ListGroup.Item>
    <ListGroup.Item variant="danger">Danger</ListGroup.Item>
    <ListGroup.Item variant="warning">Warning</ListGroup.Item>
    <ListGroup.Item variant="info">Info</ListGroup.Item>
    <ListGroup.Item variant="light">Light</ListGroup.Item>
    <ListGroup.Item variant="dark">Dark</ListGroup.Item>
  </ListGroup>
  </>
  );
}

export default TodoList;
