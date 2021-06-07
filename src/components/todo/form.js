import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useForm from '../hooks/form.js';

function TodoForm(props) {
  const [item, setItem] = useState({});
  const [handleSubmit, handleChange, values] = useForm(getTaskCallback);
  // const [handleSubmit, handleInput, handleChange, values] = useForm(props.handleSubmit);

  function getTaskCallback(task) {
    setItem(task);
  }

  // const handleInputChange = e => {
  //   // this.setState({ item: {...this.state.item, [e.target.name]: e.target.value } });
  //   setItem({...item, [e.target.name]: e.target.value});
  //   console.log('WE ARE IN form AND STATE CHANGEING ITEM', item);
  // };

  const handletheSubmit = (e) => {
    e.preventDefault();
    e.persist();
    handleSubmit(e);
    props.handleSubmit(values);
    // e.target.reset();
    // setItem({});
    console.log(item);
  };

  return (
    <>
      <Card>
        <h3>Add Item</h3>
        <form onSubmit={handletheSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Difficulty Rating {values.difficulty || '1'}</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleChange} />
          </label>
          <Button variant="primary" type="submit">
            Add Item
          </Button>
        </form>
      </Card>
    </>
  );
}

export default TodoForm;

{/* <div className="data-container">
<p>This is being collected as we update the form (onChange of any input):</p>
{
  Object.keys(values).map((key, idx) => <p key={idx}>{key}: {values[key]}</p>)
}

<p>This is data that is collected after the form is submitted:</p>
{
  Object.keys(item).map((key, idx) => <p key={idx}>{key}: {item[key]}</p>)
}
</div> */}
