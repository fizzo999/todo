import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from '../../context/settings/context.js';
// import { AuthContext } from '../../context/auth/context.js';
import { When } from 'react-if';
// import Header from '../header/header.js' ;
import TodoForm from './form.js';
import TodoList from './list.js';

// import useAjax from '../hooks/ajax.js';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

let newList;

const ToDo = () => {

  // const { setOptions, response } = useAjax();

  const siteContext = useContext(SettingsContext);
  // const authContext = useContext(AuthContext);

  const [list, setList] = useState([]);
  // console.log('LIST', list); Kristian taught me this. Have to set console.log outside of the function so it re triggers on every render - also because useState is async

  const _addItem = (item) => {
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
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  // const _addItem = async (item) => {
  //   item.due = new Date();
  //   item.complete = false;
  //   if (!item.difficulty) item.difficulty = 1;
  //   const requestOptions = {
  //     method: 'post',
  //     url: 'https://api-js401.herokuapp.com/api/v1/todo',
  //     data: item
  //   };
  //   await setOptions(requestOptions);
    
  // };
  // console.log('here is the respoonse', response);

  const _updateItem = (itemObject) => {
    console.log('WE MADE IT INTO UPDATE', itemObject);
    let item = list.filter(i => i._id === itemObject._id)[0] || {};
    if(item._id){
      fetch(`${todoAPI}/${item._id}`, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemObject)
      })
        .then(response => {
          console.log('well here is the response.status', response.status);
          response.json();
        })
        .then(() => {
          let newList = list.map(listItem => listItem._id === itemObject._id ? itemObject : listItem);
          setList(newList);
        })
        .catch(console.error);
    }
  };

  const _deleteItem = async (id) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if(item._id){
      await fetch(`${todoAPI}/${id}`, {
        method: 'delete',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => {
          console.log('status', response.status);
          response.json();
        })
        .then(() => {
          newList = list.filter(listItem => listItem._id !== id);
          console.log('so here is the list', list);
          console.log('so here is the newList', newList);
          setList(newList);
          // setTimeout(() => { }, 3000);
        })
        .catch(console.error);
    }


  };

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
  // useEffect(_getTodoItems, [response]);

  // only runs when list is updated
  useEffect(() => {
    // console.log('this updates only when i add a task');
    let finished = list.filter(item => item.complete === true);
    if (list.length > 0) { document.title = `Finished tasks: ${finished.length || '0' } Yet todo: ${list.length - finished.length}`;}
  }, [list]);

  return (
    <>
      <When condition={list.length > 0 && list.map(item => item.complete)}>
        <header>
          <h2>
            There are {list.filter(item => !item.complete).length} Items To Complete - #items/Page: {siteContext.paginationNumber}
          </h2>
        </header>
      </When>

      <section className="todo">

        <div>
          <TodoForm
            handleSubmit={_addItem}/>
        </div>

        <div>
          <TodoList
            list={ list }
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


