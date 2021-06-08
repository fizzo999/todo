import React, { useEffect, useState, useContext, useCallback } from 'react';
import { SettingsContext } from '../../context/settings/context.js';
// import { AuthContext } from '../../context/auth/context.js';
import { When } from 'react-if';
import useAjax from '../hooks/ajax.js';
import Header from '../header/header.js';
// import Header from '../header/header002.js';

import TodoForm from './form.js';
import TodoList from './list.js';
import Pagination from '../pagination/pagination.js';

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

  const _updateItem = async (itemObject) => {
    console.log('WE MADE IT INTO UPDATE', itemObject);
    if(itemObject._id){
      const requestOptions = {
        method: 'put',
        url: `${todoAPI}/${itemObject._id}`,
        data: itemObject,
      };
      await setOptions(requestOptions);
    }
  };

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
      item.complete = !item.complete;
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
        <Header list={list}></Header>
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
          <When condition={true}>
            <Pagination list={list}/>
          </When>
        </div>
      </section>
    </>
  );
};

export default ToDo;

{/* <When condition={context.pages > 1}> */}
