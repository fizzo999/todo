import React, { useContext } from 'react';
import { SettingsContext } from '../../context/settings/context.js';

function Header(props) {
  
  const siteContext = useContext(SettingsContext);
  console.log('props=========>>>>>>>>>>',props);
  
  return (
    <header>
      <h2>
        There are {props.list.filter(item => !item.complete).length} Items To Complete - #items/Page: {siteContext.paginationNumber}
      </h2>
    </header>
  );
}

export default Header;
 