import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = React.createContext();

function Settings(props) {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortSelected, setSortSelected] = useState('');
  const [paginationNumber, setPaginationNumber] = useState(3);

  const state = {
    list,
    setList,
    pages,
    setPages,
    sortSelected,
    setSortSelected,
    currentPage,
    setCurrentPage,
    loading,
    setLoading,
    paginationNumber,
    setPaginationNumber
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
};

Settings.propTypes = {
  children: PropTypes.array
};

export default Settings;
