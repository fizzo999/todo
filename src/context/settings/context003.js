// import React from 'react';

// export const SettingsContext = React.createContext();

// class Settings extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       showComplete: true,
//       toggleShowComplete: this.toggleShowComplete,
//       paginationNumber: 3,
//       changePagination: this.changePagination,
//       showByCategory: 'all',
//       changeShowByCategory: this.changeShowByCategory
//     };
//   }

//   // toggleShowComplete = () => this.setState({ showComplete: this.state.showComplete === true ? false : true});
//   // toggleShowComplete = () => this.setState({ showComplete: this.state.showComplete ? false : true});
//   toggleShowComplete = () => this.setState({ showComplete: !this.state.showComplete});

//   changePagination = (props) => this.setState({ paginationNumber: props.paginationNumber});

//   changeShowByCategory = (props) => this.setState({ showByCategory: props.showByCategory});

//   render() {
//     return (
//       <SettingsContext.Provider value={this.state}>
//         {this.props.children}
//       </SettingsContext.Provider>
//     );
//   }
// }

// export default Settings;
