import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

function ToDo() {

  const [list, setList ] = useState([]);

  async function addItem (item) {
    // item._id = Math.random();
    item._id = list.length +1;
    item.complete = false;
    if (!item.difficulty) item.difficulty = 1;
    await setList([...list, item]);
    console.log(list);
    await handleStorage(item);
  };

  function toggleComplete (id) {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  // only runs when list is updated
  useEffect(() => {
    // document.title being updated in the lifecycle, using useEffect, is considered a "side effect"
    console.log('this updates only when i add a task');
    let finished = list.filter(item => item.complete === true);
    if (list.length > 0) { document.title = `Finished tasks: ${finished.length || '0' } Yet todo: ${list.length - finished.length}`};
  }, [list]);

  // on initial mount of component
  useEffect(() => {
    console.log('this will run on initial mounting of our component');
      let sampleList = [
        { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
        { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
        { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
        { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
        { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
      ];
      setList(sampleList);
  }, []);

  const handleStorage = async (singleItem) => {
    if(!localStorage.getItem('itemKey')) {
      await localStorage.setItem('itemKey', JSON.stringify(list));
    } else {
      let newStorageArray = [];
      newStorageArray = await JSON.parse(localStorage.getItem('itemKey'));
      let contained = false;
      if (newStorageArray.length > 0) {
        newStorageArray.forEach(listItem => {
          if (listItem.text === singleItem.text && listItem.assignee === singleItem.assignee) {
            contained = true;
            console.log('we already have this in local STORAGE !!!', newStorageArray, contained);
            return;
          }
        });
      }
      !contained && newStorageArray.push( singleItem );
      // !contained && console.log('YES WE ABSOLUTELY DO already have this in local STORAGE');
      await localStorage.setItem('itemKey', JSON.stringify(newStorageArray));
    }
  }


  return (
    <>
      <header>
        <h2>
        There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;
