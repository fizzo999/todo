import React, { useContext } from 'react';
// import { SettingsContext } from '../../context/settings/context.js';
// import usePagination from '../hooks/pagination.js';
import Pagination from 'react-bootstrap/Pagination';
import { SettingsContext } from '../../context/settings/context.js';
import PropTypes from 'prop-types';


function PaginationComponent(props) {
  const siteContext = useContext(SettingsContext);
  let active = 1;
  let items = [];
  for (let number = 1; number <= Math.ceil((props.list.length / siteContext.paginationNumber)); number++){
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => siteContext.setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination>
      {items}
    </Pagination>
  );
  // const [ goToNextPage, goToPreviousPage, changePage, getPaginatedData, getPaginationGroup ] = usePagination();
  // const context = useContext(SettingsContext);
  // return (
  //   <div className="pagination">
  //     <button onClick={goToPreviousPage} className={`previous ${context.currentPage === 1 ? 'disabled' : ''}`}>
  //       back
  //     </button>
  //     {getPaginationGroup().map((item, idx) => (
  //       <button key={idx} onClick={ (e) => changePage(item)} className={`paginationItem ${context.currentPage === item ? 'active' : null}`}>
  //         <span>
  //           {item}
  //         </span>
  //       </button>
  //     ))}

  //     <button onClick={goToNextPage} className={`next ${context.currentPage === context.pages ? 'disabled' : ''}`}>
  //       next
  //     </button>
  //   </div>
  // );

};

PaginationComponent.propTypes = {
  list: PropTypes.array
};

export default PaginationComponent;
