import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings/context.js';

function header(props) {
  
  const siteContext = useContext(SettingsContext);
  
  return (
    <header>
      <h2>
        There are {props.list.filter(item => !item.complete).length} Items To Complete - #items/Page: {siteContext.paginationNumber}
      </h2>
    </header>
  );
}

export default header;
 