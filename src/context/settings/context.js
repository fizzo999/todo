  
import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function Settings(props) {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortSelected, setSortSelected] = useState('');
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
    setLoading
  }
  
  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export default Settings;