import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import useForm from '../hooks/form.js';


function TodoList(props) {
  const [item, setItem] = useState({});
  const [handleSubmit, handleInput, handleChange, values] = useForm(getTaskCallback);

  function getTaskCallback(task) {
    setItem(task);
  }

  function handleTheUpdate (e) {
    e.preventDefault();
    e.persist();
    console.log('we are in the lIST and here are the e', e.target.value);
    handleSubmit(e);
    props.handleUpdate(values);
    // e.target.reset();
    // setItem({});
  }

  function handleTheDelete (e) {
    e.preventDefault();
    e.persist();
    console.log('we are in the lIST and here are the e', e.target.value);
    handleSubmit(e);
    props.handleDelete(e.target.value);
    // props.handleDelete(values);
    // e.target.reset();
    // setItem({});
  }


  return (
    
    <>
    {props.list.map(item => (
      <>
        <Card className={`complete-${item.complete.toString()} listcard`}
          key={item._id} onClick={() => props.handleComplete(item._id)}>
            <form className="listForm">
          <Card.Header ><span className={`header-complete-${item.complete.toString()}`}>
            {item.complete ? 'complete' : 'pending'}</span><span className="assignee">{item.assignee}</span>
          </Card.Header>
          <Card.Body >
            <Card.Title >{item.text}</Card.Title>
          </Card.Body>
          <Card.Footer className="text-muted">
            Difficulty: {item.difficulty} 
          </Card.Footer>
              <ListGroup horizontal>
                <Button variant="outline-success" onClick={handleTheUpdate} value={item._id}>update</Button>
                <Button variant="outline-danger" onClick={handleTheDelete} value={item._id}>delete</Button>
              </ListGroup>
            </form>
        </Card>          
        </>
      ))}
    </>
  );
}

export default TodoList;
