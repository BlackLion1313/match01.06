// import { createContext, useState } from "react";
// //1.creating context
// export const UsersContext = createContext();
// //2.Define what we make available to share with our components
// export const UsersContextProvider = (props) => {
// console.log(props)
//   //move here states and variables I wanna share
//   const [originalUsers, setOriginalUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const getUsers = async () => {
//     let url = 'https://randomuser.me/api/?results=70';

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setOriginalUsers(data.results);
//       setUsers(data.results);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(true);
//       setError('Error fetching');
//     }
//   };


//   return (
//     <UsersContext.Provider
//      value={{ originalUsers, users, loading, error, getUsers }}
//      >
//       {props.children}
//       </UsersContext.Provider>
//   );
// };