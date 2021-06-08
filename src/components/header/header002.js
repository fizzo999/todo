// import React, { useContext, Component } from 'react';
// import { SettingsContext } from '../../context/settings/context003.js';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import PropTypes from 'prop-types';

// export class header002 extends Component {
//   constructor(props) {
//     super(props);
//   };

//   render() {
//     const siteContext = useContext(SettingsContext);
//     return (
//       <header>
//         <Navbar bg="primary" variant="dark">
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="mr-auto">
//               <Nav.Link href="/">
//                 <h2>
//                   There are {this.props.list.filter(item => !item.complete).length} Items To Complete - #items/Page: {this.props.paginationNumber}
//                 </h2>
//               </Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar>
//       </header>
//     );
//   }
// }

// export default header002;


