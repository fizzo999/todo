import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/settings/context.js';
import Card from 'react-bootstrap/Card';
// import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { When } from 'react-if';
import useForm from '../hooks/form.js';
import PropTypes from 'prop-types';


function TodoList(props) {
  const [showModal, setShowModal] = useState(false);
  let initialValue = { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'};
  const [modalItem, setModalItem] = useState(initialValue);
  const [modalItemFromForm, setModalItemFromForm] = useState({});
  const [handleSubmit, handleChange, values] = useForm(getTaskCallback);
  const siteContext = useContext(SettingsContext);

  function getTaskCallback(task) {
    setModalItemFromForm(task);
    console.log('here we are inside the helper function', task);
  }

  const handleClose = () => setShowModal(false);

  const handleTheUpdate = async (e) => {
    e.preventDefault();
    handleSubmit(e);
    setModalItemFromForm(values);
    setShowModal(false);
    helperFunction(values);
  };


  const helperFunction = (values => {
    let newModalItem;
    newModalItem = {
      _id: modalItem._id,
      complete: values.complete ? values.complete : modalItem.complete,
      text: values.text ? values.text : modalItem.text,
      difficulty: values.difficulty ? values.difficulty : modalItem.difficulty,
      assignee: values.assignee ? values.assignee : modalItem.assignee
    };
    props.handleUpdate(newModalItem);

  });

  const handleShow = (e) => {
    e.preventDefault();
    let selectedItem = props.list.filter(i => i._id === e.target.value)[0] || {};
    if (selectedItem._id) {
      setModalItem(selectedItem);
    }
    setShowModal(true);
  };
  let firstCardIndex = ((siteContext.currentPage * siteContext.paginationNumber ) - siteContext.paginationNumber);
  let lastCardIndex = siteContext.currentPage * siteContext.paginationNumber;
  let cardsToRender = props.list.slice(firstCardIndex, lastCardIndex);

  return (
    <>
      {cardsToRender.map(item => (
        <>
          <When condition={showModal}>
            <form>
              <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>
                    <span className={`header-complete-${(modalItem ) ? modalItem.complete.toString() : ''}`}>
                      {modalItem.complete ? 'complete' : 'pending'}
                    </span>
                    <span className="assignee">
                      <input type="text" name="assignee" placeholder={modalItem.assignee} onChange={handleChange}/>
                    </span>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="text" name="text" placeholder={modalItem.text} onChange={handleChange}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={(e) => handleTheUpdate(e)}>
                    Save Changes
                  </Button>
                    Difficulty: {modalItem.difficulty}
                </Modal.Footer>
              </Modal>
            </form>
          </When>
          <Card id={item._id ? item._id : ''} className={`complete-${item.complete.toString()} listcard`}
            key={item._id ? item._id : ''} >

            <Card.Header ><span className={`header-complete-${(item ) ? item.complete.toString() : ''}`} onClick={() => props.handleComplete(item._id ? item._id : '')}>
              {item.complete ? 'complete' : 'pending'}</span><span className="assignee">{item.assignee}</span>
            </Card.Header>
            <Card.Body >
              <Card.Title >{item.text}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-muted">
              Difficulty: {item.difficulty}
            </Card.Footer>
            <ListGroup horizontal>
              <Button variant="outline-success" onClick={handleShow} value={item._id}>update</Button>
              <Button variant="outline-danger" onClick={() => props.handleDelete(item._id)}>delete</Button>
            </ListGroup>
          </Card>
        </>
      ))}
    </>
  );
}
TodoList.propTypes = {
  handleDelete: PropTypes.func,
  handleComplete: PropTypes.func,
  handleUpdate: PropTypes.func,
  list: PropTypes.array
};

export default TodoList;
