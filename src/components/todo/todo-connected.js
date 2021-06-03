import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    // console.log('SO HERE IS THE ITEM ===============================>>>>>>', item);
    item.due = new Date();
    item.complete = false;
    if (!item.difficulty) item.difficulty = 1;
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
        // setList([...list, item])
      })
      .catch(console.error);
  };

  const _updateItem = (item) => {
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
        // setList([...list, item])
      })
      .catch(console.error);

  }

  const _deleteItem = async (item) => {
    setList(list.map(listItem => listItem._id !== item._id));
    fetch(`${todoAPI}/${item}`, {
      method: 'delete',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        console.log('here is the status', response.status);
        console.log('here is the list', list);
        console.log('here is the list', list);
      })
      // .then(savedItem => {
      //   console.log('here is the status', savedItem.status)
      //   setList([...list, savedItem])
        // setList([...list, item])
      // })
      .catch(console.error);
      await _getTodoItems();

  }

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>
        <h2>
          {/* There are {list.length > 0 && list.filter(item => !item.complete).length} Items To Complete */}
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleUpdate={_updateItem}
            handleDelete={_deleteItem}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
