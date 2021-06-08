import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings/context.js';
import usePagination from '../hooks/pagination.js';

export default function Pagination() {
  const [ goToNextPage,goToPreviousPage,changePage,getPaginatedData,getPaginationGroup] = usePagination();
  const context = useContext(SettingsContext);
  return (
    <div className="pagination">
      <button onClick={goToPreviousPage} className={`previous ${context.currentPage === 1 ? 'disabled' : ''}`}>
        back
      </button>
      {getPaginationGroup().map((item, idx) => (
        <button key={idx} onClick={ (e) => changePage(item)} className={`paginationItem ${context.currentPage === item ? 'active' : null}`}>
          <span>
            {item}
          </span>
        </button>
      ))}

      <button onClick={goToNextPage} className={`next ${context.currentPage === context.pages ? 'disabled' : ''}`}>
        next
      </button>
    </div>
  );
};
