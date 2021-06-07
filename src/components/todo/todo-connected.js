import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SettingsContext } from '../../context/settings/context.js';
// import { AuthContext } from '../../context/auth/context.js';
import { When } from 'react-if';
// import Header from '../header/header002.js';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../hooks/ajax.js';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

let newList;

const ToDo = () => {

  const { setOptions, response } = useAjax();

  const siteContext = useContext(SettingsContext);

  const [list, setList] = useState([]);

  const _addItem = async (item) => {
    item.due = new Date();
    item.complete = false;
    if (!item.difficulty) item.difficulty = 1;
    const requestOptions = {
      method: 'post',
      url: todoAPI,
      data: item
    };
    await setOptions(requestOptions);
  };

  // const _updateItem = (itemObject) => {
  //   console.log('WE MADE IT INTO UPDATE', itemObject);
  //   let item = list.filter(i => i._id === itemObject._id)[0] || {};
  //   if(item._id){
  //     fetch(`${todoAPI}/${item._id}`, {
  //       method: 'put',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(itemObject)
  //     })
  //       .then(response => {
  //         console.log('well here is the response.status', response.status);
  //         response.json();
  //       })
  //       .then(() => {
  //         let newList = list.map(listItem => listItem._id === itemObject._id ? itemObject : listItem);
  //         setList(newList);
  //       })
  //       .catch(console.error);
  //   }
  // };

  const _updateItem = async (itemObject) => {
    console.log('WE MADE IT INTO UPDATE', itemObject);
    // let item = list.filter(i => i._id === itemObject._id)[0] || {};
    // if(item._id){
    if(itemObject._id){
      const requestOptions = {
        method: 'put',
        url: `${todoAPI}/${itemObject._id}`,
        data: itemObject,
      };
      await setOptions(requestOptions);
    }
  }


  const _deleteItem = async(id) => {
    const requestOptions = {
      method: 'delete',
      url: `${todoAPI}/${id}`,
    };
    setOptions(requestOptions);
  };

  const _toggleComplete = async(id) => {
    const item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete
      const requestOptions = {
        method: 'put',
        url: `${todoAPI}/${id}`,
        data: item
      };
      setOptions(requestOptions);
    }
  };

  const _getTodoItems = useCallback( async () => {
    const requestOptions = {
      method: 'get',
      url: todoAPI,
    };
    setOptions(requestOptions);
  }, [setOptions]);

  useEffect( () => {
    if (response.results) {
      response.results && setList(response.results);
    } else {
      _getTodoItems();
    }
  }, [response, _getTodoItems, setList]);

  useEffect(_getTodoItems, []);

  // only runs when list is updated
  useEffect(() => {
    let finished = list.filter(item => item.complete === true);
    if (list.length > 0) { document.title = `Finished tasks: ${finished.length || '0' } Yet todo: ${list.length - finished.length}`;}
  }, [list]);

  return (
    <>
      <When condition={list.length > 0 && list.map(item => item.complete)}>
        <header>
          <Navbar bg="primary" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">
                  <h2>
                    There are {list.filter(item => !item.complete).length} Items To Complete - #items/Page: {siteContext.paginationNumber}
                  </h2>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
